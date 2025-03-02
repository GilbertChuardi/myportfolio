"use client";

import { Accordion, AccordionItem } from "@heroui/accordion";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const myExpRef = useRef();

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".boxMyExp",
        start: "49% center",
        markers: true,
        toggleActions: "restart none none none", // debug
      },
    });

    tl.from(".textMyExp", {
      opacity: 0,
      duration: 1,
    });

    tl.from(".textMyExp", {
      yPercent: 160,
      duration: 0.5,
      ease: "power3.in",
    });

    tl.from(
      ".textPPanjang",
      {
        transformOrigin: "bottom",
        scaleY: 0,
        duration: 0.5,
        ease: "power3.in",
      },
      "<"
    );
  });

  return (
    <div className="h-screen flex">
      <div className="w-[30%] bg-[#00e1ff] boxMyExp">
        <h1 className="text-black 2xl:text-[90px] text-7xl font-[1000] textMyExp">
          My Experience
        </h1>
        <div className="2xl:w-[11px] w-[9px] h-72 bg-black 2xl:ml-[134px] ml-[107px] 2xl:mt-[-65px] mt-[-50px] textPPanjang"></div>
      </div>
      <div className="w-[70%]">
        <Accordion selectionMode="multiple" className="px-[20%]">
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
            title="2022-2023 Fullstack Developer at Adaremit"
          >
            <div>
              <div>- Integrate Vendor API</div>
              <div>- Find the best rate from different Vendor</div>
              <div>- Fixing some old Vendor API bug</div>
              <div>- Fixing some old Remittance Website bug</div>
            </div>
          </AccordionItem>
        </Accordion>
        <Link href="/tradingView">TradingView Integration</Link>
        <Link href="/world">3D World</Link>
      </div>
    </div>
  );
}
