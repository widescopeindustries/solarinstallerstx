export const generateInstallerSlug = (
  companyName: string | null,
  name: string,
): string => {
  const displayName = companyName || name;
  
  return displayName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with a single one
};

export const generateCitySlug = (city: string): string => {
  return city
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

/**
 * Extract installer ID from slug
 */
export const getInstallerIdFromSlug = (slug: string): string => {
  const parts = slug.split('-');
  // This logic might need to be updated if the old slug format is fully deprecated
  // For now, it assumes the ID is the last part of the old slug format
  return parts[parts.length - 1];
};
