"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Slider } from "@heroui/slider";
import { countryListData } from "../../public/countryListData";
import Image from "next/image";
import Border from "./components/Border";

const GlobeComponent = dynamic(() => import("./components/Globe.js"), {
  ssr: false,
});

export default function Page() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [zoomValue, setZoomValue] = useState(0.4);
  const [selectedCountry, setSelectedCountry] = useState({
    name: "",
    iso_code_2: "",
  });

  const handleZoom = (value) => {
    setZoomValue(value);
  };

  return (
    <div className="relative h-screen w-full">
      <title>World</title>
      <GlobeComponent
        onOpen={onOpen}
        isOpen={isOpen}
        zoomValue={zoomValue}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
      <div className="absolute top-2 left-3 z-[1px]">
        <Autocomplete
          selectedKey={selectedCountry.name}
          onSelectionChange={(value) =>
            setSelectedCountry((prevState) => ({ ...prevState, name: value }))
          }
          defaultItems={countryListData}
          label="Country"
          variant="bordered"
          radius="none"
          classNames={{
            value: "group-data-[has-value=true]:text-default-foreground",
          }}
        >
          {(countryListData) => (
            <AutocompleteItem key={countryListData.value}>
              {countryListData.value}
            </AutocompleteItem>
          )}
        </Autocomplete>
      </div>

      <div>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          backdrop="transparent"
          hideCloseButton={true}
          className="shadow-none 2xl:!ml-[1200px] !ml-[1000px] !mr-0 h-[550px]"
          classNames={{
            backdrop: "bg-transparent",
            base: "border-transparent bg-transparent dark:bg-transparent text-white",
            body: "h-96",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <Border></Border>
                <ModalHeader className="flex flex-row gap-1 pl-12 pt-16 text-[#00e1ff]">
                  {selectedCountry.name}
                  <Image
                    src={`https://flagcdn.com/${selectedCountry.iso_code_2.toLowerCase()}.svg`}
                    width={24}
                    height={16}
                    quality={50}
                    alt="Picture of the country flag"
                    className="w-6 h-4 ml-2 self-center"
                  />
                </ModalHeader>
                <ModalBody className="px-12 pb-20 text-sm">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pulvinar risus non risus hendrerit venenatis.
                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pulvinar risus non risus hendrerit venenatis.
                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                  </p>
                </ModalBody>
                {/* <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter> */}
              </>
            )}
          </ModalContent>
        </Modal>
      </div>

      <div className="absolute bottom-5 right-3 z-[1px] h-[348px]">
        <Slider
          value={zoomValue}
          size="md"
          radius="none"
          step={0.1}
          showSteps={true}
          maxValue={2}
          minValue={0.3}
          orientation="vertical"
          aria-label="Temperature"
          defaultValue={1}
          onChange={handleZoom}
        />
      </div>
    </div>
  );
}
