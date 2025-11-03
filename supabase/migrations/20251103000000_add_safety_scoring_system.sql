-- Migration: Add comprehensive safety scoring system
-- Description: Adds all fields needed to calculate and store the 100-point safety score system

-- Add Financial Stability fields (30 points max)
ALTER TABLE installers ADD COLUMN IF NOT EXISTS insurance_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE installers ADD COLUMN IF NOT EXISTS insurance_company VARCHAR(255);
ALTER TABLE installers ADD COLUMN IF NOT EXISTS insurance_policy_number VARCHAR(100);
ALTER TABLE installers ADD COLUMN IF NOT EXISTS insurance_expiry_date DATE;
ALTER TABLE installers ADD COLUMN IF NOT EXISTS insurance_coverage_amount DECIMAL(12,2);

ALTER TABLE installers ADD COLUMN IF NOT EXISTS bonding_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE installers ADD COLUMN IF NOT EXISTS bonding_company VARCHAR(255);
ALTER TABLE installers ADD COLUMN IF NOT EXISTS bonding_amount DECIMAL(12,2);

ALTER TABLE installers ADD COLUMN IF NOT EXISTS business_registration_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE installers ADD COLUMN IF NOT EXISTS business_registration_number VARCHAR(100);
ALTER TABLE installers ADD COLUMN IF NOT EXISTS business_registration_state VARCHAR(2);

ALTER TABLE installers ADD COLUMN IF NOT EXISTS bankruptcy_check_clear BOOLEAN DEFAULT NULL;
ALTER TABLE installers ADD COLUMN IF NOT EXISTS bankruptcy_check_date DATE;
ALTER TABLE installers ADD COLUMN IF NOT EXISTS bankruptcy_notes TEXT;

ALTER TABLE installers ADD COLUMN IF NOT EXISTS financial_stability_score INTEGER DEFAULT 0;

-- Add Professional Credentials fields (25 points max)
ALTER TABLE installers ADD COLUMN IF NOT EXISTS state_licensed BOOLEAN DEFAULT FALSE;
ALTER TABLE installers ADD COLUMN IF NOT EXISTS state_license_number VARCHAR(100);
ALTER TABLE installers ADD COLUMN IF NOT EXISTS state_license_expiry DATE;
ALTER TABLE installers ADD COLUMN IF NOT EXISTS state_license_state VARCHAR(2);

ALTER TABLE installers ADD COLUMN IF NOT EXISTS master_electrician_on_staff BOOLEAN DEFAULT FALSE;
ALTER TABLE installers ADD COLUMN IF NOT EXISTS master_electrician_name VARCHAR(255);
ALTER TABLE installers ADD COLUMN IF NOT EXISTS master_electrician_license VARCHAR(100);

ALTER TABLE installers ADD COLUMN IF NOT EXISTS professional_credentials_score INTEGER DEFAULT 0;

-- Add Customer Protection fields (25 points max)
ALTER TABLE installers ADD COLUMN IF NOT EXISTS warranty_years INTEGER;
ALTER TABLE installers ADD COLUMN IF NOT EXISTS warranty_workmanship_years INTEGER;
ALTER TABLE installers ADD COLUMN IF NOT EXISTS warranty_equipment_years INTEGER;
ALTER TABLE installers ADD COLUMN IF NOT EXISTS warranty_terms TEXT;

ALTER TABLE installers ADD COLUMN IF NOT EXISTS response_time_hours INTEGER;
ALTER TABLE installers ADD COLUMN IF NOT EXISTS emergency_response_available BOOLEAN DEFAULT FALSE;

ALTER TABLE installers ADD COLUMN IF NOT EXISTS bbb_rating VARCHAR(10);
ALTER TABLE installers ADD COLUMN IF NOT EXISTS bbb_accredited BOOLEAN DEFAULT FALSE;
ALTER TABLE installers ADD COLUMN IF NOT EXISTS complaint_count INTEGER DEFAULT 0;
ALTER TABLE installers ADD COLUMN IF NOT EXISTS resolved_complaint_count INTEGER DEFAULT 0;
ALTER TABLE installers ADD COLUMN IF NOT EXISTS complaint_resolution_rate DECIMAL(5,2);

ALTER TABLE installers ADD COLUMN IF NOT EXISTS customer_protection_score INTEGER DEFAULT 0;

-- Add Track Record fields (20 points max)
ALTER TABLE installers ADD COLUMN IF NOT EXISTS completed_installations INTEGER DEFAULT 0;
ALTER TABLE installers ADD COLUMN IF NOT EXISTS total_mw_installed DECIMAL(10,2);
ALTER TABLE installers ADD COLUMN IF NOT EXISTS project_completion_rate DECIMAL(5,2);
ALTER TABLE installers ADD COLUMN IF NOT EXISTS timeline_accuracy_score DECIMAL(5,2);
ALTER TABLE installers ADD COLUMN IF NOT EXISTS average_project_days INTEGER;

ALTER TABLE installers ADD COLUMN IF NOT EXISTS track_record_score INTEGER DEFAULT 0;

-- Add Overall Safety Score fields
ALTER TABLE installers ADD COLUMN IF NOT EXISTS total_safety_score INTEGER DEFAULT 0;
ALTER TABLE installers ADD COLUMN IF NOT EXISTS tier VARCHAR(20); -- 'Gold', 'Silver', 'Bronze', or NULL
ALTER TABLE installers ADD COLUMN IF NOT EXISTS tier_badge_color VARCHAR(50);

-- Add Verification Tracking fields
ALTER TABLE installers ADD COLUMN IF NOT EXISTS last_verification_date DATE;
ALTER TABLE installers ADD COLUMN IF NOT EXISTS next_verification_due DATE;
ALTER TABLE installers ADD COLUMN IF NOT EXISTS verification_status VARCHAR(50) DEFAULT 'pending'; -- 'pending', 'in_progress', 'verified', 'needs_update'
ALTER TABLE installers ADD COLUMN IF NOT EXISTS verified_by VARCHAR(255);

-- Add Red Flags tracking (stored as JSONB array)
ALTER TABLE installers ADD COLUMN IF NOT EXISTS red_flags JSONB DEFAULT '[]'::jsonb;
ALTER TABLE installers ADD COLUMN IF NOT EXISTS red_flags_count INTEGER DEFAULT 0;

-- Add Data Source tracking
ALTER TABLE installers ADD COLUMN IF NOT EXISTS data_sources JSONB DEFAULT '{}'::jsonb; -- Track where data came from
ALTER TABLE installers ADD COLUMN IF NOT EXISTS manual_verification_notes TEXT;

-- Add timestamps for data freshness
ALTER TABLE installers ADD COLUMN IF NOT EXISTS financial_data_updated_at TIMESTAMP;
ALTER TABLE installers ADD COLUMN IF NOT EXISTS credentials_updated_at TIMESTAMP;
ALTER TABLE installers ADD COLUMN IF NOT EXISTS protection_data_updated_at TIMESTAMP;
ALTER TABLE installers ADD COLUMN IF NOT EXISTS track_record_updated_at TIMESTAMP;

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_installers_total_safety_score ON installers(total_safety_score DESC);
CREATE INDEX IF NOT EXISTS idx_installers_tier ON installers(tier);
CREATE INDEX IF NOT EXISTS idx_installers_verification_status ON installers(verification_status);
CREATE INDEX IF NOT EXISTS idx_installers_next_verification_due ON installers(next_verification_due);
CREATE INDEX IF NOT EXISTS idx_installers_bankruptcy_check ON installers(bankruptcy_check_clear);
CREATE INDEX IF NOT EXISTS idx_installers_nabcep_tier ON installers(certification_type, total_safety_score DESC);

-- Add comments for documentation
COMMENT ON COLUMN installers.total_safety_score IS '0-100 point safety score based on 4 categories';
COMMENT ON COLUMN installers.tier IS 'Gold (85-100), Silver (70-84), Bronze (60-69), NULL (<60)';
COMMENT ON COLUMN installers.financial_stability_score IS 'Max 30 points: years_in_business(10) + insurance(5) + bonding(5) + registration(5) + bankruptcy_clear(10)';
COMMENT ON COLUMN installers.professional_credentials_score IS 'Max 25 points: NABCEP(15) + state_license(5) + master_electrician(5)';
COMMENT ON COLUMN installers.customer_protection_score IS 'Max 25 points: warranty(10) + response_time(5) + complaints(5) + insurance_coverage(5)';
COMMENT ON COLUMN installers.track_record_score IS 'Max 20 points: installations(10) + rating(5) + completion_rate(3) + timeline_accuracy(2)';
COMMENT ON COLUMN installers.red_flags IS 'Array of red flag identifiers: bankruptcy_filing, license_lapse, complaint_pattern, address_change, ownership_transfer, legal_action';

-- Create a function to calculate tier based on score
CREATE OR REPLACE FUNCTION calculate_tier(score INTEGER)
RETURNS VARCHAR(20)
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
    IF score >= 85 THEN
        RETURN 'Gold';
    ELSIF score >= 70 THEN
        RETURN 'Silver';
    ELSIF score >= 60 THEN
        RETURN 'Bronze';
    ELSE
        RETURN NULL; -- Below minimum threshold, not listed
    END IF;
END;
$$;

-- Create a function to update tier automatically when total_safety_score changes
CREATE OR REPLACE FUNCTION update_tier_on_score_change()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.tier := calculate_tier(NEW.total_safety_score);

    -- Set tier badge color
    NEW.tier_badge_color := CASE NEW.tier
        WHEN 'Gold' THEN 'yellow-500'
        WHEN 'Silver' THEN 'gray-400'
        WHEN 'Bronze' THEN 'orange-600'
        ELSE NULL
    END;

    -- Count red flags
    NEW.red_flags_count := jsonb_array_length(COALESCE(NEW.red_flags, '[]'::jsonb));

    RETURN NEW;
END;
$$;

-- Create trigger to auto-update tier
DROP TRIGGER IF EXISTS trigger_update_tier ON installers;
CREATE TRIGGER trigger_update_tier
    BEFORE INSERT OR UPDATE OF total_safety_score, red_flags
    ON installers
    FOR EACH ROW
    EXECUTE FUNCTION update_tier_on_score_change();

-- Create a view for easy querying of safety-scored installers
CREATE OR REPLACE VIEW installers_with_safety_scores AS
SELECT
    id,
    name,
    company_name,
    location_city,
    location_state,
    certification_type,
    certification_number,
    total_safety_score,
    tier,
    financial_stability_score,
    professional_credentials_score,
    customer_protection_score,
    track_record_score,
    red_flags,
    red_flags_count,
    last_verification_date,
    verification_status,
    is_verified,
    is_premium,
    rating,
    review_count,
    years_in_business,
    phone,
    company_website,
    -- Calculated fields
    CASE
        WHEN bankruptcy_check_clear = FALSE THEN TRUE
        WHEN red_flags_count > 0 THEN TRUE
        ELSE FALSE
    END AS has_warnings,
    CASE
        WHEN certification_type LIKE '%NABCEP%' THEN TRUE
        ELSE FALSE
    END AS is_nabcep_certified,
    DATE_PART('day', next_verification_due - CURRENT_DATE) AS days_until_reverification
FROM installers
WHERE total_safety_score >= 60 -- Only show installers meeting minimum threshold
ORDER BY total_safety_score DESC, tier DESC;

-- Grant permissions (adjust based on your RLS policies)
COMMENT ON VIEW installers_with_safety_scores IS 'View of installers meeting minimum safety score threshold (60+) with calculated fields';
