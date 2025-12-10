/**
 * ContentGuard - Trust Sanitization Utility
 * Prevents placeholder text and incomplete data from being displayed to users
 * Part of "Operation Lone Star Top Tier" - Trust is everything
 */

const TRUST_KILLERS = [
    /lorem ipsum/i,
    /\[.*?\]/g, // Bracket placeholders like [Homeowner Name]
    /\*{4,}/g, // Asterisk masks like ********
    /coming soon/i,
    /note:/i,
    /this section will be populated/i,
    /placeholder/i,
    /todo:/i,
    /tbd/i,
];

/**
 * Checks if text contains trust-killing placeholders
 * @param text - Text to check
 * @returns true if text is safe to display
 */
export function isSafeContent(text: string | null | undefined): boolean {
    if (!text || text.trim() === '') return false;

    return !TRUST_KILLERS.some(pattern => pattern.test(text));
}

/**
 * Sanitizes text by returning null if it contains trust killers
 * Use this in conditional rendering
 * @param text - Text to sanitize
 * @returns Original text if safe, null if contains placeholders
 */
export function sanitizeContent(text: string | null | undefined): string | null {
    if (!isSafeContent(text)) return null;
    return text!;
}

/**
 * SafeText wrapper component - only renders if content is safe
 */
export function SafeText({
    children,
    fallback = null
}: {
    children: string | null | undefined;
    fallback?: React.ReactNode;
}) {
    if (!isSafeContent(children)) return fallback;
    return <>{children}</>;
}

/**
 * Conditional section wrapper - hides entire section if content is unsafe
 */
export function SafeSection({
    condition,
    fallback = null,
    children,
}: {
    condition: boolean | string | null | undefined;
    fallback?: React.ReactNode;
    children: React.ReactNode;
}) {
    // If condition is a string, check if it's safe content
    if (typeof condition === 'string') {
        if (!isSafeContent(condition)) return fallback;
    }

    // If condition is boolean or truthy
    if (!condition) return fallback;

    return <>{children}</>;
}

/**
 * Unmask certified IDs - NABCEP numbers are our competitive advantage
 * Never hide them with asterisks
 * @param certNumber - Certification number
 * @returns Full certification number (never masked)
 */
export function displayCertification(certNumber: string | null | undefined): string | null {
    if (!certNumber) return null;

    // Return FULL number - transparency builds trust
    return certNumber;
}

/**
 * Fallback for missing city-specific data
 * Returns state average or hides the stat entirely
 */
export function getStatOrFallback<T>(
    cityValue: T | null | undefined,
    stateAverage: T,
    hideIfMissing: boolean = false
): T | null {
    if (cityValue !== null && cityValue !== undefined) {
        return cityValue;
    }

    if (hideIfMissing) {
        return null;
    }

    return stateAverage;
}
