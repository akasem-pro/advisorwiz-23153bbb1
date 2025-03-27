
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
    filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
  },
  tooltipContainer: {
    textAlign: 'left' as TextAlign,
  },
  tooltipTitle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  tooltipContent: {
    padding: '0.5rem 0',
  },
  buttonNext: {
    backgroundColor: '#0091EA',
    color: '#ffffff',
    fontSize: '0.9rem',
    padding: '8px 16px',
    borderRadius: '4px',
    fontWeight: 500,
  },
  buttonBack: {
    marginRight: 10,
    color: '#666',
    fontSize: '0.9rem',
  },
  buttonSkip: {
    color: '#666',
    fontSize: '0.9rem',
  },
  buttonClose: {
    color: '#999',
    fontSize: '1.5rem',
    padding: '0',
    top: '8px',
    right: '8px',
  },
};
