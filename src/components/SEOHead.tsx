import { Helmet } from 'react-helmet-async';
import { usePathname } from 'next/navigation';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  schema?: object | object[];
  robots?: string;
}

export const SEOHead = ({
  title,
  description,
  canonicalUrl,
  ogImage = "https://solarinstallerstx.com/opengraph-image.svg",
  ogType = "website",
  schema,
  robots = "index, follow"
}: SEOHeadProps) => {
  const pathname = usePathname();

  // Validate SEO content lengths in development
  if (process.env.NODE_ENV === 'development') {
    if (title && title.length > 60) {
      console.warn(`[SEO] Title too long (${title.length} chars, max 60): "${title}"`);
    }
    if (description && description.length > 160) {
      console.warn(`[SEO] Description too long (${description.length} chars, max 160): "${description}"`);
    }
    if (!description) {
      console.warn(`[SEO] Missing description at ${pathname}`);
    }
  }

  // CRITICAL FIX: Ensure canonical URL always matches actual page URL
  // Only use provided canonicalUrl if it exactly matches current pathname
  // Otherwise, derive it from the current location pathname
  const finalCanonicalUrl = (() => {
    const currentPageUrl = `https://solarinstallerstx.com${pathname}`;

    // If canonicalUrl is provided and matches the current page, use it
    if (canonicalUrl && canonicalUrl === currentPageUrl) {
      return canonicalUrl;
    }

    // If canonicalUrl is provided but doesn't match, log warning and use current URL
    if (canonicalUrl && canonicalUrl !== currentPageUrl) {
      console.warn(
        `[SEO WARNING] Canonical URL mismatch: provided="${canonicalUrl}" but current="${currentPageUrl}". Using current page URL.`
      );
    }

    // Default: use current page URL (ensures canonical = actual URL)
    return currentPageUrl;
  })();

  return (
    <Helmet>
      {/*
        CRITICAL FIX: Prevent multiple canonical tags
        Only render a single canonical tag with the correct URL
      */}
      <link rel="canonical" href={finalCanonicalUrl} />

      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />

      {/*
        Open Graph - CRITICAL FIX: og:url MUST match canonical URL
        This ensures consistency across social media platforms and search engines
      */}
      <meta property="og:site_name" content="SolarInstallersTX" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@SolarInstallersTX" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />

      {/* Schema.org JSON-LD */}
      {schema && (
        Array.isArray(schema) ? (
          schema.map((s, index) => (
            <script key={index} type="application/ld+json">
              {JSON.stringify(s)}
            </script>
          ))
        ) : (
          <script type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        )
      )}
    </Helmet>
  );
};
