"use client";

import IconComponent from "./IconComponent";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, Draggable, InertiaPlugin, ScrollTrigger);
}

export default function AnimatedIconSection() {
  let maxZIndex = 10;

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
      onComplete: () => {
        const boxes = gsap.utils.toArray(".box");
        boxes.forEach((box, index) => {
          const friction = -0.6;

          const boxProps = gsap.getProperty(box);
          const boxWidth = box.getBoundingClientRect().width / 2;
          const tracker = InertiaPlugin.track(box, "x,y")[0];

          let vw = window.innerWidth;
          let vh = window.innerHeight;

          gsap.defaults({ overwrite: true });

          gsap.set(box, { x: 0, y: 0 });

          const animateBounce = (
            x = "+=0",
            y = "+=0",
            vx = "auto",
            vy = "auto"
          ) => {
            gsap.fromTo(
              box,
              { x, y },
              {
                inertia: {
                  x: vx,
                  y: vy,
                },
                onUpdate: checkBounds,
              }
            );
          };

          Draggable.create(box, {
            bounds: ".boxContainer",
            onPress() {
              gsap.killTweensOf(box);
              this.update();
            },
            zIndexBoost: false,
            onDragStart() {
              maxZIndex = Math.min(maxZIndex + 1, 200);
              box.style.zIndex = maxZIndex.toString();
              gsap.killTweensOf(box);
            },
            onDragEnd: animateBounce,
            onDragEndParams: [],
          });

          window.addEventListener("resize", () => {
            vw = window.innerWidth;
            vh = window.innerHeight;
          });

          const checkBounds = () => {
            let w = boxWidth;
            let x = boxProps("x");
            let y = boxProps("y");
            let vx = tracker.get("x");
            let vy = tracker.get("y");
            let xPos = x;
            let yPos = y;
            let hitting = false;

            if (index === 0) {
              //left edge
              if (x - w < -235) {
                xPos = w - 235;
                vx = vx * friction;
                hitting = true;
              }
              //right edge
              else if (x + w > vw - 230) {
                xPos = vw - w - 230;
                vx = vx * friction;
                hitting = true;
              }
              //top edge
              else if (y - w < -295) {
                yPos = w - 295;
                vy = vy * friction;
                hitting = true;
              }
              //bottom edge
              else if (y + w > vh - 275) {
                yPos = vh - w - 275;
                vy = vy * friction;
                hitting = true;
              }
            } else if (index === 1) {
              //left edge
              if (x - w < -590) {
                xPos = w - 590;
                vx = vx * friction;
                hitting = true;
              }
              //right edge
              else if (x + w > vw - 590) {
                xPos = vw - w - 590;
                vx = vx * friction;
                hitting = true;
              }
              //top edge
              else if (y - w < -295) {
                yPos = w - 295;
                vy = vy * friction;
                hitting = true;
              }
              //bottom edge
              else if (y + w > vh - 275) {
                yPos = vh - w - 275;
                vy = vy * friction;
                hitting = true;
              }
            } else if (index === 2) {
              //left edge
              if (x - w < -945) {
                xPos = w - 945;
                vx = vx * friction;
                hitting = true;
              }
              //right edge
              else if (x + w > vw - 940) {
                xPos = vw - w - 940;
                vx = vx * friction;
                hitting = true;
              }
              //top edge
              else if (y - w < -295) {
                yPos = w - 295;
                vy = vy * friction;
                hitting = true;
              }
              //bottom edge
              else if (y + w > vh - 275) {
                yPos = vh - w - 275;
                vy = vy * friction;
                hitting = true;
              }
            } else if (index === 3) {
              //left edge
              if (x - w < -1300) {
                xPos = w - 1300;
                vx = vx * friction;
                hitting = true;
              }
              //right edge
              else if (x + w > vw - 1295) {
                xPos = vw - w - 1295;
                vx = vx * friction;
                hitting = true;
              }
              //top edge
              else if (y - w < -295) {
                yPos = w - 295;
                vy = vy * friction;
                hitting = true;
              }
              //bottom edge
              else if (y + w > vh - 275) {
                yPos = vh - w - 275;
                vy = vy * friction;
                hitting = true;
              }
            } else if (index === 4) {
              //left edge
              if (x - w < -235) {
                xPos = w - 235;
                vx = vx * friction;
                hitting = true;
              }
              //right edge
              else if (x + w > vw - 230) {
                xPos = vw - w - 230;
                vx = vx * friction;
                hitting = true;
              }
              //top edge
              else if (y - w < -560) {
                yPos = w - 560;
                vy = vy * friction;
                hitting = true;
              }
              //bottom edge
              else if (y + w > vh - 540) {
                yPos = vh - w - 540;
                vy = vy * friction;
                hitting = true;
              }
            } else if (index === 5) {
              //left edge
              if (x - w < -590) {
                xPos = w - 590;
                vx = vx * friction;
                hitting = true;
              }
              //right edge
              else if (x + w > vw - 585) {
                xPos = vw - w - 585;
                vx = vx * friction;
                hitting = true;
              }
              //top edge
              else if (y - w < -560) {
                yPos = w - 560;
                vy = vy * friction;
                hitting = true;
              }
              //bottom edge
              else if (y + w > vh - 540) {
                yPos = vh - w - 540;
                vy = vy * friction;
                hitting = true;
              }
            } else if (index === 6) {
              //left edge
              if (x - w < -945) {
                xPos = w - 945;
                vx = vx * friction;
                hitting = true;
              }
              //right edge
              else if (x + w > vw - 940) {
                xPos = vw - w - 940;
                vx = vx * friction;
                hitting = true;
              }
              //top edge
              else if (y - w < -560) {
                yPos = w - 560;
                vy = vy * friction;
                hitting = true;
              }
              //bottom edge
              else if (y + w > vh - 540) {
                yPos = vh - w - 540;
                vy = vy * friction;
                hitting = true;
              }
            } else if (index === 7) {
              //left edge
              if (x - w < -1300) {
                xPos = w - 1300;
                vx = vx * friction;
                hitting = true;
              }
              //right edge
              else if (x + w > vw - 1295) {
                xPos = vw - w - 1295;
                vx = vx * friction;
                hitting = true;
              }
              //top edge
              else if (y - w < -560) {
                yPos = w - 560;
                vy = vy * friction;
                hitting = true;
              }
              //bottom edge
              else if (y + w > vh - 540) {
                yPos = vh - w - 540;
                vy = vy * friction;
                hitting = true;
              }
            }

            if (hitting) {
              animateBounce(xPos, yPos, vx, vy);
            }
          };
        });
      },
    });
  }, []);

  return (
    <div className="h-screen boxContainer relative overflow-hidden">
      <div className="flex justify-center relative">
        <h1 className="text-[90px] font-[1000] z-10">Skills</h1>
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
