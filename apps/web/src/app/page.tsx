import { FinalCall, School } from "@/components/home/closing";
import { Crew } from "@/components/home/crew";
import { Hero } from "@/components/home/hero";
import { Manifesto } from "@/components/home/manifesto";
import { Process } from "@/components/home/process";
import { Reels } from "@/components/home/reels";
import { Services } from "@/components/home/services";
import { Stats } from "@/components/home/stats";
import { Ticker } from "@/components/home/ticker";
import { MotionProvider } from "@/components/motion";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export default function HomePage() {
  return (
    <MotionProvider>
      <SiteHeader overlay />
      <main>
        <Hero />
        <Ticker />
        <Manifesto />
        <Stats />
        <Reels />
        <Services />
        <Process />
        <Crew />
        <School />
        <FinalCall />
      </main>
      <SiteFooter />
    </MotionProvider>
  );
}
