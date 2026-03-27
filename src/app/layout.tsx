import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Providers from './providers';
import './globals.css';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://barracade.dev'),
  title: 'Barracade - Desktop Security Software',
  description: 'Security software for your entire stack. Website scanning, runtime protection, code analysis, compliance reporting.',
  openGraph: {
    title: 'Barracade - Desktop Security Software',
    description: 'Security software for your entire stack.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Barracade',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Barracade' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Barracade - Desktop Security Software',
    description: 'Security software for your entire stack.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/no-backround-icon.png',
    apple: '/no-backround-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}> 
      <body className="min-h-screen font-sans antialiased">
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
