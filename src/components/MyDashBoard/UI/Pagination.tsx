import { useState } from 'react';

import { motion } from 'framer-motion';
import Image from 'next/image';

import { useTheme } from '@core/contexts/ThemeContext';
import arrowLeft from '@icons/arrow_left.png';
import arrowLeftDark from '@icons/arrow_left_dark.svg';
import arrowRight from '@icons/arrow_right.png';
import arrowRightDark from '@icons/arrow_right_dark.svg';
import useResize from '@lib/hooks/useResize';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (pageNumber: number) => void;
}

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps): JSX.Element {
  const totalPages = totalItems > 0 ? Math.ceil(totalItems / itemsPerPage) : 1;
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useResize(() => {
    setIsMobile(window.innerWidth < 768);
  });

  // 이전 페이지 이동
  const handlePrePage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // 다음 페이지 이동
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  const { darkMode } = useTheme();
  return (
    <div className="flex items-center justify-end gap-2 md:flex-col md:items-center">
      {isMobile && (
        <p className="text-black-500 font-md-14px-regular">
          {totalPages} 페이지 중 {currentPage}
        </p>
      )}
      <div className="flex gap-1">
        <motion.button
          whileTap={{ scale: 0.8 }}
          type="button"
          onClick={handlePrePage}
          className={`h-10 w-10 rounded-[4px] border-gray-200 bg-white outline-1 dark:bg-black-500 ${currentPage === 1 ? 'opacity-50' : ''}`}
          disabled={currentPage === 1}
          aria-label="이전 페이지로 이동"
        >
          <Image
            src={darkMode ? arrowLeftDark : arrowLeft}
            alt="이전 페이지 버튼"
            width={16}
            height={16}
            className="m-auto"
          />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.8 }}
          type="button"
          onClick={handleNextPage}
          className={`h-10 w-10 rounded-[4px] border-gray-200 bg-white outline-1 dark:bg-black-500 ${currentPage === totalPages ? 'opacity-50' : ''}`}
          disabled={currentPage === totalPages}
          aria-label="다음 페이지로 이동"
        >
          <Image
            src={darkMode ? arrowRightDark : arrowRight}
            alt="다음 페이지 버튼"
            width={16}
            height={16}
            className="m-auto"
          />
        </motion.button>
      </div>
      {!isMobile && (
        <p className="text-black-500 font-md-14px-regular">
          {totalPages} 페이지 중 {currentPage}
        </p>
      )}
    </div>
  );
}
