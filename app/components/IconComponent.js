"use client";

import { useRef } from "react";
import Lottie from "lottie-react";
import styles from "./IconComponent.module.css";

const ANIMATION_DATA = {
  "React.js": require("@/public/animations/react-js-animation.json"),
  "Vue.js": require("@/public/animations/vue-js-animation.json"),
  "Next.js": require("@/public/animations/next-js-animation.json"),
  "Node.js": require("@/public/animations/node-js-animation.json"),
  Kotlin: require("@/public/animations/kotlin-animation.json"),
  CPlusPlus: require("@/public/animations/c-plus-plus-animation.json"),
  GSAP: require("@/public/animations/gsap-animation.json"),
  Svgator: require("@/public/animations/svgator-animation.json"),
};

export default function IconComponent({
  caption,
  borderColor = "green",
  borderSize = "5px",
  cutSize = "20px",
  hoverColor = "green",
}) {
  const lottieRef = useRef();

  const handleToggle = (action) => () => {
    if (lottieRef.current) {
      lottieRef.current[action]();
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
      onMouseEnter={handleToggle("play")}
      onMouseLeave={handleToggle("pause")}
    >
      <picture className={styles.picture}>
        <div className={styles.image2}>
          <Lottie
            className={styles.image}
            lottieRef={lottieRef}
            animationData={ANIMATION_DATA[caption]}
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
}
