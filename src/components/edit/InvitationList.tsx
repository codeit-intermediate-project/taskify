/* eslint-disable import/order */

'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';

import InviteModal from '@/src/components/edit/InviteModal';
import Pagination from '@/src/components/edit/Pagination';
import usePagination from '@/src/lib/hooks/usePagination';
import {
  addInvitation,
  deleteInvitation,
  getInvitations,
} from '@core/api/columnApis';

interface InvitationListProps {
  dashboardId: string;
}

interface EmailInvitation {
  id: number;
  email: string;
}

export default function InvitationList({ dashboardId }: InvitationListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invitations, setInvitations] = useState<EmailInvitation[]>([]);
  const itemsPerPage = 5;
  const hasLoadedInvitations = useRef(false);

  // 초대 목록 불러오기 함수
  const loadInvitations = useCallback(async () => {
    if (dashboardId && !hasLoadedInvitations.current) {
      hasLoadedInvitations.current = true;
      const response = await getInvitations(dashboardId);
      setInvitations(response);
    }
  }, [dashboardId]);

  // useEffect로 초기 데이터 로드
  useEffect(() => {
    loadInvitations();
  }, [loadInvitations]);

  // 페이지네이션을 위한 데이터 가져오기 함수
  const fetchInvitation = useCallback(
    async (page: number, size: number): Promise<EmailInvitation[]> => {
      const startIdx = (page - 1) * size;
      return invitations.slice(startIdx, startIdx + size);
    },
    [invitations]
  );

  // usePagination 훅 사용
  const {
    currentPage,
    handlePageChange,
    data: currentItems,
  } = usePagination<EmailInvitation>({
    totalItems: invitations.length, // 항상 숫자 값으로 보장
    itemsPerPage,
    fetchData: fetchInvitation,
  });

  const handleInviteClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddInvitation = async (email: string) => {
    if (!dashboardId) return;

    const newInvitation = await addInvitation(dashboardId, email);
    if (newInvitation) {
      setInvitations(prevInvitations => [
        ...prevInvitations,
        { id: newInvitation.id, email: newInvitation.email },
      ]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteInvitation = async (id: number) => {
    if (!dashboardId) return;

    await deleteInvitation(dashboardId, id);
    setInvitations(prevInvitations =>
      prevInvitations.filter(invitation => invitation.id !== id)
    );
  };

  return (
    <div className="max-w-[92%] rounded-lg bg-white p-6 shadow md:mx-0 md:max-w-[544px] xl:max-w-[620px]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-lg-16px-bold md:font-xl-20px-bold">초대 내역</h2>
        <div className="flex items-center gap-4">
          <Pagination
            currentPage={currentPage}
            totalItems={invitations.length} // 항상 숫자 값으로 보장
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
          <button
            type="button"
            onClick={handleInviteClick}
            className="hidden h-8 w-[105px] items-center justify-center gap-2 rounded border border-solid bg-violet text-white shadow font-md-14px-medium md:flex"
          >
            <Image
              src="/icons/add_box.png"
              alt="초대하기"
              width={16}
              height={16}
            />
            초대하기
          </button>
        </div>
      </div>

      <div className="mb-2 flex items-center justify-between">
        <div className="text-gray-600 font-lg-16px-regular">이메일</div>
        <button
          type="button"
          className="flex h-8 w-[105px] items-center justify-center gap-2 rounded border border-solid bg-violet text-white shadow font-md-14px-medium md:hidden"
          onClick={handleInviteClick}
        >
          <Image
            src="/icons/add_box.png"
            alt="초대하기"
            width={16}
            height={16}
          />
          초대하기
        </button>
      </div>

      <div>
        {currentItems.length > 0 ? (
          currentItems.map(item => (
            <div
              key={item.id}
              className="flex w-full items-center justify-between border-b border-gray-100 py-2"
            >
              <div className="flex-1">{item.email}</div>
              <button
                type="button"
                onClick={() => handleDeleteInvitation(item.id)}
                className="flex h-8 w-20 items-center justify-center rounded border border-solid border-gray-200 text-violet font-md-14px-medium"
              >
                삭제
              </button>
            </div>
          ))
        ) : (
          <div className="text-gray-500">친구를 초대해보세요!</div>
        )}
      </div>

      <InviteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddInvitation={handleAddInvitation}
      />
    </div>
  );
}
