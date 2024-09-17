import Image from 'next/image';
import Link from 'next/link';

export default function LandingTop() {
  return (
    <div className="mb-[76px] mt-[102px] flex w-full flex-col items-center justify-center md:mb-[180px] md:mt-[164px]">
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/images/landing_top.png"
          className="md:h-[314px] md:w-[537px] xl:h-[422px] xl:w-[722px]"
          alt="description"
          width={287}
          height={168}
          priority
          quality={100}
        />
        <div className="mt-[26px] flex flex-col flex-wrap items-center justify-center gap-[24px] md:mt-[48px] md:flex-row">
          <h1 className="font-4xl-40px-bold md:font-4xl-56px-bold xl:font-4xl-76px-bold">
            새로운 일정 관리
          </h1>
          <h1 className="mt-[6px] text-violet font-4xl-42px-bold md:font-4xl-70px-bold xl:font-4xl-90px-bold">
            Taskify
          </h1>
        </div>
      </div>
      <Link
        href="/login"
        className="mt-[101px] flex h-[46px] w-[235px] items-center justify-center rounded-lg bg-violet text-white font-md-14px-medium md:mt-[109px] md:h-[52px] md:w-[280px]"
      >
        로그인하기
      </Link>
    </div>
  );
}
