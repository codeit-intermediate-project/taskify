import { useEffect } from 'react';

import useApi from '@lib/hooks/useApi';

import type { InvitationsResponseDto } from '@core/dtos/InvitationsDto';

const useGetInvitations = () => {
  const { data, isLoading, error, callApi } = useApi<InvitationsResponseDto>(
    '/invitations',
    'GET'
  );

  // 초대 데이터 유효성 검사
  const hasNoInvitations = !data || !data.invitations?.length;

  // 컴포넌트가 마운트될 때 API 호출
  useEffect(() => {
    const fetchData = async () => {
      await callApi(undefined);
    };
    fetchData();
  }, [callApi]);

  return { data, isLoading, error, callApi, hasNoInvitations };
};

export default useGetInvitations;
