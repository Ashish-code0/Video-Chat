import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ChatBox',
  description: 'Video calling App',
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          layout: {
            socialButtonsVariant: 'iconButton',
            logoImageUrl: '/icons/Video.svg',
          },
          variables: {
            colorText: '#fff',
            colorPrimary: '#fc5403',
            colorBackground: '#1C1F2E',
            colorInputBackground: '#252A41',
            colorInputText: '#fff',
          },
        }}
      >
        <body className={`${inter.className} bg-dark-3 text-white-1`}>
          <Toaster />
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
