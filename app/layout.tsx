import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VirTour | Premium Israeli Real Estate Marketplace',
  description: 'Discover premium properties in Israel with immersive 360 virtual tours, verified agents, and secure communication.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
