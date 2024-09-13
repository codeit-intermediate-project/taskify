import React from 'react';

interface ModalProps {
  message: string;
  onClose: () => void;
}

export default function Modal({ message, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000] bg-opacity-70">
      <div className="flex h-[220px] w-[327px] flex-col items-center gap-[50px] rounded-lg bg-white p-7">
        <p className="mt-9 text-black-600 font-lg-16px-medium">{message}</p>
        <button
          onClick={onClose}
          className="flex h-[42px] w-[138px] items-center justify-center rounded-lg bg-violet text-white font-md-14px-regular"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
