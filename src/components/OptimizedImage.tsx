import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  className = "", 
  width, 
  height, 
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  fetchPriority
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // This component now expects the base path in /public/images, without extension
  // e.g., src="/images/hero-solar-optimized"
  const getOptimizedSources = (baseName: string) => {
    
    const avifSrcSet = SIZES.map(size => `${baseName}-${size}w.avif ${size}w`).join(', ');
    const webpSrcSet = SIZES.map(size => `${baseName}-${size}w.webp ${size}w`).join(', ');

    return { avifSrcSet, webpSrcSet };
  };

  const SIZES = [320, 640, 1024, 1280, 1920];
  const { avifSrcSet, webpSrcSet } = getOptimizedSources(src);

  return (
    <picture className={className}>
      <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      <img
        src={`${src}-640w.jpg`} // Fallback to a medium-sized JPEG
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={fetchPriority ?? (priority ? "high" : "auto")}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        style={{
          backgroundColor: '#e5e7eb',
          aspectRatio: width && height ? `${width}/${height}` : undefined,
        }}
      />
    </picture>
  );
};
