import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { Container } from '@/components/ui/Container';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'TalentDash',
  description: 'Salary intelligence platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <body className={`${inter.className} bg-[#F7F7F7] text-[#222222] antialiased`}>
        <div className="min-h-screen">
          <Navbar />
          <main>
            <Container className="py-6 sm:py-8">{children}</Container>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
