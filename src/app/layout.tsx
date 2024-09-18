/* eslint-disable import/order */
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './globals.css';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import localFont from 'next/font/local';

import DashboardLayout from '@components/@shared/Layout/DashboardLayout';
import DeviceProvider from '@core/contexts/DeviceContext';
import RootProvider from '@core/contexts/RootContexts';

import type { Metadata } from 'next';

import AuthProvider from '@lib/next-auth';

const pretandard = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'taskify',
  description: '대시보드를 통해 일정을 공유해보세요.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${pretandard.variable}`}>
        <MantineProvider>
          <Notifications />
          <DeviceProvider>
            <RootProvider>
              <AuthProvider>
                <DashboardLayout>{children}</DashboardLayout>
              </AuthProvider>
            </RootProvider>
          </DeviceProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
