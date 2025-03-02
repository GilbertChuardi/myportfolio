"use client";

import { useState, useRef } from "react";
import Lottie from "lottie-react";
import styles from "./IconComponent.module.css";
import ReactAnimationData from "@/public/ReactJsAnimation.json";
import VueAnimationData from "@/public/VuejsAnimation.json";
import NextAnimationData from "@/public/NextJsAnimation.json";
import NodeAnimationData from "@/public/NodeJsAnimation.json";

const IconComponent = ({
  caption,
  borderColor = "green",
  borderSize = "5px",
  cutSize = "20px",
  hoverColor = "green",
}) => {
  const lottieRefReact = useRef();
  const lottieRefVue = useRef();
  const lottieRefNext = useRef();
  const lottieRefNode = useRef();

  const handleToggleEnter = (tipe) => {
    console.log(tipe);
    if (tipe == "React.js") {
      if (!lottieRefReact.current) return; //biar ga crash
      lottieRefReact.current.play();
    } else if (tipe == "Vue.js") {
      if (!lottieRefVue.current) return; //biar ga crash
      lottieRefVue.current.play();
    } else if (tipe == "Next.js") {
      if (!lottieRefNext.current) return; //biar ga crash
      lottieRefNext.current.play();
    } else if (tipe == "Node.js") {
      if (!lottieRefNode.current) return; //biar ga crash
      lottieRefNode.current.play();
    }
  };

  const handleToggleLeave = (tipe) => {
    if (tipe == "React.js") {
      if (!lottieRefReact.current) return; //biar ga crash
      lottieRefReact.current.pause();
    } else if (tipe == "Vue.js") {
      if (!lottieRefVue.current) return; //biar ga crash
      lottieRefVue.current.pause();
    } else if (tipe == "Next.js") {
      if (!lottieRefNext.current) return; //biar ga crash
      lottieRefNext.current.pause();
    } else if (tipe == "Node.js") {
      if (!lottieRefNode.current) return; //biar ga crash
      lottieRefNode.current.pause();
    }
  };

  return (
    <div
      className={styles.pictureContainer}
      style={{
        "--bc": borderColor,
        "--bs": borderSize,
        "--cs": cutSize,
        "--hc": hoverColor,
      }}
      onMouseEnter={() => handleToggleEnter(caption)}
      onMouseLeave={() => handleToggleLeave(caption)}
    >
      <picture className={styles.picture}>
        <div className={styles.image2}>
          <Lottie
            className={styles.image}
            lottieRef={
              caption == "React.js"
                ? lottieRefReact
                : caption == "Vue.js"
                ? lottieRefVue
                : caption == "Next.js"
                ? lottieRefNext
                : caption == "Node.js"
                ? lottieRefNode
                : ""
            }
            animationData={
              caption == "React.js"
                ? ReactAnimationData
                : caption == "Vue.js"
                ? VueAnimationData
                : caption == "Next.js"
                ? NextAnimationData
                : caption == "Node.js"
                ? NodeAnimationData
                : ""
            }
            loop
            autoplay={false}
          />
        </div>
        <div className={styles.figcaption2}>
          <figcaption className={styles.figcaption}>{caption}</figcaption>
        </div>
      </picture>
    </div>
  );
};

export default IconComponent;
