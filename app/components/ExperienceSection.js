"use client";

import { Accordion, AccordionItem } from "@heroui/accordion";

export default function ExperienceSection() {
  return (
    <Accordion selectionMode="multiple" className="px-[20%]">
      <AccordionItem
        key="1"
        aria-label="Accordion 1"
        title="2022-2023 Fullstack Developer at Adaremit"
      >
        <div>
          <div>- Integrate Vendor API</div>
          <div>- Find the best rate from different Vendor</div>
          <div>- Fixing some old Vendor API bug</div>
          <div>- Create Agent Website</div>
          <div>- Fixing some old Remittance Website bug</div>
        </div>
      </AccordionItem>
    </Accordion>
  );
}
