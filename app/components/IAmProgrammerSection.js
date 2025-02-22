"use client";

import { useState, useRef, useEffect } from "react";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { motion, AnimatePresence } from "framer-motion";

const data = ["Javascript", "C++", "PHP", "Python"];

export default function IAmProgrammerSection() {
  return (
    <div className="w-auto flex h-screen justify-center items-center">
      Hi I'm a Programmer
    </div>
  );
}
