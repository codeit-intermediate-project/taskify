// useInvitationList.ts
import { useEffect, useState } from 'react';

import type {
  InvitationsDto,
  InvitationsResponseDto,
} from '@core/dtos/InvitationsDto';

const useInvitationsList = (invitationsData: InvitationsResponseDto) => {
  const [invitationList, setInvitationList] = useState<InvitationsDto[]>([]);

  // invitationsData가 변경될 때 invitationList 상태 업데이트
  useEffect(() => {
    if (invitationsData) {
      setInvitationList(invitationsData.invitations);
    }
  }, [invitationsData]);

  return invitationList;
};

export default useInvitationsList;
