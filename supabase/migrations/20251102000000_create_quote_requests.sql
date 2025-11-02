-- Create quote_requests table to store lead information from the quote form
CREATE TABLE public.quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Location & Usage
  zip_code TEXT NOT NULL,
  monthly_bill INTEGER NOT NULL,

  -- Property Details
  home_size TEXT,
  roof_type TEXT,
  roof_age TEXT,
  shading TEXT,

  -- Contact Information (required for follow-up)
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,

  -- Preferences
  budget TEXT,
  timeline TEXT,
  financing TEXT,
  battery_storage BOOLEAN DEFAULT false,
  monitoring BOOLEAN DEFAULT false,

  -- Additional Information
  additional_info TEXT,

  -- Calculated Savings (for reference)
  estimated_monthly_savings INTEGER,
  estimated_annual_savings INTEGER,
  estimated_system_cost INTEGER,
  estimated_payback_period INTEGER,

  -- Metadata
  status TEXT DEFAULT 'new' NOT NULL, -- new, contacted, quoted, closed
  source TEXT DEFAULT 'website',
  user_agent TEXT,
  ip_address INET,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  contacted_at TIMESTAMPTZ,

  -- Optional user reference (if they're logged in)
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Enable Row Level Security
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Allow anyone to insert quote requests (public form)
CREATE POLICY "Anyone can submit quote requests"
ON public.quote_requests
FOR INSERT
WITH CHECK (true);

-- Only admins can view all quote requests
CREATE POLICY "Admins can view all quote requests"
ON public.quote_requests
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Users can view their own quote requests if logged in
CREATE POLICY "Users can view their own quote requests"
ON public.quote_requests
FOR SELECT
USING (auth.uid() = user_id);

-- Only admins can update quote requests (change status, add notes, etc.)
CREATE POLICY "Admins can update quote requests"
ON public.quote_requests
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Create indexes for better query performance
CREATE INDEX idx_quote_requests_email ON public.quote_requests(email);
CREATE INDEX idx_quote_requests_zip_code ON public.quote_requests(zip_code);
CREATE INDEX idx_quote_requests_status ON public.quote_requests(status);
CREATE INDEX idx_quote_requests_created_at ON public.quote_requests(created_at DESC);
CREATE INDEX idx_quote_requests_user_id ON public.quote_requests(user_id);

-- Add trigger for updated_at
CREATE TRIGGER update_quote_requests_updated_at
  BEFORE UPDATE ON public.quote_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add comments for documentation
COMMENT ON TABLE public.quote_requests IS 'Stores lead information from the solar quote request form';
COMMENT ON COLUMN public.quote_requests.status IS 'Lead status: new, contacted, quoted, closed';
COMMENT ON COLUMN public.quote_requests.source IS 'Where the lead came from: website, referral, etc.';
