import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingTop() {
  return (
    <div className="mb-[76px] mt-[102px] flex w-full flex-col items-center justify-center md:mb-[180px] md:mt-[164px]">
      {/* 이미지에 애니메이션 적용 */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
      >
        <Image
          src="/images/landing_top.png"
          className="md:h-[314px] md:w-[537px] xl:h-[422px] xl:w-[722px]"
          alt="description"
          width={287}
          height={168}
          priority
          quality={100}
        />
      </motion.div>

      {/* 텍스트에 애니메이션 적용 */}
      <motion.div
        className="mt-[26px] flex flex-col flex-wrap items-center justify-center gap-[24px] md:mt-[48px] md:flex-row"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
      >
        <h1 className="font-4xl-40px-bold md:font-4xl-56px-bold xl:font-4xl-76px-bold">
          새로운 일정 관리
        </h1>
        <h1 className="mt-[6px] text-violet font-4xl-42px-bold md:font-4xl-70px-bold xl:font-4xl-90px-bold">
          Taskify
        </h1>
      </motion.div>

      {/* 버튼에 애니메이션 적용 */}
      <motion.div
        className="mt-[101px] flex h-[46px] w-[235px] items-center justify-center rounded-lg bg-violet text-white font-md-14px-medium md:mt-[109px] md:h-[52px] md:w-[280px]"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
      >
        <Link href="/login">로그인하기</Link>
      </motion.div>
    </div>
  );
}
