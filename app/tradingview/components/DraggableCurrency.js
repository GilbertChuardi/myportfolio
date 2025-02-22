"use client";

import { useRef, useState, createRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import { Divider } from "@heroui/divider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, Draggable);
}

export default function DraggableCurrency({
  setFirstCurrency,
  setSecondCurrency,
}) {
  const currencies = ["EUR", "GBP", "AUD", "NZD", "USD", "CHF", "JPY"];
  const boxRefs = useRef(currencies.map(() => createRef()));
  const [bCurrenciesPos, setbCurrenciesPos] = useState(true);
  const firstCurrencyPos = useRef();
  const secondCurrencyPos = useRef();
  const dropAreaFirstRef = useRef();
  const dropAreaSecondRef = useRef();

  const isAnimatingFirst = useRef(false);
  const isAnimatingSecond = useRef(false);

  const animateDropArea = (dropAreaRef, isAnimatingRef) => {
    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });

    tl.to(dropAreaRef.current, {
      scale: 1.2,
      duration: 0.5,
    });
  };

  const updateDropAreas = () => {
    gsap.to(dropAreaFirstRef.current, {
      scale: 1,
      duration: 0.5,
    });
    gsap.to(dropAreaSecondRef.current, {
      scale: 1,
      duration: 0.5,
    });

    let newFirstCurrency = null;
    let newFirstCurrencyIndex;
    let newSecondCurrency = null;
    let newSecondCurrencyIndex;

    boxRefs.current.forEach((ref, index) => {
      const draggableRect = ref.current;

      const isOverFirstDropArea = Draggable.hitTest(
        draggableRect,
        dropAreaFirstRef.current,
        "25%"
      );

      const isOverSecondDropArea = Draggable.hitTest(
        draggableRect,
        dropAreaSecondRef.current,
        "25%"
      );

      if (isOverFirstDropArea) {
        newFirstCurrency = currencies[index];
        newFirstCurrencyIndex = index;
      }

      if (isOverSecondDropArea) {
        newSecondCurrency = currencies[index];
        newSecondCurrencyIndex = index;
      }
    });

    if (newFirstCurrencyIndex > newSecondCurrencyIndex) {
      firstCurrencyPos.current = newFirstCurrencyIndex;
      secondCurrencyPos.current = newSecondCurrencyIndex;
      setbCurrenciesPos(false);
    } else {
      setFirstCurrency(newFirstCurrency);
      setSecondCurrency(newSecondCurrency);
      setbCurrenciesPos(true);
    }
  };

  const readjustDraggable = () => {
    boxRefs.current.forEach((ref, index) => {
      gsap.to(ref.current, {
        x: 0,
        y: 0,
      });
    });
    boxRefs.current.forEach((ref, index) => {
      if (index === firstCurrencyPos.current) {
        if (index === 1)
          gsap.to(ref.current, {
            x: 204,
            y: 69,
          });
        else if (index === 2)
          gsap.to(ref.current, {
            x: 132,
            y: 69,
          });
        else if (index === 3)
          gsap.to(ref.current, {
            x: 60,
            y: 69,
          });
        else if (index === 4)
          gsap.to(ref.current, {
            x: -12,
            y: 69,
          });
        else if (index === 5)
          gsap.to(ref.current, {
            x: -84,
            y: 69,
          });
        else if (index === 6)
          gsap.to(ref.current, {
            x: -156,
            y: 69,
          });
      } else if (index === secondCurrencyPos.current) {
        if (index === 0)
          gsap.to(ref.current, {
            x: 156,
            y: 69,
          });
        else if (index === 1)
          gsap.to(ref.current, {
            x: 84,
            y: 69,
          });
        else if (index === 2)
          gsap.to(ref.current, {
            x: 12,
            y: 69,
          });
        else if (index === 3)
          gsap.to(ref.current, {
            x: -60,
            y: 69,
          });
        else if (index === 4)
          gsap.to(ref.current, {
            x: -132,
            y: 69,
          });
        else if (index === 5)
          gsap.to(ref.current, {
            x: -204,
            y: 69,
          });
      }
    });

    setTimeout(() => {
      updateDropAreas();
    }, 200);
  };

  useGSAP(() => {
    boxRefs.current.forEach((ref) => {
      Draggable.create(ref.current, {
        type: "x,y",
        bounds: window,
        onDragEnd: updateDropAreas,
        onDrag: function () {
          setbCurrenciesPos(true);
          const draggableElement = ref.current;

          const isOverFirstDropArea = Draggable.hitTest(
            draggableElement,
            dropAreaFirstRef.current,
            "25%"
          );

          const isOverSecondDropArea = Draggable.hitTest(
            draggableElement,
            dropAreaSecondRef.current,
            "25%"
          );

          if (isOverFirstDropArea) {
            animateDropArea(dropAreaFirstRef, isAnimatingFirst);
          }
          if (isOverSecondDropArea) {
            animateDropArea(dropAreaSecondRef, isAnimatingSecond);
          }
        },
      });
    });
  });

  return (
    <div>
      <div className="flex justify-center items-center h-16">
        {currencies.map((currency, index) => (
          <div
            key={currency}
            ref={boxRefs.current[index]}
            className="w-16 h-10 bg-[#006fee] text-white flex items-center justify-center cursor-pointer rounded-sm mx-1"
          >
            {currency}
          </div>
        ))}
      </div>

      <Divider className="w-[95vw] justify-self-center" />

      <div className="relative h-16 mt-3">
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
          <div
            ref={dropAreaFirstRef}
            className="dropAreaFirst w-20 h-12 border-dashed border-2 border-[#00e1ff]"
          ></div>
          <div className="h-12 mx-3 text-3xl pt-2"> / </div>
          <div
            ref={dropAreaSecondRef}
            className="dropAreaSecond w-20 h-12 border-dashed border-2 border-[#00e1ff]"
          ></div>
        </div>

        {!bCurrenciesPos && (
          <div className="absolute left-1/2 -translate-x-1/2 ml-56 mt-4 text-sm">
            <div className="flex">
              Did you mean
              <div
                className="underline mx-1 cursor-pointer"
                onClick={readjustDraggable}
              >
                {currencies[secondCurrencyPos.current]}/
                {currencies[firstCurrencyPos.current]}
              </div>
              ?
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
