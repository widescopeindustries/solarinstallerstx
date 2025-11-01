-- Add verification status to installers table
ALTER TABLE public.installers 
ADD COLUMN IF NOT EXISTS is_verified boolean NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS verification_date timestamp with time zone,
ADD COLUMN IF NOT EXISTS verification_notes text;

-- Add index for verification queries
CREATE INDEX IF NOT EXISTS idx_installers_verified ON public.installers(is_verified);

-- Update existing installers to be unverified by default
UPDATE public.installers SET is_verified = false WHERE is_verified IS NULL;