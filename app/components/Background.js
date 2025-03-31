"use client";

import { useState, useEffect, useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@heroui/drawer";
import { useDisclosure } from "@heroui/use-disclosure";
import { debounce, throttle } from "lodash";
import { Checkbox } from "@heroui/checkbox";

export default function Background() {
  const [gridSize, setGridSize] = useState(0);
  const [columns, setColumns] = useState(0);
  const [rows, setRows] = useState(0);
  const [hoveredCount, setHoveredCount] = useState(0); // Display count
  const hoveredTilesRef = useRef(new Set()); // Track hovered tiles without triggering re-renders
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isSelected, setIsSelected] = useState(false); // Checkbox state

  useEffect(() => {
    const calculateGrid = throttle(() => {
      const cols = Math.floor(window.innerWidth / 50);
      const rws = Math.floor(window.innerHeight / 50);
      setColumns(cols);
      setRows(rws);
      setGridSize(cols * rws);
    }, 400); // Throttle to avoid excessive calculations

    calculateGrid();
    window.addEventListener("resize", calculateGrid); // Recalculate on window resize
    return () => window.removeEventListener("resize", calculateGrid); // Cleanup listener
  }, []);

  const updateHoveredCount = useRef(
    debounce(() => {
      setHoveredCount(hoveredTilesRef.current.size);
    }, 400)
  ).current;

  const handleMouseEnter = (index) => {
    if (!hoveredTilesRef.current.has(index)) {
      hoveredTilesRef.current.add(index); // Add index to the ref
      updateHoveredCount(); // Update state periodically
    }
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
        gridAutoColumns: "50px", // Ensure each cell is 50px wide
        gridAutoRows: "50px", // Ensure each cell is 50px tall
        zIndex: 1, // Ensure it's behind the content but still interactive
        backgroundColor: "rgba(0, 0, 0)", // Add a visible background for debugging
      }}
    >
      {Array.from({ length: gridSize }).map((_, index) => (
        <div
          key={index}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0)", // Subtle default color
            border: "1px solid rgba(255, 255, 255, 0.1)", // Add a border for better visibility
            userSelect: "none", // Prevent text selection
          }}
          onMouseEnter={(e) => {
            handleMouseEnter(index); // Track hover
            e.currentTarget.style.backgroundColor = "rgba(0, 123, 255, 0.3)"; // Bright blue hover color
            e.currentTarget.style.borderColor = "rgba(0, 123, 255, 0.8)"; // Bright blue border
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(0, 111, 238, 0.1)"; // Reset to default
            e.currentTarget.style.borderColor = "rgba(0, 111, 238, 0.4)"; // Reset to default
            e.currentTarget.style.borderWidth = "2px";
          }}
        >
          {index + 1 === columns && (
            <div
              className="w-full h-full flex items-center justify-center"
              onClick={onOpen}
            >
              <GiHamburgerMenu className="size-6 text-[#006fee]" />
            </div>
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
              <DrawerHeader className="flex flex-col gap-1">
                Drawer Title
              </DrawerHeader>
              <DrawerBody>
                <div className="flex items-center gap-2">
                  <Checkbox size="sm" color="primary" />
                  <span>Enable Game?</span>
                </div>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          color: "white",
          zIndex: 2,
        }}
      >
        Hovered Tiles: {hoveredCount}
      </div>
    </div>
  );
}
