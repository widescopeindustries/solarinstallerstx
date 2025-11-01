-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create installers table for the directory
CREATE TABLE public.installers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  certification_type TEXT NOT NULL,
  certification_number TEXT NOT NULL,
  certification_expires DATE,
  company_name TEXT,
  company_website TEXT,
  location_city TEXT NOT NULL,
  location_state TEXT NOT NULL,
  location_zip TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  country TEXT NOT NULL DEFAULT 'USA',
  is_premium BOOLEAN NOT NULL DEFAULT false,
  services TEXT[] DEFAULT '{}',
  rating NUMERIC,
  review_count INTEGER NOT NULL DEFAULT 0,
  years_in_business INTEGER,
  is_veteran BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.installers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view installers (public directory)
CREATE POLICY "Anyone can view installers"
ON public.installers
FOR SELECT
USING (true);

-- Only authenticated users can insert installers (for admin)
CREATE POLICY "Authenticated users can insert installers"
ON public.installers
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- Only authenticated users can update installers (for admin)
CREATE POLICY "Authenticated users can update installers"
ON public.installers
FOR UPDATE
USING (auth.uid() IS NOT NULL);

-- Only authenticated users can delete installers (for admin)
CREATE POLICY "Authenticated users can delete installers"
ON public.installers
FOR DELETE
USING (auth.uid() IS NOT NULL);

-- Create indexes for better query performance
CREATE INDEX idx_installers_location ON public.installers(location_city, location_state);
CREATE INDEX idx_installers_certification ON public.installers(certification_type);
CREATE INDEX idx_installers_premium ON public.installers(is_premium);
CREATE INDEX idx_installers_coordinates ON public.installers(latitude, longitude);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_installers_updated_at
BEFORE UPDATE ON public.installers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();