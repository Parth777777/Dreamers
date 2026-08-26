"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname, useRouter } from "next/navigation";
import OptionWheel from "@/components/OptionWheel";
import { site } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

const NAV_LABELS = site.nav.map((item) => item.label);

function hashFromHref(href: string) {
  const hash = href.split("#")[1];
  return hash ?? null;
}

function indexFromLocation(pathname: string, hash: string) {
  if (pathname !== "/") return 0;
  const normalized = hash.replace(/^#/, "");
  for (let i = 0; i < site.nav.length; i++) {
    const section = hashFromHref(site.nav[i].href);
    if (section && section === normalized) return i;
  }
  return 0;
}

export function NavWheel() {
  const router = useRouter();
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollLock = useRef(false);

  useEffect(() => {
    setMounted(true);
    setHash(window.location.hash);
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (!mounted || pathname !== "/") return;

    const triggers = site.nav
      .map((item, index) => {
        const sectionId = hashFromHref(item.href);
        if (!sectionId) return null;
        const el = document.getElementById(sectionId);
        if (!el) return null;

        return ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => {
            if (scrollLock.current) return;
            setActiveIndex(index);
            window.history.replaceState(null, "", `/#${sectionId}`);
            setHash(`#${sectionId}`);
          },
          onEnterBack: () => {
            if (scrollLock.current) return;
            setActiveIndex(index);
            window.history.replaceState(null, "", `/#${sectionId}`);
            setHash(`#${sectionId}`);
          },
        });
      })
      .filter(Boolean);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      triggers.forEach((trigger) => trigger?.kill());
    };
  }, [mounted, pathname]);

  useEffect(() => {
    if (!mounted) return;
    setActiveIndex(indexFromLocation(pathname, hash));
  }, [mounted, pathname, hash]);

  const navigate = useCallback(
    (index: number) => {
      const item = site.nav[index];
      if (!item) return;

      const section = hashFromHref(item.href);
      if (section && pathname === "/") {
        const el = document.getElementById(section);
        if (el) {
          scrollLock.current = true;
          setActiveIndex(index);
          window.history.replaceState(null, "", `/#${section}`);
          setHash(`#${section}`);
          el.scrollIntoView({ behavior: "smooth" });
          window.setTimeout(() => {
            scrollLock.current = false;
            ScrollTrigger.refresh();
          }, 900);
          return;
        }
      }

      router.push(item.href);
    },
    [pathname, router],
  );

  if (!mounted) return null;

  return (
    <OptionWheel
      items={NAV_LABELS}
      defaultSelected={indexFromLocation(pathname, hash)}
      selected={pathname === "/" ? activeIndex : undefined}
      textColor="color-mix(in srgb, #540b05 35%, #F53105 65%)"
      activeColor="#FFFCFB"
      side="left"
      fontSize={3.25}
      spacing={1.15}
      curve={1}
      tilt={7}
      blur={4}
      fade={0.5}
      minOpacity={0.02}
      smoothing={220}
      inset={0}
      loop={false}
      draggable
      onChange={(index) => navigate(index)}
      className="nav-wheel__wheel"
    />
  );
}
