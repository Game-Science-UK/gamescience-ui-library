import * as React from "react";
import { cn } from "@/lib/cn";

function getComponentName(name: string) {
  return name.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

class ComponentErrorBoundary extends React.Component<
  { children: React.ReactNode; name: string },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; name: string }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`Error in component ${this.props.name}:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-danger">Something went wrong in component: {this.props.name}</div>
      );
    }

    return this.props.children;
  }
}

/** Named card section for the All Components gallery (shadbook-style). */
export function ComponentWrapper({
  className,
  name,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { name: string }) {
  return (
    <ComponentErrorBoundary name={name}>
      <div
        id={name}
        data-name={name.toLowerCase()}
        className={cn(
          "flex w-full scroll-mt-16 flex-col rounded-lg border border-border bg-background text-foreground",
          className,
        )}
        {...props}
      >
        <div className="border-b border-border px-4 py-3">
          <div className="gs-label">{getComponentName(name)}</div>
        </div>
        <div className="flex flex-1 flex-wrap items-start gap-4 p-4">{children}</div>
      </div>
    </ComponentErrorBoundary>
  );
}
