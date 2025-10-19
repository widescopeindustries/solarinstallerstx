import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  className = "", 
  width, 
  height, 
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Generate WebP version path
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  // Generate responsive srcset
  const generateSrcSet = (baseSrc: string) => {
    const baseName = baseSrc.replace(/\.(webp|jpg|jpeg|png)$/i, '');
    const extension = baseSrc.includes('.webp') ? '.webp' : '.jpg';
    
    return [
      `${baseName}-320w${extension} 320w`,
      `${baseName}-640w${extension} 640w`,
      `${baseName}-1024w${extension} 1024w`,
      `${baseName}-1280w${extension} 1280w`
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
      {/* WebP source for modern browsers */}
      <source
        srcSet={generateSrcSet(webpSrc)}
        sizes={sizes}
        type="image/webp"
      />
      
      {/* Fallback for older browsers */}
      <source
        srcSet={generateSrcSet(src)}
        sizes={sizes}
        type="image/jpeg"
      />
      
      {/* Fallback img element */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        style={{
          backgroundColor: '#f3f4f6', // Light gray placeholder
        }}
      />
      
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div 
          className={`absolute inset-0 bg-gray-200 animate-pulse ${className}`}
          aria-hidden="true"
        />
      )}
      
      {/* Error fallback */}
      {hasError && (
        <div 
          className={`flex items-center justify-center bg-gray-100 text-gray-500 ${className}`}
          aria-label="Image failed to load"
        >
          <span className="text-sm">Image unavailable</span>
        </div>
      )}
    </picture>
  );
};
