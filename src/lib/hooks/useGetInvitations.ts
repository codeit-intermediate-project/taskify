import { useEffect, useCallback, useState } from 'react';

import useApi from '@lib/hooks/useApi';

import type { InvitationsResponseDto } from '@core/dtos/InvitationsDto';

const useGetInvitations = () => {
  const size = 100;
  const [page, setPage] = useState(1);
  const { data, isLoading, error, callApi } = useApi<InvitationsResponseDto>(
    '/invitations',
    'GET'
  );

  // 초대 데이터 유효성 검사
  const hasNoInvitations = !data?.invitations?.length;

  // CallApi
  useEffect(() => {
    const fetchInvitations = async () => {
      if (isLoading || hasNoInvitations) return; // 추가 호출 방지
      const config = {
        navigationMethod: 'infiniteScroll',
        page,
        size,
      };
      await callApi(undefined, { params: config });
    };

    fetchInvitations();
  }, [callApi, page, size, isLoading, hasNoInvitations]);

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(() => {
    const isAtBottom =
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100;
    if (isAtBottom && !isLoading && !hasNoInvitations) {
      setPage(prev => prev + 1);
    }
  }, [isLoading, hasNoInvitations]);

  // 스크롤 이벤트 리스너
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return { data, isLoading, error, hasNoInvitations };
};

export default useGetInvitations;
