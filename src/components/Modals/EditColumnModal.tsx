import {
  FieldErrors,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';

import { Button, Input, Modal } from '@mantine/core';

import ConfirmDeleteModal from './ConfirmDeleteModal';

interface EditColumnModalProps {
  closeEdit: () => void;
  onSubmit: (title: string) => void;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onClickDelete: () => void;
  confirmDeleteModal: boolean;
  openConfirm: () => void;
  closeConfirm: () => void;
}
export default function EditColumnModal({
  closeEdit,
  onSubmit,
  register,
  errors,
  handleSubmit,
  onClickDelete,
  confirmDeleteModal,
  openConfirm,
  closeConfirm,
}: EditColumnModalProps) {
  const onClickDeleteButton = () => {
    onClickDelete();
    closeConfirm();
    closeEdit();
  };
  return (
    <>
      <form
        className="relative flex flex-col"
        onSubmit={handleSubmit(data => {
          onSubmit(data.editedTitle);
          closeEdit();
        })}
      >
        <label htmlFor="editedTitle" className="pb-2">
          컬럼 제목
        </label>
        <Input
          {...register('editedTitle', {
            required: '컬럼 제목을 입력해 주세요.',
            maxLength: { value: 13, message: '13자 이하로 입력해주세요' },
          })}
          className="pb-6"
          placeholder="컬럼 제목을 입력하세요."
          id="editTitle"
        />
        <p className="absolute top-[68px] text-red">
          {typeof errors.editedTitle?.message === 'string'
            ? errors.editedTitle.message
            : null}
        </p>
        <div className="flex h-[54px] justify-stretch gap-2 font-2lg-18px-medium">
          <Button
            type="button"
            className="h-full grow border-gray-200 bg-white text-gray-400"
            onClick={openConfirm}
          >
            삭제
          </Button>
          <Button type="submit" className="h-full grow bg-violet">
            변경
          </Button>
        </div>
      </form>
      <Modal
        opened={confirmDeleteModal}
        onClose={closeConfirm}
        withCloseButton={false}
        centered
      >
        <ConfirmDeleteModal
          onClickDelete={onClickDeleteButton}
          closeConfirm={closeConfirm}
        >
          컬럼의 모든 카드가 삭제됩니다.
        </ConfirmDeleteModal>
      </Modal>
    </>
  );
}
