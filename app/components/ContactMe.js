"use client";

import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import Border from "../world/components/Border";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BiLogoUpwork } from "react-icons/bi";
import { FaLinkedin } from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase, useGSAP);
}

export default function Page() {
  // const [border, setBorder] = useState(false);
  const logoIcon1Ref = useRef(null);
  const logoIcon2Ref = useRef(null);

  // useGSAP(() => {
  //   gsap.from(".boxInputContact", {
  //     scrollTrigger: {
  //       trigger: ".boxContainerContact",
  //       start: "49% center",
  //       onEnter: () => {
  //         setBorder(true);
  //       },
  //       markers: true,
  //     },
  //     x: -100,
  //     duration: 1,
  //     opacity: 0,
  //     stagger: 0.5,
  //     ease: "bounce",
  //     delay: 0.5,
  //   });
  // }, []);
  useGSAP(() => {
    logoIcon1Ref.current = wiggleFunction(".logoIcon1");
    logoIcon2Ref.current = wiggleFunction(".logoIcon2");
    logoIcon1Ref.current.pause();
    logoIcon2Ref.current.pause();
  }, []);

  const wiggleFunction = (tipe) => {
    return gsap.to(tipe, {
      rotate: 20,
      scale: 1.1,
      yoyo: true,
      repeat: -1,
      ease: CustomEase.create(
        "custom",
        "M0,0 C0.012,0 0.025,0.066 0.05,0.066 0.1,0.066 0.1,-0.211 0.15,-0.211 0.2,-0.211 0.2,0.211 0.25,0.211 0.3,0.211 0.3,-0.404 0.35,-0.404 0.399,-0.404 0.409,0.399 0.459,0.399 0.509,0.399 0.498,-0.403 0.549,-0.403 0.6,-0.403 0.599,0.392 0.649,0.392 0.7,0.392 0.699,-0.207 0.749,-0.207 0.799,-0.207 0.799,0.205 0.849,0.205 0.899,0.205 0.899,-0.024 0.949,-0.024 0.974,-0.024 0.974,0 1,0 "
      ),
      duration: 1,
    });
  };

  const handleIconEnter = (tipe) => {
    console.log("masuk ", tipe);
    if (tipe === "1") {
      logoIcon1Ref.current.play();
    } else if (tipe === "2") {
      logoIcon2Ref.current.play();
    }
  };

  const handleIconLeave = (tipe) => {
    if (tipe === "1") {
      logoIcon1Ref.current.pause();
    } else if (tipe === "2") {
      logoIcon2Ref.current.pause();
    }
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-[90px] font-[1000] flex justify-center">
        Contact Me
      </h1>
      {/* <Form
        className="flex flex-col gap-4 2xl:h-[88%] h-[82%] justify-center"
        onReset={() => setAction("reset")}
        onSubmit={(e) => {
          e.preventDefault();
          let data = Object.fromEntries(new FormData(e.currentTarget));

          setAction(`submit ${JSON.stringify(data)}`);
        }}
      >
        <div className="2xl:w-[670px] w-[490px] relative">
          {border && <Border></Border>}
        </div>
        <div className="flex flex-col w-[100%] 2xl:h-[795px] h-[593px] items-center justify-between z-10 px-16 py-10">
          <div className="w-full 2xl:px-10">
            <Input
              isRequired
              errorMessage="Please enter a valid email"
              label="Email"
              labelPlacement="outside"
              placeholder="Enter your email"
              type="email"
              radius="none"
              variant="bordered"
              className="text-gray-200 boxInputContact"
            />
            <Textarea
              disableAnimation
              isRequired
              errorMessage="Please enter a message"
              label="Message"
              labelPlacement="outside"
              placeholder="Send your message"
              type="text"
              radius="none"
              variant="bordered"
              maxRows={100}
              classNames={{
                input:
                  "resize-y min-h-[100px] 2xl:max-h-[480px] max-h-[270px] text-gray-200",
              }}
              className="mt-4 boxInputContact"
            />
          </div>
          <div className="flex pb-[30px] pl-[100%]">
            <Button
              color="primary"
              type="submit"
              variant="bordered"
              radius="none"
              className="hover:bg-[#006fee] text-white"
            >
              Submit
            </Button>
          </div>
        </div>
      </Form> */}
      <div className="flex flex-col gap-8">
        <Image
          src="/curlyArrow.svg"
          alt="Curly Arrow SVG"
          width={120}
          height={0}
          className="rotate-[60deg] ml-[-50px] mt-4"
        />
        <div className=" text-3xl ml-[-220px]">gilbertchuar@gmail.com</div>
        <div className="ml-[100px]">or</div>
        <Image
          src="/curlyArrow.svg"
          alt="Curly Arrow SVG"
          width={40}
          height={0}
          className="absolute transform -scale-x-100 -rotate-90 ml-[130px] mt-[280px]"
        />
        <FaLinkedin
          className="text-[#006fee] text-6xl ml-[200px] logoIcon1 cursor-pointer"
          onMouseEnter={() => handleIconEnter("1")}
          onMouseLeave={() => handleIconLeave("1")}
          onClick={(e) => {
            e.preventDefault(); // Prevent default behavior
            window.open(
              "https://www.linkedin.com/in/gilbert-chuardi/",
              "_blank"
            ); // Open in new tab
          }}
        />
        <div className="ml-[50px]">or</div>
        <Image
          src="/curlyArrow.svg"
          alt="Curly Arrow SVG"
          width={40}
          height={0}
          className=" absolute rotate-90 ml-[-20px] mt-[420px]"
        />
        <BiLogoUpwork
          className="text-[#15803d] text-6xl ml-[-100px] logoIcon2 cursor-pointer"
          onMouseEnter={() => handleIconEnter("2")}
          onMouseLeave={() => handleIconLeave("2")}
          onClick={(e) => {
            e.preventDefault(); // Prevent default behavior
            window.open(
              "https://www.upwork.com/freelancers/~01718462e8721949c5?mp_source=share",
              "_blank"
            ); // Open in new tab
          }}
        />
      </div>
    </div>
  );
}
