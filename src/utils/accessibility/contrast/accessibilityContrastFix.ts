
import { checkContrastRatio, meetsContrastStandards } from './contrastUtils';

/**
 * Recommends a higher contrast color based on the background
 * @param foreground Current foreground color in hex (e.g., #FFFFFF)
 * @param background Background color in hex (e.g., #000000)
 * @param targetRatio Desired contrast ratio (WCAG recommends 4.5:1 for normal text)
 * @returns A new color with improved contrast
 */
export function getAccessibleColor(
  foreground: string, 
  background: string, 
  targetRatio: number = 4.5
): string {
  // Check current contrast
  const currentRatio = checkContrastRatio(foreground, background);
  
  if (currentRatio >= targetRatio) {
    return foreground; // Already meets standards
  }
  
  // Convert hex to RGB
  const hexToRgb = (hex: string): number[] => {
    // Handle shorthand hex (#fff)
    if (hex.length === 4) {
      const r = parseInt(hex.charAt(1) + hex.charAt(1), 16);
      const g = parseInt(hex.charAt(2) + hex.charAt(2), 16);
      const b = parseInt(hex.charAt(3) + hex.charAt(3), 16);
      return [r, g, b];
    }
    
    // Standard hex (#ffffff)
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  };
  
  // Convert RGB to hex
  const rgbToHex = (rgb: number[]): string => {
    return "#" + rgb.map(c => {
      const clamped = Math.max(0, Math.min(255, Math.round(c)));
      const hex = clamped.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");
  };
  
  // Determine if we should darken or lighten based on background
  const backgroundRgb = hexToRgb(background);
  const foregroundRgb = hexToRgb(foreground);
  
  // Calculate perceived brightness (YIQ formula)
  const getPerceivedBrightness = (rgb: number[]): number => {
    return (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
  };
  
  const backgroundBrightness = getPerceivedBrightness(backgroundRgb);
  const shouldDarken = backgroundBrightness > 128;
  
  // Adjust color until we meet target ratio
  let newRgb = [...foregroundRgb];
  let attempts = 0;
  const maxAttempts = 100; // Prevent infinite loops
  
  while (checkContrastRatio(rgbToHex(newRgb), background) < targetRatio && attempts < maxAttempts) {
    // Adjust color to increase contrast
    if (shouldDarken) {
      // Darken foreground for light background
      newRgb = newRgb.map(c => c * 0.95);
    } else {
      // Lighten foreground for dark background
      newRgb = newRgb.map(c => c + (255 - c) * 0.05);
    }
    attempts++;
  }
  
  return rgbToHex(newRgb);
}

/**
 * Checks if a UI component meets accessibility standards for contrast
 * @param elementInfo Element information including colors
 * @returns Object with pass/fail status and recommendations
 */
export function evaluateComponentContrast(
  elementInfo: { 
    foreground: string, 
    background: string,
    isLargeText?: boolean,
    wcagLevel?: 'AA' | 'AAA'
  }
): { 
  passes: boolean, 
  ratio: number,
  recommendation?: string,
  suggestedColor?: string 
} {
  const { foreground, background, isLargeText = false, wcagLevel = 'AA' } = elementInfo;
  
  const ratio = checkContrastRatio(foreground, background);
  const passes = meetsContrastStandards(ratio, isLargeText, wcagLevel);
  
  if (passes) {
    return { passes, ratio };
  }
  
  // Get recommended color
  const targetRatio = isLargeText 
    ? (wcagLevel === 'AAA' ? 4.5 : 3) 
    : (wcagLevel === 'AAA' ? 7 : 4.5);
    
  const suggestedColor = getAccessibleColor(foreground, background, targetRatio);
  
  return {
    passes,
    ratio,
    recommendation: `Increase contrast to at least ${targetRatio}:1 to meet WCAG ${wcagLevel} standards${isLargeText ? ' for large text' : ''}.`,
    suggestedColor
  };
}
