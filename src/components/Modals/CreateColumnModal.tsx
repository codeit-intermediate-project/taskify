import {
  FieldErrors,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';

import { Button, Input } from '@mantine/core';

interface CreateColumnModalProps {
  onClose: () => void;
  onSubmit: (title: string) => Promise<boolean>;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
}

export default function CreateColumnModal({
  onClose,
  onSubmit,
  handleSubmit,
  register,
  errors,
}: CreateColumnModalProps) {
  const onSubmitAndClose = async (title: string) => {
    const result = await onSubmit(title);
    if (result) onClose();
  };
  return (
    <form
      className="relative flex flex-col"
      onSubmit={handleSubmit(data => {
        onSubmitAndClose(data.title);
      })}
    >
      <label htmlFor="title" className="pb-2">
        컬럼 제목
      </label>
      <Input
        {...register('title', {
          required: '컬럼 제목을 입력해 주세요.',
          maxLength: { value: 13, message: '13자 이하로 입력해주세요' },
        })}
        className="pb-6"
        placeholder="컬럼 제목을 입력하세요."
        id="title"
      />
      <p className="absolute top-[68px] text-red">
        {typeof errors.title?.message === 'string'
          ? errors.title.message
          : null}
      </p>
      <div className="flex h-[54px] justify-stretch gap-2 font-2lg-18px-medium">
        <Button
          type="button"
          className="h-full grow border-gray-200 bg-white text-gray-400"
          onClick={onClose}
        >
          취소
        </Button>
        <Button type="submit" className="h-full grow bg-violet">
          생성
        </Button>
      </div>
    </form>
  );
}
