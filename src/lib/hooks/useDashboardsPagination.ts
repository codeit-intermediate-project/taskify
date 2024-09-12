import { useCallback, useEffect, useState } from 'react';

import getDashboards from '@core/api/getDashboards';
import { DashboardApplicationServiceResponseDto } from '@core/dtos/DashboardsDto';

export default function useDashboardsPagination() {
  const [data, setData] = useState<DashboardApplicationServiceResponseDto[]>(
    []
  ); // 제네릭 타입 T 사용
  const [page, setPage] = useState<number>(1);
  const [cursor, setCursor] = useState<number | null>(null);
  const [totalItems, setTotalItems] = useState<number>(0);
  const size = 10;

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(totalItems / size);

  // 페이지 변경 함수
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
    }
  };

  const fetchData = useCallback(async () => {
    const res = await getDashboards({ page, size, cursorId: cursor });
    const { cursorId, totalCount, dashboards } = res;
    setCursor(cursorId);
    setTotalItems(totalCount);
    setData(dashboards);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size]);

  // 데이터 로딩
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    currentPage: page,
    totalPages,
    totalItems,
    data,
    handlePageChange,
  };
}
