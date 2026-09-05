import type { ReactNode } from "react";
import { cn, splitDisplayText } from "@/lib/utils";

export function SectionHeading({
  title,
  subtitle,
  align = "left",
  className,
  invert = false
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
  invert?: boolean;
}) {
  const renderedTitle = typeof title === "string" ? splitDisplayText(title) : title;

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <h2
        className={cn(
          "display text-3xl sm:text-4xl lg:text-[2.9rem]",
          invert ? "text-white" : "text-ink"
        )}
      >
        {renderedTitle}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "max-w-2xl font-sans text-base leading-relaxed",
            invert ? "text-white/70" : "text-slate",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
