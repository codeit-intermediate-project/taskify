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

    // user가 갱신이 필요할 때만 refreshUser 호출
    if (!user.isRefreshed) {
      refreshUser(user);
    }

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
