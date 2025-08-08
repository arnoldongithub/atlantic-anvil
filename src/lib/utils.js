// src/lib/utils.js
// Utility functions for Atlantic Anvil News

import { clsx } from 'clsx';

// ============================================
// CLASS NAME UTILITIES
// ============================================

/**
 * Combine class names with conditional logic
 * @param {...any} inputs - Class names to combine
 * @returns {string} Combined class names
 */
export function cn(...inputs) {
  return clsx(inputs);
}

// ============================================
// DATE & TIME UTILITIES
// ============================================

/**
 * Format date to relative time (e.g., "2 hours ago")
 * @param {Date|string} date - Date to format
 * @returns {string} Relative time string
 */
export function getRelativeTime(date) {
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now - then) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return interval === 1 
        ? `1 ${unit} ago`
        : `${interval} ${unit}s ago`;
    }
  }

  return 'just now';
}

/**
 * Format date to readable format
 * @param {Date|string} date - Date to format
 * @param {string} format - Format type ('short', 'long', 'full')
 * @returns {string} Formatted date string
 */
export function formatDate(date, format = 'short') {
  const d = new Date(date);
  
  const options = {
    short: { month: 'short', day: 'numeric' },
    long: { month: 'long', day: 'numeric', year: 'numeric' },
    full: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }
  };

  return d.toLocaleDateString('en-US', options[format]);
}

/**
 * Format time to 12-hour format
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted time string
 */
export function formatTime(date) {
  const d = new Date(date);
  return d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

// ============================================
// STRING UTILITIES
// ============================================

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @param {string} suffix - Suffix to add (default: '...')
 * @returns {string} Truncated text
 */
export function truncate(text, length, suffix = '...') {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length - suffix.length) + suffix;
}

/**
 * Convert string to URL slug
 * @param {string} text - Text to slugify
 * @returns {string} URL-safe slug
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Capitalize first letter of string
 * @param {string} text - Text to capitalize
 * @returns {string} Capitalized text
 */
export function capitalize(text) {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Strip HTML tags from text
 * @param {string} html - HTML string
 * @returns {string} Plain text
 */
export function stripHtml(html) {
  if (!html) return '';
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

// ============================================
// NUMBER UTILITIES
// ============================================

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Format number to compact notation (e.g., 1.5K, 2M)
 * @param {number} num - Number to format
 * @returns {string} Compact number
 */
export function formatCompactNumber(num) {
  if (num < 1000) return num.toString();
  if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
  if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M';
  return (num / 1000000000).toFixed(1) + 'B';
}

/**
 * Calculate reading time in minutes
 * @param {string} text - Text content
 * @param {number} wordsPerMinute - Reading speed (default: 200)
 * @returns {number} Reading time in minutes
 */
export function calculateReadingTime(text, wordsPerMinute = 200) {
  const words = text.split(/\s+/).filter(word => word.length > 0).length;
  return Math.ceil(words / wordsPerMinute);
}

// ============================================
// URL UTILITIES
// ============================================

/**
 * Extract domain from URL
 * @param {string} url - Full URL
 * @returns {string} Domain name
 */
export function getDomain(url) {
  try {
    const u = new URL(url);
    return u.hostname.replace('www.', '');
  } catch {
    return url;
  }
}

/**
 * Add query parameters to URL
 * @param {string} url - Base URL
 * @param {Object} params - Query parameters
 * @returns {string} URL with query parameters
 */
export function addQueryParams(url, params) {
  const u = new URL(url);
  Object.entries(params).forEach(([key, value]) => {
    u.searchParams.set(key, value);
  });
  return u.toString();
}

/**
 * Parse query parameters from URL
 * @param {string} url - URL with query parameters
 * @returns {Object} Parsed parameters
 */
export function parseQueryParams(url) {
  const u = new URL(url);
  const params = {};
  u.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
}

// ============================================
// STORAGE UTILITIES
// ============================================

/**
 * Safe localStorage getter
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value if not found
 * @returns {any} Stored value or default
 */
export function getLocalStorage(key, defaultValue = null) {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

/**
 * Safe localStorage setter
 * @param {string} key - Storage key
 * @param {any} value - Value to store
 * @returns {boolean} Success status
 */
export function setLocalStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 * @returns {boolean} Success status
 */
export function removeLocalStorage(key) {
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

// ============================================
// VALIDATION UTILITIES
// ============================================

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} Validation result
 */
export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean} Validation result
 */
export function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate phone number (US format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} Validation result
 */
export function isValidPhone(phone) {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return re.test(phone);
}

// ============================================
// ASYNC UTILITIES
// ============================================

/**
 * Debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Sleep/delay function
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} Promise that resolves after delay
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry async function with exponential backoff
 * @param {Function} fn - Async function to retry
 * @param {number} maxRetries - Maximum retry attempts
 * @param {number} delay - Initial delay in milliseconds
 * @returns {Promise} Result of function
 */
export async function retry(fn, maxRetries = 3, delay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await sleep(delay * Math.pow(2, i)); // Exponential backoff
    }
  }
}

// ============================================
// ARRAY UTILITIES
// ============================================

/**
 * Chunk array into smaller arrays
 * @param {Array} array - Array to chunk
 * @param {number} size - Chunk size
 * @returns {Array} Array of chunks
 */
export function chunk(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Shuffle array randomly
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
export function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Remove duplicates from array
 * @param {Array} array - Array with potential duplicates
 * @param {string} key - Key to check for objects
 * @returns {Array} Array without duplicates
 */
export function unique(array, key = null) {
  if (!key) {
    return [...new Set(array)];
  }
  
  const seen = new Set();
  return array.filter(item => {
    const val = item[key];
    if (seen.has(val)) return false;
    seen.add(val);
    return true;
  });
}

// ============================================
// OBJECT UTILITIES
// ============================================

/**
 * Deep clone object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Check if object is empty
 * @param {Object} obj - Object to check
 * @returns {boolean} True if empty
 */
export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

/**
 * Pick specific keys from object
 * @param {Object} obj - Source object
 * @param {Array} keys - Keys to pick
 * @returns {Object} New object with picked keys
 */
export function pick(obj, keys) {
  return keys.reduce((acc, key) => {
    if (obj.hasOwnProperty(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}

/**
 * Omit specific keys from object
 * @param {Object} obj - Source object
 * @param {Array} keys - Keys to omit
 * @returns {Object} New object without omitted keys
 */
export function omit(obj, keys) {
  const keysToOmit = new Set(keys);
  return Object.keys(obj).reduce((acc, key) => {
    if (!keysToOmit.has(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}

// ============================================
// BROWSER UTILITIES
// ============================================

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback method
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  }
}

/**
 * Check if user prefers dark mode
 * @returns {boolean} True if dark mode preferred
 */
export function prefersDarkMode() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Check if device is mobile
 * @returns {boolean} True if mobile device
 */
export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Get viewport dimensions
 * @returns {Object} Width and height
 */
export function getViewportSize() {
  return {
    width: window.innerWidth || document.documentElement.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight
  };
}

// ============================================
// ATLANTIC ANVIL SPECIFIC UTILITIES
// ============================================

/**
 * Get subscription tier color
 * @param {string} tier - Subscription tier
 * @returns {string} Color class
 */
export function getTierColor(tier) {
  const colors = {
    patriot: 'text-anvil-red',
    defender: 'text-torch-gold',
    guardian: 'text-atlantic-navy'
  };
  return colors[tier] || 'text-gray-500';
}

/**
 * Get category color
 * @param {string} category - Category slug
 * @returns {string} Hex color
 */
export function getCategoryColor(category) {
  const colors = {
    'trump': '#c53030',
    'republican-party': '#1a365d',
    'europe': '#2b6cb0',
    'elon-musk': '#d69e2e',
    'steve-bannon': '#c53030',
    'breaking': '#dc2626'
  };
  return colors[category] || '#1a365d';
}

/**
 * Format article score
 * @param {number} score - Score value (0-10)
 * @returns {string} Formatted score with icon
 */
export function formatScore(score) {
  if (score >= 8) return `🔥 ${score}/10`;
  if (score >= 6) return `⭐ ${score}/10`;
  if (score >= 4) return `📈 ${score}/10`;
  return `${score}/10`;
}

// Export all utilities
export default {
  // Class utilities
  cn,
  
  // Date utilities
  getRelativeTime,
  formatDate,
  formatTime,
  
  // String utilities
  truncate,
  slugify,
  capitalize,
  stripHtml,
  
  // Number utilities
  formatNumber,
  formatCompactNumber,
  calculateReadingTime,
  
  // URL utilities
  getDomain,
  addQueryParams,
  parseQueryParams,
  
  // Storage utilities
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
  
  // Validation utilities
  isValidEmail,
  isValidUrl,
  isValidPhone,
  
  // Async utilities
  debounce,
  throttle,
  sleep,
  retry,
  
  // Array utilities
  chunk,
  shuffle,
  unique,
  
  // Object utilities
  deepClone,
  isEmpty,
  pick,
  omit,
  
  // Browser utilities
  copyToClipboard,
  prefersDarkMode,
  isMobile,
  getViewportSize,
  
  // Atlantic Anvil specific
  getTierColor,
  getCategoryColor,
  formatScore
};
