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
  };
}

export function InstallerSchema({ installer }: InstallerSchemaProps) {
  const displayName = installer.company_name || installer.name;
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://solarinstallerstx.com/installer/${displayName.toLowerCase().replace(/\s+/g, '-')}`,
    "name": displayName,
    "description": installer.description || `${displayName} is a professional solar installation company serving ${installer.location_city}, Texas.`,
    "url": `https://solarinstallerstx.com/installer/${displayName.toLowerCase().replace(/\s+/g, '-')}`,
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
    ...(installer.rating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": installer.rating,
        "bestRating": 5,
        "reviewCount": 1 // We'll update this when we have real review counts
      }
    }),
    "areaServed": {
      "@type": "City",
      "name": installer.location_city,
      "sameAs": `https://en.wikipedia.org/wiki/${installer.location_city},_Texas`
    },
    "image": [
      "https://solarinstallerstx.com/images/solar-installer-1.jpg",
      "https://solarinstallerstx.com/images/solar-panels-2.jpg"
    ],
    "priceRange": "$$$",
    ...(installer.certification_type && {
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "professional certification",
        "name": installer.certification_type,
        "recognizedBy": {
          "@type": "Organization",
          "name": "North American Board of Certified Energy Practitioners",
          "sameAs": "https://www.nabcep.org/"
        }
      }
    })
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