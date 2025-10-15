-- Fix security warning: Set search_path for validate_contact_info function
CREATE OR REPLACE FUNCTION public.validate_contact_info()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF (NEW.phone IS NULL OR NEW.phone = '') AND (NEW.company_website IS NULL OR NEW.company_website = '') THEN
    RAISE EXCEPTION 'At least one contact method (phone or website) is required';
  END IF;
  RETURN NEW;
END;
$$;