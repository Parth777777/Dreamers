import { ServiceDeck } from "@/components/ServiceDeck";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function ServicesPage() {
  return (
    <main className="bg-void text-paper min-h-screen pt-24">
      <Header />
      <div className="py-20">
        <ServiceDeck />
      </div>
      <Footer />
    </main>
  );
}
