
/**
 * This file provides mock test results for preview environments
 * where actual integration testing is not possible
 */

/**
 * Returns a simulated authentication test result for preview environments
 */
export const mockAuthTest = () => {
  return {
    success: false,
    previewMode: true,
    message: "Authentication test running in preview environment with limited connectivity.",
    details: {
      mocked: true,
      environment: "preview",
      status: "warning",
      info: "This is not an actual error but a limitation of the preview environment. In production, this test would connect to actual authentication services."
    }
  };
};

/**
 * Returns a simulated database test result for preview environments
 */
export const mockDatabaseTest = () => {
  return {
    success: false,
    previewMode: true,
    message: "Database operations test running in preview environment with limited connectivity.",
    details: {
      mocked: true,
      environment: "preview",
      status: "warning",
      info: "This is not an actual error but a limitation of the preview environment. In production, this test would perform actual database operations."
    }
  };
};

/**
 * Returns a simulated email functionality test result for preview environments
 */
export const mockEmailTest = () => {
  return {
    success: false,
    previewMode: true,
    message: "Email functionality test running in preview environment with limited connectivity.",
    details: {
      mocked: true,
      environment: "preview",
      status: "warning",
      info: "This is not an actual error but a limitation of the preview environment. In production, this test would connect to actual email services."
    }
  };
};
