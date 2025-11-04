-- Add new columns to the installers table for the Safety Score System
-- Using DO block to check if columns exist before adding them

DO $$
BEGIN
  -- Add total_safety_score if not exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name='installers' AND column_name='total_safety_score') THEN
    ALTER TABLE installers ADD COLUMN total_safety_score INT;
  END IF;

  -- Add tier if not exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name='installers' AND column_name='tier') THEN
    ALTER TABLE installers ADD COLUMN tier TEXT;
  END IF;

  -- Add red_flags if not exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name='installers' AND column_name='red_flags') THEN
    ALTER TABLE installers ADD COLUMN red_flags TEXT[];
  END IF;

  -- Add verification_status if not exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name='installers' AND column_name='verification_status') THEN
    ALTER TABLE installers ADD COLUMN verification_status TEXT;
  END IF;

  -- Add insurance_coverage if not exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name='installers' AND column_name='insurance_coverage') THEN
    ALTER TABLE installers ADD COLUMN insurance_coverage JSONB;
  END IF;

  -- Add bonding_status if not exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name='installers' AND column_name='bonding_status') THEN
    ALTER TABLE installers ADD COLUMN bonding_status TEXT;
  END IF;

  -- Add bankruptcy_history if not exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name='installers' AND column_name='bankruptcy_history') THEN
    ALTER TABLE installers ADD COLUMN bankruptcy_history JSONB;
  END IF;

  -- Add nabcep_certified if not exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name='installers' AND column_name='nabcep_certified') THEN
    ALTER TABLE installers ADD COLUMN nabcep_certified BOOLEAN;
  END IF;

  -- Add state_licensed if not exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name='installers' AND column_name='state_licensed') THEN
    ALTER TABLE installers ADD COLUMN state_licensed BOOLEAN;
  END IF;

  -- Add master_electrician if not exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name='installers' AND column_name='master_electrician') THEN
    ALTER TABLE installers ADD COLUMN master_electrician BOOLEAN;
  END IF;

  -- Add warranty_details if not exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name='installers' AND column_name='warranty_details') THEN
    ALTER TABLE installers ADD COLUMN warranty_details JSONB;
  END IF;

  -- Add bbb_rating if not exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name='installers' AND column_name='bbb_rating') THEN
    ALTER TABLE installers ADD COLUMN bbb_rating TEXT;
  END IF;

  -- Add complaint_history if not exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name='installers' AND column_name='complaint_history') THEN
    ALTER TABLE installers ADD COLUMN complaint_history JSONB;
  END IF;

  -- Add years_in_business if not exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name='installers' AND column_name='years_in_business') THEN
    ALTER TABLE installers ADD COLUMN years_in_business INT;
  END IF;

  -- Add installations_completed if not exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name='installers' AND column_name='installations_completed') THEN
    ALTER TABLE installers ADD COLUMN installations_completed INT;
  END IF;

  -- Add customer_ratings if not exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name='installers' AND column_name='customer_ratings') THEN
    ALTER TABLE installers ADD COLUMN customer_ratings JSONB;
  END IF;
END $$;

-- Drop existing function and trigger if they exist
DROP TRIGGER IF EXISTS update_safety_score_trigger ON installers;
DROP FUNCTION IF EXISTS calculate_safety_score();

-- Create a function to calculate the safety score and tier
CREATE OR REPLACE FUNCTION calculate_safety_score()
RETURNS TRIGGER AS $$
DECLARE
  financial_score INT := 0;
  credentials_score INT := 0;
  protection_score INT := 0;
  track_record_score INT := 0;
BEGIN
  -- Financial Stability (30 points)
  IF NEW.insurance_coverage IS NOT NULL THEN
    financial_score := financial_score + 10;
  END IF;
  IF NEW.bonding_status = 'bonded' THEN
    financial_score := financial_score + 10;
  END IF;
  IF NEW.bankruptcy_history IS NULL THEN
    financial_score := financial_score + 10;
  END IF;

  -- Professional Credentials (25 points)
  IF NEW.nabcep_certified THEN
    credentials_score := credentials_score + 15;
  END IF;
  IF NEW.state_licensed THEN
    credentials_score := credentials_score + 5;
  END IF;
  IF NEW.master_electrician THEN
    credentials_score := credentials_score + 5;
  END IF;

  -- Customer Protection (25 points)
  IF NEW.warranty_details IS NOT NULL THEN
    protection_score := protection_score + 10;
  END IF;
  IF NEW.bbb_rating = 'A+' THEN
    protection_score := protection_score + 10;
  ELSIF NEW.bbb_rating = 'A' THEN
    protection_score := protection_score + 8;
  ELSIF NEW.bbb_rating = 'B' THEN
    protection_score := protection_score + 5;
  END IF;
  IF NEW.complaint_history IS NULL THEN
    protection_score := protection_score + 5;
  END IF;

  -- Track Record (20 points)
  IF NEW.years_in_business >= 10 THEN
    track_record_score := track_record_score + 10;
  ELSIF NEW.years_in_business >= 5 THEN
    track_record_score := track_record_score + 5;
  END IF;
  IF NEW.installations_completed >= 1000 THEN
    track_record_score := track_record_score + 5;
  END IF;
  IF NEW.customer_ratings IS NOT NULL AND (NEW.customer_ratings->>'average_rating')::float >= 4.5 THEN
    track_record_score := track_record_score + 5;
  END IF;

  -- Calculate total score
  NEW.total_safety_score := financial_score + credentials_score + protection_score + track_record_score;

  -- Determine tier
  IF NEW.total_safety_score >= 85 THEN
    NEW.tier := 'Gold';
  ELSIF NEW.total_safety_score >= 70 THEN
    NEW.tier := 'Silver';
  ELSIF NEW.total_safety_score >= 60 THEN
    NEW.tier := 'Bronze';
  ELSE
    NEW.tier := 'Unranked';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update the safety score
CREATE TRIGGER update_safety_score_trigger
BEFORE INSERT OR UPDATE ON installers
FOR EACH ROW
EXECUTE FUNCTION calculate_safety_score();
