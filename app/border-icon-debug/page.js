"use client";

import IconComponent from "./components/IconComponent";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, Draggable);
}

const HomePage = () => {
  useGSAP(() => {
    gsap.from(".box", {
      y: -100,
      duration: 1,
      opacity: 0,
      stagger: 0.3,
      ease: "bounce",
      onComplete: () => {
        // Add a delay before making the boxes draggable
        gsap.delayedCall(0.5, () => {
          Draggable.create(".box", {
            onDragStart: function () {
              console.log("Dragging started");
            },
            onDragEnd: function () {
              console.log("Dragging ended");
            },
          });
        });
      },
    });
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          placeItems: "center",
          height: "250px",
          backgroundColor: "black",
        }}
      >
        <div className="box">
          <IconComponent
            caption="React.js"
            borderColor="#006fee"
            borderSize="5px"
            cutSize="35px"
            hoverColor="#082f49"
          />
        </div>
        <div className="box">
          <IconComponent
            caption="Next.js"
            borderColor="#9ca3af"
            borderSize="5px"
            cutSize="35px"
            hoverColor="#171717"
          />
        </div>
        <div className="box">
          <IconComponent
            caption="Vue.js"
            borderColor="#15803d"
            borderSize="5px"
            cutSize="35px"
            hoverColor="#052e16"
          />
        </div>
        <div className="box">
          <IconComponent
            caption="Node.js"
            borderColor="#16a34a"
            borderSize="5px"
            cutSize="35px"
            hoverColor="#166534"
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          placeItems: "center",
          height: "250px",
          backgroundColor: "black",
          marginTop: "100px",
        }}
      >
        <IconComponent
          caption="Kotlin"
          borderColor="blue"
          borderSize="5px"
          cutSize="35px"
        />
        <IconComponent
          caption="GSAP"
          borderColor="blue"
          borderSize="5px"
          cutSize="35px"
        />
        <IconComponent
          caption="C++"
          borderColor="blue"
          borderSize="5px"
          cutSize="35px"
        />
        <IconComponent
          caption="SVGator"
          borderColor="blue"
          borderSize="5px"
          cutSize="35px"
        />
      </div>
    </div>
  );
};

export default HomePage;
