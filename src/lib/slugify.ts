/**
 * Generate a URL-friendly slug from installer data
 */
export const generateInstallerSlug = (
  companyName: string | null,
  name: string,
  city: string,
  state: string,
  id: string
): string => {
  const displayName = companyName || name;
  
  // Create base slug from name and location
  const baseSlug = `${displayName}-${city}-${state}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single
  
  // Append ID to ensure uniqueness
  return `${baseSlug}-${id}`;
};

/**
 * Extract installer ID from slug
 */
export const getInstallerIdFromSlug = (slug: string): string => {
  const parts = slug.split('-');
  return parts[parts.length - 1];
};
