import { PropsWithChildren } from 'react';

import { Button } from '@mantine/core';

interface ConfirmDeleteModalProps {
  onClickDelete: () => void;
  closeConfirm: () => void;
}

export default function ConfirmDeleteModal({
  onClickDelete,
  closeConfirm,
  children,
}: PropsWithChildren<ConfirmDeleteModalProps>) {
  return (
    <>
      <div className="flex justify-center pb-10 font-xl-20px-semibold">
        {children}
      </div>
      <div className="flex h-[54px]">
        <Button
          onClick={closeConfirm}
          type="button"
          className="h-full grow border-gray-200 bg-white text-gray-400"
        >
          취소
        </Button>
        <Button
          onClick={() => {
            onClickDelete();
          }}
          type="submit"
          className="h-full grow bg-violet"
        >
          삭제
        </Button>
      </div>
    </>
  );
}
