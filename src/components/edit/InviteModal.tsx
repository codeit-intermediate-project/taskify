/* eslint-disable import/order */

'use client';

import { useForm } from 'react-hook-form';

import Image from 'next/image';

import { Modal, Stack } from '@mantine/core';

import SecondaryButton from '@components/@shared/UI/Button/SecondaryButton';
import PrimaryButton from '@components/@shared/UI/Button/PrimaryButton';
import useDevice, { DEVICE } from '@lib/hooks/useDevice';

import Input from '@components/@shared/Common/Inputs/Input';

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

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddInvitation: (email: string) => void;
}

export default function InviteModal({
  isOpen,
  onClose,
  onAddInvitation,
}: InviteModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<{ invitedEmail: string }>({
    mode: 'onChange',
  });

  const handleCreateEmail = (data: { invitedEmail: string }) => {
    if (data.invitedEmail.trim() === '') {
      // eslint-disable-next-line no-alert
      alert('이메일을 입력하세요.');
      return;
    }

    onAddInvitation(data.invitedEmail);
    reset({ invitedEmail: '' });
  };

  const handleClose = () => {
    reset({ invitedEmail: '' });
    onClose();
  };

  const device = useDevice();

  return (
    <Modal
      opened={isOpen}
      onClose={handleClose}
      centered
      withCloseButton={false}
      size={MODAL_SIZE[device]}
      radius={MODAL_RADIUS[device]}
    >
      <Stack className="gap-4 md:p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">초대하기</h2>
          <button
            onClick={handleClose}
            className="text-xl font-bold text-gray-500"
          >
            <Image src="/icons/x.png" alt="닫기" width={36} height={36} />
          </button>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="InviteEmail"
            className="mb-2 text-black-600 font-2lg-18px-medium"
          >
            이메일
          </label>
          <Input
            id="invitedEmail"
            label="이메일"
            type="email"
            placeholder="이메일을 입력하세요"
            register={register}
            errors={errors}
            validation={{
              required: '이메일을 입력해주세요',
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: '잘못된 이메일 형식입니다.',
              },
            }}
          />
        </div>
        <div className="flex justify-center gap-2">
          <SecondaryButton onClick={onClose}>취소</SecondaryButton>
          <PrimaryButton
            disabled={!isValid}
            onClick={handleSubmit(handleCreateEmail)}
          >
            초대
          </PrimaryButton>
        </div>
      </Stack>
    </Modal>
  );
}
