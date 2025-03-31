"use client";

import IconComponent from "./IconComponent";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

export default function AnimatedIconSection() {
  useGSAP(() => {
    gsap.from(".box", {
      scrollTrigger: {
        trigger: ".boxContainer",
        start: "49% center",
      },
      y: -100,
      duration: 1,
      opacity: 0,
      stagger: 0.2,
      ease: "bounce",
      onComplete: () => Draggable.create(".box", { bounds: ".boxContainer" }),
    });
  }, []);

  return (
    <div className="h-screen boxContainer">
      <div className="flex justify-center relative">
        <h1 className="text-[90px] font-[1000] z-10">Learned</h1>
      </div>
      <div className="flex justify-evenly place-items-center 2xl:mt-20 mt-8">
        <div className="box z-10">
          <IconComponent
            caption="React.js"
            borderColor="#006fee"
            borderSize="2px"
            cutSize="35px"
            hoverColor="#082f49"
          />
        </div>
        <div className="box z-10">
          <IconComponent
            caption="Next.js"
            borderColor="#9ca3af"
            borderSize="2px"
            cutSize="35px"
            hoverColor="#171717"
          />
        </div>
        <div className="box z-10">
          <IconComponent
            caption="Vue.js"
            borderColor="#15803d"
            borderSize="2px"
            cutSize="35px"
            hoverColor="#052e16"
          />
        </div>
        <div className="box z-10">
          <IconComponent
            caption="Node.js"
            borderColor="#16a34a"
            borderSize="2px"
            cutSize="35px"
            hoverColor="#166534"
          />
        </div>
      </div>
      <div className="flex justify-evenly place-items-center 2xl:mt-24 mt-8">
        <div className="box z-10">
          <IconComponent
            caption="Kotlin"
            borderColor="#3730a3"
            borderSize="2px"
            cutSize="35px"
            hoverColor="#1e1b4b"
          />
        </div>
        <div className="box z-10">
          <IconComponent
            caption="GSAP"
            borderColor="#166534"
            borderSize="2px"
            cutSize="35px"
            hoverColor="#052e16"
          />
        </div>
        <div className="box z-10">
          <IconComponent
            caption="CPlusPlus"
            borderColor="#1e40af"
            borderSize="2px"
            cutSize="35px"
            hoverColor="#172554"
          />
        </div>
        <div className="box z-10">
          <IconComponent
            caption="Svgator"
            borderColor="#9ca3af"
            borderSize="2px"
            cutSize="35px"
            hoverColor="#171717"
          />
        </div>
      </div>
    </div>
  );
}
