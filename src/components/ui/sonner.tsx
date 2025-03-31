
import { useTheme as useNextTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"
import { useEffect, useRef } from "react"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  // Use a try/catch to prevent errors when used outside ThemeProvider
  let theme = "system";
  try {
    const { theme: nextTheme = "system" } = useNextTheme();
    theme = nextTheme;
  } catch (error) {
    console.log("Theme context not available, defaulting to system theme");
  }
  
  // Create a ref to access the toaster element after it's mounted
  const toasterRef = useRef<HTMLElement | null>(null);
  
  // This effect sets up a MutationObserver to handle accessibility issues
  useEffect(() => {
    // Function to fix accessibility issues
    const fixAccessibilityIssues = (container: HTMLElement | Document) => {
      // Find elements with both aria-hidden and tabindex
      const conflictingElements = container.querySelectorAll('[aria-hidden="true"][tabindex], [tabindex="-1"][aria-hidden="true"]');
      
      // Remove aria-hidden from elements that need to be focusable
      conflictingElements.forEach((el) => {
        if (el.hasAttribute('aria-hidden') && el.hasAttribute('tabindex')) {
          // Remove aria-hidden to allow proper focus
          el.removeAttribute('aria-hidden');
        }
      });

      // For non-interactive elements with tabindex=-1, add aria-hidden if missing
      const nonInteractiveElements = container.querySelectorAll('[tabindex="-1"]:not(button):not(a):not([role="button"]):not([role="tab"])');
      nonInteractiveElements.forEach((el) => {
        if (!el.hasAttribute('aria-hidden')) {
          (el as HTMLElement).setAttribute('aria-hidden', 'true');
        }
      });
    };

    // Setup a mutation observer to detect when new elements are added
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length > 0) {
          fixAccessibilityIssues(document);
        }
      });
    });

    // Start observing the document body for changes
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

    // Initial check for any existing elements
    fixAccessibilityIssues(document);

    return () => {
      // Clean up observer on component unmount
      observer.disconnect();
    };
  }, []);

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          closeButton:
            "group-[.toast]:text-foreground group-[.toast]:opacity-90 group-[.toast]:hover:opacity-100 group-[.toast]:focus:ring-2 group-[.toast]:focus:ring-ring group-[.toast]:focus:outline-none",
        },
      }}
      closeButton={true}
      // Fix tabindex accessibility issues
      containerAriaLabel="Notifications"
      // Make the toaster container have proper focus management
      hotkey={["altKey", "KeyT"]}
      // Make the toasts more accessible with proper ARIA roles
      richColors={true}
      {...props}
    />
  )
}

export { Toaster }
