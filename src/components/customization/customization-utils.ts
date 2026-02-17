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
 * Get currency symbol from currency code
 */
export const getCurrencySymbol = (code: string): string => {
    switch (code.toLowerCase()) {
        case 'usd': return '$';
        case 'aud': return 'A$';
        case 'gbp': return '£';
        case 'eur': return '€';
        case 'inr': return '₹';
        case 'nzd': return 'NZ$';
        default: return code ? code.toUpperCase() + ' ' : '';
    }
};
