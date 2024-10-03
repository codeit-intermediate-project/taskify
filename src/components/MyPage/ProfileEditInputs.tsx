'use client';

import React from 'react';
import { useFormState } from 'react-dom';

import { UserServiceResponseDto } from '@core/dtos/AuthDto';
import submitForm, { ActionState } from '@lib/utils/submitForm';

import Button from './Button';

const initialState: ActionState = {
  code: 'INTERNAL_ERROR',
  err: '',
};

interface Props {
  user: UserServiceResponseDto;
}

export default function ProfileEditInputs({ user }: Props) {
  const { profileImageUrl, email, nickname } = user;
  const [state, formAction] = useFormState(submitForm, initialState);
  const { code } = state;
  const fieldErrors =
    code === 'VALIDATION_ERROR' ? state.fieldErrors : undefined;

  return (
    <form action={formAction} method="POST" className="flex flex-col gap-2">
      <label htmlFor="profileImageUrl">프로필 이미지</label>
      <input
        id="profileImageUrl"
        name="profileImageUrl"
        type="text"
        defaultValue={profileImageUrl ?? ''}
      />
      {fieldErrors && fieldErrors.profileImageUrl && (
        <p>{fieldErrors.profileImageUrl[0]}</p>
      )}
      <label htmlFor="email">이메일</label>
      <input
        id="email"
        name="email"
        type="email"
        defaultValue={email}
        disabled
      />
      {fieldErrors && fieldErrors.email && <p>{fieldErrors.email[0]}</p>}
      <label htmlFor="nickname">닉네임</label>
      <input
        id="nickname"
        name="nickname"
        type="text"
        defaultValue={nickname}
      />
      {fieldErrors && fieldErrors.nickname && <p>{fieldErrors.nickname[0]}</p>}
      <label htmlFor="password">비밀번호</label>
      <input id="password" name="password" type="password" />
      {fieldErrors && fieldErrors.password && <p>{fieldErrors.password[0]}</p>}
      <Button />
    </form>
  );
}
