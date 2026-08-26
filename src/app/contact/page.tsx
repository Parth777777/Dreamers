import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Mark } from "@/components/Mark";
import { site } from "@/content/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get In Touch",
  description: `Start a project with ${site.name}.`,
};

export default function ContactPage() {
  const action = site.formspreeId
    ? `https://formspree.io/f/${site.formspreeId}`
    : `mailto:${site.email}`;

  return (
    <>
      <Header />
      <main className="site-rail-offset mx-auto max-w-3xl bg-void px-5 pt-32 pb-24 md:px-10">
        <h1 className="font-display text-5xl italic md:text-7xl">
          We’re always up for a good coffee chat
        </h1>
        <form
          action={action}
          method={site.formspreeId ? "POST" : "GET"}
          className="mt-14 grid gap-6"
        >
          <label className="grid gap-2 text-sm text-muted">
            Name
            <input
              required
              name="name"
              className="rounded-[var(--radius-sm)] border border-paper/20 bg-void px-4 py-3 text-paper outline-none"
            />
          </label>
          <label className="grid gap-2 text-sm text-muted">
            Email
            <input
              required
              type="email"
              name="email"
              className="rounded-[var(--radius-sm)] border border-paper/20 bg-void px-4 py-3 text-paper outline-none"
            />
          </label>
          <label className="grid gap-2 text-sm text-muted">
            Tell me a little about what you're looking for...
            <textarea
              required
              name="message"
              rows={5}
              className="rounded-[var(--radius-sm)] border border-paper/20 bg-void px-4 py-3 text-paper outline-none"
            />
          </label>
          <button
            type="submit"
            className="mt-4 inline-flex h-12 min-w-[9.5rem] items-center justify-center rounded-[var(--radius-btn)] bg-red px-7 text-[13px] font-medium tracking-[0.04em] text-[#FFF8F2] hover:opacity-90"
          >
            Send
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}
