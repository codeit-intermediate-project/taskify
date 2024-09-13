import { useEffect, useState } from 'react';

import { INIT_INVITATIONS_REQUEST } from '@lib/constants/invitationsInit';
import useApi from '@lib/hooks/useApi';

import useInfiniteScroll from './useInfiniteScroll';

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

  useEffect(() => {
    fetchInvitations(size);
  }, [callApi, size]);

  // 초대 목록 업데이트
  useEffect(() => {
    if (data && data.invitations) {
      setInvitations(prev => {
        const uniqueInvitations = [...prev, ...data.invitations].filter(
          (invitation, index, self) =>
            index === self.findIndex(t => t.id === invitation.id)
        );
        return uniqueInvitations;
      });
    }
  }, [data]);

  useInfiniteScroll(
    () => {
      const newSize = size + 10;
      setSize(newSize);
      fetchInvitations(newSize);
    },
    data && data.invitations && data.invitations.length > 0
  );

  return { data, error, hasNoInvitations, invitations };
};

export default useGetInvitations;
