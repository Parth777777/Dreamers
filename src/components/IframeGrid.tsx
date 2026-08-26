import { Mark } from "@/components/Mark";

export function IframeGrid() {
  return (
    <section className="bg-void py-24 px-5 md:px-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-5xl md:text-7xl mb-12 text-center text-paper">
          Featured Work
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-video w-full rounded-2xl overflow-hidden border border-paper/10">
            <iframe
              src="https://www.youtube.com/embed/FvG_5IJfMpk"
              title="Kenstar Ad"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="aspect-[9/16] md:aspect-video w-full rounded-2xl overflow-hidden border border-paper/10 flex items-center justify-center bg-black">
            <iframe 
              src="https://www.instagram.com/reel/DBtgcEXs_xI/embed" 
              title="Galaxy Surfectants Ad"
              className="w-full h-full min-h-[500px]"
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="aspect-video w-full rounded-2xl overflow-hidden border border-paper/10 md:col-span-2">
            <iframe
              src="https://www.youtube.com/embed/3DCH-yMi9cw"
              title="Travel Show Part 1"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="aspect-video w-full rounded-2xl overflow-hidden border border-paper/10">
            <iframe
              src="https://www.youtube.com/embed/eaYYIIfU_1A"
              title="Travel Show Part 2"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="aspect-video w-full rounded-2xl overflow-hidden border border-paper/10">
            <iframe
              src="https://www.youtube.com/embed/DfT0boYFztI"
              title="Travel Show Part 3"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
