import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="bg-void text-paper min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-5 py-32 md:px-10 lg:px-20 mt-20">
        <div className="max-w-4xl w-full mx-auto space-y-12">
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-red mb-16">
            Dreamers is a creative experiment house.
          </h1>

          <div className="space-y-8 text-xl md:text-2xl text-red/80 font-sans leading-relaxed">
            <p>
              built for brands that want to do more than simply exist in their category. We work with ambitious businesses to find what makes them interesting, what makes them different, and where there is an opportunity to take them further.
            </p>

            <p>
              Our work sits somewhere between strategy and creativity. We look at the business, the culture around it, the space it occupies and then we figure out what needs to happen next. We call ourselves an experiment house because we do not believe there is one right way to build a brand. The best ideas rarely come from following a formula. They come from being curious, asking the right questions and being willing to try something that has not been done before.
            </p>

            <p>
              That way of thinking runs through everything we do. We bring together brand strategy, creative direction, content, social, performance and design. We are interested in ideas that can change how a brand is perceived and create a stronger connection with its audience. Sometimes that idea is big and obvious, and sometimes it might just be a small shift that changes everything around it.
            </p>

            <p>
              Our role is to find it, shape it and make it real. We do not think creativity should sit separately from the business. Good creative work can build desire, create relevance and drive growth at the same time.
            </p>

            <p>
              Dreamers is for brands that are willing to question what already exists and curious enough to see what could exist instead. We bring the thinking, the making and the willingness to experiment.
            </p>

            <p className="font-bold text-red mt-12 text-3xl md:text-4xl font-display">
              You bring the ambition.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
