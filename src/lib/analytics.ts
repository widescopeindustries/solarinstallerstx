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
