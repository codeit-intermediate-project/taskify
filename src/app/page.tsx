'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import UnAutherHeader from '@components/Common/UnAuthHeader';
import LandingBottom from '@components/Home/LandingBottom';
import LandingMain from '@components/Home/LandingMain';
import LandingTop from '@components/Home/LandingTop';
import { useRoot } from '@core/contexts/RootContexts';

export default function Home() {
  const { user, dashboardid, refreshUser } = useRoot(); // RootContext에서 유저 상태 및 대시보드 ID 가져오기
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    // 유저 정보 갱신 여부 확인 없이 바로 갱신
    refreshUser(user);

    if (dashboardid) {
      router.push(`/dashboard/${dashboardid}`);
    } else {
      router.push('/mydashboard');
    }
  }, [user, dashboardid, refreshUser, router]);

  if (user) {
    return;
  }

  return (
    <>
      <UnAutherHeader />
      <LandingTop />
      <LandingMain />
      <LandingBottom />
    </>
  );
}
