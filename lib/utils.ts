import { createElement, type ReactNode } from "react";

/** Tiny className joiner — avoids pulling in a dependency. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function splitDisplayText(text: string | number | undefined): ReactNode[] {
  if (text === undefined || text === null) return [];

  const content = String(text);
  const parts = content.split(/(\d+)/g);

  return parts.map((part, index) => {
    const isNumber = /^\d+$/.test(part);
    return createElement(
      "span",
      {
        key: `${part}-${index}`,
        style: {
          fontFamily: isNumber ? "var(--font-sans)" : "var(--font-display)"
        }
      },
      part
    );
  });
}
