'use client';

import { useState } from 'react';

import DashboardAddModal from '@components/@shared/Common/Modals/DashboardAddModal';
import { useMyDashboard } from '@core/contexts/MyDashboardContext';
import useCategorizedDashboards from '@lib/hooks/useCategorizedDashboards';

import DashboardGroup from './DashboardGroup';
import CreateDashboardButton from './UI/CreateDashboardButton';

const JoinedDashboardList = () => {
  const { loading, error } = useMyDashboard();
  const [modalOpened, setModalOpened] = useState(false);

  const {
    createdByMeCurrentPage,
    notCreatedByMeCurrentPage,
    setCreatedByMeCurrentPage,
    setNotCreatedByMeCurrentPage,
    getCurrentDashboards,
    totalCreatedByMe,
    totalNotCreatedByMe,
    itemsPerPage,
  } = useCategorizedDashboards();

  // 작성자 기준 분류된 대시보드 가져오기
  const dashboards = {
    createdByMe: getCurrentDashboards(true, createdByMeCurrentPage),
    notCreatedByMe: getCurrentDashboards(false, notCreatedByMeCurrentPage),
  };

  return (
    <section className="flex flex-col gap-6">
      {loading && <div>나의 대시보드 목록을 불러오고 있습니다.</div>}
      {!loading && !error && (
        <>
          <CreateDashboardButton onClick={() => setModalOpened(true)} />
          <div className="flex flex-1 flex-col gap-6 md:flex-row">
            <DashboardGroup
              title="내 대시보드"
              dashboards={dashboards.createdByMe}
              currentPage={createdByMeCurrentPage}
              totalItems={totalCreatedByMe}
              onPageChange={setCreatedByMeCurrentPage}
              itemsPerPage={itemsPerPage}
            />
            <DashboardGroup
              title="참여 중인 대시보드"
              dashboards={dashboards.notCreatedByMe}
              currentPage={notCreatedByMeCurrentPage}
              totalItems={totalNotCreatedByMe}
              onPageChange={setNotCreatedByMeCurrentPage}
              itemsPerPage={itemsPerPage}
            />
          </div>
          <DashboardAddModal
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
          />
        </>
      )}
    </section>
  );
};

export default JoinedDashboardList;
