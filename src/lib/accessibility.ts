/** Shared accessibility helpers for GameScience components. */

export function announcePoliteness(
  state: "idle" | "busy" | "assertive",
): "off" | "polite" | "assertive" {
  if (state === "assertive") return "assertive";
  if (state === "busy") return "polite";
  return "off";
}

export function statusLabel(status: string, fallbackMap: Record<string, string>): string {
  return fallbackMap[status] ?? status.replace(/-/g, " ");
}
