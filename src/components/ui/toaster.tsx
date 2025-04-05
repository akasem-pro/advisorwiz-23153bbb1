
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { ReactNode } from "react"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        // Remove incompatible props from Sonner toast
        const { type, icon, jsx, richColors, invert, variant: sonnerVariant, ...compatibleProps } = props;
        
        // Map to shadcn/ui toast variant (default or destructive)
        // Use the variant from props if it exists, otherwise map from sonnerVariant
        const variant = props.variant === "destructive" || sonnerVariant === "error" 
          ? "destructive" 
          : "default";
        
        return (
          <Toast key={id} {...compatibleProps} variant={variant}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action && (
              typeof action === 'function' 
                ? action() 
                : action
            )}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
