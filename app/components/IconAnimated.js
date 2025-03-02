"use client";

import { useState, useRef } from "react";
import Lottie from "lottie-react";
import ReactAnimationData from "@/public/ReactJsAnimation.json";
import VueAnimationData from "@/public/VuejsAnimation.json";
import NextAnimationData from "@/public/NextJsAnimation.json";
import NodeAnimationData from "@/public/NodeJsAnimation.json";
import IconComponent from "../border-icon-debug/components/IconComponent";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const IconAnimated = () => {
  const lottieRefReact = useRef();
  const lottieRefVue = useRef();
  const lottieRefNext = useRef();
  const lottieRefNode = useRef();

  const handleToggleEnter = (tipe) => {
    if (tipe == "React") {
      if (!lottieRefReact.current) return; //biar ga crash
      lottieRefReact.current.play();
    } else if (tipe == "Vue") {
      if (!lottieRefVue.current) return; //biar ga crash
      lottieRefVue.current.play();
    } else if (tipe == "Next") {
      if (!lottieRefNext.current) return; //biar ga crash
      lottieRefNext.current.play();
    } else if (tipe == "Node") {
      if (!lottieRefNext.current) return; //biar ga crash
      lottieRefNode.current.play();
    }
  };

  const handleToggleLeave = (tipe) => {
    if (tipe == "React") {
      if (!lottieRefReact.current) return; //biar ga crash
      lottieRefReact.current.pause();
    } else if (tipe == "Vue") {
      if (!lottieRefVue.current) return; //biar ga crash
      lottieRefVue.current.pause();
    } else if (tipe == "Next") {
      if (!lottieRefNext.current) return; //biar ga crash
      lottieRefNext.current.pause();
    } else if (tipe == "Node") {
      if (!lottieRefNext.current) return; //biar ga crash
      lottieRefNode.current.pause();
    }
  };

  return (
    <div className="w-auto h-screen">
      <h1 className="text-[90px] font-[1000] flex justify-center">Learned</h1>
      <div className="flex flex-row my-4 justify-evenly">
        <div
          className="w-40 h-40 flex flex-col items-center justify-center border-3 border-[#006fee] rounded-md hover:bg-sky-950"
          onMouseEnter={() => handleToggleEnter("React")}
          onMouseLeave={() => handleToggleLeave("React")}
        >
          <Lottie
            className="w-20 h-20"
            lottieRef={lottieRefReact}
            animationData={ReactAnimationData}
            loop
            autoplay={false}
          />
          React.js
        </div>
        <div
          className="w-40 h-40 flex flex-col items-center justify-center border-3 border-gray-400 rounded-md hover:bg-neutral-900"
          onMouseEnter={() => handleToggleEnter("Next")}
          onMouseLeave={() => handleToggleLeave("Next")}
        >
          <Lottie
            className="w-20 h-20"
            lottieRef={lottieRefNext}
            animationData={NextAnimationData}
            loop
            autoplay={false}
          />
          Next.js
        </div>
        <div
          className="w-40 h-40 flex flex-col items-center justify-center border-3 border-green-700 rounded-md hover:bg-green-950"
          onMouseEnter={() => handleToggleEnter("Vue")}
          onMouseLeave={() => handleToggleLeave("Vue")}
        >
          <Lottie
            className="w-20 h-20"
            lottieRef={lottieRefVue}
            animationData={VueAnimationData}
            loop
            autoplay={false}
          />
          Vue.js
        </div>
        <div
          className="w-40 h-40 flex flex-col items-center justify-center border-3 border-green-600 rounded-md hover:bg-green-800"
          onMouseEnter={() => handleToggleEnter("Node")}
          onMouseLeave={() => handleToggleLeave("Node")}
        >
          <Lottie
            className="w-20 h-20"
            lottieRef={lottieRefNode}
            animationData={NodeAnimationData}
            loop
            autoplay={false}
          />
          Node.js
        </div>
      </div>
      <div className="flex flex-row my-4 justify-around mt-20">
        <div
          className="w-40 h-40 flex flex-col items-center justify-center border-3 border-[#006fee] rounded-md hover:bg-sky-950"
          onMouseEnter={() => handleToggleEnter("React")}
          onMouseLeave={() => handleToggleLeave("React")}
        >
          {/* <Lottie
            className="w-20 h-20"
            lottieRef={lottieRefReact}
            animationData={ReactAnimationData}
            loop
            autoplay={false}
          /> */}
          Kotlin
        </div>
        <div
          className="w-40 h-40 flex flex-col items-center justify-center border-3 border-[#006fee] rounded-md hover:bg-sky-950"
          onMouseEnter={() => handleToggleEnter("React")}
          onMouseLeave={() => handleToggleLeave("React")}
        >
          {/* <Lottie
            className="w-20 h-20"
            lottieRef={lottieRefReact}
            animationData={ReactAnimationData}
            loop
            autoplay={false}
          /> */}
          GSAP
        </div>
        <div
          className="w-40 h-40 flex flex-col items-center justify-center border-3 border-gray-400 rounded-md hover:bg-neutral-900"
          onMouseEnter={() => handleToggleEnter("Next")}
          onMouseLeave={() => handleToggleLeave("Next")}
        >
          {/* <Lottie
            className="w-20 h-20"
            lottieRef={lottieRefNext}
            animationData={NextAnimationData}
            loop
            autoplay={false}
          /> */}
          C++
        </div>
        <div
          className="w-40 h-40 flex flex-col items-center justify-center border-3 border-gray-400 rounded-md hover:bg-neutral-900"
          onMouseEnter={() => handleToggleEnter("Next")}
          onMouseLeave={() => handleToggleLeave("Next")}
        >
          {/* <Lottie
            className="w-20 h-20"
            lottieRef={lottieRefNext}
            animationData={NextAnimationData}
            loop
            autoplay={false}
          /> */}
          Svgator
        </div>
      </div>
    </div>
  );
};

export default IconAnimated;
