import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { Container } from '@/components/ui/container';
import './globals.css';

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
    <html lang="en">
      <body className="bg-[#F7F7F7] text-[#222222] antialiased">
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
