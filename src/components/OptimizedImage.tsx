import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  fetchPriority?: 'high' | 'low' | 'auto';
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  className = "", 
  width, 
  height, 
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 85,
  fetchPriority
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Generate WebP version path with quality optimization
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  // Generate responsive srcset with multiple sizes
  const generateSrcSet = (baseSrc: string) => {
    const baseName = baseSrc.replace(/\.(webp|jpg|jpeg|png)$/i, '');
    const extension = baseSrc.includes('.webp') ? '.webp' : '.jpg';
    
    return [
      `${baseName}-320w${extension} 320w`,
      `${baseName}-640w${extension} 640w`,
      `${baseName}-1024w${extension} 1024w`,
      `${baseName}-1280w${extension} 1280w`,
      `${baseName}-1920w${extension} 1920w`
    ].join(', ');
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <picture className={className}>
      {/* WebP source for modern browsers with quality optimization */}
      <source
        srcSet={generateSrcSet(webpSrc)}
        sizes={sizes}
        type="image/webp"
      />
      
      {/* AVIF source for ultra-modern browsers (best compression) */}
      <source
        srcSet={src.replace(/\.(jpg|jpeg|png)$/i, '.avif')}
        sizes={sizes}
        type="image/avif"
      />
      
      {/* Fallback for older browsers */}
      <source
        srcSet={generateSrcSet(src)}
        sizes={sizes}
        type="image/jpeg"
      />
      
      {/* Fallback img element with comprehensive optimization */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={fetchPriority ?? (priority ? "high" : "auto")}
        decoding={priority ? "sync" : "async"}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        style={{
          backgroundColor: '#f3f4f6', // Light gray placeholder
          aspectRatio: width && height ? `${width}/${height}` : 'auto',
        }}
      />
      
      {/* Loading placeholder with skeleton animation */}
      {!isLoaded && !hasError && (
        <div 
          className={`absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse ${className}`}
          aria-hidden="true"
          style={{
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
          }}
        />
      )}
      
      {/* Error fallback with retry option */}
      {hasError && (
        <div 
          className={`flex items-center justify-center bg-gray-100 text-gray-500 ${className}`}
          aria-label="Image failed to load"
        >
          <div className="text-center">
            <span className="text-sm block">Image unavailable</span>
            <button 
              onClick={() => {
                setHasError(false);
                setIsLoaded(false);
              }}
              className="text-xs text-blue-600 hover:text-blue-800 mt-1"
            >
              Retry
            </button>
          </div>
        </div>
      )}
      
      {/* CSS for shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </picture>
  );
};
