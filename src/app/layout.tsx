import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'mpu gym',
  description: 'quickly track your workout and view advanced stats',
};

import { getSession } from './lib/utils/session';
import Header from './lib/components/home/header';
import Nav from '@/app/lib/components/nav';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <html lang='en'>
      <body
        className={`absolute inset-0 overflow-x-hidden bg-base-100 text-base-content font-light p-4 ${inter.className}`}
      >
        <div>
          {session ? (
            <>
              {children}
              <Nav />
            </>
          ) : (
            <Header session={session} />
          )}
        </div>
      </body>
    </html>
  );
}
