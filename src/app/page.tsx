import { Hero, Gallery, About } from "@/components/home";
import { heroData, galleryImages, aboutInfo } from "@/data";

export default function Home() {
  return (
    <>
      <Hero data={heroData} />
      <div id="main-content">
        <Gallery images={galleryImages} />
        <About data={aboutInfo} />
      </div>
      {/* Additional homepage sections will be added here */}
    </>
  );
}
