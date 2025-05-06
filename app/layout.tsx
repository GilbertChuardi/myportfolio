import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";
import {Providers} from "./providers";

const orbitron = Orbitron({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Gilbert Chuardi",
  description: "My Personal Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={orbitron.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
