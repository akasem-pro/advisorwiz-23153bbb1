
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
