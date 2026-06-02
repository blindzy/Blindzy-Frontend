// Shared utility functions for customization components

/**
 * Format a number with commas and 2 decimal places
 */
export const addCommaToNumber = (num: number): string => {
    return num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

/**
 * Derive a human-readable colour name from an image URL.
 * e.g. ".../1780338389178-light%20grey.jpg" -> "light grey"
 */
export const getColorNameFromUrl = (url?: string): string => {
    const fileName = (url || '').split('/').pop() || '';
    const withoutExt = fileName.replace(/\.[^.]+$/, '').replace(/^\d+-/, '');
    try {
        return decodeURIComponent(withoutExt);
    } catch {
        return withoutExt;
    }
};

/**
 * Get currency symbol from currency code
 */
export const getCurrencySymbol = (code: string): string => {
    switch (code.toLowerCase()) {
        case 'usd': return '$';
        case 'aud': return 'A$';
        case 'gbp': return '£';
        case 'eur': return 'A$';
        case 'inr': return '₹';
        case 'nzd': return 'NZ$';
        default: return code ? code.toUpperCase() + ' ' : '';
    }
};
