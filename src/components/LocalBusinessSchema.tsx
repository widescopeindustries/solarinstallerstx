/**
 * LocalBusiness Schema Component with Veteran-Owned Status
 * Implements schema.org markup for local business + veteran-owned designation
 * Based on external audit recommendations - November 2025
 */

import { useEffect } from 'react';

interface LocalBusinessSchemaProps {
  cityName: string;
  citySlug: string;
  state?: string;
  avgCost?: string;
}

export const LocalBusinessSchema = ({
  cityName,
  citySlug,
  state = 'Texas',
  avgCost = '$15,000 - $25,000'
}: LocalBusinessSchemaProps) => {
  useEffect(() => {
    // Create schema script element
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.id = `local-business-schema-${citySlug}`;

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `https://solarinstallerstx.com/#organization`,
      "name": "Solar Installers Texas",
      "image": "https://solarinstallerstx.com/opengraph-image.svg",
      "url": "https://solarinstallerstx.com",
      "telephone": "(682) 999-0953",
      "priceRange": avgCost,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": cityName,
        "addressRegion": state,
        "addressCountry": "US"
      },
      "areaServed": [
        {
          "@type": "City",
          "name": cityName,
          "containedIn": {
            "@type": "State",
            "name": state
          }
        }
      ],
      "description": "SBA Certified Service-Disabled Veteran-Owned solar installer directory serving Texas. NABCEP certified companies with Financial Stability Verification.",
      "additionalType": "https://schema.org/VeteranOwnedBusiness",
      "slogan": "Financial Stability Verified Solar Installers",
      "knowsAbout": [
        "NABCEP Certification Tracking",
        "Financial Stability Verification",
        "Solar Safety Score System",
        "Solar Installation",
        "Renewable Energy"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Solar Installation Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Residential Solar Installation",
              "description": `Professional solar panel installation services in ${cityName}, ${state}`,
              "areaServed": cityName
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Commercial Solar Installation",
              "description": `Commercial solar energy solutions for businesses in ${cityName}`,
              "areaServed": cityName
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Solar System Maintenance",
              "description": `Solar panel maintenance and monitoring services in ${cityName}`,
              "areaServed": cityName
            }
          }
        ]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.7",
        "reviewCount": "127",
        "bestRating": "5",
        "worstRating": "1"
      },
      "sameAs": [
        "https://www.facebook.com/solarinstallerstx",
        "https://twitter.com/solarinstallerstx"
      ]
    };

    schemaScript.textContent = JSON.stringify(schemaData);
    document.head.appendChild(schemaScript);

    // Cleanup on unmount
    return () => {
      const existingScript = document.getElementById(`local-business-schema-${citySlug}`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [cityName, citySlug, state, avgCost]);

  // This component doesn't render anything visible
  return null;
};
