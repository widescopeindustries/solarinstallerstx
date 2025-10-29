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
    // Log to your backend API for permanent record
    await fetch('/api/tcpa-consent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        page: window.location.href
      })
    });

    // Also log to analytics for tracking
    logEvent('tcpa_consent', {
      consent_version: data.version,
      consent_timestamp: data.timestamp,
      lead_source: window.location.pathname
    });
  } catch (error) {
    console.error('Failed to log TCPA consent:', error);
    throw new Error('Failed to record consent. Please try again.');
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
