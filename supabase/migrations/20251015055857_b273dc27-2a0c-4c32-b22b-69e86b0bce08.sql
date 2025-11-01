-- Phase 1: Add phone column and improve data quality
ALTER TABLE public.installers 
ADD COLUMN phone TEXT,
ADD COLUMN phone_verified BOOLEAN DEFAULT false;

-- Add comment explaining phone field
COMMENT ON COLUMN public.installers.phone IS 'Contact phone number for the installer';

-- Create function to validate at least one contact method exists
CREATE OR REPLACE FUNCTION public.validate_contact_info()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF (NEW.phone IS NULL OR NEW.phone = '') AND (NEW.company_website IS NULL OR NEW.company_website = '') THEN
    RAISE EXCEPTION 'At least one contact method (phone or website) is required';
  END IF;
  RETURN NEW;
END;
$$;

-- Add trigger to validate contact info on insert/update
CREATE TRIGGER ensure_contact_info
BEFORE INSERT OR UPDATE ON public.installers
FOR EACH ROW
EXECUTE FUNCTION public.validate_contact_info();

-- Fix RLS policies: Add DELETE policy for profiles
CREATE POLICY "Users can delete their own profile"
ON public.profiles
FOR DELETE
USING (auth.uid() = id);

-- Fix RLS policies: Add UPDATE policy for user_roles (admins only)
CREATE POLICY "Only admins can update roles"
ON public.user_roles
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));