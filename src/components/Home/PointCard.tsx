import { motion } from 'framer-motion';
import Image from 'next/image';

interface PointCardProps {
  point: string;
  title1: string;
  title2: string;
  image: string;
  alt: string;
}

interface MyComponentProps {
  type: string;
}
export default function PointCard({ type }: MyComponentProps) {
  const type1: PointCardProps = {
    point: '1',
    title1: '일의 우선순위를',
    title2: '관리하세요',
    image: '/images/landing1.png',
    alt: 'landing1',
  };

  const type2: PointCardProps = {
    point: '2',
    title1: '해야 할 일을',
    title2: '등록하세요',
    image: '/images/landing2.png',
    alt: 'landing2',
  };

  const { point, title1, title2, image, alt } = type === '01' ? type1 : type2;

  return (
    <motion.div
      className={`mb-[59px] flex h-[686px] w-full flex-col items-center justify-between rounded-lg bg-[rgba(23,23,23,1)] dark:bg-[#000] md:h-[972px] md:items-start xl:h-[600px] xl:w-[1200px] xl:items-start ${type === '01' ? 'xl:flex-row' : 'xl:flex-row-reverse xl:justify-end'}`}
    >
      <motion.div className="md:pl-[60px]">
        <motion.div className="flex flex-col items-center md:items-start">
          <motion.h2 className="mt-[60px] text-gray-300 font-2lg-18px-medium md:mt-[63px] md:font-2xl-26px-bold xl:mt-[123px]">
            {`Point ${point} `}
          </motion.h2>
          <motion.div className="mt-[61px] flex flex-col items-center text-white font-4xl-36px-bold md:mt-[100px] md:items-start md:font-4xl-48px-bold">
            <motion.p>{title1}</motion.p>
            <motion.p>{title2}</motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div
        className={`mt-[194px] flex h-[250px] w-full items-end xl:m-0 xl:h-full xl:w-[594px] ${type === '01' ? 'justify-end' : 'justify-center'}`}
      >
        <Image
          className={
            type === '01'
              ? `h-[248px] w-[296.11px] md:h-[435px] md:w-[519.39px] xl:h-[497.49px] xl:w-[594px]`
              : `h-[250px] w-[217.13px] md:h-[415px] md:w-[360.44px] xl:h-[502px] xl:w-[436px]`
          }
          src={image}
          alt={alt}
          width={260}
          height={248}
          priority
        />
      </motion.div>
    </motion.div>
  );
}
