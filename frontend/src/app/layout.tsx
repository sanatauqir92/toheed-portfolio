import type { Metadata } from 'next';
import type { Viewport } from 'next';
import './globals.css';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://toheedchaudhry.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Toheed Chaudhry | Film Editor',
    template: '%s | Toheed Chaudhry',
  },
  description: 'Toheed Chaudhry is a film editor based in the Orange County / Los Angeles area, specializing in narrative and short film editing.',
  keywords: ['film editor', 'video editor', 'narrative film', 'short film', 'Los Angeles', 'Orange County', 'Toheed Chaudhry'],
  authors: [{ name: 'Toheed Chaudhry' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Toheed Chaudhry',
    title: 'Toheed Chaudhry | Film Editor',
    description: 'Toheed Chaudhry is a film editor based in the Orange County / Los Angeles area, specializing in narrative and short film editing.',
    images: [{ url: '/toheed_profile.jpg', width: 400, height: 400, alt: 'Toheed Chaudhry' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Toheed Chaudhry | Film Editor',
    description: 'Toheed Chaudhry is a film editor based in the Orange County / Los Angeles area, specializing in narrative and short film editing.',
    images: ['/toheed_profile.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
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
          <main className="text-black text-base w-11/12 lg:w-5/6 max-w-6xl mx-auto mt-6 overflow-hidden">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
