'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import LinkButton from '@components/@shared/UI/Button/LinkButton';
import Rotate from '@components/@shared/animations/Rotate';

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
};

const NotFoundPage = () => {
  return (
    <motion.main
      className="ml-[67px] mt-[60px] flex flex-col gap-12 bg-gray-50 px-6 pt-6 md:ml-[160px] md:mt-[70px] xl:ml-[300px]"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      <div className="flex h-screen flex-col items-center justify-center">
        <Image
          width={100}
          height={100}
          src="/icons/document_empty.svg"
          alt="없는 문서 이미지"
          className="h-16 w-16 md:h-24 md:w-24"
        />
        <h1 className="mt-3 text-gray-700 font-3xl-32px-bold md:mt-0 md:font-4xl-56px-bold">
          404
        </h1>
        <p className="text-gray-400 font-lg-16px-semibold md:font-2xl-24px-semibold">
          | 존재하지 않는 페이지입니다.
        </p>
        <LinkButton
          href="/"
          className="mt-6 flex items-center gap-1 bg-violet text-white font-xs-12px-medium md:mt-10 md:font-md-14px-regular"
        >
          <Rotate>
            <Image
              width={18}
              height={18}
              src="/icons/house.png"
              alt="홈 아이콘"
            />
          </Rotate>
          돌아가기
        </LinkButton>
      </div>
    </motion.main>
  );
};

export default NotFoundPage;
