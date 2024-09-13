import React from 'react';

interface ModalProps {
  message: string;
  onClose: () => void;
}

export default function Modal({ message, onClose }: ModalProps) {
  return (
    <div className="bg-black fixed inset-0 flex items-center justify-center bg-opacity-50">
      <div className="rounded-lg bg-white p-6">
        <p>{message}</p>
        <button
          onClick={onClose}
          className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-white"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
