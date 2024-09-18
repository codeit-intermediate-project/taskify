import { motion } from 'framer-motion';
import Image from 'next/image';

interface DescriptionCard {
  title: string;
  des: string;
  image: string;
  alt: string;
}

const cardData01: DescriptionCard = {
  title: '대시보드 설정',
  des: '대시보드 사진과 이름을 변경할 수 있어요.',
  image: '/images/landing3.png',
  alt: '',
};
const cardData02: DescriptionCard = {
  title: '초대',
  des: '새로운 팀원을 초대할 수 있어요.',
  image: '/images/landing4.png',
  alt: '',
};

const cardData03: DescriptionCard = {
  title: '구성원',
  des: '구성원을 초대하고 내보낼 수 있어요.',
  image: '/images/landing5.png',
  alt: '',
};

type CardType = {
  card: string;
};

const cardMap: { [key: string]: DescriptionCard } = {
  '01': cardData01,
  '02': cardData02,
  '03': cardData03,
};

export default function DescriptonCard({ card }: CardType) {
  const { title, des, image, alt } = cardMap[card] || cardData03;

  return (
    <motion.div className="mb-[45px] flex h-[349px] w-[343px] flex-col items-center justify-between rounded-lg bg-black-500 md:h-[384px] md:w-[378px]">
      <motion.div className="m-[auto]">
        <motion.div>
          <Image src={image} alt={alt} width={296} height={248} priority />
        </motion.div>
      </motion.div>
      <motion.div className="flex h-[113px] w-full flex-col items-start rounded-b-lg rounded-t-none bg-black-700 p-[27px_32px_28px] md:h-[124px]">
        <motion.h3 className="text-white font-2lg-18px-bold">{title}</motion.h3>
        <motion.p className="mt-[16px] text-white font-lg-16px-medium">
          {des}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
