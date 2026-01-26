import { Hero } from "@/components/home";
import { heroData } from "@/data";

export default function Home() {
  return (
    <>
      <Hero data={heroData} />
      {/* Additional homepage sections will be added here */}
    </>
  );
}
