import { TapeAccordion } from "@/components/TapeAccordion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function CaseStudiesPage() {
  return (
    <main className="bg-void text-paper min-h-screen pt-24">
      <Header />
      <div className="py-20">
        <TapeAccordion />
      </div>
      <Footer />
    </main>
  );
}
