
export const animations = {
  keyframes: {
    'accordion-down': {
      from: {
        height: '0'
      },
      to: {
        height: 'var(--radix-accordion-content-height)'
      }
    },
    'accordion-up': {
      from: {
        height: 'var(--radix-accordion-content-height)'
      },
      to: {
        height: '0'
      }
    },
    'slide-up': {
      '0%': { 
        transform: 'translateY(20px)',
        opacity: '0'
      },
      '100%': { 
        transform: 'translateY(0)', 
        opacity: '1'
      },
    },
    'slide-down': {
      '0%': { 
        transform: 'translateY(-20px)',
        opacity: '0'
      },
      '100%': { 
        transform: 'translateY(0)',
        opacity: '1'
      },
    },
    'slide-in-right': {
      '0%': { 
        transform: 'translateX(100%)',
        opacity: '0'
      },
      '100%': { 
        transform: 'translateX(0)',
        opacity: '1'
      },
    },
    'slide-in-left': {
      '0%': { 
        transform: 'translateX(-100%)',
        opacity: '0'
      },
      '100%': { 
        transform: 'translateX(0)',
        opacity: '1'
      },
    },
    'fade-in': {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' },
    },
    'pulse-scale': {
      '0%, 100%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.05)' },
    },
    'swipe-right': {
      '0%': { transform: 'translateX(0) rotate(0)' },
      '100%': { transform: 'translateX(200%) rotate(20deg)' },
    },
    'swipe-left': {
      '0%': { transform: 'translateX(0) rotate(0)' },
      '100%': { transform: 'translateX(-200%) rotate(-20deg)' },
    }
  },
  animation: {
    'accordion-down': 'accordion-down 0.2s ease-out',
    'accordion-up': 'accordion-up 0.2s ease-out',
    'slide-up': 'slide-up 0.6s ease-out',
    'slide-down': 'slide-down 0.6s ease-out',
    'slide-in-right': 'slide-in-right 0.4s ease-out',
    'slide-in-left': 'slide-in-left 0.4s ease-out',
    'fade-in': 'fade-in 0.5s ease-out',
    'pulse-scale': 'pulse-scale 2s ease-in-out infinite',
    'swipe-right': 'swipe-right 0.5s forwards ease-out',
    'swipe-left': 'swipe-left 0.5s forwards ease-out'
  }
};
