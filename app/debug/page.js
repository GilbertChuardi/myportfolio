"use client";

import { Checkbox } from "@heroui/checkbox";
import { useState } from "react";

export default function Page() {
  const [isSelected, setIsSelected] = useState(false); // Checkbox state
  return (
    <div>
      <Checkbox
        isSelected={isSelected}
        onChange={() => setIsSelected(!isSelected)}
      >
        Text
      </Checkbox>
    </div>
  );
}
