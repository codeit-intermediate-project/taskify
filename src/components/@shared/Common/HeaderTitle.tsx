'use client';

import React, { useEffect } from 'react';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { useRoot } from '@core/contexts/RootContexts';
import { DashboardApplicationServiceResponseDto } from '@core/dtos/DashboardsDto';
import { initialDetail } from '@lib/constants/initialValues';
import useApi from '@lib/hooks/useApi';

function getTitleValue(pathname: string) {
  if (pathname === '/mydashboard') return '내 대시보드';
  if (pathname === '/mypage') return '계정 관리';
  return null;
}

export default function HeaderTitle() {
  const pathname = usePathname();
  const { user, dashboardid } = useRoot();
  const {
    data: dashboardDetail = initialDetail,
    error,
    callApi: getDashboardDetail,
  } = useApi<DashboardApplicationServiceResponseDto>(
    `/dashboards/${dashboardid}`,
    'GET'
  );

  const isManagedPage =
    pathname.includes('mydashboard') || pathname.includes('mypage');
  const titleValue = getTitleValue(pathname) || dashboardDetail?.title;

  useEffect(() => {
    const fetchDetail = async () => {
      await getDashboardDetail(undefined);
    };
    if (dashboardid) {
      fetchDetail();
    }
  }, [dashboardid, getDashboardDetail, user]);

  return (
    <div
      className={`grow items-center truncate font-xl-20px-bold xl:flex xl:gap-2 ${isManagedPage ? 'flex' : 'hidden'}`}
    >
      <h1>{titleValue}</h1>
      {!isManagedPage && !error && dashboardDetail?.createdByMe && (
        <Image width={20} height={16} src="/icons/crown.png" alt="createByMe" />
      )}
    </div>
  );
}
