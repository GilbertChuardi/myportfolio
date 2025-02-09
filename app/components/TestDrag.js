"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(Draggable);
}

export default function TestDrag() {
  const boxRef = useRef(null);

  useGSAP(() => {
    Draggable.create(boxRef.current, {
      type: "x,y",
      bounds: window,
    });
  });

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div
        ref={boxRef}
        className="w-32 h-32 bg-blue-500 text-white flex items-center justify-center cursor-pointer rounded-sm"
      >
        Drag me
      </div>
    </div>
  );
}
