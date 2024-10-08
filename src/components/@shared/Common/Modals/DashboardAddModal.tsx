import { MouseEvent, PropsWithChildren, useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Flex, Modal, Stack } from '@mantine/core';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import PrimaryButton from '@components/@shared/UI/Button/PrimaryButton';
import SecondaryButton from '@components/@shared/UI/Button/SecondaryButton';
import postCreateDashboards from '@core/api/postDashboards';
import { useRoot } from '@core/contexts/RootContexts';
import { useTheme } from '@core/contexts/ThemeContext';
import COLORS from '@lib/constants/themeConst';
import useDevice, { DEVICE } from '@lib/hooks/useDevice';
import findAxiosErrorMessage from '@lib/utils/findAxiosErrorMessage';
import showErrorNotification from '@lib/utils/notifications/showErrorNotification';
import showSuccessNotification from '@lib/utils/notifications/showSuccessNotification';

import Input from '../Inputs/Input';

type ColorType = keyof typeof COLORS;

type DeviceKeyObject = {
  [key in keyof typeof DEVICE]: string;
};

interface Inputs {
  title: string;
}

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

export default function DashboardAddModal({
  children,
  opened,
  onClose,
}: PropsWithChildren<Props>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    defaultValues: {
      title: '',
    },
  });
  const device = useDevice();
  const router = useRouter();
  const [color, setColor] = useState<ColorType>(COLORS.green);
  const { setDashboardid, setDashboardsFlag } = useRoot();

  const redirectDashboard = useCallback(
    (id: number) => {
      setDashboardid(String(id));
      router.push(`/dashboard/${id}`);
    },
    [router, setDashboardid]
  );

  const onSubmit: SubmitHandler<Inputs> = async ({ title }) => {
    const res = await postCreateDashboards({ title, color });
    if (!(res instanceof AxiosError)) {
      setDashboardsFlag(true);
      showSuccessNotification({
        message: `${title} 대시보드를 생성하였습니다.`,
      });
      return redirectDashboard(res.data.id);
    }
    showErrorNotification({ message: findAxiosErrorMessage(res) });
  };

  const handleColorClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    const { color: colorSet } = target.dataset;
    setColor(colorSet as ColorType);
  };
  const { darkMode } = useTheme();
  return (
    <>
      <Modal
        size={MODAL_SIZE[device]}
        radius={MODAL_RADIUS[device]}
        opened={opened}
        onClose={onClose}
        withCloseButton={false}
        centered
        styles={
          darkMode
            ? {
                content: {
                  backgroundColor: '#333236',
                },
              }
            : {}
        }
      >
        <Stack className="black gap-4 md:p-4" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="font-xl-20px-bold">새로운 대시보드</h2>
          <Input
            className="border border-border-gray dark:border-black-500 dark:bg-black-500"
            id="title"
            label="대시보드 이름"
            type="text"
            placeholder="뉴프로젝트"
            register={register}
            errors={errors}
            validation={{
              required: '대시보드 이름을 입력해주세요',
            }}
          />
          <Flex className="gap-2">
            {Object.keys(COLORS).map(colorKey => (
              <button
                className="flex h-[30px] w-[30px] items-center justify-center rounded-full"
                style={{ backgroundColor: COLORS[colorKey] }}
                key={colorKey}
                data-color={COLORS[colorKey]}
                onClick={handleColorClick}
                type="button"
              >
                {color === COLORS[colorKey] && (
                  <Image
                    width={24}
                    height={24}
                    src="/icons/check.png"
                    alt="color check"
                  />
                )}
              </button>
            ))}
          </Flex>
          <Flex className="mt-4 gap-2">
            <SecondaryButton disabled={false} onClick={onClose}>
              취소
            </SecondaryButton>
            <PrimaryButton disabled={!isValid} onClick={handleSubmit(onSubmit)}>
              확인
            </PrimaryButton>
          </Flex>
        </Stack>
      </Modal>
      {children}
    </>
  );
}
