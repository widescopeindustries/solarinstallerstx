/**
 * Get the color classes for a given tier
 * @param tier - The tier type (Gold, Silver, Bronze, or null/undefined)
 * @returns Tailwind CSS class string for the tier color
 */
export const getTierColor = (tier: string | null | undefined): string => {
  switch (tier) {
    case 'Gold':
      return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-500/20';
    case 'Silver':
      return 'bg-slate-500/10 text-slate-700 dark:text-slate-400 hover:bg-slate-500/20';
    case 'Bronze':
      return 'bg-orange-500/10 text-orange-700 dark:text-orange-400 hover:bg-orange-500/20';
    default:
      return 'bg-muted text-muted-foreground hover:bg-muted/80';
  }
};

/**
 * Get the color classes for a given tier without hover state
 * Used in list views and compact layouts
 * @param tier - The tier type (Gold, Silver, Bronze, or null/undefined)
 * @returns Tailwind CSS class string for the tier color
 */
export const getTierColorNoHover = (tier: string | null | undefined): string => {
  switch (tier) {
    case 'Gold':
      return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
    case 'Silver':
      return 'bg-slate-500/10 text-slate-700 dark:text-slate-400';
    case 'Bronze':
      return 'bg-orange-500/10 text-orange-700 dark:text-orange-400';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

/**
 * Get the color classes for a given tier with border
 * Used in featured installer cards
 * @param tier - The tier type (Gold, Silver, Bronze, or null/undefined)
 * @returns Tailwind CSS class string for the tier color with border
 */
export const getTierColorWithBorder = (tier: string | null | undefined): string => {
  switch (tier) {
    case 'Gold':
      return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20';
    case 'Silver':
      return 'bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-500/20';
    case 'Bronze':
      return 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20';
    default:
      return 'bg-muted text-muted-foreground';
  }
};
