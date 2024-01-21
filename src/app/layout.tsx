import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '3 clicks workout app',
  description: 'very cool',
};

import { getSession } from './lib/utils/getSession';
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
      <body className={`${inter.className}`}>
        <div className='absolute inset-0 overflow-hidden bg-bg text-text font-light p-4'>
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
