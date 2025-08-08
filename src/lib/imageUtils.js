// src/lib/imageUtils.js
// Image processing and optimization utilities for Atlantic Anvil News

/**
 * Generate placeholder image URL
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @param {string} text - Placeholder text
 * @returns {string} Placeholder image URL
 */
export function getPlaceholderImage(width = 800, height = 450, text = 'Atlantic Anvil') {
  // Using via.placeholder.com service
  const bgColor = '1a365d'; // Atlantic navy
  const textColor = 'ffffff';
  return `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`;
}

/**
 * Get optimized image URL with CDN parameters
 * @param {string} url - Original image URL
 * @param {Object} options - Optimization options
 * @returns {string} Optimized image URL
 */
export function getOptimizedImageUrl(url, options = {}) {
  if (!url) return getPlaceholderImage();
  
  const {
    width = null,
    height = null,
    quality = 80,
    format = 'webp'
  } = options;
  
  // If using Cloudinary or similar CDN
  if (url.includes('cloudinary.com')) {
    const transforms = [];
    if (width) transforms.push(`w_${width}`);
    if (height) transforms.push(`h_${height}`);
    transforms.push(`q_${quality}`);
    transforms.push(`f_${format}`);
    
    // Insert transformations into Cloudinary URL
    return url.replace('/upload/', `/upload/${transforms.join(',')}/`);
  }
  
  // If using Vercel/Next.js Image Optimization API
  if (process.env.VITE_USE_VERCEL_IMAGES === 'true') {
    const params = new URLSearchParams();
    if (width) params.set('w', width);
    if (height) params.set('h', height);
    params.set('q', quality);
    
    return `/_vercel/image?url=${encodeURIComponent(url)}&${params}`;
  }
  
  // Return original URL if no optimization available
  return url;
}

/**
 * Lazy load image with IntersectionObserver
 * @param {string} selector - CSS selector for images
 */
export function initLazyLoading(selector = 'img[data-lazy]') {
  if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll(selector);
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });
    
    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    const images = document.querySelectorAll(selector);
    images.forEach(img => {
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      img.classList.add('loaded');
    });
  }
}

/**
 * Preload critical images
 * @param {Array} urls - Array of image URLs to preload
 */
export function preloadImages(urls) {
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
}

/**
 * Get image dimensions from URL
 * @param {string} url - Image URL
 * @returns {Promise<{width: number, height: number}>} Image dimensions
 */
export function getImageDimensions(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };
    img.onerror = reject;
    img.src = url;
  });
}

/**
 * Generate srcset for responsive images
 * @param {string} url - Base image URL
 * @param {Array} widths - Array of widths
 * @returns {string} srcset string
 */
export function generateSrcSet(url, widths = [320, 640, 960, 1280, 1920]) {
  if (!url) return '';
  
  return widths
    .map(width => `${getOptimizedImageUrl(url, { width })} ${width}w`)
    .join(', ');
}

/**
 * Get image format based on browser support
 * @returns {string} Supported image format
 */
export function getSupportedImageFormat() {
  const webpSupport = document.createElement('canvas')
    .toDataURL('image/webp')
    .indexOf('data:image/webp') === 0;
  
  if (webpSupport) return 'webp';
  return 'jpeg';
}

/**
 * Extract dominant color from image
 * @param {string} url - Image URL
 * @returns {Promise<string>} Dominant color in hex
 */
export async function getDominantColor(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      let r = 0, g = 0, b = 0;
      const blockSize = 5; // Sample every 5th pixel
      const length = data.length;
      let count = 0;
      
      for (let i = 0; i < length; i += blockSize * 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
      }
      
      r = Math.floor(r / count);
      g = Math.floor(g / count);
      b = Math.floor(b / count);
      
      const hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
      resolve(hex);
    };
    
    img.onerror = () => resolve('#1a365d'); // Default to Atlantic navy
    img.src = url;
  });
}

/**
 * Check if image URL is valid
 * @param {string} url - Image URL to validate
 * @returns {Promise<boolean>} True if valid
 */
export function isValidImageUrl(url) {
  return new Promise(resolve => {
    if (!url) {
      resolve(false);
      return;
    }
    
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

/**
 * Get fallback image based on category
 * @param {string} category - Article category
 * @returns {string} Fallback image URL
 */
export function getCategoryFallbackImage(category) {
  const fallbacks = {
    'trump': 'https://via.placeholder.com/800x450/c53030/ffffff?text=Trump+News',
    'republican-party': 'https://via.placeholder.com/800x450/1a365d/ffffff?text=GOP+News',
    'europe': 'https://via.placeholder.com/800x450/2b6cb0/ffffff?text=Europe+News',
    'elon-musk': 'https://via.placeholder.com/800x450/d69e2e/ffffff?text=Elon+Musk',
    'steve-bannon': 'https://via.placeholder.com/800x450/c53030/ffffff?text=Bannon',
    'breaking': 'https://via.placeholder.com/800x450/dc2626/ffffff?text=Breaking+News'
  };
  
  return fallbacks[category] || getPlaceholderImage();
}

/**
 * Generate blur hash placeholder
 * @param {string} url - Image URL
 * @returns {Promise<string>} Base64 blur hash
 */
export async function generateBlurHash(url) {
  // This would typically use the blurhash library
  // For now, return a simple gradient placeholder
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIj48c3RvcCBzdG9wLWNvbG9yPSIjMWEzNjVkIiBvZmZzZXQ9IjAlIi8+PHN0b3Agc3RvcC1jb2xvcj0iI2M1MzAzMCIgb2Zmc2V0PSIxMDAlIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjIwIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+';
}

/**
 * Create image loading skeleton
 * @param {number} width - Skeleton width
 * @param {number} height - Skeleton height
 * @returns {string} Skeleton HTML
 */
export function createImageSkeleton(width = 300, height = 200) {
  return `
    <div class="image-skeleton" style="width: ${width}px; height: ${height}px;">
      <div class="skeleton-shimmer"></div>
    </div>
  `;
}

/**
 * Image component for React
 * @param {Object} props - Component props
 * @returns {JSX.Element} Image component
 */
export function AtlanticImage({ 
  src, 
  alt, 
  width, 
  height, 
  lazy = true,
  className = '',
  fallback = null,
  onError = null,
  ...props 
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);
  
  useEffect(() => {
    if (lazy && imgRef.current) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setImgSrc(src);
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '50px' }
      );
      
      observer.observe(imgRef.current);
      
      return () => {
        if (imgRef.current) {
          observer.unobserve(imgRef.current);
        }
      };
    }
  }, [src, lazy]);
  
  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    
    if (fallback) {
      setImgSrc(fallback);
    } else {
      setImgSrc(getPlaceholderImage(width, height));
    }
    
    if (onError) {
      onError();
    }
  };
  
  const handleLoad = () => {
    setIsLoading(false);
  };
  
  return (
    <div className={`image-container ${className}`} style={{ width, height }}>
      {isLoading && (
        <div className="image-skeleton">
          <div className="skeleton-shimmer"></div>
        </div>
      )}
      <img
        ref={imgRef}
        src={lazy ? undefined : imgSrc}
        data-src={lazy ? src : undefined}
        alt={alt}
        width={width}
        height={height}
        onError={handleError}
        onLoad={handleLoad}
        className={`${isLoading ? 'loading' : 'loaded'} ${hasError ? 'error' : ''}`}
        {...props}
      />
    </div>
  );
}

// Export all utilities
export default {
  getPlaceholderImage,
  getOptimizedImageUrl,
  initLazyLoading,
  preloadImages,
  getImageDimensions,
  generateSrcSet,
  getSupportedImageFormat,
  getDominantColor,
  isValidImageUrl,
  getCategoryFallbackImage,
  generateBlurHash,
  createImageSkeleton,
  AtlanticImage
};
