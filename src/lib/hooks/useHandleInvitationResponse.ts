/* eslint-disable no-console */
/* eslint-disable no-alert */
import putInvitations from '@core/api/putInvitations';
import { useMyDashboard } from '@core/contexts/MyDashboardContext';
import { DashboardApplicationServiceResponseDto } from '@core/dtos/DashboardsDto';
import { InvitationsDto } from '@core/dtos/InvitationsDto';

const useHandleInvitationResponse = (onUpdateInvitations: () => void) => {
  const { addDashboard } = useMyDashboard();

  // 초대 수락 및 거절 응답
  const handleInvitationResponse = async (
    invitation: InvitationsDto,
    accept: boolean
  ) => {
    try {
      await putInvitations(invitation.id, accept);
      if (accept) {
        const newInvitedDashboard: DashboardApplicationServiceResponseDto = {
          id: invitation.dashboard.id,
          title: invitation.dashboard.title,
          color: '#000',
          createdByMe: false,
        };
        addDashboard(newInvitedDashboard);
        alert('초대를 수락했습니다. 내 대시보드를 확인해보세요!');
      } else {
        alert('초대를 거절했습니다.');
      }

      // 응답 후 invitationList 상태 업데이트
      onUpdateInvitations();
    } catch (err) {
      console.error(`${accept ? '초대 수락' : '초대 거절'} 중 오류:`, err);
      alert(
        `${accept ? '초대 수락' : '초대 거절'}에 실패했습니다. 다시 시도해 주세요!`
      );
    }
  };

  return { handleInvitationResponse };
};

export default useHandleInvitationResponse;
