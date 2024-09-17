import { useState } from 'react';

import { useMyDashboard } from '@core/contexts/MyDashboardContext';

import useCountItemsByWidth from './useCountItems';

const useCategorizedDashboards = () => {
  const { localDashboards } = useMyDashboard();
  const [createdByMeCurrentPage, setCreatedByMeCurrentPage] = useState(1);
  const [notCreatedByMeCurrentPage, setNotCreatedByMeCurrentPage] = useState(1);

  const itemsPerPage = useCountItemsByWidth(3, 4, 6);

  // 현재 페이지에 맞는 대시보드 목록 불러오기
  const getCurrentDashboards = (createdByMe: boolean, currentPage: number) => {
    if (!localDashboards) return [];
    return localDashboards
      .filter(dashboard => dashboard.createdByMe === createdByMe) // 작성자 기준 필터링
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  };

  // 필터링된 대시보드 개수 계산
  const totalCreatedByMe = localDashboards
    ? localDashboards.filter(dashboard => dashboard.createdByMe).length
    : 0;

  const totalNotCreatedByMe = localDashboards
    ? localDashboards.filter(dashboard => !dashboard.createdByMe).length
    : 0;

  return {
    createdByMeCurrentPage,
    notCreatedByMeCurrentPage,
    setCreatedByMeCurrentPage,
    setNotCreatedByMeCurrentPage,
    getCurrentDashboards,
    totalCreatedByMe,
    totalNotCreatedByMe,
  };
};

export default useCategorizedDashboards;
