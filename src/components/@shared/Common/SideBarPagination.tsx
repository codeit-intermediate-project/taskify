'use client';

import React from 'react';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (pageNumber: number) => void;
}

export default function SideBarPagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = totalItems > 0 ? Math.ceil(totalItems / itemsPerPage) : 1;

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
  const theme = localStorage.getItem('theme');
  return (
    <nav className="flex items-center justify-center pt-3">
      <div>
        <motion.button
          whileTap={{ scale: 0.8 }}
          type="button"
          onClick={handlePrePage}
          aria-label="이전 페이지로 이동"
          className={`${currentPage === 1 ? 'opacity-50' : ''}`}
          disabled={currentPage === 1}
        >
          <div
            className="flex h-7 w-7 items-center justify-center border border-gray-200 dark:border-black-700 md:h-10 md:w-10"
            style={{
              borderTopLeftRadius: '4px',
              borderTopRightRadius: '0px',
              borderBottomRightRadius: '0px',
              borderBottomLeftRadius: '4px',
            }}
          >
            {theme === 'dark' ? (
              <Image
                src="/icons/arrow_left_dark.svg"
                alt="이전 페이지"
                width={16}
                height={16}
              />
            ) : (
              <Image
                src="/icons/arrow_left.png"
                alt="이전 페이지"
                width={16}
                height={16}
              />
            )}
          </div>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.8 }}
          type="button"
          onClick={handleNextPage}
          aria-label="다음 페이지로 이동"
          className={`${currentPage === totalPages ? 'opacity-50' : ''}`}
          disabled={currentPage === totalPages}
        >
          <div
            className="flex h-7 w-7 items-center justify-center border border-gray-200 dark:border-black-700 md:h-10 md:w-10"
            style={{
              borderTopLeftRadius: '0px',
              borderTopRightRadius: '4px',
              borderBottomRightRadius: '4px',
              borderBottomLeftRadius: '0px',
            }}
          >
            {theme === 'dark' ? (
              <Image
                src="/icons/arrow_right_dark.svg"
                alt="다음 페이지"
                width={16}
                height={16}
              />
            ) : (
              <Image
                src="/icons/arrow_right.png"
                alt="다음 페이지"
                width={16}
                height={16}
              />
            )}
          </div>
        </motion.button>
      </div>
    </nav>
  );
}
