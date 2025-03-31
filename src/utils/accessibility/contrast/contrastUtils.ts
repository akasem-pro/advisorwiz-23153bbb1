
/**
 * Checks the contrast ratio between two colors
 * @param foreground Foreground color in hex (e.g., #FFFFFF)
 * @param background Background color in hex (e.g., #000000)
 * @returns Contrast ratio (WCAG recommends at least 4.5:1 for normal text, 3:1 for large text)
 */
export function checkContrastRatio(foreground: string, background: string): number {
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
  
  // Calculate relative luminance according to WCAG 2.1
  const calculateLuminance = (rgb: number[]): number => {
    const [r, g, b] = rgb.map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  
  try {
    const foregroundRgb = hexToRgb(foreground);
    const backgroundRgb = hexToRgb(background);
    
    const foregroundLuminance = calculateLuminance(foregroundRgb);
    const backgroundLuminance = calculateLuminance(backgroundRgb);
    
    // Calculate ratio (WCAG formula)
    const lighterLuminance = Math.max(foregroundLuminance, backgroundLuminance);
    const darkerLuminance = Math.min(foregroundLuminance, backgroundLuminance);
    
    const contrastRatio = (lighterLuminance + 0.05) / (darkerLuminance + 0.05);
    
    // Round to 2 decimal places for readability
    return Math.round(contrastRatio * 100) / 100;
  } catch (error) {
    console.error("Error calculating contrast ratio:", error);
    return 1; // Return minimum value on error to flag potential issues
  }
}

/**
 * Determines if a contrast ratio meets WCAG 2.1 standards
 * @param ratio The contrast ratio to check
 * @param isLargeText Whether the text is large (>=18pt or >=14pt bold)
 * @param level The WCAG conformance level ('AA' or 'AAA')
 * @returns boolean indicating if the contrast meets the standard
 */
export function meetsContrastStandards(
  ratio: number,
  isLargeText: boolean = false,
  level: 'AA' | 'AAA' = 'AA'
): boolean {
  if (level === 'AAA') {
    return isLargeText ? ratio >= 4.5 : ratio >= 7;
  }
  // AA level (default)
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}
