"use client";

import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import { useRef, useState, useEffect } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase, useGSAP);
}

export default function IAmProgrammerSection() {
  const containerRef = useRef(null);
  const textNameRef = useRef(null);
  const textHiRef = useRef(null);
  const textDeveloperRef = useRef(null);
  const logoRef = useRef({});
  const [showScrollText, setShowScrollText] = useState(false);

  useGSAP(() => {
    const boxes = containerRef.current.querySelectorAll(".icon");
    boxes.forEach((icon) => (icon.style.opacity = "1"));
    textNameRef.current.style.opacity = "1";
    textHiRef.current.style.opacity = "1";
    textDeveloperRef.current.style.opacity = "1";

    const tl = gsap.timeline();

    tl.from(".textHi", { opacity: 0, duration: 0.5, delay: 1 });

    tl.fromTo(
      ".textHi",
      { x: 300 },
      { x: 0, duration: 0.75, delay: 0.5, ease: "back.inOut" }
    );

    tl.from(".textName", {
      clipPath: "inset(0 100% 0 0)",
      duration: 0.75,
      ease: "none",
    });

    tl.from(".textDeveloper", { opacity: 0, duration: 0.75, delay: 0.25 });

    tl.from(".icon", {
      scale: 0,
      opacity: 0,
      duration: 0.75,
      stagger: 0.25,
      ease: "back",
    });

    logoRef.current = {
      1: wiggleFunction(".icon1"),
      2: wiggleFunction(".icon2"),
      3: wiggleFunction(".icon3"),
      4: wiggleFunction(".icon4"),
    };
  }, []);

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      if (showScrollText) {
        setShowScrollText(false);
      }
      clearTimeout(scrollTimeout);
      window.removeEventListener("scroll", handleScroll);
    };

    scrollTimeout = setTimeout(() => {
      setShowScrollText(true);
    }, 8000);

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(scrollTimeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showScrollText]);

  const wiggleFunction = (tipe) => {
    return gsap.to(tipe, {
      rotate: 2,
      yoyo: true,
      repeat: -1,
      ease: CustomEase.create(
        "custom",
        "M0,0 C0.012,0 0.025,0.066 0.05,0.066 0.1,0.066 0.1,-0.211 0.15,-0.211 0.2,-0.211 0.2,0.211 0.25,0.211 0.3,0.211 0.3,-0.404 0.35,-0.404 0.399,-0.404 0.409,0.399 0.459,0.399 0.509,0.399 0.498,-0.403 0.549,-0.403 0.6,-0.403 0.599,0.392 0.649,0.392 0.7,0.392 0.699,-0.207 0.749,-0.207 0.799,-0.207 0.799,0.205 0.849,0.205 0.899,0.205 0.899,-0.024 0.949,-0.024 0.974,-0.024 0.974,0 1,0 "
      ),
      duration: 1,
      paused: true,
    });
  };

  const handleIconInteraction = (action, tipe) => {
    logoRef.current[tipe]?.[action]();
  };

  return (
    <div
      className="w-auto flex flex-col h-screen justify-center items-center"
      ref={containerRef}
    >
      <Image
        src="/bracket-left.svg"
        alt="Curly Bracket Left SVG"
        width={240}
        height={160}
        className="absolute ml-[-75%] mt-[-25%] icon icon1 opacity-0 rotate-12 z-10"
        onMouseEnter={() => handleIconInteraction("play", 1)}
        onMouseLeave={() => handleIconInteraction("pause", 1)}
      />
      <Image
        src="/hashtag.svg"
        alt="Hashtag SVG"
        width={150}
        height={70}
        className="absolute mr-[-75%] mt-[-25%] icon icon2 opacity-0 rotate-[-12deg] z-10"
        onMouseEnter={() => handleIconInteraction("play", 2)}
        onMouseLeave={() => handleIconInteraction("pause", 2)}
      />

      <Image
        src="/code.svg"
        alt="Code SVG"
        width={180}
        height={100}
        className="absolute ml-[-75%] mb-[-25%] icon icon3 opacity-0 rotate-[-12deg] z-10"
        onMouseEnter={() => handleIconInteraction("play", 3)}
        onMouseLeave={() => handleIconInteraction("pause", 3)}
      />

      <Image
        src="/bracket-right.svg"
        alt="Curly Bracket Right SVG"
        width={240}
        height={160}
        className="absolute mr-[-75%] mb-[-25%] icon icon4 opacity-0 -rotate-45 z-10"
        onMouseEnter={() => handleIconInteraction("play", 4)}
        onMouseLeave={() => handleIconInteraction("pause", 4)}
      />

      <div className="text-6xl font-[1000] flex flex-row z-10">
        <div ref={textHiRef} className="textHi opacity-0">
          Hi
        </div>
        <span className="textName opacity-0" ref={textNameRef}>
          , I{"'"}m <span className="text-[#006fee]">Gilbert Chuardi</span>
        </span>
      </div>
      <div
        className="text-6xl font-[1000] textDeveloper opacity-0 z-10"
        ref={textDeveloperRef}
      >
        A Full-Stack Engineer
      </div>
      <div
        className={`absolute w-48 mb-[-43%] ml-[-20%] text-xs transition-opacity duration-500 z-10 ${
          showScrollText ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src="/curly-arrow.svg"
          alt="Curly Arrow SVG"
          width={40}
          height={40}
          className="absolute transform -scale-x-100 ml-[-60px]"
        />
        Scroll down once to go to the next section.
      </div>
    </div>
  );
}
