
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
        // Remove or convert incompatible props
        const { type, icon, jsx, richColors, invert, ...compatibleProps } = props;
        
        // Map variant to Shadcn's variant system if needed
        const variant = props.variant === "destructive" ? "destructive" : "default";
        
        return (
          <Toast key={id} {...compatibleProps} variant={variant}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action && (typeof action === 'function' ? action() : action)}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
