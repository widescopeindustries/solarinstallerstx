-- Add indexes for safety score fields to improve query performance

-- Index on total_safety_score for sorting
CREATE INDEX IF NOT EXISTS idx_installers_safety_score ON installers(total_safety_score DESC);

-- Index on tier for filtering
CREATE INDEX IF NOT EXISTS idx_installers_tier ON installers(tier);

-- Composite index for filtering and sorting
CREATE INDEX IF NOT EXISTS idx_installers_tier_safety_score ON installers(tier, total_safety_score DESC);

-- Index on verification_status for admin filtering
CREATE INDEX IF NOT EXISTS idx_installers_verification_status ON installers(verification_status);

-- Index on nabcep_certified for filtering NABCEP installers
CREATE INDEX IF NOT EXISTS idx_installers_nabcep_certified ON installers(nabcep_certified) WHERE nabcep_certified = true;
