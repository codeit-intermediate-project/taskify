import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import { PropsWithChildren } from 'react';

const pretandard = localFont({
  src: '../statics/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export const Component = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pretandard.variable}`}>{children}</body>
    </html>
  );
}
