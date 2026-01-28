import { Hero, Gallery } from "@/components/home";
import { heroData, galleryImages } from "@/data";

export default function Home() {
  return (
    <>
      <Hero data={heroData} />
      <div id="main-content">
        <Gallery images={galleryImages} />
      </div>
      {/* Additional homepage sections will be added here */}
    </>
  );
}
