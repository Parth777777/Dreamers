import Link from "next/link";
import { site } from "@/content/site";

type Props = {
  variant?: "outline" | "solid";
  className?: string;
  href?: string | null;
};

export function Logo({ variant = "outline", className = "", href = "/" }: Props) {
  const src = variant === "outline" ? site.logoOutline : site.logoSolid;
  const imgLogo = (
    <img
      src={src}
      alt={site.name}
      className={`h-10 w-auto object-contain ${className}`}
    />
  );

  if (href === null) return imgLogo;
  return (
    <Link href={href} className="inline-flex shrink-0 items-center text-paper hover:text-white transition-colors">
      {imgLogo}
    </Link>
  );
}
