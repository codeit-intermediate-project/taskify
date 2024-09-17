'use client';

import InvitedDashboardList from '@components/MyDashBoard/InvitedDashboardList';
import JoinedDashboardList from '@components/MyDashBoard/JoinedDashboardList';
import { MyDashboardProvider } from '@core/contexts/MyDashboardContext';

export default function Mydashboard() {
  return (
    <MyDashboardProvider>
      <main className="ml-[67px] mt-[60px] flex flex-col gap-12 bg-gray-50 px-6 pt-6 md:ml-[160px] md:mt-[70px] xl:ml-[300px]">
        <JoinedDashboardList />
        <InvitedDashboardList />
      </main>
    </MyDashboardProvider>
  );
}
