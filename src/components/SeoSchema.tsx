

interface InstallerSchemaProps {
  installer: {
    name: string;
    address?: string;
    phone?: string;
    url?: string;
    rating?: number;
    city: string;
    route?: string;
  };
}

export function InstallerSchema({ installer }: InstallerSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": installer.name,
    "url": `https://solarinstallerstx.com${installer.route || ''}`,
    "telephone": installer.phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": installer.city,
      "addressRegion": "TX",
      "addressCountry": "US"
    },
    ...(installer.rating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": installer.rating,
        "bestRating": 5,
        "reviewCount": 1 // We'll update this when we have real review counts
      }
    })
  };

  // Remove undefined values for cleaner JSON-LD
  const cleanSchema = JSON.parse(JSON.stringify(schema));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanSchema) }}
    />
  );
}