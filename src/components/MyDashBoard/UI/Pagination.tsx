import Image from 'next/image';

import arrowLeft from '@icons/arrow_left.png';
import arrowRight from '@icons/arrow_right.png';

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
    <div className="flex items-center justify-end gap-4">
      <p className="text-black-600 font-md-14px-regular">
        {totalPages} 페이지 중 {currentPage}
      </p>
      <div className="flex gap-1">
        <button
          type="button"
          onClick={handlePrePage}
          className={`h-10 w-10 rounded-[4px] border-gray-200 bg-white outline-1 ${currentPage === 1 ? 'opacity-50' : ''}`}
          disabled={currentPage === 1}
          aria-label="이전 페이지로 이동"
        >
          <Image
            src={arrowLeft}
            alt="이전 페이지 버튼"
            width={16}
            height={16}
            className="m-auto"
          />
        </button>
        <button
          type="button"
          onClick={handleNextPage}
          className={`h-10 w-10 rounded-[4px] border-gray-200 bg-white outline-1 ${currentPage === totalPages ? 'opacity-50' : ''}`}
          disabled={currentPage === totalPages}
          aria-label="다음 페이지로 이동"
        >
          <Image
            src={arrowRight}
            alt="다음 페이지 버튼"
            width={16}
            height={16}
            className="m-auto"
          />
        </button>
      </div>
    </div>
  );
}
