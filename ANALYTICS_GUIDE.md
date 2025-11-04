# Analytics Implementation Guide

## Overview
Clean, simple, robust Google Analytics 4 tracking system for SolarInstallersTX.com

**GA4 Property:** `G-3RWQE8Q06E`

---

## Event Categories

### 🎯 CONVERSION EVENTS (Revenue-generating)
High-value actions that lead to revenue:

| Event | Function | When to Use | Value |
|-------|----------|-------------|-------|
| `quote_submitted` | `trackQuoteSubmitted()` | User submits quote request form | $25 |
| `get_listed_clicked` | `trackGetListedClicked()` | Installer clicks "Get Listed" button | $500 |
| `premium_plan_selected` | `trackPremiumPlanSelected()` | Installer selects premium plan | $500 |
| `installer_contacted` | `trackInstallerContacted()` | User contacts an installer | $15 |
| `phone_clicked` | `trackPhoneClicked()` | User clicks phone number | $30 |

### 📊 ENGAGEMENT EVENTS (User interest)
User interactions showing interest:

| Event | Function | When to Use |
|-------|----------|-------------|
| `city_viewed` | `trackCityPageView()` | User views city installer page |
| `installer_viewed` | `trackInstallerProfileView()` | User views installer profile |
| `search_performed` | `trackSearch()` | User searches for installers |
| `filter_used` | `trackFilterUsed()` | User filters search results |
| `installer_card_clicked` | `trackInstallerCardClicked()` | User clicks installer card |

### 🔗 NAVIGATION EVENTS (User journey)
Navigation and button clicks:

| Event | Function | When to Use |
|-------|----------|-------------|
| `button_clicked` | `trackButtonClick()` | Generic CTA button clicks |
| `email_clicked` | `trackEmailClicked()` | User clicks email address |
| `external_link_clicked` | `trackExternalLinkClicked()` | User clicks external link |

### ❌ ERROR TRACKING
Errors and issues:

| Event | Function | When to Use |
|-------|----------|-------------|
| `error_404` | `track404Error()` | 404 page not found |
| `form_error` | `trackFormError()` | Form validation errors |

---

## Usage Examples

### Quote Form Submission
```typescript
import { trackQuoteSubmitted } from '@/lib/analytics';

// When user submits quote form
trackQuoteSubmitted({
  city: 'Austin',
  zipCode: '78701',
  monthlyBill: 150,
  source: 'homepage' // or 'city_page' | 'installer_page'
});
```

### Get Listed Button Click
```typescript
import { trackGetListedClicked } from '@/lib/analytics';

// In Header component
<Button onClick={() => trackGetListedClicked('header')}>
  Get Listed
</Button>

// In mobile menu
<Button onClick={() => trackGetListedClicked('mobile_menu')}>
  Get Listed
</Button>
```

### Installer Contact
```typescript
import { trackInstallerContacted } from '@/lib/analytics';

// When user clicks installer contact button
trackInstallerContacted({
  installerId: installer.id,
  installerName: installer.company_name,
  contactMethod: 'phone', // or 'email' | 'website' | 'quote_button'
  source: 'installer_card' // or 'installer_profile' | 'search_results'
});
```

### Phone Click
```typescript
import { trackPhoneClicked } from '@/lib/analytics';

// When user clicks phone number
<a
  href="tel:6829990953"
  onClick={() => trackPhoneClicked('header', '(682) 999-0953')}
>
  (682) 999-0953
</a>
```

### City Page View
```typescript
import { trackCityPageView } from '@/lib/analytics';

// In CityPage component
useEffect(() => {
  trackCityPageView('Austin', installers.length);
}, [installers]);
```

### Installer Profile View
```typescript
import { trackInstallerProfileView } from '@/lib/analytics';

// When installer profile loads
useEffect(() => {
  if (installer) {
    trackInstallerProfileView({
      installerId: installer.id,
      installerName: installer.company_name,
      tier: installer.tier,
      isPremium: installer.is_premium,
      safetyScore: installer.total_safety_score
    });
  }
}, [installer]);
```

### Search Tracking
```typescript
import { trackSearch } from '@/lib/analytics';

// When user performs search
const handleSearch = (query: string) => {
  const results = performSearch(query);

  trackSearch({
    searchType: 'city', // or 'address' | 'zipcode' | 'keyword'
    query: query,
    resultsCount: results.length
  });
};
```

### Premium Plan Selection
```typescript
import { trackPremiumPlanSelected } from '@/lib/analytics';

// When installer selects a plan on /upgrade-to-premium
<Button onClick={() => {
  trackPremiumPlanSelected('premium', 199);
  // proceed to checkout
}}>
  Select Premium - $199/mo
</Button>
```

---

## Key Conversion Goals in GA4

Set up these as conversions in your GA4 dashboard:

1. **quote_submitted** - Primary B2C conversion
2. **get_listed_clicked** - Primary B2B conversion
3. **installer_contacted** - Secondary B2C conversion
4. **phone_clicked** - High-intent conversion
5. **premium_plan_selected** - Checkout initiation

---

## Event Value Tracking

All conversion events include monetary value for ROI tracking:

```typescript
export const LEAD_VALUES = {
  CONSUMER_QUOTE: 25,        // Homeowner quote request
  INSTALLER_LISTING: 500,    // Installer signup
  INSTALLER_CONTACT: 15,     // User contacting installer
  PHONE_CALL: 30,           // Phone call
};
```

These values help track:
- Revenue attribution
- Cost per acquisition (CPA)
- Return on ad spend (ROAS)
- Funnel value

---

## Debug Mode

In development, all events are logged to console:

```
📊 Analytics Event: quote_submitted {category: 'conversion', value: 25, ...}
```

Set `import.meta.env.DEV` to see event details.

---

## GDPR/CCPA Compliance

Analytics consent is denied by default. Update consent when user accepts:

```typescript
import { updateConsent } from '@/lib/analytics';

// When user accepts analytics cookies
updateConsent(true, false); // (analyticsGranted, adStorageGranted)
```

---

## Common Patterns

### Button with Tracking
```typescript
<Button
  onClick={() => {
    trackButtonClick('Browse Installers', '/installers');
    navigate('/installers');
  }}
>
  Browse Installers
</Button>
```

### Link with Tracking
```typescript
<Link
  to="/installer/123"
  onClick={() => trackInstallerCardClicked({
    installerId: '123',
    installerName: 'Solar Co',
    position: 1,
    source: 'homepage'
  })}
>
  View Installer
</Link>
```

### Form Submission with Error Tracking
```typescript
try {
  await submitQuote(formData);
  trackQuoteSubmitted({
    city: formData.city,
    zipCode: formData.zipCode,
    source: 'contact_page'
  });
} catch (error) {
  trackFormError('quote_form', 'email', error.message);
}
```

---

## Migration Notes

**Old tracking functions (DEPRECATED):**
- ~~`logEvent('installer_get_listed_clicked')`~~ → Use `trackGetListedClicked(location)`
- ~~`logEvent('quote_submitted')`~~ → Use `trackQuoteSubmitted(data)`
- ~~`logEvent('click_phone_header')`~~ → Use `trackPhoneClicked(location, phone)`

**Old GA4 properties removed:**
- Removed: `G-5NXSKV8T` (secondary property)
- Keeping: `G-3RWQE8Q06E` (primary property)

---

## Questions?

All analytics code is in `src/lib/analytics.ts` with full TypeScript types and JSDoc comments.

**Key Functions:**
- `trackQuoteSubmitted()` - Quote submissions
- `trackGetListedClicked()` - Installer signup clicks
- `trackInstallerContacted()` - Contact clicks
- `trackPhoneClicked()` - Phone clicks
- `trackCityPageView()` - City page views
- `trackInstallerProfileView()` - Profile views
- `trackSearch()` - Search usage

**Lead Values:**
- Quote: $25
- Installer Listing: $500
- Contact: $15
- Phone: $30
