import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/* `cn` is the helper every component vendored from a shadcn-style registry
 * imports — kibo-ui, magicui and the shadcn primitives in components/ui all
 * expect it at this exact path. It joins conditional class lists (clsx) and
 * then resolves Tailwind conflicts in favour of the last one (twMerge), which
 * is what lets a call site override a component's own padding or colour by
 * passing `className`. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
