import { Nav } from "@/components/nav";
import { FinalCta, FitCheck, Features, Hero, Preview, Trust } from "@/components/sections";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Trust />
      <Features />
      <Preview />
      <FitCheck />
      <FinalCta />
    </main>
  );
}
