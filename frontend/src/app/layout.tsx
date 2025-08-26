import type { Metadata } from 'next';
import type { Viewport } from 'next';
import './globals.css';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
  title: 'Toheed Chaudhry Portfolio',
  description: 'My professional journey through film',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
          <main className="text-black text-xl w-9/10 lg:w-2/3 mx-auto mt-6 overflow-hidden">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
