'use server';

import { cookies } from 'next/headers';
import { z } from 'zod';

import fetchExtended from '@core/api/fetchExtended';

import getMe from './getMe';

function checkFileType(file: File | string | null) {
  if (typeof file === 'string' || file === null) return true;
  if (file?.name) {
    const fileType = file.name.split('.').pop();
    if (fileType === 'png' || fileType === 'jpeg') return true;
  }
  return false;
}

const schema = z.object({
  profileImageUrl: z
    .any()
    .refine(
      (file: File | string | null) => checkFileType(file),
      'png와 jpeg 파일만 업로드 가능합니다.'
    ),
  email: z
    .string()
    .email('이메일 형식이 올바르지 않습니다.')
    .min(1, '이메일을 입력해주세요'),
  nickname: z.string().min(1, '닉네임을 입력해주세요'),
  password: z.string().min(8, '비밀번호는 8자 이상이여야 합니다.'),
});

type Inputs = Partial<z.infer<typeof schema>>;

export type ActionState =
  | {
      code: 'SUCCESS'; // 성공
      message: string;
    }
  | {
      code: 'VALIDATION_ERROR'; // Zod 유효성 검사 에러
      fieldErrors: {
        [K in keyof Inputs]: string[] | undefined;
      };
    }
  | {
      code: 'EXISTS_ERROR'; // 커스텀 에러
      key: string;
      message: string;
    }
  | {
      code: 'INTERNAL_ERROR'; // 알 수 없는 오류
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      err: any;
    }
  | {
      code: 'SAME_TO_PREVIOUS_ERROR';
      message: string;
    };

export default async function submitForm(
  currentState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const user = await getMe();
  const profileImageUrl = formData.get('profileImageUrl');
  const email = formData.get('email');
  const nickname = formData.get('nickname');

  if (user.profileImageUrl === profileImageUrl && user.nickname === nickname) {
    return {
      code: 'SAME_TO_PREVIOUS_ERROR',
      message: '프로필 수정 내용이 이전과 같습니다',
    };
  }
  const validateData = schema.safeParse({
    profileImageUrl,
    email,
  });
  if (!validateData.success) {
    const { fieldErrors } = validateData.error.flatten();
    return {
      code: 'VALIDATION_ERROR',
      fieldErrors,
    };
  }

  try {
    const cookiesStore = cookies();
    const accessToken = cookiesStore.get('accessToken');
    await fetchExtended('/dashboards', {
      method: 'POST',
      body: JSON.stringify({
        profileImageUrl,
        email,
      }),
      headers: {
        Authorization: `Bearer ${accessToken?.value}`,
      },
    });
  } catch (err) {
    return { code: 'INTERNAL_ERROR', err };
  }

  return {
    code: 'SUCCESS',
    message: 'Success',
  };
}
