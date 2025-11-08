/**
 * Central configuration and constants for the Solar Installers TX application
 * This file centralizes configuration values to reduce hardcoded values throughout the codebase
 */

/**
 * Site Configuration
 * Contains essential site information and contact details
 */
export const SITE_CONFIG = {
  // Site Metadata
  name: 'Solar Installers TX',
  baseUrl: import.meta.env.PROD ? 'https://solarinstallerstx.com' : 'http://localhost:5174',
  description: 'Find and compare the best solar installers in Texas with our 100-point Safety Scoring System',

  // Contact Information
  email: 'info@solarinstallerstx.com',
  phone: '+1 (512) 555-0123',
  phone_clean: '5125550123',

  // Location
  city: 'Austin',
  state: 'Texas',
  state_code: 'TX',
  country: 'United States',

  // Social Links
  social: {
    facebook: 'https://facebook.com/solarinstallerstx',
    twitter: 'https://twitter.com/solarinstallerstx',
    linkedin: 'https://linkedin.com/company/solarinstallerstx',
    instagram: 'https://instagram.com/solarinstallerstx',
  },
};

/**
 * Image Paths
 * Centralized paths for commonly used images and assets
 */
export const IMAGE_PATHS = {
  // Logo
  logo: '/images/logo.png',
  logo_dark: '/images/logo-dark.png',
  logo_white: '/images/logo-white.png',

  // Hero/Banner Images
  hero_main: '/images/hero-main.jpg',
  hero_solar_panel: '/images/solar-panel-hero.jpg',
  hero_installation: '/images/installation-hero.jpg',

  // Feature Images
  feature_safety_score: '/images/feature-safety-score.png',
  feature_certified: '/images/feature-certified.png',
  feature_trusted: '/images/feature-trusted.png',

  // Installer Related
  installer_avatar_default: '/images/installer-avatar-default.png',
  installer_badge_gold: '/images/badge-gold.png',
  installer_badge_silver: '/images/badge-silver.png',
  installer_badge_bronze: '/images/badge-bronze.png',

  // Icons
  icon_check: '/images/icon-check.svg',
  icon_star: '/images/icon-star.svg',
  icon_location: '/images/icon-location.svg',
  icon_phone: '/images/icon-phone.svg',
  icon_email: '/images/icon-email.svg',

  // Testimonials
  testimonial_avatar_1: '/images/testimonial-1.jpg',
  testimonial_avatar_2: '/images/testimonial-2.jpg',
  testimonial_avatar_3: '/images/testimonial-3.jpg',

  // 404/Error Pages
  error_404: '/images/error-404.png',
  error_500: '/images/error-500.png',

  // Favicon
  favicon: '/favicon.ico',
  favicon_16: '/favicon-16x16.png',
  favicon_32: '/favicon-32x32.png',
  apple_touch_icon: '/apple-touch-icon.png',
};

/**
 * Safety Score Configuration
 * Defines tier thresholds and scoring rules
 */
export const SAFETY_SCORE_CONFIG = {
  // Tier Thresholds
  GOLD_MIN: 85,
  SILVER_MIN: 70,
  BRONZE_MIN: 60,

  // Tier Names
  GOLD: 'Gold',
  SILVER: 'Silver',
  BRONZE: 'Bronze',
  UNRANKED: 'Unranked',

  // Scoring Categories
  categories: {
    FINANCIAL_STABILITY: {
      name: 'Financial Stability',
      max_points: 30,
      description: 'Insurance coverage, bonding, and bankruptcy history',
    },
    PROFESSIONAL_CREDENTIALS: {
      name: 'Professional Credentials',
      max_points: 25,
      description: 'NABCEP certification, licenses, and qualifications',
    },
    CUSTOMER_PROTECTION: {
      name: 'Customer Protection',
      max_points: 25,
      description: 'Warranties, BBB ratings, and complaint history',
    },
    TRACK_RECORD: {
      name: 'Track Record',
      max_points: 20,
      description: 'Years in business, installations, and customer ratings',
    },
  },

  // Total Points
  TOTAL_POINTS: 100,
};

/**
 * Stripe Configuration
 * Contains Stripe-related constants for subscriptions
 */
export const STRIPE_CONFIG = {
  // Pricing Tiers
  tiers: {
    BASIC: {
      name: 'Basic',
      price_monthly: 99,
      price_id: import.meta.env.VITE_STRIPE_PRICE_BASIC || '',
      description: 'Enhanced listing with verified badge',
    },
    PREMIUM: {
      name: 'Premium',
      price_monthly: 199,
      price_id: import.meta.env.VITE_STRIPE_PRICE_PREMIUM || '',
      description: 'Featured placement + top search results',
      badge: 'Most Popular',
    },
    ENTERPRISE: {
      name: 'Enterprise',
      price_monthly: 399,
      price_id: import.meta.env.VITE_STRIPE_PRICE_ENTERPRISE || '',
      description: 'Homepage feature + priority placement',
    },
  },

  // Checkout URLs
  success_url: '/upgrade-to-premium?success=true',
  cancel_url: '/upgrade-to-premium?canceled=true',
};

/**
 * Routes Configuration
 * Centralized route paths for the application
 */
export const ROUTES = {
  HOME: '/',
  INSTALLERS: '/installers',
  INSTALLER_DETAIL: (slug: string) => `/installer/${slug}`,
  ADMIN: '/admin',
  UPGRADE_PREMIUM: '/upgrade-to-premium',
  QUOTE: '/quote',
  SAFETY_SCORE_EXPLAINED: '/safety-score-explained',
  ABOUT: '/about',
  CONTACT: '/contact',
  FAQ: '/faq',
  BLOG: '/blog',
  BLOG_POST: (slug: string) => `/blog/${slug}`,
  PRIVACY: '/privacy',
  TERMS: '/terms',
  REFUND: '/refund',
  LEARN: '/learn',
  TEXAS_GUIDE: '/texas-solar-guide',
  TEXAS_INCENTIVES: '/texas-solar-incentives',
  AUTH: '/auth',
};

/**
 * Pagination Configuration
 */
export const PAGINATION_CONFIG = {
  INSTALLERS_PER_PAGE: 12,
  BLOG_POSTS_PER_PAGE: 10,
  SEARCH_RESULTS_PER_PAGE: 20,
};

/**
 * Toast Notification Configuration
 */
export const TOAST_CONFIG = {
  DURATION: 4000,
  POSITION: 'bottom-right' as const,
  MAX_TOASTS: 5,
};

/**
 * API Configuration
 */
export const API_CONFIG = {
  BASE_URL: import.meta.env.PROD
    ? 'https://solarinstallerstx.com/api'
    : 'http://localhost:3000/api',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

/**
 * Analytics Configuration
 */
export const ANALYTICS_CONFIG = {
  ENABLED: import.meta.env.PROD,
  TRACKING_ID: 'G-XXXXXXXXXX', // Update with actual Google Analytics ID
};

/**
 * Feature Flags
 * Toggle features for gradual rollout or testing
 */
export const FEATURE_FLAGS = {
  INSTALLER_REVIEWS: true,
  PAYMENT_PROCESSING: true,
  ADVANCED_FILTERS: true,
  SERVICE_AREA_MAP: true,
  NEWSLETTER_SIGNUP: true,
  LIVE_CHAT: false,
};

/**
 * Error Messages
 * Standardized error messages for consistent UX
 */
export const ERROR_MESSAGES = {
  GENERIC: 'An unexpected error occurred. Please try again.',
  NETWORK: 'Network connection failed. Please check your internet and try again.',
  AUTH_FAILED: 'Authentication failed. Please check your credentials.',
  VALIDATION_FAILED: 'Please check your input and try again.',
  NOT_FOUND: 'The requested resource was not found.',
  PERMISSION_DENIED: 'You do not have permission to perform this action.',
  SERVER_ERROR: 'Server error occurred. Please try again later.',
  PAYMENT_FAILED: 'Payment processing failed. Please try again.',
};

/**
 * Success Messages
 * Standardized success messages
 */
export const SUCCESS_MESSAGES = {
  SIGNUP: 'Account created successfully! Please check your email to confirm.',
  LOGIN: 'Logged in successfully!',
  LOGOUT: 'Logged out successfully.',
  SAVED: 'Changes saved successfully!',
  DELETED: 'Item deleted successfully.',
  PAYMENT_COMPLETE: 'Payment processed successfully!',
  QUOTE_SUBMITTED: 'Quote request submitted successfully!',
};

/**
 * Validation Configuration
 */
export const VALIDATION_CONFIG = {
  // Email
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  // Phone (US)
  PHONE_REGEX: /^(\+1)?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/,

  // Password
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_REQUIRES_UPPERCASE: true,
  PASSWORD_REQUIRES_NUMBER: true,
  PASSWORD_REQUIRES_SPECIAL: false,

  // Username/Slug
  SLUG_REGEX: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  SLUG_MIN_LENGTH: 3,
  SLUG_MAX_LENGTH: 50,
};

/**
 * Cache Configuration
 */
export const CACHE_CONFIG = {
  INSTALLERS_CACHE_TIME: 1000 * 60 * 5, // 5 minutes
  INSTALLER_DETAIL_CACHE_TIME: 1000 * 60 * 10, // 10 minutes
  SEARCH_RESULTS_CACHE_TIME: 1000 * 60 * 3, // 3 minutes
};

/**
 * Accessibility Configuration
 */
export const A11Y_CONFIG = {
  SKIP_TO_CONTENT: '#main-content',
  FOCUS_VISIBLE_CLASS: 'focus-visible',
};
