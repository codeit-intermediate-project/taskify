import { useState, useMemo, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useRoot } from '@core/contexts/RootContexts';

import Modal from './AuthModal';
import InputField from './InputField';

import type { LoginRequestDto, LoginResponseDto } from '@core/dtos/AuthDto';

interface AuthPageProps {
  mode: 'login' | 'signup';
}

interface FormValues {
  nickname?: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  terms?: boolean;
}

interface ErrorResponse {
  message: string;
}

type LoginResponse = LoginResponseDto | ErrorResponse | undefined;

export default function AuthPage({ mode }: AuthPageProps) {
  const { login, refreshUser } = useRoot();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({ mode: 'onBlur' });

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // 모달 상태
  const [modalMessage, setModalMessage] = useState(''); // 모달 메시지

  const emailValue = watch('email');
  const passwordValue = watch('password');
  const passwordConfirmValue = watch('passwordConfirm');

  // 모달이 닫힐 때 리다이렉트를 처리하는 useEffect
  useEffect(() => {
    if (!isModalVisible && modalMessage === '로그인 성공!') {
      router.push('/mydashboard');
    }
  }, [isModalVisible, modalMessage, router]);

  const onSubmit: SubmitHandler<FormValues> = async data => {
    try {
      if (mode === 'signup') {
        const response = await fetch(
          'https://sp-taskify-api.vercel.app/8-3/users',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: data.email.trim(),
              nickname: data.nickname?.trim(),
              password: data.password.trim(),
            }),
          }
        );

        const result = await response.json();

        if (response.status === 201) {
          setModalMessage('가입이 완료되었습니다!');
        } else {
          throw new Error(result.message || '회원가입에 실패했습니다.');
        }
      } else {
        // 로그인 처리
        const loginResponse: LoginResponse = await login({
          email: data.email.trim(),
          password: data.password.trim(),
        } as LoginRequestDto);

        // 타입 좁히기를 사용하여 loginResponse가 AxiosResponse인지 확인
        if (loginResponse && 'status' in loginResponse) {
          if (loginResponse.status === 201) {
            setModalMessage('로그인 성공!');
            refreshUser(loginResponse.user);
          }
        } else {
          // 서버에서 받은 메시지 사용
          throw new Error('로그인에 실패했습니다.');
        }
      }
    } catch (error: unknown) {
      // axios 에러 처리
      if (axios.isAxiosError(error)) {
        // 에러 응답에서 메시지를 가져오거나 기본 메시지를 설정
        const errorMessage =
          (error.response?.data as { message?: string })?.message ||
          '로그인에 실패했습니다.';
        setModalMessage(errorMessage);
      } else if (error instanceof Error) {
        setModalMessage(error.message || '알 수 없는 오류가 발생했습니다.');
      } else {
        setModalMessage('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsModalVisible(true); // 성공이든 실패든 모달을 띄움
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    if (modalMessage === '가입이 완료되었습니다!') {
      router.push('/login');
    }
  };

  const isFormValid = useMemo(() => {
    if (mode === 'signup') {
      return (
        termsAccepted &&
        !Object.keys(errors).length &&
        passwordValue === passwordConfirmValue
      );
    }
    return (
      Boolean(emailValue) &&
      Boolean(passwordValue) &&
      !Object.keys(errors).length
    );
  }, [
    emailValue,
    passwordValue,
    passwordConfirmValue,
    errors,
    termsAccepted,
    mode,
  ]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-[351px] rounded-lg md:w-[520px] xl:w-[520px] xl:p-6">
        {/* 상단 로고와 텍스트 */}
        <div className="mb-6 flex flex-col items-center">
          <Image
            src="/images/main_logo.png"
            alt="Taskify logo"
            width={200}
            height={200}
            className="cursor-pointer"
            onClick={() => router.push('/')} // 클라이언트 측에서만 작동
          />
          <p className="mt-[8px] text-black-600 font-2lg-18px-medium md:mt-[10px] md:font-xl-20px-medium">
            {mode === 'login'
              ? '오늘도 만나서 반가워요!'
              : '첫 방문을 환영합니다!'}
          </p>
        </div>
        {/* 입력 필드 */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-[16px]">
          <InputField
            labelName="이메일"
            id="email"
            type="email"
            placeholder="이메일을 입력해 주세요"
            register={register}
            errors={errors}
            validation={{
              required: '이메일은 필수 항목입니다.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: '이메일 형식으로 작성해 주세요.',
              },
            }}
          />

          {mode === 'signup' && (
            <InputField
              labelName="닉네임"
              id="nickname"
              placeholder="닉네임을 입력해 주세요"
              register={register}
              errors={errors}
              validation={{
                required: '닉네임은 필수 항목입니다.',
                maxLength: {
                  value: 10,
                  message: '열 자 이하로 작성해 주세요.',
                },
              }}
            />
          )}
          <InputField
            labelName="비밀번호"
            id="password"
            type="password"
            placeholder={
              mode === 'login'
                ? '8자 이상 입력해 주세요'
                : '비밀번호를 입력해 주세요'
            }
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            register={register}
            errors={errors}
            validation={{
              required: '비밀번호는 필수 항목입니다.',
              minLength: { value: 8, message: '8자 이상 입력해 주세요.' },
            }}
          />
          {mode === 'signup' && (
            <>
              <InputField
                labelName="비밀번호 확인"
                id="passwordConfirm"
                type="password"
                placeholder="비밀번호를 한번 더 입력해 주세요"
                showPassword={showConfirmPassword}
                setShowPassword={setShowConfirmPassword}
                register={register}
                errors={errors}
                validation={{
                  validate: (value: string) =>
                    value === passwordValue || '비밀번호가 일치하지 않습니다.',
                }}
              />

              <div className="flex items-center space-x-2">
                <input
                  id="terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={() => setTermsAccepted(prev => !prev)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium text-gray-700"
                >
                  이용약관에 동의합니다.
                </label>
              </div>
            </>
          )}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`h-[50px] w-full rounded-[8px] px-4 py-2 font-semibold text-white ${
              isFormValid
                ? 'bg-indigo-600 hover:bg-indigo-700'
                : 'cursor-not-allowed bg-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            {mode === 'login' ? '로그인' : '가입하기'}
          </button>
        </form>

        {/* 하단 회원가입/로그인 링크 */}
        <div className="mt-4 flex items-center justify-center text-sm text-gray-600">
          <p className="mr-2 text-gray-700">
            {mode === 'login' ? '회원이 아니신가요?' : '이미 회원이신가요?'}
          </p>
          <button
            type="button"
            onClick={() => router.push(mode === 'login' ? '/signup' : '/login')}
            className="font-semibold text-violet underline hover:text-indigo-800"
          >
            {mode === 'login' ? '회원가입하기' : '로그인하기'}
          </button>
        </div>
      </div>

      {isModalVisible && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
}
