import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '3 clicks workout app',
  description: 'very cool',
};

import Nav from '@/app/lib/components/nav';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} absolute inset-0 overflow-hidden bg-bg text-text font-light`}
      >
        {children}
        <Nav />
      </body>
    </html>
  );
}
