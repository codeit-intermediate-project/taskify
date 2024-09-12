'use client';

import ColumnList from '@components/dashboard/ColumnList';
import DashBoardProvider from '@core/contexts/DashBoardContext';

export default function DashBoardPage() {
  return (
    <DashBoardProvider>
      <div className="ml-[67px] mt-[60px] flex flex-col overflow-hidden pb-[49px] md:ml-[160px] md:mt-[70px] xl:ml-[300px] xl:max-h-[92vh] xl:flex-row">
        <ColumnList />
      </div>
    </DashBoardProvider>
  );
}
