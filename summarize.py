#!/usr/bin/env python3
"""
Atlantic Anvil News - Article Summarization Service
Uses sshleifer/distilbart-cnn-12-6 for conservative news summarization
"""

import os
import json
import logging
import traceback
from typing import Dict, List, Optional, Any
from datetime import datetime
import requests
from urllib.parse import urlparse
import re

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class AtlanticAnvilSummarizer:
    """
    Atlantic Anvil News Summarization Service
    Specialized for conservative news content
    """
    
    def __init__(self):
        self.model_name = "sshleifer/distilbart-cnn-12-6"
        self.api_url = f"https://api-inference.huggingface.co/models/{self.model_name}"
        self.hf_token = os.getenv('HUGGINGFACE_API_TOKEN')
        self.max_length = int(os.getenv('VITE_SUMMARY_MAX_LENGTH', 150))
        self.min_length = int(os.getenv('VITE_SUMMARY_MIN_LENGTH', 50))
        
        # Conservative news context keywords for better summarization
        self.conservative_keywords = [
            'conservative', 'republican', 'trump', 'gop', 'patriot', 'america first',
            'constitution', 'freedom', 'liberty', 'traditional values', 'border security',
            'second amendment', 'pro-life', 'fiscal responsibility', 'small government'
        ]
        
    def clean_text(self, text: str) -> str:
        """Clean and prepare text for summarization"""
        if not text or not isinstance(text, str):
            return ""
            
        # Remove HTML tags
        text = re.sub(r'<[^>]+>', '', text)
        
        # Remove extra whitespace
        text = ' '.join(text.split())
        
        # Remove common news artifacts
        text = re.sub(r'\(Reuters\)|\(AP\)|\(AFP\)', '', text)
        text = re.sub(r'Read more:.*$', '', text, flags=re.MULTILINE)
        text = re.sub(r'Source:.*$', '', text, flags=re.MULTILINE)
        
        # Ensure minimum length for meaningful summarization
        if len(text.split()) < 50:
            return text  # Too short to summarize effectively
            
        return text.strip()
    
    def enhance_conservative_context(self, text: str) -> str:
        """
        Add conservative context to improve summarization relevance
        """
        # Check if text already contains conservative keywords
        text_lower = text.lower()
        conservative_score = sum(1 for keyword in self.conservative_keywords 
                               if keyword in text_lower)
        
        # If low conservative context, add subtle framing
        if conservative_score < 2:
            # Add context prefix for better summarization
            context_prefix = "From a conservative perspective, this news story reports: "
            text = context_prefix + text
            
        return text
    
    def summarize_article(self, article_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Summarize a single article using sshleifer model
        """
        try:
            # Extract text content
            title = article_data.get('title', '')
            content = article_data.get('content', '') or article_data.get('description', '') or article_data.get('summary', '')
            
            if not content:
                logger.warning(f"No content found for article: {title}")
                return {
                    'success': False,
                    'error': 'No content to summarize',
                    'original_title': title
                }
            
            # Clean and prepare text
            clean_content = self.clean_text(content)
            if len(clean_content.split()) < 30:
                # Too short, return original
                return {
                    'success': True,
                    'summary': clean_content,
                    'original_title': title,
                    'method': 'original_too_short'
                }
            
            # Enhance with conservative context
            enhanced_content = self.enhance_conservative_context(clean_content)
            
            # Prepare request to Hugging Face API
            headers = {}
            if self.hf_token:
                headers['Authorization'] = f'Bearer {self.hf_token}'
            
            payload = {
                'inputs': enhanced_content,
                'parameters': {
                    'max_length': self.max_length,
                    'min_length': self.min_length,
                    'do_sample': False,
                    'num_beams': 4,
                    'temperature': 0.7,
                    'top_p': 0.9
                }
            }
            
            # Make request to Hugging Face
            response = requests.post(
                self.api_url,
                headers=headers,
                json=payload,
                timeout=30
            )
            
            if response.status_code == 200:
                result = response.json()
                
                if isinstance(result, list) and len(result) > 0:
                    summary = result[0].get('summary_text', '')
                    
                    # Post-process summary
                    summary = self.post_process_summary(summary, title)
                    
                    return {
                        'success': True,
                        'summary': summary,
                        'original_title': title,
                        'method': 'sshleifer_model',
                        'model': self.model_name
                    }
                else:
                    raise ValueError("Unexpected API response format")
                    
            else:
                logger.error(f"HuggingFace API error: {response.status_code} - {response.text}")
                # Fallback to extractive summary
                return self.fallback_summary(clean_content, title)
                
        except Exception as e:
            logger.error(f"Summarization error for '{title}': {str(e)}")
            logger.error(traceback.format_exc())
            
            # Fallback to extractive summary
            return self.fallback_summary(content, title)
    
    def post_process_summary(self, summary: str, title: str) -> str:
        """
        Post-process the generated summary for conservative news context
        """
        # Remove context prefix if it was added
        summary = re.sub(r'^From a conservative perspective, this news story reports: ', '', summary, flags=re.IGNORECASE)
        
        # Ensure summary doesn't just repeat the title
        title_words = set(title.lower().split())
        summary_words = set(summary.lower().split())
        overlap_ratio = len(title_words.intersection(summary_words)) / len(title_words) if title_words else 0
        
        if overlap_ratio > 0.8:  # Too much overlap with title
            # Try to extract key sentences from content instead
            sentences = summary.split('.')
            if len(sentences) > 1:
                # Take the most informative sentence
                summary = max(sentences, key=len).strip() + '.'
        
        # Capitalize first letter and ensure proper ending
        if summary:
            summary = summary[0].upper() + summary[1:] if len(summary) > 1 else summary.upper()
            if not summary.endswith('.'):
                summary += '.'
        
        return summary
    
    def fallback_summary(self, content: str, title: str) -> Dict[str, Any]:
        """
        Fallback extractive summarization when API fails
        """
        try:
            sentences = content.split('.')
            sentences = [s.strip() for s in sentences if len(s.strip()) > 20]
            
            if len(sentences) >= 3:
                # Take first 2-3 most informative sentences
                summary = '. '.join(sentences[:2]) + '.'
            elif len(sentences) >= 1:
                summary = sentences[0] + '.'
            else:
                summary = content[:150] + '...' if len(content) > 150 else content
            
            return {
                'success': True,
                'summary': summary,
                'original_title': title,
                'method': 'extractive_fallback'
            }
            
        except Exception as e:
            logger.error(f"Fallback summarization failed: {str(e)}")
            return {
                'success': False,
                'error': str(e),
                'original_title': title
            }

def handler(request):
    """
    Vercel serverless function handler
    """
    if request.method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
            'body': ''
        }
    
    if request.method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        # Parse request body
        if hasattr(request, 'get_json'):
            data = request.get_json()
        else:
            data = json.loads(request.body or '{}')
        
        if not data:
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'No data provided'})
            }
        
        # Initialize summarizer
        summarizer = AtlanticAnvilSummarizer()
        
        # Handle single article or multiple articles
        if isinstance(data, list):
            # Multiple articles
            results = []
            for article in data[:10]:  # Limit to 10 articles per request
                result = summarizer.summarize_article(article)
                results.append(result)
            
            return {
                'statusCode': 200,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'results': results,
                    'processed_count': len(results),
                    'timestamp': datetime.now().isoformat()
                })
            }
        else:
            # Single article
            result = summarizer.summarize_article(data)
            
            return {
                'statusCode': 200,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'result': result,
                    'timestamp': datetime.now().isoformat()
                })
            }
            
    except Exception as e:
        logger.error(f"Handler error: {str(e)}")
        logger.error(traceback.format_exc())
        
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': False,
                'error': str(e),
                'timestamp': datetime.now().isoformat()
            })
        }

# For local testing
if __name__ == "__main__":
    # Test article
    test_article = {
        'title': 'Conservative Victory in Key Election Race',
        'content': '''
        In a significant victory for conservative values, Republican candidate John Smith secured 
        a decisive win in the special election for the 5th district. Smith campaigned on a platform 
        of fiscal responsibility, constitutional principles, and support for law enforcement. 
        The victory represents a shift toward traditional American values in a district that has 
        been competitive in recent years. Smith received 54% of the vote compared to his Democratic 
        opponent's 43%. Local conservative groups celebrated the win as validation of their 
        grassroots organizing efforts. The newly elected representative pledged to fight for 
        lower taxes, border security, and protection of Second Amendment rights. This win gives 
        Republicans additional momentum heading into the midterm elections and demonstrates that 
        conservative principles continue to resonate with American voters across the country.
        '''
    }
    
    summarizer = AtlanticAnvilSummarizer()
    result = summarizer.summarize_article(test_article)
    
    print("=== Atlantic Anvil Summarization Test ===")
    print(f"Original Title: {test_article['title']}")
    print(f"Success: {result['success']}")
    print(f"Method: {result.get('method', 'N/A')}")
    print(f"Summary: {result.get('summary', 'No summary generated')}")
    print("=" * 50)
