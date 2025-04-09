"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@heroui/drawer";
import { useDisclosure } from "@heroui/use-disclosure";
import { debounce, set, throttle } from "lodash";
import { Checkbox } from "@heroui/checkbox";
import { RadioGroup, Radio } from "@heroui/radio";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export default function Background() {
  const [gridSize, setGridSize] = useState(0);
  const [columns, setColumns] = useState(0);
  const [rows, setRows] = useState(0);

  // drawer / sidebar / settings
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const menuRef = useRef(null);

  // game state
  const [isGameEnable, setIsGameEnable] = useState(false);
  const [difficulty, setDifficulty] = useState("medium"); // easy, medium, hard
  const [mouse, setMouse] = useState("click"); // click, hover
  const [isCircularBlack, setIsCircularBlack] = useState(true);

  const [hoveredCount, setHoveredCount] = useState(0);
  const hoveredTilesRef = useRef(new Set());
  const [clickedCount, setClickedCount] = useState(0);
  const clickedTiles = useRef(new Set());

  const calculateGrid = useCallback(
    throttle(() => {
      console.log(difficulty);
      let gridPixel;
      if (difficulty === "easy") {
        gridPixel = 75;
      } else if (difficulty === "medium") {
        gridPixel = 50;
      } else if (difficulty === "hard") {
        gridPixel = 25;
      }

      const cols = Math.floor(window.innerWidth / gridPixel);
      const rws = Math.floor(window.innerHeight / gridPixel);
      setColumns(cols);
      setRows(rws);
      setGridSize(cols * rws);
    }, 400),
    [difficulty]
  );

  useGSAP(() => {
    if (!isGameEnable) {
      return;
    }

    gsap.to(".gridClass", {
      duration: 0.5,
      scale: 0.8,
      yoyo: true,
      repeat: 1,
      ease: "bounce",
      borderColor: "rgba(255, 255, 255, 0.5)",
      stagger: {
        grid: [rows, columns],
        from: "center",
        amount: 0.5,
      },
    });
  }, [isGameEnable]);

  useEffect(() => {
    calculateGrid();
    window.addEventListener("resize", calculateGrid);
    return () => window.removeEventListener("resize", calculateGrid); // Cleanup listener
  }, []);

  useEffect(() => {
    calculateGrid();
  }, [difficulty]);

  const updateHoveredCount = useRef(
    debounce(() => {
      setHoveredCount(hoveredTilesRef.current.size);
    }, 400)
  ).current;

  const handleMouseEnter = (index) => {
    if (!hoveredTilesRef.current.has(index)) {
      hoveredTilesRef.current.add(index);
      updateHoveredCount(); // Update state periodically
    }
  };

  const updateClickedCount = useRef(
    debounce(() => {
      setClickedCount(clickedTiles.current.size);
    }, 400)
  ).current;

  const handleTileClick = (index) => {
    clickedTiles.current.add(index);
    updateClickedCount(); // Update state periodically
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`, // Responsive columns
        gridTemplateRows: `repeat(${rows}, 1fr)`, // Responsive rows
        zIndex: 1,
        backgroundColor: "rgba(0, 0, 0)",
      }}
    >
      {/* background hitam oval */}
      {!isGameEnable && isCircularBlack && (
        <div
          className="absolute inset-0 z-[1]"
          style={{
            backgroundImage: `radial-gradient(ellipse at center, rgba(0, 0, 0, 0.93) 30%, rgba(0, 0, 0, 0.96) 60%, rgba(0, 0, 0, 1) 80%)`,
            backgroundImage: `radial-gradient(ellipse at center, rgba(0, 0, 0, 0.3) 30%, rgba(0, 0, 0, 0.8) 60%, rgba(0, 0, 0, 1) 80%)`,
          }}
        ></div>
      )}

      <div
        style={{
          width:
            difficulty === "easy"
              ? `75px`
              : difficulty === "medium"
              ? `50px`
              : `25px`,
          height:
            difficulty === "easy"
              ? `75px`
              : difficulty === "medium"
              ? `50px`
              : `25px`,
        }}
        className="absolute right-0 flex items-center justify-center cursor-pointer z-[2]"
        onClick={onOpen}
      >
        <GiHamburgerMenu className="size-6 text-[#006fee]" />
      </div>

      {Array.from({ length: gridSize }).map((_, index) => (
        <div key={index}>
          {mouse === "hover" && (
            <div
              className="gridClass"
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: hoveredTilesRef.current.has(index)
                  ? "rgba(0, 111, 238, 0.1)"
                  : "rgba(0, 0, 0)",
                border: hoveredTilesRef.current.has(index)
                  ? "2px solid rgba(0, 111, 238, 0.4)"
                  : "1px solid rgba(255, 255, 255, 0.1)",
                userSelect: "none", // Prevent text selection
              }}
              onMouseEnter={(e) => {
                if (isGameEnable) {
                  handleMouseEnter(index); // Track hovered tiles
                  e.currentTarget.style.backgroundColor =
                    "rgba(0, 123, 255, 0.3)"; // Bright blue hover color
                  e.currentTarget.style.borderColor = "rgba(0, 123, 255, 0.8)"; // Bright blue border
                }
              }}
              onMouseLeave={(e) => {
                if (isGameEnable) {
                  e.currentTarget.style.backgroundColor =
                    "rgba(0, 111, 238, 0.1)";
                  e.currentTarget.style.borderColor = "rgba(0, 111, 238, 0.4)";
                  e.currentTarget.style.borderWidth = "2px";
                }
              }}
            ></div>
          )}
          {mouse === "click" && (
            <div
              className="gridClass"
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: clickedTiles.current.has(index)
                  ? "rgba(0, 111, 238, 0.1)"
                  : "rgba(0, 0, 0)",
                border: clickedTiles.current.has(index)
                  ? "2px solid rgba(0, 111, 238, 0.4)"
                  : "1px solid rgba(255, 255, 255, 0.1)",
                userSelect: "none", // Prevent text selection
              }}
              onMouseEnter={(e) => {
                if (isGameEnable && !clickedTiles.current.has(index)) {
                  e.currentTarget.style.backgroundColor =
                    "rgba(0, 123, 255, 0.3)";
                  e.currentTarget.style.borderColor = "rgba(0, 123, 255, 0.8)";
                }
              }}
              onMouseLeave={(e) => {
                if (isGameEnable && !clickedTiles.current.has(index)) {
                  e.currentTarget.style.backgroundColor = "rgba(0, 0, 0)";
                  e.currentTarget.style.borderColor =
                    "rgba(255, 255, 255, 0.1)";
                } else if (isGameEnable && clickedTiles.current.has(index)) {
                  e.currentTarget.style.backgroundColor =
                    "rgba(0, 111, 238, 0.1)";
                  e.currentTarget.style.borderColor = "rgba(0, 111, 238, 0.4)";
                  e.currentTarget.style.borderWidth = "2px";
                }
              }}
              onClick={() => {
                if (isGameEnable) {
                  handleTileClick(index);
                }
              }}
            ></div>
          )}
        </div>
      ))}

      <Drawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="h-full right-0 bg-black border-l-[#006fee] border-l-2 rounded-none"
      >
        <DrawerContent>
          {(onClose) => (
            <>
              {isGameEnable && (
                <div>
                  <DrawerHeader className="flex flex-col gap-1">
                    Background Settings
                  </DrawerHeader>
                  <DrawerBody className="flex flex-col gap-1">
                    <Checkbox
                      size="sm"
                      color="primary"
                      radius="none"
                      isSelected={isGameEnable}
                      onValueChange={() => {
                        setIsGameEnable((prev) => !prev);
                      }}
                    >
                      Disable Background?
                    </Checkbox>

                    <RadioGroup
                      label="Sizes"
                      value={difficulty}
                      onValueChange={setDifficulty}
                      defaultValue="medium"
                    >
                      <Radio value="easy">Large</Radio>
                      <Radio value="medium">Medium</Radio>
                      <Radio value="hard">Small</Radio>
                    </RadioGroup>

                    <RadioGroup
                      label="Mouse"
                      value={mouse}
                      onValueChange={setMouse}
                      defaultValue="click"
                    >
                      <Radio value="click">Click</Radio>
                      <Radio value="hover">Hover</Radio>
                    </RadioGroup>
                  </DrawerBody>
                </div>
              )}

              {!isGameEnable && (
                <DrawerBody className="flex">
                  <div>
                    <Checkbox
                      size="sm"
                      color="primary"
                      radius="none"
                      isSelected={isGameEnable}
                      onValueChange={() => {
                        setIsGameEnable((prev) => !prev);
                      }}
                    >
                      Enable Background?
                    </Checkbox>
                  </div>
                  <div>
                    <Checkbox
                      size="sm"
                      color="primary"
                      radius="none"
                      isSelected={isCircularBlack}
                      onValueChange={() => {
                        setIsCircularBlack((prev) => !prev);
                      }}
                    >
                      Enable Circular Black Background?
                    </Checkbox>
                  </div>
                </DrawerBody>
              )}
            </>
          )}
        </DrawerContent>
      </Drawer>

      {isGameEnable && (
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            color: "white",
            zIndex: 2,
          }}
        >
          {mouse === "click" && <div>Clicked Tiles: {clickedCount}</div>}
          {mouse === "hover" && <div>Hovered Tiles: {hoveredCount}</div>}
        </div>
      )}
    </div>
  );
}
