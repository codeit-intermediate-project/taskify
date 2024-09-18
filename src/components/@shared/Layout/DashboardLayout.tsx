'use client';

import React, { PropsWithChildren, useEffect } from 'react';

import { useParams } from 'next/navigation';

import { useRoot } from '@core/contexts/RootContexts';

import AuthHeader from '../Common/AuthHeader';
import SideBar from '../Common/SideBar';
import UnAuthHeader from '../Common/UnAuthHeader';
import FloatingThemeChange from '../UI/FloatingThemeChange';

export default function DashboardLayout({ children }: PropsWithChildren) {
  const { dashboardid } = useParams();
  const { user, dashboardid: id, setDashboardid } = useRoot();

  useEffect(() => {
    if (!id && dashboardid) {
      setDashboardid(dashboardid as string);
    }
  }, [dashboardid, setDashboardid, id]);

  return (
    <>
      {user ? <AuthHeader /> : <UnAuthHeader />}
      {user && <SideBar />}
      {children}
      <FloatingThemeChange />
    </>
  );
}
