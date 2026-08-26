import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContentLibrary } from "@/components/ContentLibrary";
import fs from "fs";
import path from "path";

export default function ContentLibraryPage() {
  let brandShots: string[] = [];
  try {
    const dir = path.join(process.cwd(), "public", "brand-shots");
    const files = fs.readdirSync(dir);
    brandShots = files
      .filter((f) => f.match(/\.(png|jpg|jpeg|gif|webp|mp4|mov|webm)$/i))
      .filter((f) => !f.toLowerCase().includes("untitled design"))
      .map((f) => `/brand-shots/${f}`);
      
    // Add iframes
    brandShots = [
      ...brandShots,
      // Original
      "https://www.youtube.com/embed/FvG_5IJfMpk",
      "https://www.instagram.com/reel/DBtgcEXs_xI/embed",
      "https://www.youtube.com/embed/3DCH-yMi9cw",
      "https://www.youtube.com/embed/eaYYIIfU_1A",
      "https://www.youtube.com/embed/DfT0boYFztI",
      
      // New YouTube Links
      "https://www.youtube.com/embed/n_dl3kcz60I",
      "https://www.youtube.com/embed/I-Z1wCm0Thg",
      "https://www.youtube.com/embed/Hd5GbR6Fn3U",
      "https://www.youtube.com/embed/kH-W0l0AErM",
      "https://www.youtube.com/embed/5CK741osQjU",
      "https://www.youtube.com/embed/yp0ds9ZyPAQ",
      "https://www.youtube.com/embed/lFC1H0lb0vU",
      "https://www.youtube.com/embed/AZ7O0iVgmbE",
      "https://www.youtube.com/embed/PMn2pWzVW1Y",
      "https://www.youtube.com/embed/h5kGIpgrcXA",

      // New Instagram Links
      "https://www.instagram.com/p/B3zpeoTpWuT/embed",
      "https://www.instagram.com/p/B3zUlS1pRTw/embed",
      "https://www.instagram.com/p/B3zR32UJRcN/embed",
      "https://www.instagram.com/p/B3zK95sJtCB/embed",
      "https://www.instagram.com/p/B3ysdqGJqvX/embed",
      "https://www.instagram.com/p/B3ysZwupgWt/embed",
      "https://www.instagram.com/p/B3ysVTfJ2zb/embed",
      "https://www.instagram.com/p/B5ejmFoF6NQ/embed",
      "https://www.instagram.com/p/B31v87bAGyw/embed",
      "https://www.instagram.com/p/CbrTzg1j3JX/embed",
      "https://www.instagram.com/p/CZOsVQDIqgI/embed",
      "https://www.instagram.com/p/CZB27uooYSN/embed",
      "https://www.instagram.com/p/CYGS-qGIXeS/embed",
      "https://www.instagram.com/p/CYEDMr7oxV7/embed",
      "https://www.instagram.com/p/CYBNCQ3oys2/embed",
      "https://www.instagram.com/p/CX_Mti3osWD/embed",
      "https://www.instagram.com/p/CX0OFEFI9wS/embed",
      "https://www.instagram.com/p/CVzh5IZLfTQ/embed",
      "https://www.instagram.com/p/CR6fthZFmxe/embed",
      "https://www.instagram.com/p/CR6fcPBFz8k/embed",
      "https://www.instagram.com/p/CUXgTTmsyrl/embed",
      "https://www.instagram.com/p/CVzvqaRL7hO/embed"
    ];
  } catch (e) {
    console.error("Error reading brand-shots directory:", e);
  }

  return (
    <main className="bg-void text-paper min-h-[100dvh] flex flex-col">
      <Header />
      <div className="flex-1 pt-12">
        <ContentLibrary brandShots={brandShots} />
      </div>
      <Footer />
    </main>
  );
}
