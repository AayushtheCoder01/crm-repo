"use client"

import { useToast } from "../../hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "../ui/toast"

type ToasterToast = {
  id: any         // Unique identifier for each toast
  title?: any;              // Title of the toast (optional)
  description?: any;        // Description or body text (optional)
  action?: any;    // Optional action element, like a button
  duration?: any;           // Duration to auto-dismiss the toast (optional)
  type?: any; // Optional type for styling
  onClose?: () => void  ;        // Callback for when the toast is dismissed
  // Any other custom properties as needed
};
export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }: ToasterToast): any {
        return (
            <Toast key={id} {...props}>
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                    <ToastDescription>{description}</ToastDescription>
                )}
              </div>
              {action && action}
              <ToastClose />
            </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
