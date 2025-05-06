"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import { useRef } from "react";
import Image from "next/image";
import { BiLogoUpwork } from "react-icons/bi";
import { FaLinkedin } from "react-icons/fa";
import { Snippet } from "@heroui/snippet";
import { addToast } from "@heroui/toast";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase, useGSAP);
}

export default function ContactMe() {
  const logoRef = useRef({});

  useGSAP(() => {
    const WIGGLE_EASE = CustomEase.create(
      "custom",
      "M0,0 C0.012,0 0.025,0.066 0.05,0.066 0.1,0.066 0.1,-0.211 0.15,-0.211 0.2,-0.211 0.2,0.211 0.25,0.211 0.3,0.211 0.3,-0.404 0.35,-0.404 0.399,-0.404 0.409,0.399 0.459,0.399 0.509,0.399 0.498,-0.403 0.549,-0.403 0.6,-0.403 0.599,0.392 0.649,0.392 0.7,0.392 0.699,-0.207 0.749,-0.207 0.799,-0.207 0.799,0.205 0.849,0.205 0.899,0.205 0.899,-0.024 0.949,-0.024 0.974,-0.024 0.974,0 1,0 "
    );
    const ANIMATION_CONFIG = {
      rotate: 20,
      scale: 1.1,
      yoyo: true,
      repeat: -1,
      ease: WIGGLE_EASE,
      duration: 1,
    };
    logoRef.current = {
      1: gsap.to(".logoIcon1", { ...ANIMATION_CONFIG, paused: true }),
      2: gsap.to(".logoIcon2", { ...ANIMATION_CONFIG, paused: true }),
    };
  });

  const handleIconInteraction = (action, tipe) => {
    logoRef.current[tipe]?.[action]();
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="flex justify-center">
        <h1 className="text-[90px] font-[1000] z-10">Contact Me</h1>
      </div>

      <div className="flex flex-col gap-7">
        <Image
          className="rotate-[60deg] ml-[-50px] mt-4 z-10"
          src="/curly-arrow.svg"
          width={120}
          height={0}
          alt="Curly Arrow SVG"
        />
        <div className="text-3xl ml-[-220px] z-10">
          <Snippet
            hideSymbol
            variant="bordered"
            radius="none"
            color="primary"
            className="text-white border-none text-3xl p-0 m-0"
            onCopy={() => {
              addToast({
                title: "Copied!",
                description: "Email copied to clipboard.",
                color: "primary",
                variant: "bordered",
                radius: "none",
                classNames: {
                  title: "text-white",
                  description: "text-white",
                },
              });
            }}
            tooltipProps={{
              radius: "none",
              variant: "bordered",
            }}
          >
            gilbertchuar@gmail.com
          </Snippet>
        </div>
        <div className="ml-[100px] z-10">or</div>
        <Image
          className="absolute transform -scale-x-100 -rotate-90 ml-[130px] mt-[280px] z-10"
          src="/curly-arrow.svg"
          width={40}
          height={0}
          alt="Curly Arrow SVG"
        />
        <FaLinkedin
          className="text-[#006fee] text-6xl ml-[200px] logoIcon1 cursor-pointer z-10"
          onMouseEnter={() => handleIconInteraction("play", 1)}
          onMouseLeave={() => handleIconInteraction("pause", 1)}
          onClick={(e) => {
            e.preventDefault();
            window.open(
              "https://www.linkedin.com/in/gilbert-chuardi/",
              "_blank"
            );
          }}
        />
        <div className="ml-[50px] z-10">or</div>
        <Image
          className=" absolute rotate-90 ml-[-20px] mt-[420px] z-10"
          src="/curly-arrow.svg"
          width={40}
          height={0}
          alt="Curly Arrow SVG"
        />
        <BiLogoUpwork
          className="text-[#15803d] text-6xl ml-[-100px] logoIcon2 cursor-pointer z-10"
          onMouseEnter={() => handleIconInteraction("play", 2)}
          onMouseLeave={() => handleIconInteraction("pause", 2)}
          onClick={(e) => {
            e.preventDefault();
            window.open(
              "https://www.upwork.com/freelancers/~01718462e8721949c5?mp_source=share",
              "_blank"
            );
          }}
        />
      </div>
    </div>
  );
}
