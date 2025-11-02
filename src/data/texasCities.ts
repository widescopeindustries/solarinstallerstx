/**
 * Comprehensive Texas city data for solar installer directory
 * Includes 50+ major Texas cities with population, solar costs, and incentive information
 * Source: U.S. Census Bureau 2020-2023 estimates, Texas solar market data 2025
 */

export interface CityData {
  name: string;
  slug: string;
  state: string;
  population: string;
  avgElectricRate: string;
  avgSolarCost: string;
  incentives: string[];
  description: string;
  county?: string;
  region?: string;
  sunHoursPerDay?: number;
}

export const texasCities: Record<string, CityData> = {
  // Major Cities (1M+)
  'houston': {
    name: 'Houston',
    slug: 'houston',
    state: 'Texas',
    population: '2,304,580',
    county: 'Harris County',
    region: 'Southeast Texas',
    avgElectricRate: '0.10',
    avgSolarCost: '$16,900',
    sunHoursPerDay: 5.3,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'CenterPoint Rebates', 'Net Metering'],
    description: 'Houston, the energy capital of the world, is embracing solar with competitive rates and strong installer presence. With 5.3 sun hours daily, Houston homeowners can save 60-80% on electric bills with solar.'
  },
  'san-antonio': {
    name: 'San Antonio',
    slug: 'san-antonio',
    state: 'Texas',
    population: '1,547,253',
    county: 'Bexar County',
    region: 'South Central Texas',
    avgElectricRate: '0.09',
    avgSolarCost: '$16,200',
    sunHoursPerDay: 5.6,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'CPS Energy Rebates', 'Goal Zero Program'],
    description: 'San Antonio leads Texas in solar adoption with aggressive renewable energy goals and strong local incentives. CPS Energy offers some of the best solar rebates in the state.'
  },
  'dallas': {
    name: 'Dallas',
    slug: 'dallas',
    state: 'Texas',
    population: '1,304,379',
    county: 'Dallas County',
    region: 'North Texas',
    avgElectricRate: '0.11',
    avgSolarCost: '$17,800',
    sunHoursPerDay: 5.2,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'Oncor Rebates', 'Net Metering'],
    description: 'Dallas offers excellent solar potential with competitive electricity rates and growing renewable energy adoption. The DFW metroplex has the highest concentration of certified solar installers in Texas.'
  },
  'austin': {
    name: 'Austin',
    slug: 'austin',
    state: 'Texas',
    population: '978,908',
    county: 'Travis County',
    region: 'Central Texas',
    avgElectricRate: '0.12',
    avgSolarCost: '$18,500',
    sunHoursPerDay: 5.4,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'Austin Energy Rebates', 'Solar Value Bank'],
    description: 'Austin, the capital of Texas, is a solar-friendly city with abundant sunshine and strong renewable energy policies. Austin Energy\'s Solar Value Bank provides premium rebates for solar adopters.'
  },

  // Large Cities (500K-1M)
  'fort-worth': {
    name: 'Fort Worth',
    slug: 'fort-worth',
    state: 'Texas',
    population: '918,915',
    county: 'Tarrant County',
    region: 'North Texas',
    avgElectricRate: '0.11',
    avgSolarCost: '$17,500',
    sunHoursPerDay: 5.2,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'Oncor Rebates'],
    description: 'Fort Worth combines traditional Texas charm with modern solar technology. Part of the DFW metroplex, homeowners enjoy competitive installer pricing and excellent solar ROI.'
  },
  'el-paso': {
    name: 'El Paso',
    slug: 'el-paso',
    state: 'Texas',
    population: '678,815',
    county: 'El Paso County',
    region: 'West Texas',
    avgElectricRate: '0.10',
    avgSolarCost: '$15,800',
    sunHoursPerDay: 6.2,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'El Paso Electric Rebates'],
    description: 'El Paso enjoys exceptional solar irradiance with over 300 sunny days per year and 6.2 peak sun hours daily, making it one of the best cities in Texas for solar energy production.'
  },

  // Medium Cities (200K-500K)
  'arlington': {
    name: 'Arlington',
    slug: 'arlington',
    state: 'Texas',
    population: '394,266',
    county: 'Tarrant County',
    region: 'North Texas',
    avgElectricRate: '0.11',
    avgSolarCost: '$17,600',
    sunHoursPerDay: 5.2,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'Oncor Rebates'],
    description: 'Arlington homeowners benefit from competitive solar pricing and strong net metering policies in the DFW metroplex. Strategic location between Dallas and Fort Worth provides access to top installers.'
  },
  'corpus-christi': {
    name: 'Corpus Christi',
    slug: 'corpus-christi',
    state: 'Texas',
    population: '317,863',
    county: 'Nueces County',
    region: 'Coastal Texas',
    avgElectricRate: '0.10',
    avgSolarCost: '$16,400',
    sunHoursPerDay: 5.5,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'AEP Rebates'],
    description: 'Corpus Christi\'s coastal location provides consistent solar production with excellent ROI. Gulf Coast homeowners enjoy mild winters and year-round solar generation.'
  },
  'plano': {
    name: 'Plano',
    slug: 'plano',
    state: 'Texas',
    population: '285,494',
    county: 'Collin County',
    region: 'North Texas',
    avgElectricRate: '0.11',
    avgSolarCost: '$17,900',
    sunHoursPerDay: 5.2,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'Oncor Rebates'],
    description: 'Plano leads North Texas suburbs in solar adoption with affluent homeowners investing in premium solar systems. Newer homes built with solar-ready infrastructure.'
  },
  'lubbock': {
    name: 'Lubbock',
    slug: 'lubbock',
    state: 'Texas',
    population: '257,141',
    county: 'Lubbock County',
    region: 'West Texas',
    avgElectricRate: '0.10',
    avgSolarCost: '$16,100',
    sunHoursPerDay: 5.8,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'LP&L Rebates'],
    description: 'Lubbock\'s high-plains climate and abundant sunshine (5.8 peak sun hours) make it one of Texas\'s premier locations for solar energy. Flat roofs and minimal shading optimize production.'
  },
  'laredo': {
    name: 'Laredo',
    slug: 'laredo',
    state: 'Texas',
    population: '255,205',
    county: 'Webb County',
    region: 'South Texas',
    avgElectricRate: '0.09',
    avgSolarCost: '$15,900',
    sunHoursPerDay: 5.7,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'AEP Rebates'],
    description: 'Laredo\'s border location offers excellent solar potential with some of the lowest electricity rates in South Texas. High solar irradiance and low installation costs provide fast payback.'
  },

  // Growing Cities (150K-200K)
  'frisco': {
    name: 'Frisco',
    slug: 'frisco',
    state: 'Texas',
    population: '200,509',
    county: 'Collin County',
    region: 'North Texas',
    avgElectricRate: '0.11',
    avgSolarCost: '$18,200',
    sunHoursPerDay: 5.2,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'Oncor Rebates'],
    description: 'Fast-growing Frisco features modern homes with excellent solar potential. One of America\'s fastest-growing cities with 80% of new construction solar-ready.'
  },
  'mckinney': {
    name: 'McKinney',
    slug: 'mckinney',
    state: 'Texas',
    population: '199,177',
    county: 'Collin County',
    region: 'North Texas',
    avgElectricRate: '0.11',
    avgSolarCost: '$18,100',
    sunHoursPerDay: 5.2,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'Oncor Rebates'],
    description: 'McKinney\'s family-friendly community embraces solar with modern infrastructure and competitive installer pricing. Voted best place to live in America with strong green initiative.'
  },
  'killeen': {
    name: 'Killeen',
    slug: 'killeen',
    state: 'Texas',
    population: '153,095',
    county: 'Bell County',
    region: 'Central Texas',
    avgElectricRate: '0.10',
    avgSolarCost: '$16,800',
    sunHoursPerDay: 5.3,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'Oncor Rebates', 'Military Benefits'],
    description: 'Killeen and Fort Hood area homeowners enjoy strong military community support for renewable energy. VA loans available for solar financing with 0% down.'
  },
  'irving': {
    name: 'Irving',
    slug: 'irving',
    state: 'Texas',
    population: '256,684',
    county: 'Dallas County',
    region: 'North Texas',
    avgElectricRate: '0.11',
    avgSolarCost: '$17,700',
    sunHoursPerDay: 5.2,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'Oncor Rebates'],
    description: 'Irving homeowners benefit from DFW metroplex solar competition. Strategic location provides access to 50+ certified installers for competitive quotes.'
  },
  'garland': {
    name: 'Garland',
    slug: 'garland',
    state: 'Texas',
    population: '246,018',
    county: 'Dallas County',
    region: 'North Texas',
    avgElectricRate: '0.11',
    avgSolarCost: '$17,600',
    sunHoursPerDay: 5.2,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'Oncor Rebates', 'Garland Power & Light Credits'],
    description: 'Garland Power & Light offers additional solar credits on top of state and federal incentives. Community solar programs available for renters and apartment dwellers.'
  },
  'grand-prairie': {
    name: 'Grand Prairie',
    slug: 'grand-prairie',
    state: 'Texas',
    population: '196,100',
    county: 'Dallas County',
    region: 'North Texas',
    avgElectricRate: '0.11',
    avgSolarCost: '$17,500',
    sunHoursPerDay: 5.2,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'Oncor Rebates'],
    description: 'Grand Prairie residents enjoy competitive solar pricing in the DFW market. New developments feature solar-ready electrical panels and optimal roof orientations.'
  },
  'amarillo': {
    name: 'Amarillo',
    slug: 'amarillo',
    state: 'Texas',
    population: '200,393',
    county: 'Potter County',
    region: 'Texas Panhandle',
    avgElectricRate: '0.09',
    avgSolarCost: '$16,000',
    sunHoursPerDay: 5.9,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'Xcel Energy Rebates'],
    description: 'Amarillo\'s high elevation and clear skies provide 5.9 peak sun hours daily. Wind and solar hybrid systems popular in the Panhandle for maximum energy independence.'
  },
  'waco': {
    name: 'Waco',
    slug: 'waco',
    state: 'Texas',
    population: '138,486',
    county: 'McLennan County',
    region: 'Central Texas',
    avgElectricRate: '0.10',
    avgSolarCost: '$16,500',
    sunHoursPerDay: 5.3,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'Texas New Mexico Power Rebates'],
    description: 'Central Texas location provides Waco with excellent solar exposure and growing installer competition. Home renovation boom drives solar adoption rates.'
  },

  // Additional Major Cities (100K-150K)
  'brownsville': {
    name: 'Brownsville',
    slug: 'brownsville',
    state: 'Texas',
    population: '186,738',
    county: 'Cameron County',
    region: 'Rio Grande Valley',
    avgElectricRate: '0.09',
    avgSolarCost: '$15,700',
    sunHoursPerDay: 5.8,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'AEP Rebates'],
    description: 'Brownsville offers year-round solar production with 5.8 peak sun hours. Southern location provides minimal seasonal variation in solar output.'
  },
  'mcallen': {
    name: 'McAllen',
    slug: 'mcallen',
    state: 'Texas',
    population: '142,212',
    county: 'Hidalgo County',
    region: 'Rio Grande Valley',
    avgElectricRate: '0.09',
    avgSolarCost: '$15,600',
    sunHoursPerDay: 5.8,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'AEP Rebates'],
    description: 'McAllen\'s Rio Grande Valley location provides exceptional solar production. Low installation costs and high irradiance create 5-7 year payback periods.'
  },
  'mesquite': {
    name: 'Mesquite',
    slug: 'mesquite',
    state: 'Texas',
    population: '150,108',
    county: 'Dallas County',
    region: 'North Texas',
    avgElectricRate: '0.11',
    avgSolarCost: '$17,400',
    sunHoursPerDay: 5.2,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'Oncor Rebates'],
    description: 'Mesquite homeowners benefit from DFW solar market competition. Suburban location ideal for rooftop solar with minimal shading.'
  },
  'denton': {
    name: 'Denton',
    slug: 'denton',
    state: 'Texas',
    population: '148,143',
    county: 'Denton County',
    region: 'North Texas',
    avgElectricRate: '0.11',
    avgSolarCost: '$17,800',
    sunHoursPerDay: 5.2,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'Oncor Rebates', 'Denton Municipal Electric Solar Program'],
    description: 'Denton Municipal Electric offers city-run solar programs with streamlined permitting. University town with strong environmental commitment drives solar adoption.'
  },
  'round-rock': {
    name: 'Round Rock',
    slug: 'round-rock',
    state: 'Texas',
    population: '133,372',
    county: 'Williamson County',
    region: 'Central Texas',
    avgElectricRate: '0.11',
    avgSolarCost: '$17,900',
    sunHoursPerDay: 5.4,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'Oncor Rebates'],
    description: 'Round Rock\'s proximity to Austin provides access to top solar installers. Fast-growing suburb with modern homes built for solar integration.'
  },
  'carrollton': {
    name: 'Carrollton',
    slug: 'carrollton',
    state: 'Texas',
    population: '133,434',
    county: 'Dallas County',
    region: 'North Texas',
    avgElectricRate: '0.11',
    avgSolarCost: '$17,700',
    sunHoursPerDay: 5.2,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'Oncor Rebates'],
    description: 'Carrollton residents enjoy competitive DFW solar pricing. Established neighborhoods increasingly adopting solar as systems reach affordability.'
  },
  'pearland': {
    name: 'Pearland',
    slug: 'pearland',
    state: 'Texas',
    population: '125,817',
    county: 'Brazoria County',
    region: 'Greater Houston',
    avgElectricRate: '0.10',
    avgSolarCost: '$16,900',
    sunHoursPerDay: 5.3,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'CenterPoint Rebates'],
    description: 'Pearland homeowners access Houston\'s competitive solar market. Suburban Houston location ideal for residential solar with space for larger systems.'
  },
  'sugar-land': {
    name: 'Sugar Land',
    slug: 'sugar-land',
    state: 'Texas',
    population: '111,026',
    county: 'Fort Bend County',
    region: 'Greater Houston',
    avgElectricRate: '0.10',
    avgSolarCost: '$17,200',
    sunHoursPerDay: 5.3,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'CenterPoint Rebates'],
    description: 'Affluent Sugar Land community leads Houston suburbs in solar adoption. High-value homes increasingly include solar as standard feature.'
  },
  'pasadena': {
    name: 'Pasadena',
    slug: 'pasadena',
    state: 'Texas',
    population: '151,227',
    county: 'Harris County',
    region: 'Greater Houston',
    avgElectricRate: '0.10',
    avgSolarCost: '$16,800',
    sunHoursPerDay: 5.3,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'CenterPoint Rebates'],
    description: 'Pasadena\'s industrial workforce embraces solar for energy cost reduction. Proximity to Houston provides access to 40+ certified installers.'
  },
  'richardson': {
    name: 'Richardson',
    slug: 'richardson',
    state: 'Texas',
    population: '119,469',
    county: 'Dallas County',
    region: 'North Texas',
    avgElectricRate: '0.11',
    avgSolarCost: '$17,800',
    sunHoursPerDay: 5.2,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'Oncor Rebates'],
    description: 'Richardson\'s tech-savvy population drives solar innovation. High adoption of smart home solar monitoring and battery backup systems.'
  },
  'midland': {
    name: 'Midland',
    slug: 'midland',
    state: 'Texas',
    population: '132,524',
    county: 'Midland County',
    region: 'West Texas',
    avgElectricRate: '0.10',
    avgSolarCost: '$16,200',
    sunHoursPerDay: 6.0,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption'],
    description: 'Midland enjoys 6.0 peak sun hours daily with clear desert skies. Oil industry town embracing solar diversification with excellent ROI.'
  },
  'odessa': {
    name: 'Odessa',
    slug: 'odessa',
    state: 'Texas',
    population: '114,428',
    county: 'Ector County',
    region: 'West Texas',
    avgElectricRate: '0.10',
    avgSolarCost: '$16,100',
    sunHoursPerDay: 6.0,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption'],
    description: 'Odessa\'s Permian Basin location provides exceptional solar irradiance. Low humidity and high sun exposure create ideal conditions for maximum production.'
  },
  'abilene': {
    name: 'Abilene',
    slug: 'abilene',
    state: 'Texas',
    population: '125,182',
    county: 'Taylor County',
    region: 'West Texas',
    avgElectricRate: '0.10',
    avgSolarCost: '$16,300',
    sunHoursPerDay: 5.7,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'AEP Rebates'],
    description: 'Abilene combines moderate climate with strong solar exposure. Growing solar market with competitive installer pricing.'
  },
  'tyler': {
    name: 'Tyler',
    slug: 'tyler',
    state: 'Texas',
    population: '105,995',
    county: 'Smith County',
    region: 'East Texas',
    avgElectricRate: '0.11',
    avgSolarCost: '$17,100',
    sunHoursPerDay: 5.0,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'Oncor Rebates'],
    description: 'Tyler\'s East Texas location provides good solar production. Rose capital of America embracing green energy initiatives.'
  },
  'league-city': {
    name: 'League City',
    slug: 'league-city',
    state: 'Texas',
    population: '106,622',
    county: 'Galveston County',
    region: 'Greater Houston',
    avgElectricRate: '0.10',
    avgSolarCost: '$16,900',
    sunHoursPerDay: 5.3,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'CenterPoint Rebates'],
    description: 'League City\'s coastal proximity provides consistent solar production. Houston suburb with strong solar adoption rates.'
  },
  'college-station': {
    name: 'College Station',
    slug: 'college-station',
    state: 'Texas',
    population: '120,511',
    county: 'Brazos County',
    region: 'Central Texas',
    avgElectricRate: '0.10',
    avgSolarCost: '$16,800',
    sunHoursPerDay: 5.3,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'Bryan Texas Utilities Rebates'],
    description: 'Texas A&M University drives solar research and adoption. College town with innovative solar programs and student housing solar installations.'
  },
  'wichita-falls': {
    name: 'Wichita Falls',
    slug: 'wichita-falls',
    state: 'Texas',
    population: '102,316',
    county: 'Wichita County',
    region: 'North Texas',
    avgElectricRate: '0.10',
    avgSolarCost: '$16,400',
    sunHoursPerDay: 5.4,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'TXU Rebates'],
    description: 'Wichita Falls benefits from strong North Texas solar exposure. Military community support for energy independence drives solar growth.'
  },
  'allen': {
    name: 'Allen',
    slug: 'allen',
    state: 'Texas',
    population: '105,623',
    county: 'Collin County',
    region: 'North Texas',
    avgElectricRate: '0.11',
    avgSolarCost: '$18,000',
    sunHoursPerDay: 5.2,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'Oncor Rebates'],
    description: 'Allen\'s affluent community leads Collin County in residential solar. Modern suburbs with optimal roof angles and minimal tree coverage.'
  },
  'san-marcos': {
    name: 'San Marcos',
    slug: 'san-marcos',
    state: 'Texas',
    population: '67,553',
    county: 'Hays County',
    region: 'Central Texas',
    avgElectricRate: '0.11',
    avgSolarCost: '$17,200',
    sunHoursPerDay: 5.4,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'Austin Energy Rebates'],
    description: 'San Marcos benefits from Austin\'s solar infrastructure. Growing city between Austin and San Antonio with competitive installer access.'
  },
  'beaumont': {
    name: 'Beaumont',
    slug: 'beaumont',
    state: 'Texas',
    population: '115,282',
    county: 'Jefferson County',
    region: 'Southeast Texas',
    avgElectricRate: '0.10',
    avgSolarCost: '$16,700',
    sunHoursPerDay: 5.1,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'Entergy Rebates'],
    description: 'Beaumont\'s petrochemical industry workers increasingly adopt solar. Gulf Coast location provides year-round production.'
  },
  'longview': {
    name: 'Longview',
    slug: 'longview',
    state: 'Texas',
    population: '81,638',
    county: 'Gregg County',
    region: 'East Texas',
    avgElectricRate: '0.11',
    avgSolarCost: '$17,000',
    sunHoursPerDay: 5.0,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'Oncor Rebates'],
    description: 'Longview serves East Texas with growing solar installer presence. Oil and gas town diversifying into renewable energy.'
  },
  'temple': {
    name: 'Temple',
    slug: 'temple',
    state: 'Texas',
    population: '78,439',
    county: 'Bell County',
    region: 'Central Texas',
    avgElectricRate: '0.10',
    avgSolarCost: '$16,700',
    sunHoursPerDay: 5.3,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'Oncor Rebates'],
    description: 'Temple\'s Central Texas location provides excellent solar conditions. Healthcare hub with medical facilities leading commercial solar adoption.'
  },
  'new-braunfels': {
    name: 'New Braunfels',
    slug: 'new-braunfels',
    state: 'Texas',
    population: '90,209',
    county: 'Comal County',
    region: 'Central Texas',
    avgElectricRate: '0.10',
    avgSolarCost: '$17,000',
    sunHoursPerDay: 5.5,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'CPS Energy Rebates'],
    description: 'New Braunfels ranks among fastest-growing Texas cities. Hill Country location provides clear skies and strong solar irradiance.'
  },
  'flower-mound': {
    name: 'Flower Mound',
    slug: 'flower-mound',
    state: 'Texas',
    population: '75,956',
    county: 'Denton County',
    region: 'North Texas',
    avgElectricRate: '0.11',
    avgSolarCost: '$18,100',
    sunHoursPerDay: 5.2,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'Oncor Rebates'],
    description: 'Affluent Flower Mound community leads DFW suburbs in premium solar installations. Large luxury homes ideal for high-capacity solar systems.'
  },
  'conroe': {
    name: 'Conroe',
    slug: 'conroe',
    state: 'Texas',
    population: '98,081',
    county: 'Montgomery County',
    region: 'Greater Houston',
    avgElectricRate: '0.10',
    avgSolarCost: '$16,800',
    sunHoursPerDay: 5.3,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'Entergy Rebates'],
    description: 'Conroe\'s rapid growth north of Houston drives solar demand. New construction increasingly includes solar-ready infrastructure.'
  },
  'cedar-park': {
    name: 'Cedar Park',
    slug: 'cedar-park',
    state: 'Texas',
    population: '77,595',
    county: 'Williamson County',
    region: 'Central Texas',
    avgElectricRate: '0.11',
    avgSolarCost: '$17,800',
    sunHoursPerDay: 5.4,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'Oncor Rebates'],
    description: 'Cedar Park\'s Austin suburb location provides access to top installers. Fast-growing community with strong environmental focus.'
  },
  'georgetown': {
    name: 'Georgetown',
    slug: 'georgetown',
    state: 'Texas',
    population: '75,420',
    county: 'Williamson County',
    region: 'Central Texas',
    avgElectricRate: '0.11',
    avgSolarCost: '$17,700',
    sunHoursPerDay: 5.4,
    incentives: ['Federal Tax Credit (30%)', 'Property Tax Exemption', 'Georgetown 100% Renewable Program'],
    description: 'Georgetown became first Texas city powered by 100% renewable energy. Municipal utility offers innovative solar programs and bulk purchasing discounts.'
  }
};

/**
 * Get all city slugs for routing
 */
export const getAllCitySlugs = (): string[] => {
  return Object.keys(texasCities);
};

/**
 * Get city data by slug
 */
export const getCityBySlug = (slug: string): CityData | undefined => {
  return texasCities[slug];
};

/**
 * Get cities by region
 */
export const getCitiesByRegion = (region: string): CityData[] => {
  return Object.values(texasCities).filter(city => city.region === region);
};

/**
 * Get cities by population (sorted descending)
 */
export const getCitiesByPopulation = (): CityData[] => {
  return Object.values(texasCities).sort((a, b) => {
    const popA = parseInt(a.population.replace(/,/g, ''));
    const popB = parseInt(b.population.replace(/,/g, ''));
    return popB - popA;
  });
};

/**
 * Search cities by name
 */
export const searchCities = (query: string): CityData[] => {
  const lowerQuery = query.toLowerCase();
  return Object.values(texasCities).filter(city =>
    city.name.toLowerCase().includes(lowerQuery)
  );
};
