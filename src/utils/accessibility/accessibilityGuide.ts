
/**
 * Accessibility Implementation Guide
 * 
 * This file provides guidance on implementing accessibility features across the application
 * and contains utilities for accessibility testing and improvements.
 */

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

/**
 * Accessibility guidelines for components
 */
export const accessibilityGuidelines = {
  buttons: [
    'All buttons must have a descriptive text label or an aria-label attribute',
    'Interactive elements must have a minimum touch target size of 44x44 pixels',
    'Button text should clearly indicate the action the button performs',
    'Buttons must have sufficient color contrast (at least 4.5:1)',
    'Focus states must be visible for keyboard navigation'
  ],
  forms: [
    'All form inputs must have associated labels',
    'Error messages should be associated with their inputs using aria-describedby',
    'Required fields should use the required attribute and be visually indicated',
    'Form validation errors should be announced by screen readers',
    'Group related form elements with fieldset and legend'
  ],
  navigation: [
    'Navigation menus should be navigable with keyboard',
    'Current page should be indicated to screen readers with aria-current="page"',
    'Skip links should be provided to bypass navigation',
    'Use semantic landmarks (nav, main, header, footer)',
    'Mobile navigation should be accessible to touch and screen readers'
  ],
  images: [
    'All images must have alternative text using alt attributes',
    'Decorative images should use alt=""',
    'Complex images should have detailed descriptions',
    'SVG elements should include role="img" and aria-label when appropriate',
    'Avoid text in images; if necessary, provide the same text in alt attribute'
  ],
  modals: [
    'Modals should trap focus within them when open',
    'Closing a modal should return focus to the element that opened it',
    'Modals should be announced to screen readers with aria-modal="true"',
    'ESC key should close modals',
    'Modal content should be separated from page content with aria-hidden'
  ]
};

/**
 * List of recommended tools for accessibility testing
 */
export const accessibilityTestingTools = [
  {
    name: 'Lighthouse',
    description: 'Built-in Chrome DevTools feature for accessibility auditing',
    url: 'https://developers.google.com/web/tools/lighthouse'
  },
  {
    name: 'axe DevTools',
    description: 'Browser extension for automated accessibility testing',
    url: 'https://www.deque.com/axe/'
  },
  {
    name: 'WAVE Web Accessibility Evaluation Tool',
    description: 'Visual feedback about accessibility issues in web content',
    url: 'https://wave.webaim.org/'
  },
  {
    name: 'Color Contrast Analyzer',
    description: 'Tool to check color contrast ratios for WCAG compliance',
    url: 'https://developer.paciellogroup.com/resources/contrastanalyser/'
  },
  {
    name: 'Screen Readers',
    description: 'NVDA (Windows), VoiceOver (Mac/iOS), TalkBack (Android)',
    url: 'https://www.nvaccess.org/download/'
  }
];

/**
 * Template for an accessibility statement
 */
export const accessibilityStatementTemplate = `
# Accessibility Statement for AdvisorWiz

## Our Commitment

AdvisorWiz is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.

## Measures Taken

AdvisorWiz takes the following measures to ensure accessibility:

- We include accessibility as part of our mission statement
- We include accessibility throughout our internal policies
- We provide accessibility training for our staff
- We assign clear accessibility goals and responsibilities
- We employ formal accessibility quality assurance methods

## Conformance Status

The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. AdvisorWiz is partially conformant with WCAG 2.1 level AA. Partially conformant means that some parts of the content do not fully conform to the accessibility standard.

## Feedback

We welcome your feedback on the accessibility of AdvisorWiz. Please let us know if you encounter accessibility barriers:

- Email: accessibility@advisorwiz.com
- Phone: [Phone number]
- Visitor address: [Physical address]
- Postal address: [Postal address]

We try to respond to feedback within 3 business days.

## Compatibility with Browsers and Assistive Technology

AdvisorWiz is designed to be compatible with the following assistive technologies:

- Latest versions of screen readers including NVDA, VoiceOver, and TalkBack
- Speech recognition software
- Screen magnifiers
- Keyboard-only navigation

## Technical Specifications

Accessibility of AdvisorWiz relies on the following technologies:

- HTML5
- WAI-ARIA
- CSS
- JavaScript/TypeScript
- SVG

These technologies are relied upon for conformance with the accessibility standards used.

## Assessment Approach

AdvisorWiz assesses the accessibility of our platform through the following approaches:

- Self-evaluations
- External evaluations
- User testing with assistive technologies
- Automated testing tools

This statement was created on [Date] and last updated on [Date].
`;
