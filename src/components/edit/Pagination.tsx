'use client';

import Image from 'next/image';
import React from 'react';

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
  const totalPages = Math.ceil(totalItems / itemsPerPage);

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
        <button type="button" onClick={handlePrePage}>
          <div
            className="flex h-10 w-10 items-center justify-center border border-gray-200"
            style={{
              borderTopLeftRadius: '4px',
              borderTopRightRadius: '0px',
              borderBottomRightRadius: '0px',
              borderBottomLeftRadius: '4px',
            }}
          >
            <Image
              src="/icons/arrow_left.png"
              alt="이전 페이지"
              width={16}
              height={16}
            />
          </div>
        </button>
        <button type="button" onClick={handleNextPage}>
          <div
            className="flex h-10 w-10 items-center justify-center border border-gray-200"
            style={{
              borderTopLeftRadius: '0px',
              borderTopRightRadius: '4px',
              borderBottomRightRadius: '4px',
              borderBottomLeftRadius: '0px',
            }}
          >
            <Image
              src="/icons/arrow_right.png"
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
