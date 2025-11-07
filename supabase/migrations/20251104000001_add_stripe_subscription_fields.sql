-- Add Stripe subscription tracking fields to installers table
ALTER TABLE public.installers
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT,
ADD COLUMN IF NOT EXISTS subscription_tier TEXT,
ADD COLUMN IF NOT EXISTS subscription_status TEXT,
ADD COLUMN IF NOT EXISTS subscription_start_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS subscription_end_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS last_payment_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS email TEXT;

-- Create indexes for Stripe lookups
CREATE INDEX IF NOT EXISTS idx_installers_stripe_customer ON public.installers(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_installers_stripe_subscription ON public.installers(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_installers_email ON public.installers(email);
CREATE INDEX IF NOT EXISTS idx_installers_subscription_status ON public.installers(subscription_status);

-- Add comment for documentation
COMMENT ON COLUMN public.installers.stripe_customer_id IS 'Stripe customer ID for payment processing';
COMMENT ON COLUMN public.installers.stripe_subscription_id IS 'Active Stripe subscription ID';
COMMENT ON COLUMN public.installers.subscription_tier IS 'Subscription tier: basic, premium, or enterprise';
COMMENT ON COLUMN public.installers.subscription_status IS 'Stripe subscription status: active, past_due, canceled, etc.';
COMMENT ON COLUMN public.installers.subscription_start_date IS 'Date when subscription became active';
COMMENT ON COLUMN public.installers.subscription_end_date IS 'End date of current subscription period';
COMMENT ON COLUMN public.installers.last_payment_date IS 'Date of most recent successful payment';
COMMENT ON COLUMN public.installers.email IS 'Contact email for installer (used for Stripe customer matching)';
