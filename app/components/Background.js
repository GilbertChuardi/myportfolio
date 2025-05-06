"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/drawer";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { useDisclosure } from "@heroui/use-disclosure";
import { debounce, set, throttle } from "lodash";
import { Checkbox } from "@heroui/checkbox";
import { RadioGroup, Radio } from "@heroui/radio";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@heroui/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export default function Background() {
  //#region Game State and Fumc
  const [isGameEnable, setIsGameEnable] = useState(false);
  const [difficulty, setDifficulty] = useState("medium"); // easy, medium, hard
  const [mouse, setMouse] = useState("click"); // click, hover

  const [hoveredCount, setHoveredCount] = useState(0);
  const hoveredTilesRef = useRef(new Set());
  const [clickedCount, setClickedCount] = useState(0);
  const clickedTiles = useRef(new Set());

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
  //#endregion

  //#region Grid Background State & Func
  const [gridSize, setGridSize] = useState(0);
  const [columns, setColumns] = useState(0);
  const [rows, setRows] = useState(0);

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

  useEffect(() => {
    calculateGrid();
    window.addEventListener("resize", calculateGrid);
    return () => window.removeEventListener("resize", calculateGrid); // Cleanup listener
  }, []);
  //#endregion

  //#region Fullscreen/Maximized Broswer State & Func
  const [isMaximized, setIsMaximized] = useState(true);

  const checkMaximized = useCallback(() => {
    const isMaximized =
      window.screenX === 0 &&
      window.screenY === 0 &&
      window.outerWidth === window.screen.availWidth &&
      window.outerHeight === window.screen.availHeight;
    setIsMaximized(isMaximized);
  }, []);

  useEffect(() => {
    checkMaximized();
    window.addEventListener("resize", checkMaximized);
    return () => window.removeEventListener("resize", checkMaximized);
  }, [checkMaximized]);
  //#endregion

  //#region Drawer and Modal State
  const {
    isOpen: isDrawerOpen,
    onOpen: openDrawer,
    onClose: closeDrawer,
    onOpenChange: openChangeDrawer,
  } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
    onOpenChange: openChangeModal,
  } = useDisclosure();
  const [isCircularBlack, setIsCircularBlack] = useState(true);
  //#endregion

  //#region Animation

  // Animation for the when grid tiles first render
  // useGSAP(() => {
  //   gsap.fromTo(
  //     ".gridClass",
  //     { opacity: 0 },
  //     { opacity: 1, duration: 5, stagger: 5 }
  //   );
  // }, []);

  // Animation for the when enable the grid tiles click or hover
  useGSAP(() => {
    if (!isGameEnable) {
      setIsCircularBlack(true);
      return;
    }

    gsap.to(".gridClass", {
      duration: 0.5,
      yoyo: true,
      repeat: 1,
      ease: "bounce",
      backgroundColor: "rgba(15, 15, 15, 0.9)",
      borderColor: "rgba(255, 255, 255, 0.3)",
      stagger: {
        grid: [rows, columns],
        from: "center",
        amount: 0.5,
      },
    });
    setIsCircularBlack(false);
  }, [isGameEnable]);

  // Animation for the circular black background
  useGSAP(() => {
    if (isCircularBlack) {
      gsap.fromTo(
        ".circularBlackClass",
        { opacity: 0.05 },
        { opacity: 1, duration: 3 }
      );
    } else if (!isCircularBlack) {
      gsap.fromTo(
        ".circularBlackClass",
        { opacity: 1 },
        { opacity: 0.05, duration: 7 }
      );
    }
  }, [isCircularBlack]);

  //#endregion

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        zIndex: 1,
        backgroundColor: "rgba(0, 0, 0)",
      }}
    >
      {/* Background hitam oval */}
      {!isGameEnable && (
        <div
          className="absolute inset-0 z-[1] circularBlackClass"
          style={{
            backgroundImage: `radial-gradient(ellipse at center, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.8) 60%, rgba(0, 0, 0, 0.95) 80%)`,
          }}
        ></div>
      )}

      {/* Hamburger Menu lgsg ditimpa diatas grid kanan atas */}
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
        onClick={openDrawer}
      >
        <GiHamburgerMenu className="size-6 text-[#006fee]" />
      </div>

      {/* Grid Tiles */}
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
                  handleMouseEnter(index);
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

      {/* Drawer / Sidebar / Settings */}
      <Drawer
        isOpen={isDrawerOpen}
        onOpenChange={openChangeDrawer}
        className="h-full right-0 bg-black border-l-[#006fee] border-l-2 rounded-none"
        classNames={{
          wrapper: "z-[1000]",
        }}
        motionProps={{
          variants: {
            enter: {
              x: 0,
              transition: {
                duration: 0.7,
                ease: "circOut", // You can use 'easeIn', 'easeOut', 'easeInOut', or a custom cubic-bezier array
              },
            },
            exit: {
              x: "100%",
              transition: {
                duration: 1,
                ease: "easeIn", // Example of using 'easeIn'
              },
            },
          },
        }}
      >
        <DrawerContent>
          {(closeDrawer) => (
            <>
              {isGameEnable && (
                <div>
                  <DrawerHeader className="flex flex-col">
                    Background Settings
                  </DrawerHeader>
                  <DrawerBody className="flex flex-col mt-4">
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
                      className="mt-4"
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
                      className="mt-4"
                    >
                      <Radio value="click">Click</Radio>
                      <Radio value="hover">Hover</Radio>
                    </RadioGroup>

                    {/* <Checkbox
                      size="sm"
                      color="primary"
                      radius="none"
                      isSelected={playgroundPanel}
                      onValueChange={() => {
                        setPlaygroundPanel((prev) => !prev);
                      }}
                    >
                      Enable Playground Panel?
                    </Checkbox> */}
                  </DrawerBody>

                  <DrawerFooter className="absolute bottom-0 w-full">
                    <Button
                      color="danger"
                      onPress={openModal}
                      radius="none"
                      variant="ghost"
                    >
                      Reset Score
                    </Button>
                  </DrawerFooter>
                </div>
              )}

              {!isGameEnable && (
                <div>
                  <DrawerHeader className="flex flex-col">
                    Background Settings
                  </DrawerHeader>
                  <DrawerBody className="flex mt-3">
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
                </div>
              )}
            </>
          )}
        </DrawerContent>
      </Drawer>

      {/* Display clicked or hovered count */}
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

      {/* Confirmation Modal to reset score */}
      {isGameEnable && (
        <div>
          <Modal
            isOpen={isModalOpen}
            onOpenChange={openChangeModal}
            radius="none"
            classNames={{
              base: "border-[#006fee] border-x-[3px]",
              wrapper: "z-[1001]",
            }}
          >
            <ModalContent>
              {(closeModal) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-[#006fee]">
                    Reset Score
                  </ModalHeader>
                  <ModalBody>
                    <p>Are you sure you want to reset the score?</p>
                    <p className="text-gray-600 text-sm">(For {mouse} score)</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="primary"
                      radius="none"
                      variant="ghost"
                      onPress={closeModal}
                    >
                      No
                    </Button>
                    <Button
                      color="danger"
                      radius="none"
                      variant="ghost"
                      onPress={() => {
                        if (mouse === "click") {
                          clickedTiles.current.clear();
                          setClickedCount(0);
                        } else if (mouse === "hover") {
                          hoveredTilesRef.current.clear();
                          setHoveredCount(0);
                        }
                        closeModal();
                      }}
                    >
                      Yes
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      )}
    </div>
  );
}
