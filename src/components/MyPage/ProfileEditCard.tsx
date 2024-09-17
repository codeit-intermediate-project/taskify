'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Stack } from '@mantine/core';
import { AxiosError } from 'axios';

import FileInput from '@components/@shared/Common/Inputs/FileInput';
import Input from '@components/@shared/Common/Inputs/Input';
import PrimaryButton from '@components/@shared/UI/Button/PrimaryButton';
import postImageUpload from '@core/api/postImageUpload';
import putMyProfile from '@core/api/putMyProfile';
import { useRoot } from '@core/contexts/RootContexts';
import findAxiosErrorMessage from '@lib/utils/findAxiosErrorMessage';
import showErrorNotification from '@lib/utils/notifications/showErrorNotification';
import showSuccessNotification from '@lib/utils/notifications/showSuccessNotification';

interface FormData {
  email: string;
  nickname: string;
  image: File | string;
}

export default function ProfileEditCard() {
  const { user, refreshUser } = useRoot();
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const onSubmit = async (data: FormData) => {
    const isSameImage = data.image === user?.profileImageUrl;
    const isSameNickname = data.nickname === user?.nickname;
    if (isSameImage && isSameNickname)
      return showErrorNotification({ message: '현재 프로필 정보와 같습니다.' });
    const { nickname, image } = data;
    const formData = new FormData();
    let imgURL = image;
    /** image 가 File이 아니라면 (string 이라면),
     * 프로필 사진을 변경하지 않았다는 것과 같으므로, 이미지 업로드를 진행하지 않는다.
     */
    if (image instanceof File) {
      formData.append('image', image);
      imgURL = await postImageUpload(formData);
      /** 이미지 업로드가 에러날 상황을 찾을 수 없음 === 에러 핸들링 불가 */
    }
    const res = await putMyProfile({
      nickname,
      profileImageUrl: imgURL,
    });
    if (!(res instanceof AxiosError)) {
      showSuccessNotification({ message: '프로필 수정이 완료되었습니다' });
      return refreshUser(res.data);
    }
    showErrorNotification({ message: findAxiosErrorMessage(res) });
  };

  const watchImage = watch('image');

  useEffect(() => {
    const setInitialInputs = async () => {
      setValue('email', user!.email, { shouldValidate: true });
      setValue('nickname', user!.nickname, { shouldValidate: true });
      setValue('image', user!.profileImageUrl!, { shouldValidate: true });
    };
    if (user) {
      setInitialInputs();
    }
  }, [user, setValue]);

  return (
    <form className="z-10 flex flex-col gap-10 rounded-lg bg-white p-4">
      <h1 className="font-2lg-18px-bold md:font-2xl-24px-bold">프로필</h1>
      <Stack className="gap-10 md:flex-row">
        <FileInput
          id="image"
          value={watchImage}
          setValue={setValue}
          register={register}
          errors={errors}
          validation={{
            validate: {
              required: (file: File | string) => {
                if (typeof file === 'string') return true;
                if (!file) return '파일을 선택해주세요';
                return true;
              },
              acceptedFormats: (file: File | string) => {
                if (typeof file === 'string') return true;
                if (!['image/jpeg', 'image/png'].includes(file.type))
                  return 'PNG 또는 JPG 파일만 업로드 가능합니다.';
                return true;
              },
            },
          }}
        />
        <Stack className="w-full gap-6">
          <Input
            className="text-gray-300"
            id="email"
            label="이메일"
            type="email"
            placeholder="이메일을 입력해 주세요"
            register={register}
            disabled
            validation={{
              required: '이메일을 입력해주세요',
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: '잘못된 이메일 형식입니다.',
              },
            }}
            errors={errors}
          />
          <Input
            id="nickname"
            label="닉네임"
            type="text"
            placeholder="닉네임을 입력해 주세요"
            register={register}
            validation={{
              required: '닉네임을 입력해주세요',
              maxLength: {
                value: 10,
                message: '닉네임은 10자 이하로 작성해주세요.',
              },
            }}
            errors={errors}
          />
          <PrimaryButton
            onClick={handleSubmit(onSubmit)}
            className="w-full md:w-full"
            disabled={!isValid}
          >
            저장
          </PrimaryButton>
        </Stack>
      </Stack>
    </form>
  );
}
