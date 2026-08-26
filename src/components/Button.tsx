import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  tone?: "primary" | "ghost";
  className?: string;
};

export function Button({ href, children, tone = "primary", className = "" }: Props) {
  const look =
    tone === "primary"
      ? "bg-red text-void hover:opacity-90 shadow-lg"
      : "border border-white/20 bg-white/5 text-paper hover:bg-white/10 backdrop-blur-md shadow-lg";

  return (
    <Link
      href={href}
      className={`inline-flex h-12 min-w-[9.5rem] items-center justify-center rounded-[var(--radius-btn)] px-7 text-[13px] font-medium tracking-[0.04em] transition-colors ${look} ${className}`}
    >
      {children}
    </Link>
  );
}
