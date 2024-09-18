'use client';

import React from 'react';

import Image from 'next/image';

import { useTheme } from '@core/contexts/ThemeContext';

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
    <nav className="flex items-center gap-2">
      <div className="font-md-14px-regular">
        {totalPages} 페이지 중 {currentPage}
      </div>
      <div>
        <button
          type="button"
          onClick={handlePrePage}
          aria-label="이전 페이지로 이동"
        >
          <div
            className="flex h-8 w-8 items-center justify-center border border-gray-200 dark:border-black-500 md:h-10 md:w-10"
            style={{
              borderTopLeftRadius: '4px',
              borderTopRightRadius: '0px',
              borderBottomRightRadius: '0px',
              borderBottomLeftRadius: '4px',
            }}
          >
            <Image
              src={
                darkMode
                  ? '/icons/arrow_left_dark.svg'
                  : '/icons/arrow_left.png'
              }
              alt="이전 페이지"
              width={16}
              height={16}
            />
          </div>
        </button>
        <button
          type="button"
          onClick={handleNextPage}
          aria-label="다음 페이지로 이동"
        >
          <div
            className="flex h-8 w-8 items-center justify-center border border-gray-200 dark:border-black-500 md:h-10 md:w-10"
            style={{
              borderTopLeftRadius: '0px',
              borderTopRightRadius: '4px',
              borderBottomRightRadius: '4px',
              borderBottomLeftRadius: '0px',
            }}
          >
            <Image
              src={
                darkMode
                  ? '/icons/arrow_right_dark.svg'
                  : '/icons/arrow_right.png'
              }
              alt="다음 페이지"
              width={16}
              height={16}
            />
          </div>
        </button>
      </div>
    </nav>
  );
}
