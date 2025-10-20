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

  const getOptimizedSources = (path: string) => {
    const baseName = path.substring(0, path.lastIndexOf('.'));
    
    const avifSrcSet = [
      `${baseName}-320w.avif 320w`,
      `${baseName}-640w.avif 640w`,
      `${baseName}-1024w.avif 1024w`,
      `${baseName}-1280w.avif 1280w`,
      `${baseName}-1920w.avif 1920w`,
    ].join(', ');
    
    const webpSrcSet = [
      `${baseName}-320w.webp 320w`,
      `${baseName}-640w.webp 640w`,
      `${baseName}-1024w.webp 1024w`,
      `${baseName}-1280w.webp 1280w`,
      `${baseName}-1920w.webp 1920w`,
    ].join(', ');

    return { avifSrcSet, webpSrcSet };
  };

  const { avifSrcSet, webpSrcSet } = getOptimizedSources(src);

  return (
    <picture className={className}>
      <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      <img
        src={src.replace(/\.(webp|avif)$/i, '.jpg')}
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
