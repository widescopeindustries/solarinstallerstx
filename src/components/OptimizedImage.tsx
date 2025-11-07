import { useState, useEffect, useRef } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  quality?: number;
  preload?: boolean;
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  className = "", 
  width, 
  height,
  priority = false,
  loading = "lazy",
  decoding = "async",
  quality = 75,
  preload = false,
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

  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (preload || priority) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = `${src}-640w.${priority ? 'avif' : 'webp'}`;
      link.type = priority ? 'image/avif' : 'image/webp';
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [src, preload, priority]);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scale-100');
            entry.target.classList.remove('scale-95');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(imgRef.current);
    return () => {
      if (imgRef.current) observer.unobserve(imgRef.current);
    };
  }, []);

  return (
    <picture className={`${className} overflow-hidden`}>
      <source 
        type="image/avif" 
        srcSet={avifSrcSet} 
        sizes={sizes} 
      />
      <source 
        type="image/webp" 
        srcSet={webpSrcSet} 
        sizes={sizes} 
      />
      <img
        ref={imgRef}
        src={`${src}-640w.jpg`}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority ?? (priority ? "high" : "auto")}
        decoding={decoding}
        onLoad={() => setIsLoaded(true)}
        className={`
          ${className}
          ${priority ? '' : (isLoaded ? 'opacity-100' : 'opacity-0')}
          ${priority ? '' : 'transform scale-95 transition-all duration-700 ease'}
          motion-reduce:transform-none motion-reduce:transition-none
        `}
        style={{
          backgroundColor: priority ? 'transparent' : '#e5e7eb',
          aspectRatio: width && height ? `${width}/${height}` : undefined,
        }}
      />
    </picture>
  );
};
