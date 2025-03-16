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
  const icon1Ref = useRef(null);
  const icon2Ref = useRef(null);
  const icon3Ref = useRef(null);
  const icon4Ref = useRef(null);
  const [showScrollText, setShowScrollText] = useState(false);

  useGSAP(() => {
    const boxes = containerRef.current.querySelectorAll(".icon");
    boxes.forEach((icon) => (icon.style.opacity = "1"));
    textNameRef.current.style.opacity = "1";
    textHiRef.current.style.opacity = "1";
    textDeveloperRef.current.style.opacity = "1";

    const tl = gsap.timeline();
    tl.from(".textHi", {
      opacity: 0,
      duration: 0.5,
      delay: 0.5,
    });
    tl.fromTo(
      ".textHi",
      {
        x: 300,
      },
      {
        x: 0,
        duration: 0.75,
        delay: 0.5,
        ease: "back.inOut",
      }
    );
    tl.from(".textName", {
      clipPath: "inset(0 100% 0 0)",
      duration: 0.75,
      ease: "none",
    });
    tl.from(".textDeveloper", {
      opacity: 0,
      duration: 0.75,
      delay: 0.25,
    });
    tl.from(".icon", {
      scale: 0,
      opacity: 0,
      duration: 0.75,
      stagger: 0.25,
      ease: "back",
    });

    icon1Ref.current = wiggleFunction(".icon1");
    icon2Ref.current = wiggleFunction(".icon2");
    icon3Ref.current = wiggleFunction(".icon3");
    icon4Ref.current = wiggleFunction(".icon4");
    icon1Ref.current.pause();
    icon2Ref.current.pause();
    icon3Ref.current.pause();
    icon4Ref.current.pause();
  }, []);

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      if (showScrollText) {
        setShowScrollText(false);
      }
      // Clear the timeout if the user scrolls before 10 seconds
      clearTimeout(scrollTimeout);
      // Remove the scroll event listener since we don't need it anymore
      window.removeEventListener("scroll", handleScroll);
    };

    // Set a timeout to show the text after 10 seconds
    scrollTimeout = setTimeout(() => {
      setShowScrollText(true);
    }, 10000);

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener and timeout on component unmount
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
    });
  };

  const handleIconEnter = (tipe) => {
    if (tipe === "1") {
      icon1Ref.current.play();
    } else if (tipe === "2") {
      icon2Ref.current.play();
    } else if (tipe === "3") {
      icon3Ref.current.play();
    } else if (tipe === "4") {
      icon4Ref.current.play();
    }
  };

  const handleIconLeave = (tipe) => {
    if (tipe === "1") {
      icon1Ref.current.pause();
    } else if (tipe === "2") {
      icon2Ref.current.pause();
    } else if (tipe === "3") {
      icon3Ref.current.pause();
    } else if (tipe === "4") {
      icon4Ref.current.pause();
    }
  };

  return (
    <div
      className="w-auto flex flex-col h-screen justify-center items-center"
      ref={containerRef}
    >
      <Image
        src="/BracketLeft.svg"
        alt="Curly Bracket Left SVG"
        width={240}
        height={160}
        className="absolute ml-[-75%] mt-[-25%] icon icon1 opacity-0 rotate-12"
        ref={icon1Ref}
        onMouseEnter={() => handleIconEnter("1")}
        onMouseLeave={() => handleIconLeave("1")}
      />
      <Image
        src="/Hashtag.svg"
        alt="Hashtag SVG"
        width={150}
        height={70}
        className="absolute mr-[-75%] mt-[-25%] icon icon2 opacity-0 rotate-[-12deg]"
        ref={icon2Ref}
        onMouseEnter={() => handleIconEnter("2")}
        onMouseLeave={() => handleIconLeave("2")}
      />

      <Image
        src="/Code.svg"
        alt="Code SVG"
        width={180}
        height={100}
        className="absolute ml-[-75%] mb-[-25%] icon icon3 opacity-0 rotate-[-12deg]"
        ref={icon3Ref}
        onMouseEnter={() => handleIconEnter("3")}
        onMouseLeave={() => handleIconLeave("3")}
      />

      <Image
        src="/BracketRight.svg"
        alt="Curly Bracket Right SVG"
        width={240}
        height={160}
        className="absolute mr-[-75%] mb-[-25%] icon icon4 opacity-0 -rotate-45"
        ref={icon4Ref}
        onMouseEnter={() => handleIconEnter("4")}
        onMouseLeave={() => handleIconLeave("4")}
      />

      <div className="text-6xl font-[1000] flex flex-row">
        <div ref={textHiRef} className="textHi opacity-0">
          Hi
        </div>
        <span className="textName opacity-0" ref={textNameRef}>
          , I{"'"}m <span className="text-[#006fee]">Gilbert Chuardi</span>
        </span>
      </div>
      <div
        className="text-6xl font-[1000] textDeveloper opacity-0"
        ref={textDeveloperRef}
      >
        A Web Developer
      </div>
      <div
        className={`absolute w-48 mb-[-43%] ml-[-20%] text-xs transition-opacity duration-500 ${
          showScrollText ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src="/curlyArrow.svg"
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
