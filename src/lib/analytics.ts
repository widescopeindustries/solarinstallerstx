export interface TCPAConsentData {
  name: string;
  phone: string;
  email: string;
  timestamp: string;
  ip: string;
  version: string;
  userAgent?: string;
}

export const logTCPAConsent = async (data: TCPAConsentData, quoteRequestId?: string) => {
  try {
    // Log to analytics for tracking
    logEvent('tcpa_consent', {
      consent_version: data.version,
      consent_timestamp: data.timestamp,
      lead_source: window.location.pathname
    });

    // Server-side TCPA consent logging for legal compliance
    const { supabase } = await import('@/integrations/supabase/client');

    const consentText = `By submitting this form, I agree to receive calls, text messages, and emails from SolarInstallersTX.com and its certified partner installers regarding solar installation services. I understand that these communications may be automated and that my consent is not required to make a purchase. Message and data rates may apply.`;

    const { error } = await supabase.from('tcpa_consent_logs').insert({
      name: data.name,
      phone: data.phone,
      email: data.email,
      timestamp: data.timestamp,
      ip_address: data.ip,
      consent_version: data.version,
      consent_text: consentText,
      user_agent: data.userAgent || navigator.userAgent,
      referrer: document.referrer,
      page_url: window.location.href,
      lead_source: 'quote_form',
      quote_request_id: quoteRequestId || null
    });

    if (error) {
      console.error('Failed to log TCPA consent to database:', error);
      // Continue execution - don't block user flow
    }
  } catch (error) {
    console.error('Failed to log TCPA consent:', error);
    // Don't throw error - failing to log consent shouldn't block the user
  }
};

export const logEvent = (eventName: string, params: Record<string, any> = {}) => {
  if (typeof window === "undefined") return;
  // @ts-ignore - gtag may not be on window until GA script loads
  if (window.gtag) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.gtag("event", eventName, params);
  }
};

// Track premier installer lead generation
export const trackPremierInstallerLead = (leadType: 'email_click' | 'button_click', location: string) => {
  logEvent('generate_lead', {
    currency: 'USD',
    value: 500, // Estimated value of a premier installer lead
    lead_type: 'premier_installer',
    contact_method: leadType,
    location: location,
    business_type: 'B2B',
    send_to: ['G-3RWQE8Q06E', 'G-5NXSKV8T']
  });

  // Also track as conversion to both properties
  logEvent('conversion', {
    send_to: ['G-3RWQE8Q06E/premier_installer_lead', 'G-5NXSKV8T/premier_installer_lead'],
    value: 500,
    currency: 'USD'
  });
};
