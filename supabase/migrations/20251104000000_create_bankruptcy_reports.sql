-- Create bankruptcy_reports table to store installer issue reports
-- This table stores reports from users about problematic solar installers

CREATE TABLE IF NOT EXISTS public.bankruptcy_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Reporter Information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  city TEXT NOT NULL,

  -- Installer Information
  company_name TEXT NOT NULL,
  issue_type TEXT NOT NULL, -- bankruptcy, closed, unfinished, warranty, deposit, fraud, other
  deposit_amount TEXT,
  date_of_contract DATE,

  -- Issue Description
  description TEXT NOT NULL,

  -- Report Status & Processing
  status TEXT DEFAULT 'new' NOT NULL, -- new, investigating, verified, resolved, invalid
  admin_notes TEXT,
  action_taken TEXT, -- What action was taken (updated safety score, removed listing, etc.)

  -- Metadata
  ip_address INET,
  user_agent TEXT,
  source TEXT DEFAULT 'website',

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  reviewed_at TIMESTAMPTZ,

  -- Optional: Link to installer if they exist in our database
  installer_id UUID REFERENCES public.installers(id) ON DELETE SET NULL
);

-- Enable Row Level Security
ALTER TABLE public.bankruptcy_reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Allow anyone to submit bankruptcy reports (public form)
CREATE POLICY "Anyone can submit bankruptcy reports"
ON public.bankruptcy_reports
FOR INSERT
WITH CHECK (true);

-- Only admins can view all bankruptcy reports
CREATE POLICY "Admins can view all bankruptcy reports"
ON public.bankruptcy_reports
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.raw_user_meta_data->>'role' = 'admin'
  )
);

-- Users can view their own reports (by email)
CREATE POLICY "Users can view their own bankruptcy reports"
ON public.bankruptcy_reports
FOR SELECT
USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Only admins can update bankruptcy reports (change status, add notes, etc.)
CREATE POLICY "Admins can update bankruptcy reports"
ON public.bankruptcy_reports
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.raw_user_meta_data->>'role' = 'admin'
  )
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_bankruptcy_reports_company_name ON public.bankruptcy_reports(company_name);
CREATE INDEX IF NOT EXISTS idx_bankruptcy_reports_email ON public.bankruptcy_reports(email);
CREATE INDEX IF NOT EXISTS idx_bankruptcy_reports_status ON public.bankruptcy_reports(status);
CREATE INDEX IF NOT EXISTS idx_bankruptcy_reports_issue_type ON public.bankruptcy_reports(issue_type);
CREATE INDEX IF NOT EXISTS idx_bankruptcy_reports_created_at ON public.bankruptcy_reports(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bankruptcy_reports_installer_id ON public.bankruptcy_reports(installer_id);

-- Add trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_bankruptcy_reports_updated_at
  BEFORE UPDATE ON public.bankruptcy_reports
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add comments for documentation
COMMENT ON TABLE public.bankruptcy_reports IS 'Stores user reports about problematic solar installers including bankruptcies, fraud, and warranty issues';
COMMENT ON COLUMN public.bankruptcy_reports.status IS 'Report status: new, investigating, verified, resolved, invalid';
COMMENT ON COLUMN public.bankruptcy_reports.issue_type IS 'Type of issue: bankruptcy, closed, unfinished, warranty, deposit, fraud, other';
COMMENT ON COLUMN public.bankruptcy_reports.action_taken IS 'What action was taken after investigation (updated safety score, removed listing, etc.)';
