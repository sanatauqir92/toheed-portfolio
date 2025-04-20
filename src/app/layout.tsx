import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/components/Header";

export const metadata: Metadata = {
  title: "Toheed Chaudhry Portfolio",
  description: "My professional journey through film",
  viewport: { width: 'device-width', initialScale: 1 },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="bg-white min-h-screen grid grid-rows-[auto_1fr_auto] w-full">
          <Header />
          <main className="text-black text-xl w-3/4 lg:w-2/3 mx-auto mt-6 overflow-hidden">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
