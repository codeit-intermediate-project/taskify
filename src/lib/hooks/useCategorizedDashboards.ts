import { useState, useEffect } from 'react';

import { useMyDashboard } from '@core/contexts/MyDashboardContext';

import useCountItemsByWidth from './useCountItems';

const useCategorizedDashboards = () => {
  const { localDashboards } = useMyDashboard();
  const [createdByMeCurrentPage, setCreatedByMeCurrentPage] = useState(1);
  const [notCreatedByMeCurrentPage, setNotCreatedByMeCurrentPage] = useState(1);

  const itemsPerPage = useCountItemsByWidth(3, 4, 6);

  // 화면 크기가 변경될 때 페이지 초기화
  useEffect(() => {
    setCreatedByMeCurrentPage(1);
    setNotCreatedByMeCurrentPage(1);
  }, [itemsPerPage, setCreatedByMeCurrentPage, setNotCreatedByMeCurrentPage]);

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
    itemsPerPage,
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
