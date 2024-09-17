'use client';

import React from 'react';

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

  return (
    <nav className="flex items-center gap-2">
      <div>
        <button
          type="button"
          onClick={handlePrePage}
          aria-label="이전 페이지로 이동"
        >
          <div
            className="flex h-8 w-8 items-center justify-center border border-gray-200 md:h-10 md:w-10"
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
        <button
          type="button"
          onClick={handleNextPage}
          aria-label="다음 페이지로 이동"
        >
          <div
            className="flex h-8 w-8 items-center justify-center border border-gray-200 md:h-10 md:w-10"
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
