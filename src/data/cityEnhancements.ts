/**
 * Enhanced SEO data for priority city pages
 * Based on GSC performance data and external audit recommendations
 * November 2025
 */

export interface EnhancedCityData {
  seoTitle?: string;
  seoDescription?: string;
  localHighlights?: string[];
  featuredInstallers?: string[];
  utilityCompany?: string;
  specialPrograms?: string[];
}

export const cityEnhancements: Record<string, EnhancedCityData> = {
  // HOUSTON - Position 3.95 (TOP PRIORITY - Already Page 1!)
  'houston': {
    seoTitle: 'Best Solar Installers Houston TX 2025 | 17+ NABCEP Certified | $16,900 Avg',
    seoDescription: 'Compare Houston\'s top-rated solar installers. CenterPoint Energy rebates + 30% tax credit. Free quotes from 17 NABCEP certified companies. Average cost: $16,900.',
    utilityCompany: 'CenterPoint Energy',
    localHighlights: [
      'CenterPoint Energy serves 2.5M Houston customers - solar compatible',
      'Hurricane resilience: Solar + battery backup for Houston\'s storm season',
      'The Woodlands neighborhood: 40% solar adoption rate',
      'Average cost: $16,900 for 5kW system (before incentives)',
      'Houston leads Texas with 100+ solar installers competing for your business'
    ],
    featuredInstallers: [
      'Freedom Solar Power',
      'Lighthouse Solar',
      'Solar Sam Professionals'
    ],
    specialPrograms: [
      'CenterPoint Energy Net Metering',
      'Property Tax Exemption (100% of solar value)',
      'Federal Tax Credit (30% through 2032)'
    ]
  },

  // SAN ANTONIO - 61 Impressions (HIGHEST VOLUME!)
  'san-antonio': {
    seoTitle: 'Solar Installers San Antonio TX | 50+ Verified Companies | CPS Energy Rebates',
    seoDescription: 'San Antonio leads TX in solar adoption. Compare 50+ NABCEP certified installers. CPS Energy rebates + Goal Zero Program. Average cost: $16,200. Free quotes.',
    utilityCompany: 'CPS Energy',
    localHighlights: [
      'CPS Energy Goal Zero: 100% clean energy by 2040 commitment',
      '1.5M residents - #1 in TX for solar growth 2024-2025',
      'Joint Base San Antonio - solar friendly for military families',
      '50+ installers serve Bexar County\'s 1.9M residents',
      'Average cost: $16,200 (lowest in major TX cities)'
    ],
    featuredInstallers: [
      'Freedom Solar Power',
      'CPS Energy Solar Partners',
      'Veteran Solar Solutions'
    ],
    specialPrograms: [
      'CPS Energy Goal Zero Rebates',
      'Military Solar Incentives (JBSA)',
      'Property Tax Exemption',
      'Federal Tax Credit (30%)'
    ]
  },

  // DALLAS - Page 2 (Need Content)
  'dallas': {
    seoTitle: 'Best Solar Companies Dallas TX | Good Faith Energy & 40+ Installers | Free Quotes',
    seoDescription: 'Compare Dallas solar installers including Good Faith Energy, Texas Solar Professional. Oncor rebates + net metering. 41+ NABCEP certified companies. $17,800 avg cost.',
    utilityCompany: 'Oncor',
    localHighlights: [
      'Good Faith Energy - Highest rated DFW installer with 4.9★ reviews',
      'DFW metroplex: 7.6M residents, 200+ solar companies',
      'Oncor territory: Serving Dallas County\'s 2.6M residents with net metering',
      'Preston Hollow, Highland Park lead in luxury solar installations',
      'Average cost: $17,800 for residential solar systems'
    ],
    featuredInstallers: [
      'Good Faith Energy',
      'Freedom Solar Power',
      'Texas Solar Professional',
      'Lighthouse Solar'
    ],
    specialPrograms: [
      'Oncor Net Metering Program',
      'Property Tax Exemption',
      'Federal Tax Credit (30%)',
      'Dallas County Solar Incentives'
    ]
  },

  // AUSTIN - Position 9.64 (Push to Top 5)
  'austin': {
    seoTitle: 'Austin Solar Companies 2025 | 50+ NABCEP Certified | Solar Value Bank Rebates',
    seoDescription: 'Find Austin\'s best solar installers. Austin Energy Solar Value Bank + 30% federal credit. 50+ certified companies. Average cost: $18,500. Capital of renewable energy.',
    utilityCompany: 'Austin Energy',
    localHighlights: [
      'Texas Capitol leads by example with solar installations',
      'Austin Energy Solar Value Bank: Premium payouts for Austin solar adopters',
      'Tech hub angle: Tesla Solar Roof, tech workers drive Austin solar boom',
      'Travis County: 50+ NABCEP installers compete for your business',
      'Average cost: $18,500 (premium market, premium service)'
    ],
    featuredInstallers: [
      'Freedom Solar Power',
      'Longhorn Solar',
      'Tesla Solar (Austin)',
      'Native Solar'
    ],
    specialPrograms: [
      'Austin Energy Solar Value Bank',
      'Net Metering Credits',
      'Property Tax Exemption',
      'Federal Tax Credit (30%)',
      'Tesla Solar Roof Incentives'
    ]
  },

  // ARLINGTON - Position 13.09 (Page 2)
  'arlington': {
    seoTitle: 'Solar Installers Arlington TX | DFW Metro | Oncor Rebates | Free Quotes',
    seoDescription: 'Compare Arlington solar companies. Part of DFW metroplex with 40+ NABCEP installers. Oncor net metering + property tax exemption. Average cost: $17,600.',
    utilityCompany: 'Oncor',
    localHighlights: [
      'DFW metroplex central location - 200+ solar installers serving Arlington',
      'Arlington homeowners benefit from competitive DFW pricing',
      'Oncor net metering: Sell excess solar back to the grid',
      'Sports capital meets solar: AT&T Stadium area solar installations',
      'Average cost: $17,600 for complete residential systems'
    ],
    featuredInstallers: [
      'Freedom Solar Power',
      'Good Faith Energy',
      'DFW Solar Electric'
    ],
    specialPrograms: [
      'Oncor Net Metering',
      'Property Tax Exemption',
      'Federal Tax Credit (30%)',
      'Arlington Solar Rebates'
    ]
  }
};

/**
 * Get enhanced city data by slug
 */
export function getCityEnhancement(citySlug: string): EnhancedCityData | undefined {
  return cityEnhancements[citySlug.toLowerCase()];
}

/**
 * Check if city has enhanced data
 */
export function hasEnhancement(citySlug: string): boolean {
  return citySlug.toLowerCase() in cityEnhancements;
}
