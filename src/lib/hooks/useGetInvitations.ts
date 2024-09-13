import { useEffect, useCallback, useState } from 'react';

import { INIT_INVITATIONS_REQUEST } from '@lib/constants/invitationsInit';
import useApi from '@lib/hooks/useApi';

import type { InvitationsResponseDto } from '@core/dtos/InvitationsDto';

const useGetInvitations = () => {
  const [size, setSize] = useState(INIT_INVITATIONS_REQUEST.size); // 데이터 수
  const [invitations, setInvitations] = useState<
    InvitationsResponseDto['invitations']
  >([]);
  const { data, error, callApi } = useApi<InvitationsResponseDto>(
    '/invitations',
    'GET'
  );

  const hasNoInvitations = !data?.invitations || data.invitations.length === 0;

  // API 호출 함수
  const fetchInvitations = async (requestedSize: number) => {
    const config = {
      ...INIT_INVITATIONS_REQUEST,
      size: requestedSize,
    };

    try {
      await callApi(undefined, { params: config });
    } catch (err) {
      console.error('API 호출 오류:', err);
    }
  };

  // 초기 마운트 시 API 호출
  useEffect(() => {
    fetchInvitations(size);
  }, [callApi, size]);

  // 초대 목록 업데이트
  useEffect(() => {
    if (data && data.invitations) {
      setInvitations(prev => {
        const newInvitations = data.invitations;
        // 중복 데이터 제거
        const uniqueInvitations = [...prev, ...newInvitations].filter(
          (invitation, index, self) =>
            index === self.findIndex(t => t.id === invitation.id) // id 기준 중복 체크
        );
        return uniqueInvitations;
      });
    }
  }, [data]);

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(() => {
    const isAtBottom =
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100;

    // 스크롤이 바닥에 닿았고, 추가 데이터가 존재할 경우
    if (isAtBottom && invitations.length >= size) {
      const newSize = size + 10;
      setSize(newSize);
      fetchInvitations(newSize);
    }
  }, [invitations.length, size]);

  // 스크롤 이벤트 리스너
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return { data, error, hasNoInvitations };
};

export default useGetInvitations;
