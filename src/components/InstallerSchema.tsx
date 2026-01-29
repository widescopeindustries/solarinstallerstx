export interface InstallerSchemaProps {
  installer: {
    name: string;
    company_name?: string;
    phone?: string;
    latitude?: number;
    longitude?: number;
    location_city: string;
    location_state: string;
    location_zip?: string;
    rating?: number;
    website?: string;
    description?: string;
    certification_type?: string;
    average_rating?: number;
    total_reviews?: number;
  };
}

export function InstallerSchema({ installer }: InstallerSchemaProps) {
  const displayName = installer.company_name || installer.name;
  const nameSlug = (displayName || '').toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-');
  const citySlug = (installer.location_city || '').toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-');
  const canonicalUrl = `https://solarinstallerstx.com/installers/${citySlug}/${nameSlug}`;
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": canonicalUrl,
    "name": displayName,
    "description": installer.description || `${displayName} is a solar installation company serving ${installer.location_city}, Texas.`,
    "url": canonicalUrl,
    "telephone": installer.phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": installer.location_city,
      "addressRegion": "TX",
      "postalCode": installer.location_zip,
      "addressCountry": "US"
    },
    ...(installer.latitude && installer.longitude && {
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": installer.latitude,
        "longitude": installer.longitude
      }
    }),
    // Only include aggregateRating if we have actual reviews (avoids Google penalty for fake reviews)
    ...(((installer.total_reviews ?? 0) > 0 && installer.average_rating != null) ? {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": installer.average_rating,
        "bestRating": 5,
        "worstRating": 1,
        "reviewCount": installer.total_reviews
      }
    } : {}),
    "areaServed": { "@type": "Place", "name": `${installer.location_city}, TX` },
    "image": [
      "https://solarinstallerstx.com/images/solar-installer-1.jpg",
      "https://solarinstallerstx.com/images/solar-panels-2.jpg"
    ],
    "priceRange": "$$$",
    ...(installer.certification_type && installer.certification_type.toLowerCase().includes('pv')
      ? { "award": "NABCEP Certified Installer" }
      : {}),
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "name": "TDLR Electrical License",
      "credentialCategory": "License"
    },
    "provider": { "@type": "Organization", "name": "Solar Installers TX", "url": "https://solarinstallerstx.com" }
  };

  // Remove undefined values for cleaner JSON-LD
  const cleanSchema = JSON.parse(JSON.stringify(schema));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanSchema, null, 2) }}
    />
  );
}