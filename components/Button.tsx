import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "gold";

const base =
  "inline-flex items-center justify-center gap-2 rounded-card px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 ease-premium disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-white hover:bg-night shadow-card hover:shadow-card-hover",
  gold: "bg-gold text-ink hover:bg-gold-soft shadow-card hover:shadow-card-hover",
  outline:
    "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-white",
  ghost: "text-ink hover:text-gold"
};

type CommonProps = { variant?: Variant; className?: string; children: React.ReactNode };

export function Button({
  variant = "primary",
  className,
  href,
  children,
  ...rest
}: CommonProps &
  ({ href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>)) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </Link>
  );
}

export function ActionButton({
  variant = "primary",
  className,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}
