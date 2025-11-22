/**
 * Centralized data utilities export
 * Import all data fetching functions from a single location
 */

// Installer utilities
export {
  getAllInstallers,
  getInstallersByCity,
  getInstallerBySlug,
  getTopInstallers,
  getNABCEPInstallers,
  getInstallersByTier,
  getPremiumInstallers,
  getInstallerCount,
  getInstallersByRegion,
  searchInstallers,
} from './installers'

// City utilities
export {
  texasCities,
  getCityBySlug,
  getAllCitySlugs,
  getInstallerCountByCity,
  getAllCitiesWithCounts,
  getTopCitiesByInstallerCount,
  getCitiesByRegion,
  getAllRegions,
  getCitiesByPopulation,
  searchCities,
  getMajorCities,
  getNearbyCities,
  type CityData,
} from './cities'

// Blog utilities
export {
  getAllBlogPosts,
  getBlogPostBySlug,
  getRecentBlogPosts,
  getBlogPostsByCategory,
  getAllBlogCategories,
  getRelatedBlogPosts,
  getBlogPostCount,
  searchBlogPosts,
} from './blog'

// Quote request utilities
export {
  createQuoteRequest,
  logTCPAConsent,
  getQuoteRequestById,
} from './quotes'

// Revalidation utilities
export {
  revalidateInstallers,
  revalidateCityPage,
  revalidateInstallerPage,
  revalidateAllCityPages,
  revalidateInstallerDirectory,
  revalidateHomePage,
  revalidateBlogPosts,
  revalidateEntireSite,
  revalidateAfterInstallerUpdate,
  revalidateAfterInstallerCreation,
  revalidateAfterInstallerDeletion,
} from '../revalidate'

// Performance utilities
export {
  streamInstallers,
  fetchParallel,
  batchArray,
  debounce,
  throttle,
  memoize,
  createImageObserver,
  preloadImage,
  preloadImages,
  hashString,
  formatNumber,
  formatCurrency,
  calculateReadingTime,
  truncateText,
  generateSlug,
  parseQueryString,
  buildQueryString,
  isClient,
  isServer,
  getLocalStorage,
  setLocalStorage,
} from '../performance'
