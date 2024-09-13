'use client';

import Image from 'next/image';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteModal({
  isOpen,
  onClose,
  onDelete,
}: DeleteModalProps) {
  if (!isOpen) return null;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  const handleDelete = () => {
    onDelete();

    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 모달 배경 추가 */}
      <div
        className="fixed inset-0 bg-black-700 bg-opacity-80"
        onClick={onClose}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label="닫기"
      />
      <div className="relative z-10 w-[327px] max-w-md rounded-lg bg-white p-6 md:w-[568px]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">삭제 확인</h2>
          <button onClick={onClose} className="text-xl font-bold text-gray-500">
            <Image src="/icons/X.png" alt="닫기" width={36} height={36} />
          </button>
        </div>
        <div className="flex flex-col items-center gap-4">
          <p className="text-center text-lg">정말로 삭제하시겠습니까?</p>
        </div>
        <div className="mt-4 flex justify-center gap-2">
          <button
            onClick={onClose}
            className="w-full rounded border border-gray-200 px-4 py-2 text-gray-400"
          >
            취소
          </button>
          <button
            onClick={handleDelete}
            className="w-full rounded bg-violet px-4 py-2 text-white"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
