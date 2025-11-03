/**
 * Safety Score Calculation System
 *
 * Calculates the 100-point safety score based on 4 categories:
 * - Financial Stability (30 points)
 * - Professional Credentials (25 points)
 * - Customer Protection (25 points)
 * - Track Record (20 points)
 */

export interface InstallerScoringData {
  // Financial Stability (30 points)
  years_in_business?: number;
  insurance_verified?: boolean;
  insurance_expiry_date?: string;
  bonding_verified?: boolean;
  business_registration_verified?: boolean;
  bankruptcy_check_clear?: boolean;

  // Professional Credentials (25 points)
  certification_type?: string;
  state_licensed?: boolean;
  state_license_expiry?: string;
  master_electrician_on_staff?: boolean;

  // Customer Protection (25 points)
  warranty_years?: number;
  warranty_workmanship_years?: number;
  warranty_equipment_years?: number;
  response_time_hours?: number;
  bbb_rating?: string;
  complaint_count?: number;
  resolved_complaint_count?: number;
  insurance_coverage_amount?: number;

  // Track Record (20 points)
  completed_installations?: number;
  rating?: number;
  review_count?: number;
  project_completion_rate?: number;
  timeline_accuracy_score?: number;
}

export interface SafetyScoreResult {
  total_safety_score: number;
  tier: 'Gold' | 'Silver' | 'Bronze' | null;
  financial_stability_score: number;
  professional_credentials_score: number;
  customer_protection_score: number;
  track_record_score: number;
  red_flags: string[];
  breakdown: {
    financial_stability: { [key: string]: number };
    professional_credentials: { [key: string]: number };
    customer_protection: { [key: string]: number };
    track_record: { [key: string]: number };
  };
}

/**
 * Calculate Financial Stability Score (max 30 points)
 */
export function calculateFinancialStabilityScore(data: InstallerScoringData): {
  score: number;
  breakdown: { [key: string]: number };
  red_flags: string[];
} {
  const breakdown: { [key: string]: number } = {};
  const red_flags: string[] = [];

  // Years in business (max 10 points)
  // 0-1 years: 0 pts, 2 years: 2 pts, 3 years: 4 pts, 4 years: 6 pts, 5+ years: 10 pts
  if (data.years_in_business !== undefined && data.years_in_business !== null) {
    if (data.years_in_business >= 5) {
      breakdown.years_in_business = 10;
    } else if (data.years_in_business >= 4) {
      breakdown.years_in_business = 6;
    } else if (data.years_in_business >= 3) {
      breakdown.years_in_business = 4;
    } else if (data.years_in_business >= 2) {
      breakdown.years_in_business = 2;
    } else {
      breakdown.years_in_business = 0;
      if (data.years_in_business < 2) {
        red_flags.push('less_than_2_years_in_business');
      }
    }
  } else {
    breakdown.years_in_business = 0;
  }

  // Insurance verified (5 points)
  if (data.insurance_verified) {
    // Check if insurance is not expired
    if (data.insurance_expiry_date) {
      const expiryDate = new Date(data.insurance_expiry_date);
      const today = new Date();
      if (expiryDate > today) {
        breakdown.insurance_verified = 5;
      } else {
        breakdown.insurance_verified = 0;
        red_flags.push('insurance_expired');
      }
    } else {
      breakdown.insurance_verified = 5;
    }
  } else {
    breakdown.insurance_verified = 0;
    red_flags.push('insurance_not_verified');
  }

  // Bonding verified (5 points)
  if (data.bonding_verified) {
    breakdown.bonding_verified = 5;
  } else {
    breakdown.bonding_verified = 0;
  }

  // Business registration verified (5 points)
  if (data.business_registration_verified) {
    breakdown.business_registration = 5;
  } else {
    breakdown.business_registration = 0;
  }

  // No bankruptcy filings (10 points)
  if (data.bankruptcy_check_clear === true) {
    breakdown.bankruptcy_check = 10;
  } else if (data.bankruptcy_check_clear === false) {
    breakdown.bankruptcy_check = 0;
    red_flags.push('bankruptcy_filing_found');
  } else {
    // Not checked yet
    breakdown.bankruptcy_check = 0;
  }

  const score = Object.values(breakdown).reduce((sum, val) => sum + val, 0);

  return { score, breakdown, red_flags };
}

/**
 * Calculate Professional Credentials Score (max 25 points)
 */
export function calculateProfessionalCredentialsScore(data: InstallerScoringData): {
  score: number;
  breakdown: { [key: string]: number };
  red_flags: string[];
} {
  const breakdown: { [key: string]: number } = {};
  const red_flags: string[] = [];

  // NABCEP certification (15 points) - REQUIRED for Gold tier
  const isNABCEP = data.certification_type?.toUpperCase().includes('NABCEP') || false;
  if (isNABCEP) {
    breakdown.nabcep_certified = 15;
  } else {
    breakdown.nabcep_certified = 0;
  }

  // State licensing (5 points)
  if (data.state_licensed) {
    // Check if license is not expired
    if (data.state_license_expiry) {
      const expiryDate = new Date(data.state_license_expiry);
      const today = new Date();
      if (expiryDate > today) {
        breakdown.state_licensed = 5;
      } else {
        breakdown.state_licensed = 0;
        red_flags.push('state_license_expired');
      }
    } else {
      breakdown.state_licensed = 5;
    }
  } else {
    breakdown.state_licensed = 0;
  }

  // Master Electrician on staff (5 points)
  if (data.master_electrician_on_staff) {
    breakdown.master_electrician = 5;
  } else {
    breakdown.master_electrician = 0;
  }

  const score = Object.values(breakdown).reduce((sum, val) => sum + val, 0);

  return { score, breakdown, red_flags };
}

/**
 * Calculate Customer Protection Score (max 25 points)
 */
export function calculateCustomerProtectionScore(data: InstallerScoringData): {
  score: number;
  breakdown: { [key: string]: number };
  red_flags: string[];
} {
  const breakdown: { [key: string]: number } = {};
  const red_flags: string[] = [];

  // Warranty length (max 10 points)
  // Use the maximum of warranty_years or average of workmanship + equipment
  let effectiveWarrantyYears = data.warranty_years || 0;
  if (data.warranty_workmanship_years && data.warranty_equipment_years) {
    const avgWarranty = (data.warranty_workmanship_years + data.warranty_equipment_years) / 2;
    effectiveWarrantyYears = Math.max(effectiveWarrantyYears, avgWarranty);
  }

  // 25+ years: 10 pts, 20-24: 8 pts, 15-19: 6 pts, 10-14: 4 pts, 5-9: 2 pts, <5: 0 pts
  if (effectiveWarrantyYears >= 25) {
    breakdown.warranty_length = 10;
  } else if (effectiveWarrantyYears >= 20) {
    breakdown.warranty_length = 8;
  } else if (effectiveWarrantyYears >= 15) {
    breakdown.warranty_length = 6;
  } else if (effectiveWarrantyYears >= 10) {
    breakdown.warranty_length = 4;
  } else if (effectiveWarrantyYears >= 5) {
    breakdown.warranty_length = 2;
  } else {
    breakdown.warranty_length = 0;
    if (effectiveWarrantyYears < 10) {
      red_flags.push('short_warranty_period');
    }
  }

  // Response time commitments (5 points)
  // <24 hours: 5 pts, 24-48: 3 pts, 48-72: 2 pts, >72: 0 pts
  if (data.response_time_hours !== undefined && data.response_time_hours !== null) {
    if (data.response_time_hours <= 24) {
      breakdown.response_time = 5;
    } else if (data.response_time_hours <= 48) {
      breakdown.response_time = 3;
    } else if (data.response_time_hours <= 72) {
      breakdown.response_time = 2;
    } else {
      breakdown.response_time = 0;
    }
  } else {
    breakdown.response_time = 0;
  }

  // Complaint resolution history (5 points)
  const complaintCount = data.complaint_count || 0;
  const resolvedCount = data.resolved_complaint_count || 0;

  if (complaintCount === 0) {
    // No complaints is good
    breakdown.complaint_history = 5;
  } else {
    const resolutionRate = resolvedCount / complaintCount;
    // 90%+ resolved: 5 pts, 80-89%: 4 pts, 70-79%: 3 pts, 60-69%: 2 pts, 50-59%: 1 pt, <50%: 0 pts
    if (resolutionRate >= 0.9) {
      breakdown.complaint_history = 5;
    } else if (resolutionRate >= 0.8) {
      breakdown.complaint_history = 4;
    } else if (resolutionRate >= 0.7) {
      breakdown.complaint_history = 3;
    } else if (resolutionRate >= 0.6) {
      breakdown.complaint_history = 2;
    } else if (resolutionRate >= 0.5) {
      breakdown.complaint_history = 1;
    } else {
      breakdown.complaint_history = 0;
      red_flags.push('poor_complaint_resolution');
    }

    // Add red flag if there are many unresolved complaints
    if (complaintCount - resolvedCount > 5) {
      red_flags.push('high_unresolved_complaints');
    }
  }

  // Insurance coverage verification (5 points)
  if (data.insurance_coverage_amount && data.insurance_coverage_amount >= 1000000) {
    breakdown.insurance_coverage = 5;
  } else if (data.insurance_coverage_amount && data.insurance_coverage_amount >= 500000) {
    breakdown.insurance_coverage = 3;
  } else {
    breakdown.insurance_coverage = 0;
  }

  const score = Object.values(breakdown).reduce((sum, val) => sum + val, 0);

  return { score, breakdown, red_flags };
}

/**
 * Calculate Track Record Score (max 20 points)
 */
export function calculateTrackRecordScore(data: InstallerScoringData): {
  score: number;
  breakdown: { [key: string]: number };
  red_flags: string[];
} {
  const breakdown: { [key: string]: number } = {};
  const red_flags: string[] = [];

  // Number of completed installations (max 10 points)
  // 500+: 10 pts, 250-499: 8 pts, 100-249: 6 pts, 50-99: 4 pts, 25-49: 2 pts, <25: 0 pts
  const installations = data.completed_installations || 0;
  if (installations >= 500) {
    breakdown.completed_installations = 10;
  } else if (installations >= 250) {
    breakdown.completed_installations = 8;
  } else if (installations >= 100) {
    breakdown.completed_installations = 6;
  } else if (installations >= 50) {
    breakdown.completed_installations = 4;
  } else if (installations >= 25) {
    breakdown.completed_installations = 2;
  } else {
    breakdown.completed_installations = 0;
    if (installations < 25 && installations > 0) {
      red_flags.push('limited_installation_history');
    }
  }

  // Customer reviews & ratings (max 5 points)
  const rating = data.rating || 0;
  const reviewCount = data.review_count || 0;

  // Need at least 10 reviews for full credit
  let ratingScore = 0;
  if (reviewCount >= 10) {
    // 4.5-5.0: 5 pts, 4.0-4.49: 4 pts, 3.5-3.99: 3 pts, 3.0-3.49: 2 pts, <3.0: 0 pts
    if (rating >= 4.5) {
      ratingScore = 5;
    } else if (rating >= 4.0) {
      ratingScore = 4;
    } else if (rating >= 3.5) {
      ratingScore = 3;
    } else if (rating >= 3.0) {
      ratingScore = 2;
    } else {
      ratingScore = 0;
      red_flags.push('poor_customer_ratings');
    }
  } else if (reviewCount >= 5) {
    // Partial credit with 5-9 reviews
    if (rating >= 4.5) {
      ratingScore = 3;
    } else if (rating >= 4.0) {
      ratingScore = 2;
    } else if (rating >= 3.5) {
      ratingScore = 1;
    }
  }
  breakdown.customer_reviews = ratingScore;

  // Project completion rate (3 points)
  const completionRate = data.project_completion_rate || 0;
  if (completionRate >= 95) {
    breakdown.completion_rate = 3;
  } else if (completionRate >= 90) {
    breakdown.completion_rate = 2;
  } else if (completionRate >= 85) {
    breakdown.completion_rate = 1;
  } else {
    breakdown.completion_rate = 0;
    if (completionRate > 0 && completionRate < 85) {
      red_flags.push('low_project_completion_rate');
    }
  }

  // Timeline accuracy (2 points)
  const timelineScore = data.timeline_accuracy_score || 0;
  if (timelineScore >= 90) {
    breakdown.timeline_accuracy = 2;
  } else if (timelineScore >= 80) {
    breakdown.timeline_accuracy = 1;
  } else {
    breakdown.timeline_accuracy = 0;
  }

  const score = Object.values(breakdown).reduce((sum, val) => sum + val, 0);

  return { score, breakdown, red_flags };
}

/**
 * Calculate overall safety score and tier
 */
export function calculateSafetyScore(data: InstallerScoringData): SafetyScoreResult {
  const financial = calculateFinancialStabilityScore(data);
  const credentials = calculateProfessionalCredentialsScore(data);
  const protection = calculateCustomerProtectionScore(data);
  const trackRecord = calculateTrackRecordScore(data);

  const total_safety_score =
    financial.score +
    credentials.score +
    protection.score +
    trackRecord.score;

  // Determine tier based on score
  let tier: 'Gold' | 'Silver' | 'Bronze' | null = null;
  if (total_safety_score >= 85) {
    // Gold tier REQUIRES NABCEP certification
    const isNABCEP = data.certification_type?.toUpperCase().includes('NABCEP') || false;
    tier = isNABCEP ? 'Gold' : 'Silver'; // Downgrade to Silver if not NABCEP
  } else if (total_safety_score >= 70) {
    tier = 'Silver';
  } else if (total_safety_score >= 60) {
    tier = 'Bronze';
  } else {
    tier = null; // Below minimum threshold
  }

  // Combine all red flags
  const red_flags = [
    ...financial.red_flags,
    ...credentials.red_flags,
    ...protection.red_flags,
    ...trackRecord.red_flags
  ];

  return {
    total_safety_score,
    tier,
    financial_stability_score: financial.score,
    professional_credentials_score: credentials.score,
    customer_protection_score: protection.score,
    track_record_score: trackRecord.score,
    red_flags,
    breakdown: {
      financial_stability: financial.breakdown,
      professional_credentials: credentials.breakdown,
      customer_protection: protection.breakdown,
      track_record: trackRecord.breakdown
    }
  };
}

/**
 * Helper to get tier color for UI display
 */
export function getTierColor(tier: 'Gold' | 'Silver' | 'Bronze' | null): string {
  switch (tier) {
    case 'Gold':
      return 'yellow-500';
    case 'Silver':
      return 'gray-400';
    case 'Bronze':
      return 'orange-600';
    default:
      return 'gray-500';
  }
}

/**
 * Helper to get tier badge emoji
 */
export function getTierBadge(tier: 'Gold' | 'Silver' | 'Bronze' | null): string {
  switch (tier) {
    case 'Gold':
      return '🏆';
    case 'Silver':
      return '🥈';
    case 'Bronze':
      return '🥉';
    default:
      return '';
  }
}

/**
 * Helper to check if data is fresh (last updated within days)
 */
export function isDataFresh(lastUpdated: string | Date | null, maxAgeDays: number = 90): boolean {
  if (!lastUpdated) return false;

  const lastUpdateDate = new Date(lastUpdated);
  const today = new Date();
  const daysSinceUpdate = Math.floor((today.getTime() - lastUpdateDate.getTime()) / (1000 * 60 * 60 * 24));

  return daysSinceUpdate <= maxAgeDays;
}

/**
 * Helper to calculate next verification due date (quarterly = 90 days)
 */
export function calculateNextVerificationDate(lastVerified: string | Date): Date {
  const lastVerifiedDate = new Date(lastVerified);
  const nextDate = new Date(lastVerifiedDate);
  nextDate.setDate(nextDate.getDate() + 90); // Quarterly verification
  return nextDate;
}
