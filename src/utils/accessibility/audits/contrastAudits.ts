
import { checkContrastRatio } from '../accessibilityGuide';
import { AuditResult } from '../types';

/**
 * Check color contrast of text elements
 */
export const checkColorContrast = (): AuditResult[] => {
  const results: AuditResult[] = [];
  const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, label, button');
  
  textElements.forEach(element => {
    const style = window.getComputedStyle(element);
    const foreground = style.color;
    const background = style.backgroundColor;
    
    // Convert RGB to hex for contrast calculation
    const rgbToHex = (rgb: string) => {
      // Extract r, g, b values
      const rgbRegex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
      const match = rgb.match(rgbRegex);
      
      if (!match) return '#000000';
      
      const r = parseInt(match[1]);
      const g = parseInt(match[2]);
      const b = parseInt(match[3]);
      
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    };
    
    // Skip elements with transparent background
    if (background === 'rgba(0, 0, 0, 0)' || background === 'transparent') {
      return;
    }
    
    const foregroundHex = rgbToHex(foreground);
    const backgroundHex = rgbToHex(background);
    
    const ratio = checkContrastRatio(foregroundHex, backgroundHex);
    const fontSize = parseFloat(style.fontSize);
    const isBold = parseInt(style.fontWeight) >= 700;
    
    // WCAG AA requirements: 4.5:1 for normal text, 3:1 for large text (18pt or 14pt bold)
    const isLargeText = fontSize >= 18 || (fontSize >= 14 && isBold);
    const requiredRatio = isLargeText ? 3 : 4.5;
    
    if (ratio < requiredRatio) {
      results.push({
        pass: false,
        element: element as HTMLElement,
        issue: `Insufficient color contrast: ${ratio.toFixed(2)}:1 (should be at least ${requiredRatio}:1)`,
        severity: 'critical',
        suggestion: 'Increase color contrast between text and background'
      });
    }
  });
  
  return results;
};
