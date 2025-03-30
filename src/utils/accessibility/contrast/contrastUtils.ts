
/**
 * Checks the contrast ratio between two colors
 * @param foreground Foreground color in hex (e.g., #FFFFFF)
 * @param background Background color in hex (e.g., #000000)
 * @returns Contrast ratio (WCAG recommends at least 4.5:1 for normal text, 3:1 for large text)
 */
export function checkContrastRatio(foreground: string, background: string): number {
  // Convert hex to RGB
  const hexToRgb = (hex: string): number[] => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  };
  
  // Calculate relative luminance
  const calculateLuminance = (rgb: number[]): number => {
    const [r, g, b] = rgb.map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  
  const foregroundRgb = hexToRgb(foreground);
  const backgroundRgb = hexToRgb(background);
  
  const foregroundLuminance = calculateLuminance(foregroundRgb);
  const backgroundLuminance = calculateLuminance(backgroundRgb);
  
  // Calculate ratio
  const ratio = (Math.max(foregroundLuminance, backgroundLuminance) + 0.05) / 
                (Math.min(foregroundLuminance, backgroundLuminance) + 0.05);
  
  return Math.round(ratio * 100) / 100;
}
