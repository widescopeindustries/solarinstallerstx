-- Create TCPA consent logging table for legal compliance
-- Stores all user consent for phone/SMS communications

CREATE TABLE public.tcpa_consent_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Contact Information
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,

  -- Consent Details
  consent_version TEXT NOT NULL DEFAULT '1.0',
  consent_text TEXT NOT NULL, -- Full text of what user agreed to
  consent_granted BOOLEAN DEFAULT true,
  consent_type TEXT DEFAULT 'opt-in', -- opt-in, opt-out

  -- Technical Metadata for Audit Trail
  timestamp TIMESTAMPTZ DEFAULT now() NOT NULL,
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  page_url TEXT,

  -- Lead Context
  lead_source TEXT, -- quote form, contact form, etc.
  form_data JSONB, -- Additional form data for context

  -- Optional: Link to quote request if applicable
  quote_request_id UUID REFERENCES public.quote_requests(id) ON DELETE SET NULL,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.tcpa_consent_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Very restrictive since this is sensitive legal data
-- Only allow insertions (for logging consent)
CREATE POLICY "Anyone can insert TCPA consent logs"
ON public.tcpa_consent_logs
FOR INSERT
WITH CHECK (true);

-- Only admins can view consent logs
CREATE POLICY "Admins can view all TCPA consent logs"
ON public.tcpa_consent_logs
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can update (e.g., to mark as processed)
CREATE POLICY "Admins can update TCPA consent logs"
ON public.tcpa_consent_logs
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- No deletions allowed - legal records must be preserved
-- If you need to delete, you'll need to do it directly in the database with admin access

-- Create indexes for quick lookups
CREATE INDEX idx_tcpa_consent_phone ON public.tcpa_consent_logs(phone);
CREATE INDEX idx_tcpa_consent_email ON public.tcpa_consent_logs(email);
CREATE INDEX idx_tcpa_consent_timestamp ON public.tcpa_consent_logs(timestamp DESC);
CREATE INDEX idx_tcpa_consent_quote_request ON public.tcpa_consent_logs(quote_request_id);

-- Add trigger for updated_at
CREATE TRIGGER update_tcpa_consent_logs_updated_at
  BEFORE UPDATE ON public.tcpa_consent_logs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add comments for documentation
COMMENT ON TABLE public.tcpa_consent_logs IS 'Legal audit trail for TCPA (Telephone Consumer Protection Act) consent tracking';
COMMENT ON COLUMN public.tcpa_consent_logs.consent_text IS 'Full verbatim text of the consent agreement shown to the user';
COMMENT ON COLUMN public.tcpa_consent_logs.ip_address IS 'IP address of user for legal verification';
COMMENT ON COLUMN public.tcpa_consent_logs.user_agent IS 'Browser user agent for audit trail';
