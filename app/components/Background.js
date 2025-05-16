"use client";

//#region Imports
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
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
import { debounce, throttle } from "lodash";
import { Checkbox } from "@heroui/checkbox";
import { RadioGroup, Radio } from "@heroui/radio";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Button, CircularProgress } from "@heroui/react";
import { addToast } from "@heroui/react";
import Confetti from "./background/Confetti";
import useSound from "use-sound";
//#endregion

//#region GSAP Plugin Registration
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}
//#endregion

export default function Background() {
  //#region State and Refs
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
  const [isMaximized, setIsMaximized] = useState(true);
  const [isGameEnable, setIsGameEnable] = useState(false);
  const [difficulty, setDifficulty] = useState("medium"); // easy, medium, hard
  const [mouse, setMouse] = useState("click"); // click, hover

  const [hoveredCount, setHoveredCount] = useState(0);
  const hoveredTilesRef = useRef([new Set(), new Set(), new Set()]);
  const [clickedCount, setClickedCount] = useState(0);
  const clickedTiles = useRef([new Set(), new Set(), new Set()]);
  const totalTiles = useRef([0, 0, 0]);
  const [achievementsNotified, setAchievementsNotified] = useState({
    click: { easy: false, medium: false, hard: false },
    hover: { easy: false, medium: false, hard: false },
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [playMario] = useSound("/sounds/mario_congrats.mp3");
  const [playConfetti] = useSound("/sounds/confetti.mp3");
  const [gridSize, setGridSize] = useState(0);
  const [columns, setColumns] = useState(0);
  const [rows, setRows] = useState(0);

  const difficultyIndex = {
    easy: 0,
    medium: 1,
    hard: 2,
  };
  //#endregion

  //#region Utility Functions
  const checkMaximized = useCallback(() => {
    const isMaximizedVar =
      window.outerWidth >= window.screen.availWidth - 1 &&
      window.outerHeight >= window.screen.availHeight - 1;
    setIsMaximized(isMaximizedVar);
  }, []);

  const calculateGrid = useCallback(
    throttle(() => {
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

  const progressValue = (mouseParam, difficultyParam) => {
    let progress = 0;
    if (mouseParam === "click") {
      progress =
        (clickedTiles.current[difficultyIndex[difficultyParam]].size * 100) /
        totalTiles.current[difficultyIndex[difficultyParam]];
    } else if (mouseParam === "hover") {
      progress =
        (hoveredTilesRef.current[difficultyIndex[difficultyParam]].size * 100) /
        totalTiles.current[difficultyIndex[difficultyParam]];
    }

    progress = Math.floor(progress);

    return progress;
  };
  //#endregion

  //#region Handlers
  const updateHoveredCount = useMemo(
    () =>
      debounce(() => {
        setHoveredCount(
          hoveredTilesRef.current[difficultyIndex[difficulty]].size
        );
      }, 400),
    [difficulty]
  );

  const handleMouseEnter = (index) => {
    if (!hoveredTilesRef.current[difficultyIndex[difficulty]].has(index)) {
      hoveredTilesRef.current[difficultyIndex[difficulty]].add(index);
      updateHoveredCount();
    }
  };

  const updateClickedCount = useMemo(
    () =>
      debounce(() => {
        setClickedCount(clickedTiles.current[difficultyIndex[difficulty]].size);
      }, 400),
    [difficulty]
  );

  const handleTileClick = (index) => {
    if (!clickedTiles.current[difficultyIndex[difficulty]].has(index)) {
      clickedTiles.current[difficultyIndex[difficulty]].add(index);
      updateClickedCount();
    }
  };
  //#endregion

  //#region Effects
  useEffect(() => {
    checkMaximized();
    window.addEventListener("resize", checkMaximized);
    return () => window.removeEventListener("resize", checkMaximized);
  }, [checkMaximized]);

  useEffect(() => {
    calculateGrid();
    if (clickedTiles.current[difficultyIndex[difficulty]].size) {
      setClickedCount(clickedTiles.current[difficultyIndex[difficulty]].size);
    } else {
      setClickedCount(0);
    }

    if (hoveredTilesRef.current[difficultyIndex[difficulty]].size) {
      setHoveredCount(
        hoveredTilesRef.current[difficultyIndex[difficulty]].size
      );
    } else {
      setHoveredCount(0);
    }
  }, [difficulty]);

  useEffect(() => {
    calculateGrid();
    window.addEventListener("resize", calculateGrid);
    return () => window.removeEventListener("resize", calculateGrid);
  }, [calculateGrid]);

  useEffect(() => {
    if (isMaximized) {
      totalTiles.current[difficultyIndex[difficulty]] = columns * rows;
    }
  }, [columns, rows]);

  useEffect(() => {
    console.log("hoveredCount", hoveredCount);
    console.log("clickedCount", clickedCount);
    console.log("totalTiles", totalTiles.current[difficultyIndex[difficulty]]);
    console.log("difficulty", difficulty);

    const isClickMode = mouse === "click";
    const isHoverMode = mouse === "hover";

    if (
      totalTiles.current[difficultyIndex[difficulty]] !== 0 &&
      ((isHoverMode &&
        hoveredCount === totalTiles.current[difficultyIndex[difficulty]]) ||
        (isClickMode &&
          clickedCount === totalTiles.current[difficultyIndex[difficulty]])) &&
      achievementsNotified[mouse][difficulty] === false
    ) {
      setAchievementsNotified((prev) => ({
        ...prev,
        [mouse]: {
          ...prev.click,
          [difficulty]: true,
        },
      }));
      addToast({
        title: `Achievement Unlocked!`,
        description: `You have completed all tiles in ${difficulty} size with ${mouse} mode!`,
        color: "success",
        variant: "bordered",
        radius: "none",
        classNames: {
          title: "text-white",
          description: "text-white",
        },
      });
      setShowConfetti(true);

      playConfetti();
      setTimeout(() => {
        playConfetti();
        setTimeout(() => {
          playConfetti();
          setTimeout(() => {
            playMario();
            setShowConfetti(false);
          }, 1000);
        }, 1000);
      }, 1000);
    }
  }, [clickedCount, hoveredCount, difficulty]);
  //#endregion

  //#region Animation
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
      {/* Confetti */}
      {showConfetti && <Confetti />}

      {/* Background hitam oval */}
      {!isGameEnable && (
        <div
          className="absolute inset-0 z-[1] circularBlackClass"
          style={{
            backgroundImage: `radial-gradient(ellipse at center, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.8) 60%, rgba(0, 0, 0, 1) 80%)`,
          }}
        ></div>
      )}

      {/* Hamburger Menu */}
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
                backgroundColor: hoveredTilesRef.current[
                  difficultyIndex[difficulty]
                ].has(index)
                  ? "rgba(0, 111, 238, 0.1)"
                  : "rgba(0, 0, 0)",
                border: hoveredTilesRef.current[
                  difficultyIndex[difficulty]
                ].has(index)
                  ? "2px solid rgba(0, 111, 238, 0.4)"
                  : "1px solid rgba(255, 255, 255, 0.1)",
                userSelect: "none",
              }}
              onMouseEnter={(e) => {
                if (isGameEnable) {
                  handleMouseEnter(index);
                  e.currentTarget.style.backgroundColor =
                    "rgba(0, 123, 255, 0.3)";
                  e.currentTarget.style.borderColor = "rgba(0, 123, 255, 0.8)";
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
                backgroundColor: clickedTiles.current[
                  difficultyIndex[difficulty]
                ].has(index)
                  ? "rgba(0, 111, 238, 0.1)"
                  : "rgba(0, 0, 0)",
                border: clickedTiles.current[difficultyIndex[difficulty]].has(
                  index
                )
                  ? "2px solid rgba(0, 111, 238, 0.4)"
                  : "1px solid rgba(255, 255, 255, 0.1)",
                userSelect: "none",
              }}
              onMouseEnter={(e) => {
                if (
                  isGameEnable &&
                  !clickedTiles.current[difficultyIndex[difficulty]].has(index)
                ) {
                  e.currentTarget.style.backgroundColor =
                    "rgba(0, 123, 255, 0.3)";
                  e.currentTarget.style.borderColor = "rgba(0, 123, 255, 0.8)";
                }
              }}
              onMouseLeave={(e) => {
                if (
                  isGameEnable &&
                  !clickedTiles.current[difficultyIndex[difficulty]].has(index)
                ) {
                  e.currentTarget.style.backgroundColor = "rgba(0, 0, 0)";
                  e.currentTarget.style.borderColor =
                    "rgba(255, 255, 255, 0.1)";
                } else if (
                  isGameEnable &&
                  clickedTiles.current[difficultyIndex[difficulty]].has(index)
                ) {
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
                ease: "circOut",
              },
            },
            exit: {
              x: "100%",
              transition: {
                duration: 1,
                ease: "easeIn",
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
                  <DrawerBody className="flex flex-col mt-2">
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
                      className="mt-2"
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
                      className="mt-2"
                    >
                      <Radio value="click">Click</Radio>
                      <Radio value="hover">Hover</Radio>
                    </RadioGroup>

                    {/* Achievements list */}
                    <div className="mt-2">
                      <h2 className="text-gray-400">Achievements </h2>
                      <ul className="list-none">
                        <li className="text-gray-300 h-fit flex justify-between items-center">
                          Click all tiles in Large Sizes
                          <CircularProgress
                            aria-label="Achievement progress for Click all tiles in Large Sizes"
                            value={
                              Number.isNaN(progressValue("click", "easy"))
                                ? "0"
                                : progressValue("click", "easy")
                            }
                            showValueLabel={true}
                            size="lg"
                          />
                        </li>
                        <li className="text-gray-300 h-fit flex justify-between items-center">
                          Click all tiles in Medium Sizes
                          <CircularProgress
                            aria-label="Achievement progress for Click all tiles in Medium Sizes"
                            value={
                              Number.isNaN(progressValue("click", "medium"))
                                ? "0"
                                : progressValue("click", "medium")
                            }
                            showValueLabel={true}
                            size="lg"
                          />
                        </li>
                        <li className="text-gray-300 h-fit flex justify-between items-center">
                          Click all tiles in Small Sizes
                          <CircularProgress
                            aria-label="Achievement progress for Click all tiles in Small Sizes"
                            value={
                              Number.isNaN(progressValue("click", "hard"))
                                ? "0"
                                : progressValue("click", "hard")
                            }
                            showValueLabel={true}
                            size="lg"
                          />
                        </li>
                        <li className="text-gray-300 h-fit flex justify-between items-center">
                          Hover all tiles in Large Sizes
                          <CircularProgress
                            aria-label="Achievement progress for Hover all tiles in Large Sizes"
                            value={
                              Number.isNaN(progressValue("hover", "easy"))
                                ? "0"
                                : progressValue("hover", "easy")
                            }
                            showValueLabel={true}
                            size="lg"
                          />
                        </li>
                        <li className="text-gray-300 h-fit flex justify-between items-center">
                          Hover all tiles in Medium Sizes
                          <CircularProgress
                            aria-label="Achievement progress for Hover all tiles in Medium Sizes"
                            value={
                              Number.isNaN(progressValue("hover", "medium"))
                                ? "0"
                                : progressValue("hover", "medium")
                            }
                            showValueLabel={true}
                            size="lg"
                          />
                        </li>
                        <li className="text-gray-300 h-fit flex justify-between items-center">
                          Hover all tiles in Small Sizes
                          <CircularProgress
                            aria-label="Achievement progress for Hover all tiles in Small Sizes"
                            value={
                              Number.isNaN(progressValue("hover", "hard"))
                                ? "0"
                                : progressValue("hover", "hard")
                            }
                            showValueLabel={true}
                            size="lg"
                          />
                        </li>
                      </ul>
                    </div>
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
                          clickedTiles.current[
                            difficultyIndex[difficulty]
                          ].clear();
                          setClickedCount(0);
                        } else if (mouse === "hover") {
                          hoveredTilesRef.current[
                            difficultyIndex[difficulty]
                          ].clear();
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
