import Image from 'next/image';

import SlideInList from '@components/@shared/animations/SlideInList';

import DashboardCard from './UI/DashboardCard';
import Pagination from './UI/Pagination';

import type { DashboardApplicationServiceResponseDto } from '@core/dtos/DashboardsDto';

interface DashboardGroupProps {
  title: string;
  dashboards: DashboardApplicationServiceResponseDto[];
  currentPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
}

const DashboardGroup = ({
  title,
  dashboards,
  currentPage,
  totalItems,
  onPageChange,
  itemsPerPage,
}: DashboardGroupProps) => (
  <div className="flex w-full flex-col gap-4">
    <h2 className="font-2lg-18px-bold">{title}</h2>
    {dashboards.length > 0 ? (
      <div className="grid grid-flow-row-dense grid-cols-1 grid-rows-3 gap-3 md:grid-cols-1 md:grid-rows-4 xl:grid-cols-2 xl:grid-rows-3">
        {dashboards.map((dashboard, index) => (
          <SlideInList key={dashboard.id} index={index}>
            <DashboardCard value={dashboard} />
          </SlideInList>
        ))}
      </div>
    ) : (
      <div className="mx-auto my-6 flex flex-col items-center justify-center gap-3 md:my-8">
        <Image
          width={60}
          height={60}
          src="/icons/add_dashboard.svg"
          alt="대시보드 알림 아이콘"
        />
        <p className="text-center text-gray-300 font-xs-12px-medium md:font-md-14px-medium">
          대시보드를 추가해보세요 !
        </p>
      </div>
    )}
    <Pagination
      currentPage={currentPage}
      totalItems={totalItems}
      onPageChange={onPageChange}
      itemsPerPage={itemsPerPage}
    />
  </div>
);

export default DashboardGroup;
