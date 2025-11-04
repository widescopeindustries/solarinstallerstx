
-- Add new columns to the installers table for the Safety Score System

ALTER TABLE installers
ADD COLUMN total_safety_score INT,
ADD COLUMN tier TEXT,
ADD COLUMN red_flags TEXT[],
ADD COLUMN verification_status TEXT,
ADD COLUMN insurance_coverage JSONB,
ADD COLUMN bonding_status TEXT,
ADD COLUMN bankruptcy_history JSONB,
ADD COLUMN nabcep_certified BOOLEAN,
ADD COLUMN state_licensed BOOLEAN,
ADD COLUMN master_electrician BOOLEAN,
ADD COLUMN warranty_details JSONB,
ADD COLUMN bbb_rating TEXT,
ADD COLUMN complaint_history JSONB,
ADD COLUMN years_in_business INT,
ADD COLUMN installations_completed INT,
ADD COLUMN customer_ratings JSONB;

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
