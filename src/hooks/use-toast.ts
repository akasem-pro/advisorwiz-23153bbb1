
import { toast as sonnerToast, Toast, useToast as useSonnerToast } from "sonner";

export type ToastProps = Toast;

const useToast = useSonnerToast;
const toast = sonnerToast;

export { useToast, toast };
