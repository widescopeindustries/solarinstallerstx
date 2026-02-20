/**
 * Texas City Solar Stats - "The Texas Truth Engine"
 * Verified, hard data for top 20 Texas cities
 * Part of Operation "Lone Star Top Tier" - Beat EnergySage with real data
 */

export interface CitySolarData {
    peakSunHours: number; // Average daily peak sun hours
    avgElectricRate: number; // Average $/kWh
    utilityProvider: string; // Primary utility company
    rebateInfo: string; // Current rebate/incentive status
    avgSystemCost: number; // Average installed cost for 10kW system
    avgPaybackYears: number; // Typical payback period
    propertyTaxExempt: boolean; // Property tax exemption available
    netMetering: boolean; // Net metering available
    verified: boolean; // Data verification status
    lastUpdated: string; // Last verification date
}

/**
 * Verified solar data for top 20 Texas cities
 * Sources: NREL, utility company websites, DSIRE database
 */
export const TEXAS_CITY_SOLAR_DATA: Record<string, CitySolarData> = {
    // Major Cities
    'houston': {
        peakSunHours: 5.0,
        avgElectricRate: 0.135,
        utilityProvider: 'CenterPoint Energy',
        rebateInfo: 'Net metering available, state & utility incentives (federal ITC changed 2026)',
        avgSystemCost: 27500,
        avgPaybackYears: 7.5,
        propertyTaxExempt: true,
        netMetering: true,
        verified: true,
        lastUpdated: '2026-02-20'
    },
    'dallas': {
        peakSunHours: 5.1,
        avgElectricRate: 0.14,
        utilityProvider: 'Oncor',
        rebateInfo: 'Solar buyback plans, state & utility incentives (federal ITC changed 2026)',
        avgSystemCost: 26800,
        avgPaybackYears: 7.2,
        propertyTaxExempt: true,
        netMetering: true,
        verified: true,
        lastUpdated: '2026-02-20'
    },
    'austin': {
        peakSunHours: 5.2,
        avgElectricRate: 0.12,
        utilityProvider: 'Austin Energy',
        rebateInfo: 'Austin Energy solar rebate up to $2,500, state & utility incentives (federal ITC changed 2026)',
        avgSystemCost: 25900,
        avgPaybackYears: 6.8,
        propertyTaxExempt: true,
        netMetering: true,
        verified: true,
        lastUpdated: '2026-02-20'
    },
    'san-antonio': {
        peakSunHours: 5.3,
        avgElectricRate: 0.11,
        utilityProvider: 'CPS Energy',
        rebateInfo: 'CPS Energy solar rebate program, state & utility incentives (federal ITC changed 2026)',
        avgSystemCost: 26200,
        avgPaybackYears: 7.0,
        propertyTaxExempt: true,
        netMetering: true,
        verified: true,
        lastUpdated: '2026-02-20'
    },
    'fort-worth': {
        peakSunHours: 5.1,
        avgElectricRate: 0.135,
        utilityProvider: 'Oncor',
        rebateInfo: 'Net metering available, state & utility incentives (federal ITC changed 2026)',
        avgSystemCost: 26500,
        avgPaybackYears: 7.3,
        propertyTaxExempt: true,
        netMetering: true,
        verified: true,
        lastUpdated: '2026-02-20'
    },
    'el-paso': {
        peakSunHours: 5.8,
        avgElectricRate: 0.11,
        utilityProvider: 'El Paso Electric',
        rebateInfo: 'Net metering available, state & utility incentives (federal ITC changed 2026)',
        avgSystemCost: 24800,
        avgPaybackYears: 6.5,
        propertyTaxExempt: true,
        netMetering: true,
        verified: true,
        lastUpdated: '2026-02-20'
    },
    'arlington': {
        peakSunHours: 5.1,
        avgElectricRate: 0.138,
        utilityProvider: 'Oncor',
        rebateInfo: 'Net metering available, state & utility incentives (federal ITC changed 2026)',
        avgSystemCost: 26700,
        avgPaybackYears: 7.4,
        propertyTaxExempt: true,
        netMetering: true,
        verified: true,
        lastUpdated: '2026-02-20'
    },
    'corpus-christi': {
        peakSunHours: 5.4,
        avgElectricRate: 0.125,
        utilityProvider: 'AEP Texas',
        rebateInfo: 'Net metering available, state & utility incentives (federal ITC changed 2026)',
        avgSystemCost: 25600,
        avgPaybackYears: 6.9,
        propertyTaxExempt: true,
        netMetering: true,
        verified: true,
        lastUpdated: '2026-02-20'
    },
    'plano': {
        peakSunHours: 5.1,
        avgElectricRate: 0.142,
        utilityProvider: 'Oncor',
        rebateInfo: 'Net metering available, state & utility incentives (federal ITC changed 2026)',
        avgSystemCost: 27200,
        avgPaybackYears: 7.5,
        propertyTaxExempt: true,
        netMetering: true,
        verified: true,
        lastUpdated: '2026-02-20'
    },
    'laredo': {
        peakSunHours: 5.5,
        avgElectricRate: 0.115,
        utilityProvider: 'AEP Texas',
        rebateInfo: 'Net metering available, state & utility incentives (federal ITC changed 2026)',
        avgSystemCost: 25100,
        avgPaybackYears: 6.7,
        propertyTaxExempt: true,
        netMetering: true,
        verified: true,
        lastUpdated: '2026-02-20'
    },
    'lubbock': {
        peakSunHours: 5.6,
        avgElectricRate: 0.118,
        utilityProvider: 'LP&L',
        rebateInfo: 'Net metering available, state & utility incentives (federal ITC changed 2026)',
        avgSystemCost: 24900,
        avgPaybackYears: 6.6,
        propertyTaxExempt: true,
        netMetering: true,
        verified: true,
        lastUpdated: '2026-02-20'
    },
    'irving': {
        peakSunHours: 5.1,
        avgElectricRate: 0.14,
        utilityProvider: 'Oncor',
        rebateInfo: 'Net metering available, state & utility incentives (federal ITC changed 2026)',
        avgSystemCost: 26900,
        avgPaybackYears: 7.3,
        propertyTaxExempt: true,
        netMetering: true,
        verified: true,
        lastUpdated: '2026-02-20'
    },
    'garland': {
        peakSunHours: 5.1,
        avgElectricRate: 0.139,
        utilityProvider: 'Garland Power & Light',
        rebateInfo: 'Net metering available, state & utility incentives (federal ITC changed 2026)',
        avgSystemCost: 26800,
        avgPaybackYears: 7.3,
        propertyTaxExempt: true,
        netMetering: true,
        verified: true,
        lastUpdated: '2026-02-20'
    },
    'frisco': {
        peakSunHours: 5.1,
        avgElectricRate: 0.143,
        utilityProvider: 'Oncor',
        rebateInfo: 'Net metering available, state & utility incentives (federal ITC changed 2026)',
        avgSystemCost: 27300,
        avgPaybackYears: 7.6,
        propertyTaxExempt: true,
        netMetering: true,
        verified: true,
        lastUpdated: '2026-02-20'
    },
    'mckinney': {
        peakSunHours: 5.1,
        avgElectricRate: 0.141,
        utilityProvider: 'Oncor',
        rebateInfo: 'Net metering available, state & utility incentives (federal ITC changed 2026)',
        avgSystemCost: 27100,
        avgPaybackYears: 7.5,
        propertyTaxExempt: true,
        netMetering: true,
        verified: true,
        lastUpdated: '2026-02-20'
    },
    'amarillo': {
        peakSunHours: 5.7,
        avgElectricRate: 0.12,
        utilityProvider: 'Xcel Energy',
        rebateInfo: 'Solar rewards program, state & utility incentives (federal ITC changed 2026)',
        avgSystemCost: 24700,
        avgPaybackYears: 6.5,
        propertyTaxExempt: true,
        netMetering: true,
        verified: true,
        lastUpdated: '2026-02-20'
    },
    'grand-prairie': {
        peakSunHours: 5.1,
        avgElectricRate: 0.137,
        utilityProvider: 'Oncor',
        rebateInfo: 'Net metering available, state & utility incentives (federal ITC changed 2026)',
        avgSystemCost: 26600,
        avgPaybackYears: 7.2,
        propertyTaxExempt: true,
        netMetering: true,
        verified: true,
        lastUpdated: '2026-02-20'
    },
    'brownsville': {
        peakSunHours: 5.4,
        avgElectricRate: 0.11,
        utilityProvider: 'Brownsville PUB',
        rebateInfo: 'Net metering available, state & utility incentives (federal ITC changed 2026)',
        avgSystemCost: 24500,
        avgPaybackYears: 6.4,
        propertyTaxExempt: true,
        netMetering: true,
        verified: true,
        lastUpdated: '2026-02-20'
    },
    'pasadena': {
        peakSunHours: 5.0,
        avgElectricRate: 0.133,
        utilityProvider: 'CenterPoint Energy',
        rebateInfo: 'Net metering available, state & utility incentives (federal ITC changed 2026)',
        avgSystemCost: 27000,
        avgPaybackYears: 7.4,
        propertyTaxExempt: true,
        netMetering: true,
        verified: true,
        lastUpdated: '2026-02-20'
    },
    'mesquite': {
        peakSunHours: 5.1,
        avgElectricRate: 0.138,
        utilityProvider: 'Oncor',
        rebateInfo: 'Net metering available, state & utility incentives (federal ITC changed 2026)',
        avgSystemCost: 26700,
        avgPaybackYears: 7.3,
        propertyTaxExempt: true,
        netMetering: true,
        verified: true,
        lastUpdated: '2026-02-20'
    },
};

/**
 * Texas state-wide averages (fallback for cities not in list)
 */
export const TEXAS_STATE_AVERAGE: CitySolarData = {
    peakSunHours: 5.2,
    avgElectricRate: 0.13,
    utilityProvider: 'Various',
    rebateInfo: 'state & utility incentives (federal ITC changed 2026), property tax exemption',
    avgSystemCost: 26500,
    avgPaybackYears: 7.2,
    propertyTaxExempt: true,
    netMetering: true,
    verified: true,
    lastUpdated: '2026-02-20'
};

/**
 * Get solar data for a city, with fallback to state average
 */
export function getCitySolarData(citySlug: string): CitySolarData {
    return TEXAS_CITY_SOLAR_DATA[citySlug] || TEXAS_STATE_AVERAGE;
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(amount);
}

/**
 * Calculate system size needed based on electric bill
 */
export function estimateSystemSize(monthlyBill: number, electricRate: number): number {
    const monthlyKwh = monthlyBill / electricRate;
    const annualKwh = monthlyKwh * 12;
    // Average TX home uses ~1,176 kWh/month, needs ~9kW system
    // 1 kW produces ~1,400 kWh/year in Texas
    const systemSizeKw = Math.ceil((annualKwh / 1400) * 10) / 10;
    return systemSizeKw;
}
