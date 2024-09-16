'use Client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  PropsWithChildren,
} from 'react';

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

  // 초기 마운트 시 API 호출
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

  // Context 값 메모이제이션
  const value = useMemo(
    () => ({
      localDashboards,
      loading: isLoading,
      error,
      addDashboard,
    }),
    [localDashboards, isLoading, error]
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
