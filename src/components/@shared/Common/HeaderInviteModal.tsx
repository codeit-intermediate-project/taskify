'use client';

import { PropsWithChildren } from 'react';
import { useForm } from 'react-hook-form';

import { Modal, Stack } from '@mantine/core';
import { AxiosError } from 'axios';
import Image from 'next/image';

import { addInvitation } from '@core/api/columnApis';
import { useRoot } from '@core/contexts/RootContexts';
import useDevice, { DEVICE } from '@lib/hooks/useDevice';
import findAxiosErrorMessage from '@lib/utils/findAxiosErrorMessage';
import showErrorNotification from '@lib/utils/notifications/showErrorNotification';
import showSuccessNotification from '@lib/utils/notifications/showSuccessNotification';

import PrimaryButton from '../UI/Button/PrimaryButton';
import SecondaryButton from '../UI/Button/SecondaryButton';

import Input from './Inputs/Input';

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

interface Props {
  opened: boolean;
  onClose: () => void;
}

interface Inputs {
  invitedEmail: string;
}

export default function HeaderInviteModal({
  opened,
  onClose,
  children,
}: PropsWithChildren<Props>) {
  const device = useDevice();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: 'onChange',
    defaultValues: {
      invitedEmail: '',
    },
  });
  const { dashboardid } = useRoot();

  const onSubmit = async (data: Inputs) => {
    if (!dashboardid) return;

    onClose();
    const { invitedEmail } = data;
    const res = await addInvitation(dashboardid, invitedEmail);
    if (!(res instanceof AxiosError)) {
      /** 초대 보내기 성공 시 로직 */
      showSuccessNotification({ message: '초대를 보냈습니다.' });
      // 초대하면 edit에 반영되도록 로직 추가
      return;
    }
    showErrorNotification({ message: findAxiosErrorMessage(res) });
  };

  return (
    <>
      <Modal
        size={MODAL_SIZE[device]}
        radius={MODAL_RADIUS[device]}
        opened={opened}
        onClose={onClose}
        withCloseButton={false}
        centered
      >
        <Stack className="gap-4 md:p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">초대하기</h2>
            <button
              onClick={onClose}
              className="text-xl font-bold text-gray-500"
            >
              <Image src="/icons/X.png" alt="닫기" width={36} height={36} />
            </button>
          </div>
          <div className="flex flex-col gap-2">
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
            <PrimaryButton disabled={!isValid} onClick={handleSubmit(onSubmit)}>
              초대
            </PrimaryButton>
          </div>
        </Stack>
      </Modal>
      {children}
    </>
  );
}
