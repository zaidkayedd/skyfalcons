import { cn } from "@/lib/utils";

/** Site-wide width system. Every page and section aligns to this container. */
export function Container({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-content px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}
