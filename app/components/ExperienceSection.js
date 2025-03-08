"use client";

import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { BsThreeDots } from "react-icons/bs";
import { GrAdd, GrClose, GrFormDown, GrUp } from "react-icons/gr";
import { Button, ButtonGroup } from "@heroui/button";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function ExperienceSection() {
  const [number, setNumber] = useState(0);
  const [tab, setTab] = useState();
  const [minSize, setMinSize] = useState(20);

  const textRefsAdaremit = useRef([]);

  useGSAP(() => {
    if (tab === "adaremit") {
      const tl = gsap.timeline();

      textRefsAdaremit.current.forEach((ref, index) => {
        if (ref) {
          if (
            index == 0 ||
            index == 2 ||
            index == 3 ||
            index == 4 ||
            index == 5
          ) {
            tl.from(ref, {
              clipPath: "inset(0 100% 0 0)",
              duration: 0.7,
              ease: "none",
            });
          } else if (index == 1) {
            tl.from(ref, {
              clipPath: "inset(0 100% 0 0)",
              duration: 1,
              ease: "none",
            });
          } else if (index == 6) {
            tl.from(ref, {
              clipPath: "inset(0 100% 0 0)",
              duration: 0.1,
              ease: "none",
            });
          } else if (index == 7) {
            tl.fromTo(
              ref,
              {
                opacity: 0,
              },
              {
                opacity: 1,
                duration: 0.2,
                yoyo: true,
                repeat: -1,
                repeatDelay: 1,
                ease: "power1.inOut",
              }
            );
          }
        }
      });
    }

    const randomNum = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
    setNumber(randomNum);

    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 1536) {
        setMinSize(25);
      } else {
        setMinSize(20);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [tab]);

  const handleTab = (tipe) => {
    setTab(tipe);
  };

  return (
    <div className="h-screen flex flex-col">
      <PanelGroup direction="vertical" className="flex-1">
        <Panel defaultSize={40} minSize={minSize}>
          <div className="flex flex-col">
            <h1 className="text-[90px] font-[1000] flex justify-center">
              My Experience
            </h1>
            <div className="flex flex-row justify-center gap-3">
              <Button
                onPress={() => handleTab("adaremit")}
                color="primary"
                radius="none"
                variant="bordered"
                className="text-white border-gray-500 hover:bg-[#006fee] hover:border-[#006fee]"
              >
                Adaremit
              </Button>
              <Button
                onPress={() => handleTab("3dworld")}
                radius="none"
                variant="bordered"
                className="text-white border-gray-500 hover:bg-[#006fee] hover:border-[#006fee]"
              >
                3D World
              </Button>
              <Button
                onPress={() => handleTab("tradingview")}
                color="primary"
                radius="none"
                variant="bordered"
                className="text-white border-gray-500 hover:bg-[#006fee] hover:border-[#006fee]"
              >
                Trading View
              </Button>
            </div>
          </div>
        </Panel>

        <PanelResizeHandle className="h-[2px] bg-gray-500 hover:bg-[#006fee] hover:scale-y-[2]" />

        <Panel defaultSize={60} minSize={minSize} className="flex flex-col">
          <div className="flex flex-row justify-between p-2">
            <div className="flex flex-row gap-3">
              <div className="text-gray-500 font-mono text-xs tracking-tight cursor-default">
                PROBLEMS
              </div>
              <div className="text-gray-500 font-mono text-xs tracking-tight cursor-default">
                OUTPUT
              </div>
              <div className="text-gray-500 font-mono text-xs [word-spacing:-5px] tracking-tight cursor-default">
                DEBUG CONSOLE
              </div>
              <div className="underline underline-offset-4 font-mono text-xs tracking-tight cursor-default">
                TERMINAL
              </div>
              <div className="text-gray-500 font-mono text-xs tracking-tight cursor-default">
                PORTS
              </div>
            </div>

            <div className="flex flex-row gap-[10px]">
              <div className="font-mono text-xs">
                <GrAdd />
              </div>
              <div className="font-mono ml-[-9px] text-xs">
                <GrFormDown />
              </div>
              <div className="font-mono text-xs">
                <BsThreeDots />
              </div>
              <div className="font-mono text-xs">
                <GrUp />
              </div>
              <div className="font-mono text-xs">
                <GrClose />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4 scrollbar-hide">
            {tab === "adaremit" && (
              <div>
                <div ref={(el) => (textRefsAdaremit.current[0] = el)}>
                  {" > "} GET /adaremit{" "}
                  <span className="text-green-500">200</span> in {number} ms
                </div>
                <div
                  className="flex flex-row"
                  ref={(el) => (textRefsAdaremit.current[1] = el)}
                >
                  <div className="flex flex-col">
                    <p>{" > "}</p>
                    <p>{" > "}</p>
                  </div>
                  <div className="text-5xl font-bold ml-1">
                    Fullstack Developer at Adaremit
                  </div>
                </div>
                <div ref={(el) => (textRefsAdaremit.current[2] = el)}>
                  {" > "} Integrate Vendor API for{" "}
                  <span className="text-amber-700">Admin Website</span>
                </div>
                <div ref={(el) => (textRefsAdaremit.current[3] = el)}>
                  {" > "} Fix old{" "}
                  <span className="text-amber-700">Remittance Website</span> bug
                </div>
                <div ref={(el) => (textRefsAdaremit.current[4] = el)}>
                  {" > "} Fix old Vendor API bug
                </div>
                <div ref={(el) => (textRefsAdaremit.current[5] = el)}>
                  {" > "} Find the best rate from different Vendor
                </div>
                <div ref={(el) => (textRefsAdaremit.current[6] = el)}>
                  {" > "}
                  <span ref={(el) => (textRefsAdaremit.current[7] = el)}>
                    _
                  </span>
                </div>
                <br />
              </div>
            )}

            {tab == "3dworld" && (
              <div>
                <h2 className="text-xl font-bold mb-2">3D World</h2>
                <p className="text-gray-700">
                  Built an interactive 3D world using React Globe GL.
                </p>
                <Link href="/world" className="text-blue-500">
                  <Button
                    color="primary"
                    variant="bordered"
                    radius="none"
                    className="hover:bg-[#006fee] hover:text-white"
                  >
                    See The World!
                  </Button>
                </Link>
              </div>
            )}

            {tab == "tradingview" && (
              <div>
                <h2 className="text-xl font-bold mb-2">
                  TradingView Integration
                </h2>
                <p className="text-gray-700">
                  Integrated TradingView charts for real-time market data
                  visualization.
                </p>
                <Link href="/tradingview" className="text-blue-500">
                  <Button
                    color="primary"
                    variant="bordered"
                    radius="none"
                    className="hover:bg-[#006fee] hover:text-white"
                  >
                    See The Chart!
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}
