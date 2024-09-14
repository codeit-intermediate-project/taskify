'use client';

import { useState, useEffect } from 'react';

import DashboardAddModal from '@components/@shared/Common/Modals/DashboardAddModal';
import { useMyDashboard } from '@core/contexts/MyDashboardContext';

import CreateDashboardButton from './UI/CreateDashboardButton';
import DashboardCard from './UI/DashboardCard';
import Pagination from './UI/Pagination';

export default function JoinedDashboardList() {
  const { localDashboards, loading, error } = useMyDashboard();
  const [modalOpened, setModalOpened] = useState(false);
  const [createdByMeCurrentPage, setCreatedByMeCurrentPage] = useState(1);
  const [notCreatedByMeCurrentPage, setNotCreatedByMeCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width > 1280) {
        setItemsPerPage(6);
      } else if (width >= 768 && width <= 1280) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(4);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);

    return () => {
      window.removeEventListener('resize', updateItemsPerPage);
    };
  }, []);

  const handleCreatedByMePageChange = (pageNumber: number) => {
    setCreatedByMeCurrentPage(pageNumber);
  };

  const handleNotCreatedByMePageChange = (pageNumber: number) => {
    setNotCreatedByMeCurrentPage(pageNumber);
  };

  const getCurrentDashboards = (createdByMe: boolean, currentPage: number) => {
    if (!localDashboards) return [];
    return localDashboards
      .filter(dashboard => dashboard.createdByMe === createdByMe)
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  };

  const createdByMeDashboards = getCurrentDashboards(
    true,
    createdByMeCurrentPage
  );
  const notCreatedByMeDashboards = getCurrentDashboards(
    false,
    notCreatedByMeCurrentPage
  );

  const totalCreatedByMe = localDashboards
    ? localDashboards.filter(dashboard => dashboard.createdByMe).length
    : 0;
  const totalNotCreatedByMe = localDashboards
    ? localDashboards.filter(dashboard => !dashboard.createdByMe).length
    : 0;

  return (
    <section className="flex flex-col gap-6">
      {loading && <div>나의 대시보드 목록을 불러오고 있습니다.</div>}
      {!loading && !error && (
        <>
          <CreateDashboardButton onClick={() => setModalOpened(true)} />
          <div className="flex flex-1 gap-6">
            <div className="flex w-full flex-col gap-4">
              <h2 className="font-2lg-18px-bold">내 대시보드</h2>
              <div className="grid grid-flow-row-dense grid-cols-1 grid-rows-4 gap-3 md:grid-cols-1 md:grid-rows-4 xl:grid-cols-2 xl:grid-rows-3">
                {createdByMeDashboards.map(dashboard => (
                  <DashboardCard key={dashboard.id} value={dashboard} />
                ))}
              </div>
              <Pagination
                currentPage={createdByMeCurrentPage}
                totalItems={totalCreatedByMe}
                onPageChange={handleCreatedByMePageChange}
                itemsPerPage={itemsPerPage}
              />
            </div>

            <div className="flex w-full flex-col gap-4">
              <h2 className="font-2lg-18px-bold">참여 중인 대시보드</h2>
              <div className="grid grid-flow-row-dense grid-cols-1 grid-rows-4 gap-3 md:grid-cols-1 md:grid-rows-4 xl:grid-cols-2 xl:grid-rows-3">
                {notCreatedByMeDashboards.map(dashboard => (
                  <DashboardCard key={dashboard.id} value={dashboard} />
                ))}
              </div>
              <Pagination
                currentPage={notCreatedByMeCurrentPage}
                totalItems={totalNotCreatedByMe}
                onPageChange={handleNotCreatedByMePageChange}
                itemsPerPage={itemsPerPage}
              />
            </div>
          </div>
          <DashboardAddModal
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
          />
        </>
      )}
    </section>
  );
}
