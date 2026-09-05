import { cn } from "@/lib/utils";

/**
 * FalconMark — gold line-art falcon used as the image placeholder on aircraft
 * cards/detail (matches the watermark shown on the live site for listings
 * without photography). [REPLACE] with the official falcon SVG when available.
 */
export function FalconMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 120"
      className={cn("text-gold", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* stylised falcon in flight — single-weight line art */}
      <path d="M18 74c26-4 47-16 66-34 6-6 12-13 22-16" />
      <path d="M40 70c22 2 44-2 64-14 10-6 19-14 32-16" />
      <path d="M62 66c20 6 42 8 64 2 9-2 17-6 26-4" />
      <path d="M106 24c-4 6-6 13-6 20 0 10 4 19 12 26" />
      <path d="M100 44c8-2 16-2 24 2 6 3 11 8 14 15" />
      <path d="M150 40c-3 5-4 10-3 16" />
      <circle cx="112" cy="27" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}
