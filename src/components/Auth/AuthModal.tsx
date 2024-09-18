import React from 'react';

interface ModalProps {
  message: string;
  onClose: () => void;
}

export default function Modal({ message, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000] bg-opacity-70">
      <div className="flex h-[220px] w-[327px] flex-col items-center gap-[50px] rounded-2xl bg-white p-7 dark:bg-black-600 md:h-[192px] md:w-[368px] md:justify-center md:gap-[32px]">
        <p className="mt-9 text-black-600 font-lg-16px-medium dark:text-gray-200 md:mt-0 md:font-xl-20px-medium">
          {message}
        </p>
        <button
          onClick={onClose}
          className="flex h-[42px] w-[138px] items-center justify-center rounded-lg bg-violet text-white font-md-14px-regular md:h-[48px] md:w-[240px]"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
