'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface NextOptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
  loading?: 'lazy' | 'eager'
  quality?: number
  sizes?: string
  fill?: boolean
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
}

/**
 * NextOptimizedImage - A wrapper around Next.js Image component
 *
 * This component provides automatic image optimization with Next.js built-in features:
 * - Automatic WebP/AVIF format conversion
 * - Responsive srcset generation
 * - Lazy loading with IntersectionObserver
 * - Blur placeholder support
 * - Layout shift prevention with width/height
 *
 * @example
 * // Critical above-fold image
 * <NextOptimizedImage
 *   src="/hero.jpg"
 *   alt="Hero image"
 *   width={1920}
 *   height={1080}
 *   priority
 *   placeholder="blur"
 *   blurDataURL="data:image/..."
 * />
 *
 * @example
 * // Lazy-loaded image
 * <NextOptimizedImage
 *   src="/logo.png"
 *   alt="Company logo"
 *   width={200}
 *   height={100}
 *   loading="lazy"
 *   sizes="(max-width: 768px) 100vw, 200px"
 * />
 */
export function NextOptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  loading = 'lazy',
  quality = 85,
  sizes,
  fill = false,
  objectFit = 'cover',
  placeholder,
  blurDataURL,
}: NextOptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Determine if we should use priority loading
  const shouldPriority = priority || loading === 'eager'

  return (
    <div className={cn('overflow-hidden relative', className)}>
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={shouldPriority}
        loading={shouldPriority ? undefined : 'lazy'}
        quality={quality}
        sizes={sizes || (fill ? '100vw' : `${width}px`)}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setHasError(true)
        }}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          hasError && 'bg-muted',
          fill && objectFit === 'cover' && 'object-cover',
          fill && objectFit === 'contain' && 'object-contain',
          fill && objectFit === 'fill' && 'object-fill',
          fill && objectFit === 'none' && 'object-none',
          fill && objectFit === 'scale-down' && 'object-scale-down'
        )}
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />

      {/* Loading skeleton */}
      {isLoading && !hasError && (
        <div
          className="absolute inset-0 bg-muted animate-pulse"
          style={{
            aspectRatio: `${width} / ${height}`,
          }}
        />
      )}

      {/* Error fallback */}
      {hasError && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-sm"
          style={{
            aspectRatio: `${width} / ${height}`,
          }}
        >
          <span>Image failed to load</span>
        </div>
      )}
    </div>
  )
}

// Export default for easier imports
export default NextOptimizedImage
