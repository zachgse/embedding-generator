import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Vector embedding generator",
  description: "Vector embedding generator using the gemini-embedding-2 model to generate chunks of data from text. Design and developed by Zach Estrella.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en">
      <body className="min-h-full">
        <ToastContainer position="top-right"/>
        <div className="lg:w-3/5 md:4/5 w-full lg:px-0 px-4 mx-auto relative">
          {children}
          <div className="relative bottom-4 flex items-center justify-center">
            <p className="text-gray-500 font-semibold text-xs">
              Developed and built by Zach Estrella {new Date().getFullYear()} ©
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
