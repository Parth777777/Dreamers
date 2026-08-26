import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CaseFrame } from "@/components/CaseFrame";
import { work } from "@/content/work";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return work.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = work.find((entry) => entry.slug === slug);
  if (!item) return {};
  return { title: item.title, description: item.summary };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = work.find((entry) => entry.slug === slug);
  if (!item) notFound();

  return (
    <>
      <Header />
      <main className="site-rail-offset mx-auto max-w-5xl px-5 pt-32 pb-24 md:px-8">
        <p className="font-mono text-[11px] tracking-[0.18em] text-red uppercase">
          Case study · {item.client} · {item.year}
        </p>
        {item.clientLogo && (
          <div className="mt-8 mb-4 h-16 max-w-xs">
            <img 
              src={item.clientLogo} 
              alt={`${item.client} Logo`} 
              className="h-full w-auto object-contain brightness-0 invert opacity-90"
            />
          </div>
        )}
        <h1 className="mt-4 max-w-4xl font-display text-4xl italic md:text-7xl">{item.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">{item.summary}</p>
        <p className="mt-3 text-sm text-muted">{item.period}</p>

        <dl className="mt-12 grid gap-8 border-y border-white/10 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {item.metrics.map((metric) => (
            <div key={metric.label}>
              <dt className="text-sm text-muted">{metric.label}</dt>
              <dd className="mt-2 font-display text-4xl italic text-red">{metric.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <section>
            <h2 className="font-display text-3xl italic">Objective</h2>
            <p className="mt-4 text-sm leading-7 text-white/75">{item.objective}</p>
            <p className="mt-3 text-sm leading-7 text-muted">{item.secondary}</p>
          </section>
          <section>
            <h2 className="font-display text-3xl italic">Challenges</h2>
            <ul className="mt-4 grid gap-3 text-sm leading-7 text-white/75">
              {item.challenges.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-display text-3xl italic">What we did</h2>
            <ul className="mt-4 grid gap-3 text-sm leading-7 text-white/75">
              {item.strategy.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-display text-3xl italic">Results</h2>
            <ul className="mt-4 grid gap-3 text-sm leading-7 text-white/75">
              {item.results.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
        </div>

        {item.visuals.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-3xl italic mb-8">Presentation Slides</h2>
            <div className="grid gap-8">
              {item.visuals.map((src, i) => (
                <div key={src} className="overflow-hidden rounded-xl bg-ink/50 border border-white/5">
                  <img
                    src={src}
                    alt={`Slide ${i + 1}`}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="mt-16">
          <a href="/#work" className="text-sm text-muted">
            All case studies
          </a>
        </p>
      </main>
      <Footer />
    </>
  );
}
