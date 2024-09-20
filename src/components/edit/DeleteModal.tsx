/* eslint-disable import/order */

'use client';

import Image from 'next/image';

import { Modal, Stack } from '@mantine/core';

import useDevice, { DEVICE } from '@lib/hooks/useDevice';

type DeviceKeyObject = {
  [key in keyof typeof DEVICE]: string;
};

const MODAL_SIZE: DeviceKeyObject = {
  mobile: '327px',
  tablet: '584px',
  desktop: '584px',
};

const MODAL_RADIUS: DeviceKeyObject = {
  mobile: '8px',
  tablet: '16px',
  desktop: '16px',
};

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteModal({
  isOpen,
  onClose,
  onDelete,
}: DeleteModalProps) {
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  const device = useDevice();

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      centered
      withCloseButton={false}
      size={MODAL_SIZE[device]}
      radius={MODAL_RADIUS[device]}
    >
      <Stack className="gap-4 md:p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">삭제 확인</h2>
          <button onClick={onClose} className="text-xl font-bold text-gray-500">
            <Image src="/icons/x.png" alt="닫기" width={36} height={36} />
          </button>
        </div>
        <div className="flex flex-col items-center gap-4">
          <p className="text-center text-lg">정말로 삭제하시겠습니까?</p>
        </div>
        <div className="mt-4 flex justify-center gap-2">
          <button
            onClick={onClose}
            className="w-full rounded border border-gray-200 px-4 py-2 text-gray-400"
          >
            취소
          </button>
          <button
            onClick={handleDelete}
            className="w-full rounded bg-violet px-4 py-2 text-white"
          >
            삭제
          </button>
        </div>
      </Stack>
    </Modal>
  );
}
