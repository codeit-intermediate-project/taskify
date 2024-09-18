import { useCallback } from 'react';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import SlideRight from '@components/@shared/animations/SlideRight';
import { useRoot } from '@core/contexts/RootContexts';
import { useTheme } from '@core/contexts/ThemeContext';
import arrowRight from '@icons/arrow_right.png';
import arrowRightDark from '@icons/arrow_right_dark.svg';
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
  const router = useRouter();
  const { setDashboardid } = useRoot();

  const redirectDashboard = useCallback(() => {
    setDashboardid(String(dashboardId));
    router.push(`/dashboard/${dashboardId}`);
  }, [router, dashboardId, setDashboardid]);

  const { darkMode } = useTheme();
  return (
    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
      <button
        onClick={redirectDashboard}
        className="relative my-auto flex w-full flex-1 gap-3 rounded-lg border border-gray-200 bg-white px-5 py-[22px] font-lg-14px-semibold hover:bg-violet-white dark:border-black-500 dark:bg-black-600 md:font-lg-16px-semibold"
      >
        <div
          className="my-auto h-2 w-2 rounded-full"
          style={{ backgroundColor: value.color }}
          aria-label="link button"
        />
        {value.createdByMe ? (
          <div className="flex pr-5">
            <p className="flex-1 truncate text-black-600 dark:text-gray-200">
              {value.title}
            </p>
            <Image
              src={crown}
              alt="왕관 아이콘"
              width={18}
              height={14}
              className="my-auto ml-2 md:ml-3"
            />
          </div>
        ) : (
          <p className="flex-1 truncate pr-5 text-black-600 dark:text-gray-200">
            {value.title}
          </p>
        )}

        <SlideRight initial={{ y: 5 }} className="absolute right-4">
          {darkMode ? (
            <Image
              src={arrowRightDark}
              alt="오른쪽 화살표 아이콘"
              width={18}
              height={18}
            />
          ) : (
            <Image
              src={arrowRight}
              alt="오른쪽 화살표 아이콘"
              width={18}
              height={18}
            />
          )}
        </SlideRight>
      </button>
    </motion.div>
  );
};

export default DashboardCard;
