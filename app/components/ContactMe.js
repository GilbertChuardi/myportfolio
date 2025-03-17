"use client";

import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import Border from "../world/components/Border";

export default function Page() {
  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-[90px] font-[1000] flex justify-center 2xl:h-[12%] h-[18%]">
        Contact Me
      </h1>
      <Form
        className="flex flex-col gap-4 2xl:h-[88%] h-[82%] justify-center"
        onReset={() => setAction("reset")}
        onSubmit={(e) => {
          e.preventDefault();
          let data = Object.fromEntries(new FormData(e.currentTarget));

          setAction(`submit ${JSON.stringify(data)}`);
        }}
      >
        <div className="2xl:w-[670px] w-[490px] relative">
          <Border></Border>
        </div>
        <div className="flex flex-col w-[100%] 2xl:h-[795px] h-[593px] items-center justify-between 2xl:px-28 px-20 z-10 py-10">
          <Input
            isRequired
            errorMessage="Please enter a valid email"
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
            radius="none"
            variant="bordered"
          />
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
      </Form>
    </div>
  );
}
