/* eslint-disable import/order */
import axios from './instance';

import type {
  GetColumnsResponseDto,
  CreateColumnRequestDto,
  ColumnServiceResponseDto,
  UpdateColumnRequestDto,
} from '@core/dtos/ColumnsDto';
import type { DashboardApplicationServiceResponseDto } from '@core/dtos/DashboardsDto';
import { MemberApplicationServiceResponseDto } from '@core/dtos/MembersDto';

export const getColumns = async (dashboardId: number) => {
  const res = await axios.get<GetColumnsResponseDto>(
    `/columns?dashboardId=${dashboardId}`
  );
  const { data } = res;
  return data;
};

export const postColumn = async (formData: CreateColumnRequestDto) => {
  try {
    const res = await axios.post<ColumnServiceResponseDto>(
      '/columns',
      formData
    );
    const { data } = res;
    return data;
  } catch (error) {
    return null;
  }
};

interface PutColumnParams {
  columnId: number;
  formData: UpdateColumnRequestDto;
}
export const putColumn = async ({ columnId, formData }: PutColumnParams) => {
  const res = await axios.put<ColumnServiceResponseDto>(
    `/columns/${columnId}`,
    formData
  );
  const { data } = res;
  return data;
};

export const deleteColumn = async (columnId: number) => {
  try {
    const res = await axios.delete(`/columns/${columnId}`);
    return res;
  } catch (error) {
    return null;
  }
};

export const getDashboardDetail = async (dashboardId: number) => {
  const res = await axios.get<DashboardApplicationServiceResponseDto>(
    `/dashboards/${dashboardId}`
  );
  const { data } = res;
  return data;
};

export const updateDashboard = async (
  dashboardId: number,
  data: { title: string; color: string }
) => {
  const res = await axios.put<DashboardApplicationServiceResponseDto>(
    `dashboards/${dashboardId}`,
    data
  );
  return res.data;
};

interface GetMembersResponse {
  members: MemberApplicationServiceResponseDto[];
}

export const getMembers = async (
  dashboardId: number
): Promise<GetMembersResponse> => {
  const res = await axios.get<GetMembersResponse>(
    `/members?dashboardId=${dashboardId}`
  );
  return res.data;
};

export const deleteMember = async (dashboardId: number, memberId: number) => {
  const response = await axios.delete(`/members/${memberId}`);
  return response.data;
};

// 초대 목록 응답 형식 정의
export interface InvitationResponse {
  invitations: { id: number; invitee: { email: string } }[];
  totalCount: number;
}

// 이메일 초대 정보 정의
export interface EmailInvitation {
  id: number;
  email: string;
}

// 초대 목록 가져오기
export const getInvitations = async (
  dashboardId: string
): Promise<EmailInvitation[]> => {
  const token = localStorage.getItem('authToken');

  const { data } = await axios.get<InvitationResponse>(
    `dashboards/${dashboardId}/invitations`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data.invitations.map(invitation => ({
    id: invitation.id,
    email: invitation.invitee.email,
  }));
};

// 초대 목록에 추가
export const addInvitation = async (
  dashboardId: string,
  email: string
): Promise<EmailInvitation> => {
  const { data } = await axios.post<{
    id: number;
    invitee: { email: string };
  }>(`dashboards/${dashboardId}/invitations`, { email });

  return { id: data.id, email: data.invitee.email };
};

// 초대 삭제
export const deleteInvitation = async (
  dashboardId: string,
  invitationId: number
): Promise<void> => {
  await axios.delete(`dashboards/${dashboardId}/invitations/${invitationId}`);
};

// 대시보드 삭제
export const deleteDashboard = async (dashboardId: string): Promise<void> => {
  await axios.delete(`dashboards/${dashboardId}`);
};
