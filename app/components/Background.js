import Image from "next/image";

export default function Background() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0">
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: `radial-gradient(ellipse at center, rgba(0, 0, 0, 0.93) 30%, rgba(0, 0, 0, 0.96) 60%, rgba(0, 0, 0, 1) 80%)`,
        }}
      ></div>

      <Image
        src="https://static.vecteezy.com/system/resources/previews/020/335/190/original/modern-abstract-grid-background-template-black-and-white-square-grid-design-vector.jpg"
        alt="Grid Background"
        fill
        className="object-cover z-0"
      />
    </div>
  );
}
