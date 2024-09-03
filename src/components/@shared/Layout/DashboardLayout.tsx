'use client';

import React, { PropsWithChildren, useEffect } from 'react';
import { useRoot } from '@core/contexts/RootContexts';
import UnAuthHeader from '../Common/UnAuthHeader';
import AuthHeader from '../Common/AuthHeader';

export default function DashboardLayout({
  children,
  params,
}: PropsWithChildren<{
  params: {
    dashboardid: string;
  };
}>) {
  const { dashboardid } = params;
  const { user, setDashboardid } = useRoot();

  useEffect(() => {
    setDashboardid(dashboardid);
  }, [dashboardid, setDashboardid]);

  return (
    <>
      {user ? <AuthHeader /> : <UnAuthHeader />}
      {children}
    </>
  );
}
