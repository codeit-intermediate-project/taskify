'use client';

import React from 'react';

import Image from 'next/image';

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
          disabled={currentPage === 1}
          className={currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-l border border-gray-200 md:h-10 md:w-10">
            <Image
              src="/icons/arrow_left.png"
              alt="이전 페이지"
              width={16}
              height={16}
              style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
            />
          </div>
        </button>
        <button
          type="button"
          onClick={handleNextPage}
          aria-label="다음 페이지로 이동"
          disabled={currentPage === totalPages}
          className={
            currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
          }
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-r border border-gray-200 md:h-10 md:w-10">
            <Image
              src="/icons/arrow_right.png"
              alt="다음 페이지"
              width={16}
              height={16}
              style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
            />
          </div>
        </button>
      </div>
    </nav>
  );
}
