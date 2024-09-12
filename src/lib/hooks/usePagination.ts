'use client';

import { useEffect, useState } from 'react';

interface UsePaginationProps<T> {
  // 한 페이지에 표시할 아이템 수
  itemsPerPage: number;
  // 데이터 가져오는 함수
  fetchData: (page: number, size: number) => Promise<T[]>;
  totalItems: number;
}

export default function usePagination<T>({
  fetchData,
  itemsPerPage,
  totalItems,
}: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [data, setData] = useState<T[]>([]); // 제네릭 타입 T 사용

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 페이지 변경 함수
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // 데이터 로딩
  useEffect(() => {
    fetchData(currentPage, itemsPerPage).then(result => {
      setData(result);
    });
  }, [currentPage, itemsPerPage, fetchData]);

  return {
    currentPage,
    totalPages,
    data,
    handlePageChange,
  };
}
