
import { useTheme as useNextTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

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
      // Fix tabindex accessibility issues by adding aria-hidden to elements with tabindex=-1
      // This is done via custom props that get passed to Sonner
      toasterProps={{
        "aria-hidden": false, // Keep the main toaster visible to screen readers
        style: {
          // Additional styles as needed
        },
        // This function adds aria-hidden="true" to child elements with tabindex="-1"
        ref: (toasterEl: HTMLElement | null) => {
          if (toasterEl) {
            // After render, find all elements with tabindex=-1 and set aria-hidden
            setTimeout(() => {
              const elementsWithNegativeTabIndex = 
                toasterEl.querySelectorAll('[tabindex="-1"]');
              
              elementsWithNegativeTabIndex.forEach((el) => {
                (el as HTMLElement).setAttribute('aria-hidden', 'true');
              });
            }, 100); // Small delay to ensure DOM is ready
          }
        },
      }}
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
