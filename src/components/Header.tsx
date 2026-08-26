"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { NavWheel } from "@/components/NavWheel";
import { site } from "@/content/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="site-header bg-void/90 backdrop-blur-md border-b border-paper/10 sticky top-0 z-50 transition-colors duration-300">
        <div className="site-rail-offset mx-auto flex max-w-[1600px] items-center justify-center md:justify-between gap-6 px-5 py-4 md:px-10">
          {/* Classic Navbar for Desktop */}
          <nav className="hidden md:flex items-center gap-8 text-paper text-sm uppercase tracking-wider">
            {site.nav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-white hover:after:w-full after:transition-all">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button href="/contact/">Book a call</Button>
          </div>
          <button
            type="button"
            className="text-sm text-paper md:hidden"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
        {open ? (
          <nav className="flex flex-col gap-4 bg-void px-5 pb-6 text-paper md:hidden" aria-label="Primary">
            {site.nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Button href="/contact/" className="w-full">
              Book a call
            </Button>
          </nav>
        ) : null}
      </header>

      <div className="nav-wheel hidden" aria-hidden={true}>
        <NavWheel />
      </div>
    </>
  );
}
