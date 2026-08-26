import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { site } from "@/content/site";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer site-rail-offset border-t border-paper/10 bg-void px-5 py-20 text-paper md:px-10">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-12 md:flex-row md:items-end md:justify-between">
        <div>
          <Logo href="/" variant="outline" className="h-14 md:h-16" />
          <p className="mt-4 max-w-sm text-sm leading-7 text-muted">
            Have a dream, let’s build it. Tell us what you are building.
          </p>
        </div>
        <div className="flex gap-16 text-sm">
          <div className="flex flex-col gap-2">
            {site.nav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-red">
                {item.label}
              </Link>
            ))}
            <Link href="/contact/" className="hover:text-red">
              Contact
            </Link>
          </div>
          <div className="flex flex-col gap-2 text-muted">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <p>{site.locationLabel}</p>
            <p>© {new Date().getFullYear()}</p>
            <p className="mt-2 text-xs">
              Made with Love by <a href="https://www.linkedin.com/in/paarthdoshi/" target="_blank" rel="noopener noreferrer" className="hover:text-red transition-colors underline underline-offset-2">Parth</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
