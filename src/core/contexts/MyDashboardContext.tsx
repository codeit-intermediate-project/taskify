'use Client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  PropsWithChildren,
  useCallback,
} from 'react';

import getDashboards from '@core/api/getDashboards';
import {
  INIT_MYDASHBOARDS_CONTEXT,
  INIT_DASHBOARDS_REQUEST,
} from '@lib/constants/dashboardsInit';
import useApi from '@lib/hooks/useApi';

import type {
  DashboardApplicationServiceResponseDto,
  DashboardsResponseDto,
  MyDashboardContextDto,
} from '@core/dtos/DashboardsDto';

const MyDashboardContext = createContext<MyDashboardContextDto>(
  INIT_MYDASHBOARDS_CONTEXT
);

export const MyDashboardProvider = ({ children }: PropsWithChildren) => {
  const [localDashboards, setLocalDashboards] = useState<
    DashboardApplicationServiceResponseDto[]
  >([]);
  const { data, isLoading, error, callApi } = useApi<DashboardsResponseDto>(
    '/dashboards',
    'GET'
  );

  // 컴포넌트가 마운트될 때 API 호출
  useEffect(() => {
    const fetchData = async () => {
      const config = {
        params: INIT_DASHBOARDS_REQUEST,
      };
      await callApi(undefined, config);
    };

    fetchData();
  }, [callApi]);

  // 데이터가 변경될 때 로컬 대시보드 상태 업데이트
  useEffect(() => {
    if (data && data.dashboards) {
      setLocalDashboards(data.dashboards);
    }
  }, [data]);

  // 로컬 대시보드 추가
  const addDashboard = (
    newDashboard: DashboardApplicationServiceResponseDto
  ) => {
    setLocalDashboards(prev => [...prev, newDashboard]);
  };

  // 대시보드 데이터 재패칭 함수
  const fetchDashboards = useCallback(async () => {
    const response = await getDashboards();
    setLocalDashboards(response.dashboards);
  }, []);

  // Context 값 메모이제이션
  const value = useMemo(
    () => ({
      localDashboards,
      loading: isLoading,
      error,
      addDashboard,
      fetchDashboards,
    }),
    [localDashboards, isLoading, error, fetchDashboards]
  );

  return (
    <MyDashboardContext.Provider value={value}>
      {children}
    </MyDashboardContext.Provider>
  );
};

export const useMyDashboard = () => {
  return useContext(MyDashboardContext);
};
