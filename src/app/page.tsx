import Hero from "@/components/home/Hero";
import MissionStatement from "@/components/home/MissionStatement";
import SANJAYPreview from "@/components/home/SANJAYPreview";
import SanjayCapabilities from "@/components/home/SanjayCapabilities";
import Capabilities from "@/components/home/Capabilities";
import Industries from "@/components/home/Industries";
import Technology from "@/components/home/Technology";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <MissionStatement />
      <SANJAYPreview />
      <SanjayCapabilities />
      <Capabilities />
      <Industries />
      <Technology />
      <CTA />
    </>
  );
}
