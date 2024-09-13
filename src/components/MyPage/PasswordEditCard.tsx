import { useForm } from 'react-hook-form';

import { Stack } from '@mantine/core';
import { AxiosError } from 'axios';

import Input from '@components/@shared/Common/Inputs/Input';
import PrimaryButton from '@components/@shared/UI/Button/PrimaryButton';
import putPassword from '@core/api/putPassword';
import showErrorNotification from '@lib/utils/notifications/showErrorNotification';
import showSuccessNotification from '@lib/utils/notifications/showSuccessNotification';

interface FormData {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export default function PasswordConfirmCard() {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
  });
  const onTrigger = () => {
    trigger(['newPassword', 'newPasswordConfirm']);
  };

  /** 비밀번호 변경 실패 시 각 사유에 대한 message를 모달에 출력 */
  const onSubmit = async ({ currentPassword, newPassword }: FormData) => {
    const res = await putPassword({ password: currentPassword, newPassword });
    if (res instanceof AxiosError) {
      showErrorNotification({ message: res.response?.data.message });
    } else {
      showSuccessNotification({ message: '비밀번호가 변경되었습니다.' });
      reset();
    }
  };

  return (
    <>
      {/* <PasswordEditModal opened={opened} onClose={close}>
        {statusMessage} 
      </PasswordEditModal> */}
      <form className="z-10 flex flex-col gap-10 rounded-lg bg-white p-4">
        <h1 className="font-2lg-18px-bold md:font-2xl-24px-bold">
          비밀번호 변경
        </h1>
        <Stack className="gap-6">
          <Input
            id="currentPassword"
            label="현재 비밀번호"
            type="password"
            placeholder="현재 비밀번호 입력"
            register={register}
            validation={{
              required: '현재 비밀번호를 입력해주세요',
            }}
            errors={errors}
          />
          <Input
            id="newPassword"
            label="새 비밀번호"
            type="password"
            placeholder="새 비밀번호 입력"
            register={register}
            validation={{
              required: '새 비밀번호를 입력해주세요',
              minLength: {
                value: 8,
                message: '새 비밀번호는 8자 이상 입력해주세요',
              },
            }}
            onTrigger={onTrigger}
            errors={errors}
          />
          <Input
            id="newPasswordConfirm"
            label="새 비밀번호 확인"
            type="password"
            placeholder="새 비밀번호 입력"
            register={register}
            validation={{
              validate: (val: string) => {
                if (watch('newPassword') !== val) {
                  return '비밀번호가 일치하지 않습니다.';
                }
              },
            }}
            onTrigger={onTrigger}
            errors={errors}
          />
          <PrimaryButton
            onClick={handleSubmit(onSubmit)}
            className="w-full md:w-full"
            disabled={!isValid}
          >
            변경
          </PrimaryButton>
        </Stack>
      </form>
    </>
  );
}
