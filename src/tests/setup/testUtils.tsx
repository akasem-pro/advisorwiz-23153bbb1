
import { render, RenderOptions, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React, { ReactElement } from 'react';
import { ThemeProvider } from '../../context/ThemeContext';
import { UserProvider } from '../../context/UserContext';
import { AuthProvider } from '../../features/auth/context/AuthProvider';
import '@testing-library/jest-dom';

/**
 * Custom render function that wraps components with necessary providers
 */
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, {
  wrapper: ({ children }) => (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  ),
  ...options
});

// Re-export everything from testing-library
export * from '@testing-library/react';

// Override render method
export { customRender as render };
