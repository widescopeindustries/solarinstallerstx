/**
 * Centralized Analytics Tracking System
 * Clean, typed event tracking for Google Analytics 4
 */

// Primary GA4 Measurement ID
const GA_MEASUREMENT_ID = 'G-3RWQE8Q06E';

/**
 * Check if GA4 is loaded and ready
 */
const isGA4Ready = (): boolean => {
  if (typeof window === "undefined") return false;
  // @ts-expect-error GA4_READY is set in index.html
  return Boolean(window.GA4_READY && window.gtag);
};

/**
 * Debug helper for analytics
 */
const debugLog = (message: string, data?: any) => {
  if (typeof window !== "undefined" && (window as any).GA_DEBUG) {
    (window as any).GA_DEBUG.log(message, data);
  } else if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', message, data || '');
  }
};

// Event Categories for Organization
export enum AnalyticsCategory {
  CONVERSION = 'conversion',
  ENGAGEMENT = 'engagement',
  NAVIGATION = 'navigation',
  ERROR = 'error',
}

// Lead Values (in USD) for conversion tracking
export const LEAD_VALUES = {
  CONSUMER_QUOTE: 25,        // B2C: Homeowner requesting quote
  INSTALLER_LISTING: 500,    // B2B: Installer wanting to get listed
  INSTALLER_CONTACT: 15,     // B2C: User contacting an installer
  PHONE_CALL: 30,           // High-value: User calling
};

/**
 * Core Analytics Function
 * Sends events to Google Analytics
 */
export const logEvent = (eventName: string, params: Record<string, any> = {}) => {
  if (typeof window === "undefined") {
    debugLog('Skipping event (server-side)', eventName);
    return;
  }

  // Check if GA4 is ready
  if (!isGA4Ready()) {
    debugLog(`GA4 not ready, queueing event: ${eventName}`, params);
    // Queue event to be sent once GA4 is ready
    setTimeout(() => {
      if (isGA4Ready()) {
        logEvent(eventName, params);
      } else {
        console.warn('GA4 still not ready after delay, event dropped:', eventName);
      }
    }, 1000);
    return;
  }

  try {
    // @ts-expect-error gtag is loaded via external script
    if (window.gtag) {
      // @ts-expect-error gtag is loaded via external script
      window.gtag("event", eventName, {
        ...params,
        send_to: GA_MEASUREMENT_ID,
      });

      debugLog(`Event sent: ${eventName}`, params);
    } else {
      console.warn('GA4 window.gtag not available, event not sent:', eventName);
    }
  } catch (error) {
    console.error('Analytics error in logEvent:', eventName, error);
    if ((window as any).GA_DEBUG) {
      (window as any).GA_DEBUG.error('logEvent failed', { event: eventName, error });
    }
  }
};

/**
 * Page View Tracking
 * Call on route changes
 */
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  logEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle || document.title,
    page_location: window.location.href,
  });
};

// ============================================================================
// CONVERSION EVENTS (Money-making actions)
// ============================================================================

/**
 * Track Quote Form Submission (B2C)
 * HIGH VALUE: Homeowner requesting solar quotes
 */
export const trackQuoteSubmitted = (data: {
  city?: string;
  zipCode?: string;
  monthlyBill?: number;
  source?: string; // 'homepage' | 'city_page' | 'installer_page'
}) => {
  logEvent('quote_submitted', {
    category: AnalyticsCategory.CONVERSION,
    value: LEAD_VALUES.CONSUMER_QUOTE,
    currency: 'USD',
    ...data,
  });

  // Also track as standard conversion
  logEvent('conversion', {
    send_to: `${GA_MEASUREMENT_ID}/quote_lead`,
    value: LEAD_VALUES.CONSUMER_QUOTE,
    currency: 'USD',
  });
};

/**
 * Track "Get Listed" Button Click (B2B)
 * HIGHEST VALUE: Installer wanting premium listing
 */
export const trackGetListedClicked = (location: string) => {
  logEvent('get_listed_clicked', {
    category: AnalyticsCategory.CONVERSION,
    value: LEAD_VALUES.INSTALLER_LISTING,
    currency: 'USD',
    button_location: location, // 'header' | 'mobile_menu' | 'page_cta'
  });

  // Track as conversion
  logEvent('conversion', {
    send_to: `${GA_MEASUREMENT_ID}/installer_lead`,
    value: LEAD_VALUES.INSTALLER_LISTING,
    currency: 'USD',
  });
};

/**
 * Track Premium Plan Selection (B2B)
 * User viewing/selecting a specific premium tier
 */
export const trackPremiumPlanSelected = (plan: 'basic' | 'premium' | 'enterprise', price: number) => {
  logEvent('premium_plan_selected', {
    category: AnalyticsCategory.CONVERSION,
    plan_tier: plan,
    plan_price: price,
    value: LEAD_VALUES.INSTALLER_LISTING,
    currency: 'USD',
  });
};

/**
 * Track Installer Contact Button Click (B2C)
 * User clicking to contact a specific installer
 */
export const trackInstallerContacted = (data: {
  installerId: string;
  installerName: string;
  contactMethod: 'phone' | 'email' | 'website' | 'quote_button';
  source: string; // 'installer_card' | 'installer_profile' | 'search_results'
}) => {
  logEvent('installer_contacted', {
    category: AnalyticsCategory.CONVERSION,
    value: LEAD_VALUES.INSTALLER_CONTACT,
    currency: 'USD',
    ...data,
  });
};

/**
 * Track Phone Number Click (High Value)
 * User clicking any phone number on site
 */
export const trackPhoneClicked = (location: string, phoneNumber?: string) => {
  logEvent('phone_clicked', {
    category: AnalyticsCategory.CONVERSION,
    value: LEAD_VALUES.PHONE_CALL,
    currency: 'USD',
    phone_location: location, // 'header' | 'footer' | 'contact_page' | 'installer_card'
    phone_number: phoneNumber,
  });
};

// ============================================================================
// ENGAGEMENT EVENTS (User interest & behavior)
// ============================================================================

/**
 * Track City Page View
 * User viewing a specific city's installer directory
 */
export const trackCityPageView = (cityName: string, installerCount: number) => {
  logEvent('city_viewed', {
    category: AnalyticsCategory.ENGAGEMENT,
    city_name: cityName,
    installer_count: installerCount,
  });
};

/**
 * Track Installer Profile View
 * User viewing detailed installer profile
 */
export const trackInstallerProfileView = (data: {
  installerId: string;
  installerName: string;
  tier?: string; // 'gold' | 'silver' | 'bronze'
  isPremium?: boolean;
  safetyScore?: number;
}) => {
  logEvent('installer_viewed', {
    category: AnalyticsCategory.ENGAGEMENT,
    ...data,
  });
};

/**
 * Track Search Usage
 * User performing search for installers
 */
export const trackSearch = (data: {
  searchType: 'city' | 'address' | 'zipcode' | 'keyword';
  query: string;
  resultsCount?: number;
}) => {
  logEvent('search_performed', {
    category: AnalyticsCategory.ENGAGEMENT,
    ...data,
  });
};

/**
 * Track Filter Usage
 * User filtering installer results
 */
export const trackFilterUsed = (filterType: string, filterValue: string) => {
  logEvent('filter_used', {
    category: AnalyticsCategory.ENGAGEMENT,
    filter_type: filterType, // 'tier' | 'certification' | 'city'
    filter_value: filterValue,
  });
};

/**
 * Track Installer Card Click
 * User clicking on installer card in list view
 */
export const trackInstallerCardClicked = (data: {
  installerId: string;
  installerName: string;
  position: number; // Position in list (1-indexed)
  source: string; // 'homepage' | 'city_page' | 'search_results'
}) => {
  logEvent('installer_card_clicked', {
    category: AnalyticsCategory.ENGAGEMENT,
    ...data,
  });
};

// ============================================================================
// NAVIGATION EVENTS (User journey tracking)
// ============================================================================

/**
 * Track Button Click
 * Generic button tracking for CTAs
 */
export const trackButtonClick = (buttonLabel: string, destination?: string) => {
  logEvent('button_clicked', {
    category: AnalyticsCategory.NAVIGATION,
    button_label: buttonLabel,
    destination_url: destination,
  });
};

/**
 * Track Email Click
 * User clicking email addresses
 */
export const trackEmailClicked = (location: string, emailAddress?: string) => {
  logEvent('email_clicked', {
    category: AnalyticsCategory.NAVIGATION,
    email_location: location,
    email_address: emailAddress,
  });
};

/**
 * Track External Link Click
 * User clicking links to external sites
 */
export const trackExternalLinkClicked = (data: {
  linkText: string;
  linkUrl: string;
  source: string;
}) => {
  logEvent('external_link_clicked', {
    category: AnalyticsCategory.NAVIGATION,
    ...data,
  });
};

// ============================================================================
// ERROR TRACKING
// ============================================================================

/**
 * Track 404 Errors
 */
export const track404Error = (path: string) => {
  logEvent('error_404', {
    category: AnalyticsCategory.ERROR,
    page_path: path,
  });
};

/**
 * Track Form Errors
 */
export const trackFormError = (formName: string, errorField: string, errorMessage: string) => {
  logEvent('form_error', {
    category: AnalyticsCategory.ERROR,
    form_name: formName,
    error_field: errorField,
    error_message: errorMessage,
  });
};

// ============================================================================
// TCPA COMPLIANCE TRACKING
// ============================================================================

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
    // Log to analytics
    logEvent('tcpa_consent_logged', {
      consent_version: data.version,
      consent_timestamp: data.timestamp,
      lead_source: window.location.pathname,
    });

    // Server-side TCPA logging
    const { supabase } = await import('@/app/lib/supabase/client');

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
    }
  } catch (error) {
    console.error('Failed to log TCPA consent:', error);
  }
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Initialize Analytics
 * Call once on app start
 */
export const initializeAnalytics = () => {
  if (typeof window === "undefined") return;

  // Send initial page view
  trackPageView(window.location.pathname, document.title);

  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics initialized:', GA_MEASUREMENT_ID);
  }
};

/**
 * Update User Consent (GDPR/CCPA)
 */
export const updateConsent = (analyticsGranted: boolean, adStorageGranted: boolean) => {
  if (typeof window === "undefined") return;

  try {
    // @ts-expect-error gtag is loaded via external script
    if (window.gtag) {
      // @ts-expect-error gtag is loaded via external script
      window.gtag('consent', 'update', {
        'analytics_storage': analyticsGranted ? 'granted' : 'denied',
        'ad_storage': adStorageGranted ? 'granted' : 'denied',
      });
    }
  } catch (error) {
    console.error('Consent update error:', error);
  }
};

/**
 * Track Premier Installer Lead
 * Track high-value B2B leads from installers
 */
export const trackPremierInstallerLead = (contactMethod: string, location: string) => {
  if (typeof window === "undefined") return;

  try {
    // @ts-expect-error gtag is loaded via external script
    if (window.gtag) {
      // First call - generate_lead with dual GA properties
      // @ts-expect-error gtag is loaded via external script
      window.gtag('event', 'generate_lead', {
        currency: 'USD',
        value: 500,
        lead_type: 'premier_installer',
        contact_method: contactMethod,
        location: location,
        business_type: 'B2B',
        send_to: ['G-3RWQE8Q06E', 'G-5NXSKV8T'],
      });

      // Second call - conversion with dual GA properties
      // @ts-expect-error gtag is loaded via external script
      window.gtag('event', 'conversion', {
        send_to: ['G-3RWQE8Q06E/premier_installer_lead', 'G-5NXSKV8T/premier_installer_lead'],
        value: 500,
        currency: 'USD',
      });
    }
  } catch (error) {
    console.error('Premier installer lead tracking error:', error);
  }
};
