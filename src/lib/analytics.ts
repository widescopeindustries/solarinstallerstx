interface TCPAConsentData {
  name: string;
  phone: string;
  email: string;
  timestamp: string;
  ip: string;
  version: string;
  userAgent?: string;
}

export const logTCPAConsent = async (data: TCPAConsentData) => {
  try {
    // Log to analytics for tracking
    logEvent('tcpa_consent', {
      consent_version: data.version,
      consent_timestamp: data.timestamp,
      lead_source: window.location.pathname
    });

    // TODO: Implement server-side TCPA consent logging
    // For production, you should:
    // 1. Create a Supabase table for TCPA consent records
    // 2. Log consent data with IP, user agent, timestamp
    // 3. Consider using a third-party compliance service
    //
    // Example implementation:
    // import { supabase } from '@/integrations/supabase/client';
    // await supabase.from('tcpa_consent_logs').insert({
    //   ...data,
    //   user_agent: navigator.userAgent,
    //   referrer: document.referrer,
    //   page: window.location.href
    // });

    console.warn('TCPA consent logged to analytics only. Server-side logging not yet implemented.');
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
