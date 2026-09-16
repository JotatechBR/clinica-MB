export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

export const pad = (n: number) => String(n).padStart(2, "0");
