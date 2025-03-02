import Image from "next/image";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full h-full relative">
        <div
          className="absolute z-50 h-full w-full"
          style={{
            backgroundImage: `radial-gradient(ellipse at center, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.9) 60%, rgba(0, 0, 0, 1) 70%)`,
            zIndex: 50,
          }}
        ></div>
        <Image
          src="https://static.vecteezy.com/system/resources/previews/020/335/190/original/modern-abstract-grid-background-template-black-and-white-square-grid-design-vector.jpg"
          alt="Grid Background"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
