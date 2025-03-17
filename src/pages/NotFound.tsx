
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { trackPageView, trackEvent } from "../utils/tagManager";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Log the 404 error
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Track the 404 error in GTM
    trackPageView("404 - Page Not Found", location.pathname);
    trackEvent("error", {
      error_type: "404",
      page_path: location.pathname,
      error_message: "Page not found"
    });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
