export const generateInstallerSlug = (
  companyName: string | null,
  name: string,
): string => {
  const displayName = companyName || name;

  return displayName
    .toLowerCase()
    .trim() // Remove leading/trailing whitespace first
    .replace(/\s+/g, '-') // Replace any whitespace (spaces, tabs, newlines) with hyphens
    .replace(/[^a-z0-9-]/g, '') // Remove special characters except hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with a single one
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

export const generateCitySlug = (city: string): string => {
  return city
    .toLowerCase()
    .trim() // Remove leading/trailing whitespace first
    .replace(/\s+/g, '-') // Replace any whitespace with hyphens
    .replace(/[^a-z0-9-]/g, '') // Remove special characters except hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with a single one
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

// Lazy-loaded mapping from installer id -> unique path (generated at build time)
let installerPathMap: Record<string, string> | null = null;
try {
  // Importing JSON requires resolveJsonModule in tsconfig; fallback guarded in catch
  installerPathMap = import.meta.glob<{ default: Record<string, string> }>('@/assets/installer-paths.json', {
    eager: true,
  })['@/assets/installer-paths.json']?.default ?? null;
} catch {
  installerPathMap = null;
}

export const buildInstallerPath = (
  installer: {
    id: string;
    name: string;
    company_name?: string | null;
    location_city: string;
  }
): string => {
  if (installerPathMap && installerPathMap[installer.id]) {
    return installerPathMap[installer.id];
  }
  const nameSlug = generateInstallerSlug(installer.company_name ?? null, installer.name);
  const citySlug = generateCitySlug(installer.location_city);
  return `/installers/${citySlug}/${nameSlug}`;
};

export const stripDisambiguationSuffix = (slug: string): string => {
  // Removes trailing -2, -3, ... if present
  return slug.replace(/-\d+$/, '');
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
