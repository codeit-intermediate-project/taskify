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
    <div className="grid grid-flow-row-dense grid-cols-1 grid-rows-3 gap-3 md:grid-cols-1 md:grid-rows-4 xl:grid-cols-2 xl:grid-rows-3">
      {dashboards.map((dashboard, index) => (
        <SlideInList key={dashboard.id} index={index}>
          <DashboardCard key={dashboard.id} value={dashboard} />
        </SlideInList>
      ))}
    </div>
    <Pagination
      currentPage={currentPage}
      totalItems={totalItems}
      onPageChange={onPageChange}
      itemsPerPage={itemsPerPage}
    />
  </div>
);

export default DashboardGroup;
