
import * as React from "react"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  // Add a MutationObserver to fix accessibility issues with tabindex and aria-hidden
  React.useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // Fix toaster container
          const toaster = document.querySelector('[data-sonner-toaster]');
          if (toaster && toaster.getAttribute('tabindex') === '-1') {
            toaster.setAttribute('aria-hidden', 'true');
          }
          
          // Fix section container
          const section = document.querySelector('section[tabindex="-1"]');
          if (section && section.getAttribute('tabindex') === '-1') {
            section.setAttribute('aria-hidden', 'true');
          }
        }
      });
    });
    
    // Start observing
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Sonner
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
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
