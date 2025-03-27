
// Define correct types for React-Joyride's Styles
type TextAlign = 'left' | 'center' | 'right' | 'justify';

export const tourStyles = {
  options: {
    zIndex: 10000,
    primaryColor: '#0091EA',
    backgroundColor: '#ffffff',
    arrowColor: '#ffffff',
    overlayColor: 'rgba(0, 0, 0, 0.5)',
  },
  tooltip: {
    backgroundColor: '#ffffff',
    borderRadius: '0.5rem',
    padding: '1rem',
    fontSize: '0.9rem',
    color: '#333',
  },
  tooltipContainer: {
    textAlign: 'left' as TextAlign,
  },
  buttonNext: {
    backgroundColor: '#0091EA',
    color: '#ffffff',
    fontSize: '0.9rem',
  },
  buttonBack: {
    marginRight: 10,
    color: '#666',
  },
  buttonSkip: {
    color: '#666',
  },
};
