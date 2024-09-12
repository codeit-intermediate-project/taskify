'use client';

import { useState, useCallback } from 'react';

import DashboardAddModal from '@components/@shared/Common/Modals/DashboardAddModal';
import { useMyDashboard } from '@core/contexts/MyDashboardContext';
import usePagination from '@lib/hooks/usePagination';

import CreateDashboardButton from './UI/CreateDashboardButton';
import DashboardCard from './UI/DashboardCard';
import Pagination from './UI/Pagination';

export default function JoinedDashboardList() {
  const { localDashboards, loading, error } = useMyDashboard();
  const [modalOpened, setModalOpened] = useState(false);
  const itemsPerPage = 5;

  const fetchDashboards = useCallback(
    async (page: number, size: number) => {
      const startIndex = (page - 1) * size;
      return localDashboards.slice(startIndex, startIndex + size);
    },
    [localDashboards]
  );

  const {
    currentPage: paginationCurrentPage,
    handlePageChange,
    data: currentDashboards,
  } = usePagination({
    fetchData: fetchDashboards,
    totalItems: localDashboards.length,
    itemsPerPage,
  });

  return (
    <section className="flex flex-col gap-3">
      {loading && <div>나의 대시보드 목록을 불러오고 있습니다.</div>}
      {!loading && !error && (
        <>
          <div className="grid grid-flow-row-dense grid-cols-1 grid-rows-6 gap-3 md:grid-cols-2 md:grid-rows-3 xl:grid-cols-3 xl:grid-rows-2">
            <CreateDashboardButton onClick={() => setModalOpened(true)} />
            {currentDashboards.map(dashboard => (
              <DashboardCard key={dashboard.id} value={dashboard} />
            ))}
          </div>
          <Pagination
            currentPage={paginationCurrentPage}
            totalItems={localDashboards.length}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
          />
          <DashboardAddModal
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
          />
        </>
      )}
    </section>
  );
}
