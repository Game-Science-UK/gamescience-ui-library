import { Toaster as Sonner, type ToasterProps } from "sonner";

/**
 * Sonner is the only approved transient notification system.
 * Do not add legacy toast/toaster/use-toast implementations.
 */
function Toaster(props: ToasterProps) {
  return (
    <Sonner
      theme="system"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-surface group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-overlay",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
}

Toaster.displayName = "Toaster";

export { Toaster };
export { toast } from "sonner";
