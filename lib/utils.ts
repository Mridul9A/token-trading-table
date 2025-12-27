// lib/utils.ts

/**
 * Merges Tailwind CSS classes with proper precedence
 * Simple implementation without external dependencies
 */
export function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(' ');
}

/**
 * Formats price with appropriate decimal places
 */
export const formatPrice = (price: number): string => {
  if (price < 0.01) return `$${price.toFixed(6)}`;
  if (price < 1) return `$${price.toFixed(4)}`;
  return `$${price.toFixed(2)}`;
};

/**
 * Formats volume with K/M suffixes
 */
export const formatVolume = (volume: number): string => {
  if (volume >= 1000000000) return `$${(volume / 1000000000).toFixed(2)}B`;
  if (volume >= 1000000) return `$${(volume / 1000000).toFixed(2)}M`;
  if (volume >= 1000) return `$${(volume / 1000).toFixed(2)}K`;
  return `$${volume.toFixed(0)}`;
};

/**
 * Shortens blockchain address
 */
export const formatAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/**
 * Formats number with commas
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US');
};

/**
 * Generates random number between min and max
 */
export const randomBetween = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

/**
 * Generates random integer between min and max
 */
export const randomIntBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};