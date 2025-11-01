import { useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
  fetchpriority?: 'high' | 'low' | 'auto';
}

/**
 * An optimized image component that handles lazy loading, AVIF/WebP formats,
 * and displays an advanced shimmer effect while loading.
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  sizes,
  className,
  fetchpriority = 'auto',
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);

  // Generate paths for next-gen image formats
  const avifSrc = src.replace(/\.(png|jpe?g|svg)$/, '.avif');
  const webpSrc = src.replace(/\.(png|jpe?g|svg)$/, '.webp');

  // Generate a srcset for different resolutions.
  // Assumes an image processing pipeline creates these variants (e.g., my-image-1200w.webp)
  const generateSrcSet = (baseSrc: string) => {
    const resolutions = [320, 480, 640, 750, 828, 1080, 1200, 1920, 2048];
    return resolutions
      .map(w => `${baseSrc.replace(/(\.[\w\d_-]+)$/i, `-${w}w$1`)} ${w}w`)
      .join(', ');
  };

  const avifSrcSet = generateSrcSet(avifSrc);
  const webpSrcSet = generateSrcSet(webpSrc);
  const originalSrcSet = generateSrcSet(src);

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-muted/30',
        className
      )}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {isLoading && (
        <div className="absolute inset-0 w-full h-full shimmer-bg" />
      )}
      <picture>
        {/* Serve AVIF if supported */}
        <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
        {/* Fallback to WebP */}
        <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
        {/* Fallback to original format (e.g., JPEG/PNG) */}
        <source type="image/jpeg" srcSet={originalSrcSet} sizes={sizes} />
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          fetchpriority={fetchpriority}
          className={cn(
            'absolute inset-0 w-full h-full object-cover transition-opacity duration-500',
            isLoading ? 'opacity-0' : 'opacity-100'
          )}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)} // Handle potential loading errors
          {...props}
        />
      </picture>
    </div>
  );
};

// Add the shimmer animation CSS to your global stylesheet (e.g., src/index.css)
/*
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.shimmer-bg {
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shimmer 1.5s infinite;
}
*/