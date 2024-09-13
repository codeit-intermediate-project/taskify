'use client';

import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import useApi from '@/src/lib/hooks/useApi';

import type {
  LoginRequestDto,
  LoginResponseDto,
  UserServiceResponseDto,
} from '@core/dtos/AuthDto';

interface ContextValue {
  user: UserServiceResponseDto | undefined;
  refreshUser: (user: UserServiceResponseDto) => void;
  dashboardid: string | undefined;
  setDashboardid: Dispatch<SetStateAction<string | undefined>>;
  login: (body: LoginRequestDto) => Promise<void>;
  dashboardsFlag: boolean;
  setDashboardsFlag: Dispatch<SetStateAction<boolean>>;
}

const RootContext = createContext<ContextValue>({
  user: undefined,
  refreshUser: () => {},
  dashboardid: undefined,
  setDashboardid: () => {},
  login: async () => {},
  dashboardsFlag: false,
  setDashboardsFlag: () => {},
});

export default function RootProvider({ children }: PropsWithChildren) {
  const [dashboardid, setDashboardid] = useState<string | undefined>(undefined);
  const { data: loginData, callApi: postAuthLogin } = useApi<LoginResponseDto>(
    '/auth/login',
    'POST'
  );
  const {
    data: user,
    setData: setUser,
    callApi: getMe,
  } = useApi<UserServiceResponseDto>('/users/me', 'GET');
  const [dashboardsFlag, setDashboardsFlag] = useState(false);

  /** 유저 정보를 최신상태로 만들고 싶을 때 사용 */
  const refreshUser = useCallback(
    (userData: UserServiceResponseDto) => {
      setUser(userData);
      getMe(undefined);
    },
    [getMe, setUser]
  );

  /** 로그인 로직: 로그인 기능을 만들 때 가져가서 사용하세요 */
  const login = useCallback(
    async (body: LoginRequestDto) => {
      await postAuthLogin(body);
      await getMe(undefined);
    },
    [postAuthLogin, getMe]
  );

  /** 유저 정보 유지: 새로고침하거나, url입력을 통해 이동할 때 유저정보가 유지되도록 구현 */
  useEffect(() => {
    if (loginData?.accessToken) {
      localStorage.setItem('accessToken', loginData?.accessToken);
    }
    getMe(undefined);
  }, [loginData, getMe]);

  const value = useMemo(
    () => ({
      user,
      refreshUser,
      dashboardid,
      setDashboardid,
      login,
      dashboardsFlag,
      setDashboardsFlag,
    }),
    [user, dashboardid, login, refreshUser, dashboardsFlag, setDashboardsFlag]
  );

  return <RootContext.Provider value={value}>{children}</RootContext.Provider>;
}

export function useRoot() {
  const context = useContext(RootContext);
  if (!context) {
    throw new Error(
      'useRoot는 RootProvider 하위 컴포넌트에서 사용해야 합니다.'
    );
  }

  return context;
}
