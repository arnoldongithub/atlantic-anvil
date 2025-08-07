#!/usr/bin/env python3
"""
Atlantic Anvil News - Batch Article Summarization Service
Processes multiple articles efficiently using sshleifer model
"""

import os
import json
import logging
import asyncio
import concurrent.futures
from typing import Dict, List, Optional, Any
from datetime import datetime, timedelta
import requests
import time
from summarize import AtlanticAnvilSummarizer

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class BatchSummarizer:
    """
    Batch processing for Atlantic Anvil news summarization
    Handles rate limiting, concurrent processing, and error recovery
    """
    
    def __init__(self):
        self.summarizer = AtlanticAnvilSummarizer()
        self.batch_size = int(os.getenv('SUMMARIZE_BATCH_SIZE', 10))
        self.max_concurrent = int(os.getenv('SUMMARIZE_CONCURRENT_REQUESTS', 5))
        self.rate_limit_delay = 1.0  # Seconds between requests
        self.max_retries = 3
        
        # Statistics tracking
        self.stats = {
            'total_processed': 0,
            'successful': 0,
            'failed': 0,
            'start_time': None,
            'end_time': None
        }
    
    def process_batch(self, articles: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Process a batch of articles with concurrent processing
        """
        self.stats['start_time'] = datetime.now()
        self.stats['total_processed'] = len(articles)
        
        logger.info(f"Starting batch processing of {len(articles)} articles")
        
        # Split into smaller chunks for concurrent processing
        chunks = [articles[i:i + self.batch_size] 
                 for i in range(0, len(articles), self.batch_size)]
        
        all_results = []
        
        for chunk_idx, chunk in enumerate(chunks):
            logger.info(f"Processing chunk {chunk_idx + 1}/{len(chunks)} ({len(chunk)} articles)")
            
            # Process chunk with concurrent workers
            chunk_results = self._process_chunk_concurrent(chunk)
            all_results.extend(chunk_results)
            
            # Rate limiting between chunks
            if chunk_idx < len(chunks) - 1:
                time.sleep(self.rate_limit_delay)
        
        self.stats['end_time'] = datetime.now()
        self.stats['successful'] = sum(1 for r in all_results if r.get('success', False))
        self.stats['failed'] = len(all_results) - self.stats['successful']
        
        logger.info(f"Batch processing completed: {self.stats['successful']} successful, {self.stats['failed']} failed")
        
        return all_results
    
    def _process_chunk_concurrent(self, chunk: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Process a chunk of articles with concurrent workers
        """
        results = []
        
        with concurrent.futures.ThreadPoolExecutor(max_workers=self.max_concurrent) as executor:
            # Submit all articles in chunk
            future_to_article = {
                executor.submit(self._process_single_with_retry, article): article 
                for article in chunk
            }
            
            # Collect results as they complete
            for future in concurrent.futures.as_completed(future_to_article):
                article = future_to_article[future]
                try:
                    result = future.result(timeout=60)  # 60 second timeout per article
                    results.append(result)
                except Exception as e:
                    logger.error(f"Failed to process article '{article.get('title', 'Unknown')}': {str(e)}")
                    results.append({
                        'success': False,
                        'error': str(e),
                        'original_title': article.get('title', 'Unknown'),
                        'article_id': article.get('id')
                    })
        
        return results
    
    def _process_single_with_retry(self, article: Dict[str, Any]) -> Dict[str, Any]:
        """
        Process a single article with retry logic
        """
        last_error = None
        
        for attempt in range(self.max_retries):
            try:
                result = self.summarizer.summarize_article(article)
                
                # Add metadata
                result['article_id'] = article.get('id')
                result['processed_at'] = datetime.now().isoformat()
                result['attempt'] = attempt + 1
                
                if result.get('success', False):
                    return result
                    
                # If not successful but no exception, treat as error for retry
                last_error = result.get('error', 'Unknown summarization error')
                
            except Exception as e:
                last_error = str(e)
                logger.warning(f"Attempt {attempt + 1} failed for article '{article.get('title', 'Unknown')}': {str(e)}")
                
                if attempt < self.max_retries - 1:
                    # Exponential backoff
                    wait_time = (2 ** attempt) * self.rate_limit_delay
                    time.sleep(wait_time)
        
        # All retries failed
        return {
            'success': False,
            'error': f'Failed after {self.max_retries} attempts: {last_error}',
            'original_title': article.get('title', 'Unknown'),
            'article_id': article.get('id'),
            'processed_at': datetime.now().isoformat()
        }
    
    def filter_articles_needing_summary(self, articles: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Filter articles that need summarization (don't already have good summaries)
        """
        filtered = []
        
        for article in articles:
            # Check if article already has a good summary
            existing_summary = article.get('summary', '') or article.get('ai_summary', '')
            
            # Skip if already has a decent summary (more than 50 characters)
            if existing_summary and len(existing_summary.strip()) > 50:
                continue
            
            # Skip if content is too short to summarize
            content = article.get('content', '') or article.get('description', '')
            if not content or len(content.split()) < 30:
                continue
                
            # Skip if article is too old (more than 7 days)
            if 'published_at' in article:
                try:
                    pub_date = datetime.fromisoformat(article['published_at'].replace('Z', '+00:00'))
                    if (datetime.now().replace(tzinfo=pub_date.tzinfo) - pub_date).days > 7:
                        continue
                except:
                    pass  # Continue if date parsing fails
            
            filtered.append(article)
        
        logger.info(f"Filtered {len(articles)} articles to {len(filtered)} needing summarization")
        return filtered
    
    def get_processing_stats(self) -> Dict[str, Any]:
        """
        Return processing statistics
        """
        stats = self.stats.copy()
        
        if stats['start_time'] and stats['end_time']:
            duration = stats['end_time'] - stats['start_time']
            stats['duration_seconds'] = duration.total_seconds()
            stats['articles_per_second'] = stats['total_processed'] / duration.total_seconds() if duration.total_seconds() > 0 else 0
        
        return stats

def handler(request):
    """
    Vercel serverless function handler for batch processing
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
        
        articles = data.get('articles', [])
        if not articles:
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'No articles provided'})
            }
        
        # Limit batch size for serverless
        max_batch_size = 50
        if len(articles) > max_batch_size:
            articles = articles[:max_batch_size]
            logger.warning(f"Limiting batch to {max_batch_size} articles")
        
        # Initialize batch processor
        batch_processor = BatchSummarizer()
        
        # Filter articles that need summarization
        articles_to_process = batch_processor.filter_articles_needing_summary(articles)
        
        if not articles_to_process:
            return {
                'statusCode': 200,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'message': 'No articles needed summarization',
                    'original_count': len(articles),
                    'processed_count': 0,
                    'results': [],
                    'timestamp': datetime.now().isoformat()
                })
            }
        
        # Process batch
        results = batch_processor.process_batch(articles_to_process)
        stats = batch_processor.get_processing_stats()
        
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'results': results,
                'stats': stats,
                'original_count': len(articles),
                'processed_count': len(articles_to_process),
                'timestamp': datetime.now().isoformat()
            })
        }
        
    except Exception as e:
        logger.error(f"Batch handler error: {str(e)}")
        
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': False,
                'error': str(e),
                'timestamp': datetime.now().isoformat()
            })
        }

# For scheduled/cron processing
def scheduled_batch_process():
    """
    Scheduled batch processing for regular summarization updates
    This would be called by Vercel cron or external scheduler
    """
    try:
        # This would typically fetch articles from your database/API
        # For now, return a placeholder response
        logger.info("Scheduled batch summarization started")
        
        # Placeholder: In real implementation, fetch from your news API
        articles = []  # fetch_latest_articles()
        
        if not articles:
            logger.info("No new articles to process")
            return {
                'success': True,
                'message': 'No new articles to process',
                'timestamp': datetime.now().isoformat()
            }
        
        batch_processor = BatchSummarizer()
        articles_to_process = batch_processor.filter_articles_needing_summary(articles)
        
        if articles_to_process:
            results = batch_processor.process_batch(articles_to_process)
            stats = batch_processor.get_processing_stats()
            
            logger.info(f"Scheduled processing completed: {stats}")
            
            return {
                'success': True,
                'processed_count': len(articles_to_process),
                'stats': stats,
                'timestamp': datetime.now().isoformat()
            }
        else:
            return {
                'success': True,
                'message': 'No articles needed summarization',
                'timestamp': datetime.now().isoformat()
            }
            
    except Exception as e:
        logger.error(f"Scheduled batch processing error: {str(e)}")
        return {
            'success': False,
            'error': str(e),
            'timestamp': datetime.now().isoformat()
        }

# For local testing
if __name__ == "__main__":
    # Test with sample articles
    test_articles = [
        {
            'id': '1',
            'title': 'Conservative Economic Policies Show Strong Results',
            'content': '''
            Recent data shows that conservative fiscal policies implemented over the past year 
            have resulted in significant economic improvements. Tax cuts and reduced regulations 
            have led to increased business investment and job creation. Small businesses report 
            higher confidence levels and expanded hiring plans. The unemployment rate has reached 
            historic lows in several conservative-led states. Free market principles continue 
            to demonstrate their effectiveness in driving economic growth and prosperity.
            '''
        },
        {
            'id': '2', 
            'title': 'Second Amendment Rights Protected in Supreme Court Decision',
            'content': '''
            The Supreme Court ruled in favor of constitutional gun rights in a landmark decision 
            that upholds the Second Amendment. The case challenged restrictive gun laws that 
            violated citizens' fundamental rights to bear arms. Conservative justices formed 
            the majority opinion, emphasizing the importance of constitutional protections. 
            Gun rights advocates celebrated the decision as a victory for American freedoms 
            and constitutional principles.
            '''
        }
    ]
    
    print("=== Atlantic Anvil Batch Summarization Test ===")
    
    batch_processor = BatchSummarizer()
    results = batch_processor.process_batch(test_articles)
    stats = batch_processor.get_processing_stats()
    
    print(f"\nProcessing Stats:")
    print(f"Total articles: {stats['total_processed']}")
    print(f"Successful: {stats['successful']}")
    print(f"Failed: {stats['failed']}")
    print(f"Duration: {stats.get('duration_seconds', 0):.2f} seconds")
    
    print(f"\nResults:")
    for i, result in enumerate(results):
        print(f"\nArticle {i+1}:")
        print(f"  Success: {result['success']}")
        print(f"  Method: {result.get('method', 'N/A')}")
        print(f"  Summary: {result.get('summary', 'No summary')[:100]}...")
    
    print("=" * 60)
