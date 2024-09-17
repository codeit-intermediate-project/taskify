import { motion } from 'framer-motion';
import Image from 'next/image';

import LinkButton from '@components/@shared/UI/Button/LinkButton';
import SlideRight from '@components/@shared/animations/SlideRight';
import arrowRight from '@icons/arrow_right.png';
import crown from '@icons/crown.png';

interface DashboardCardProps {
  value: {
    id: number;
    title: string;
    color: string;
    createdByMe: boolean;
  };
}

const DashboardCard = ({ value }: DashboardCardProps) => {
  const { id: dashboardId } = value;

  return (
    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
      <LinkButton
        href={`/dashboard/${dashboardId}`}
        className="relative my-auto flex flex-1 gap-3 rounded-lg border border-gray-200 bg-white px-5 py-[22px] font-lg-14px-semibold hover:bg-violet-white md:font-lg-16px-semibold"
      >
        <div
          className="my-auto h-2 w-2 rounded-full"
          style={{ backgroundColor: value.color }}
          aria-label="link button"
        />
        {value.createdByMe ? (
          <div className="flex pr-5">
            <p className="flex-1 truncate text-black-600">{value.title}</p>
            <Image
              src={crown}
              alt="왕관 아이콘"
              width={18}
              height={14}
              className="my-auto ml-2 md:ml-3"
            />
          </div>
        ) : (
          <p className="flex-1 truncate pr-5 text-black-600">{value.title}</p>
        )}

        <SlideRight initial={{ y: 5 }} className="absolute right-4">
          <Image
            src={arrowRight}
            alt="오른쪽 화살표 아이콘"
            width={18}
            height={18}
          />
        </SlideRight>
      </LinkButton>
    </motion.div>
  );
};

export default DashboardCard;
