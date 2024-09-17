/* eslint-disable import/order */

'use client';

import EditDashboard from '@components/edit/EditDashboard';
import InvitationList from '@components/edit/InvitationList';
import MemberList from '@components/edit/MemberList';
import { deleteDashboard } from '@core/api/columnApis';
import { useRoot } from '@core/contexts/RootContexts';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import DeleteModal from '@components/edit/DeleteModal';

import showSuccessNotification from '@lib/utils/notifications/showSuccessNotification';

export default function DashBoardEditPage() {
  const pathname = usePathname();
  const router = useRouter();
  const { setDashboardsFlag } = useRoot();

  const dashboardId = pathname.split('/')[2];
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [alertDisplayed, setAlertDisplayed] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  // 돌아가기 버튼
  const handleGoBack = () => {
    router.push(`/dashboard/${dashboardId}`);
  };

  // 모달 열기
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setAlertDisplayed(false);
  };

  // 모달 닫기
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  // 대시보드 삭제
  const handleDeleteDashboard = async () => {
    await deleteDashboard(dashboardId);
    setDashboardsFlag(true);
    setIsDeleted(true);
  };

  // 삭제 후 처리
  useEffect(() => {
    if (isDeleted && !isDeleteModalOpen && !alertDisplayed) {
      setTimeout(() => {
        showSuccessNotification({ message: '대시보드 삭제 완료!' });
        router.push('/mydashboard');
      }, 300);
      setAlertDisplayed(true);
    }
  }, [isDeleted, isDeleteModalOpen, alertDisplayed, router]);

  return (
    <div className="relative left-12 mt-14 flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 p-4 md:left-40 md:mt-16 lg:mt-14 xl:left-[300px]">
      {/* 돌아가기 버튼 */}
      <button
        onClick={handleGoBack}
        className="absolute left-8 top-4 z-20 mb-4 flex items-center gap-2 md:left-8 md:top-6 lg:left-8 lg:top-8 xl:left-8"
      >
        <Image
          src="/icons/arrow_left.png"
          alt="돌아가기"
          width={16}
          height={16}
        />
        <span className="font-lg-16px-medium">돌아가기</span>
      </button>

      {/* 메인 콘텐츠 */}
      <div className="mt-8 space-y-6 px-4 md:mt-14">
        <EditDashboard dashboardId={Number(dashboardId)} />
        <MemberList dashboardId={Number(dashboardId)} />
        <InvitationList dashboardId={dashboardId} />
        <button
          onClick={openDeleteModal}
          type="button"
          className="flex h-[52px] w-full max-w-[92%] items-center justify-center rounded-lg border border-solid border-gray-200 shadow font-lg-16px-medium md:w-[320px]"
        >
          대시보드 삭제하기
        </button>
      </div>

      {/* 삭제 확인 모달 */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={handleDeleteDashboard}
      />
    </div>
  );
}
