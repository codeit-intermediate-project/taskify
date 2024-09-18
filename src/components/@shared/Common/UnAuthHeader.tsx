import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useTheme } from '@core/contexts/ThemeContext';
import logoImg from '@images/logo_img_white.png';
import logo from '@images/logo_white.png';

import Logo from './Logo';

export default function UnAuthHeader() {
  const { darkMode } = useTheme();
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-[60px] items-center justify-between border-b-[1px] border-gray-200 bg-white px-6 dark:border-black-700 dark:bg-black-700 md:h-[70px] md:px-10 xl:px-[70px]">
      {darkMode ? (
        <Link href="/" className="flex items-center gap-1">
          <span className="relative h-[27.13px] w-[23.63px] md:h-[33.07px] md:w-[28.8px]">
            <Image src={logoImg} alt="로고이미지" fill />
          </span>
          <span className="relative md:h-[22px] md:w-[80px]">
            <Image src={logo} alt="로고" fill />
          </span>
        </Link>
      ) : (
        <Logo />
      )}
      <div className="flex items-center gap-6 font-md-14px-regular md:font-lg-16px-regular">
        <Link href="/login">로그인</Link>
        <Link href="/signup">회원가입</Link>
      </div>
    </header>
  );
}
