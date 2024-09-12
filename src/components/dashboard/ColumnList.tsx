'use client';

import { useContext } from 'react';

import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import CreateColumnModal from '@components/Modals/CreateColumnModal';
import EditColumnModal from '@components/Modals/EditColumnModal';
import { DashBoardContext } from '@core/contexts/DashBoardContext';
import useColumns from '@lib/hooks/useColumns';

import AddColumnButton from './UI/AddColumnButton';
import Column from './UI/Column';

export default function ColumnList() {
  const {
    onSubmitCreateColumnForm,
    onSubmitEditColumnForm,
    handleSubmit,
    register,
    errors,
    setValue,
    setTargetColumnId,
    onClickDeleteAtEditModal,
  } = useColumns();
  const { columnList, dashboardColor: columnColor } =
    useContext(DashBoardContext);
  const [createColumnModal, { open: openCreate, close: closeCreate }] =
    useDisclosure(false);
  const [editColumnModal, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);
  const [confirmDeleteModal, { open: openConfirm, close: closeConfirm }] =
    useDisclosure(false);

  const onClickEditOpen = (id: number, defaultValue: string) => {
    setTargetColumnId(id);
    setValue('editedTitle', defaultValue);
    openEdit();
  };
  const onClickCreateOpen = () => {
    setValue('title', '');
    openCreate();
  };

  return (
    <>
      <div className="no-scrollbar flex flex-col md:mx-0 md:max-w-full xl:min-h-[100vh] xl:max-w-[1062px] xl:flex-row xl:overflow-scroll">
        {Boolean(columnList?.length) &&
          columnList.map(
            column =>
              Boolean(column.id) && (
                <Column
                  onClickEditOpen={onClickEditOpen}
                  key={column.id}
                  column={column}
                  dashboardColor={columnColor}
                />
              )
          )}
      </div>
      <AddColumnButton open={onClickCreateOpen} />
      <Modal
        opened={createColumnModal}
        padding={24}
        title={<div className="font-2xl-24px-bold">새 컬럼 생성</div>}
        onClose={closeCreate}
        centered
      >
        <CreateColumnModal
          onClose={closeCreate}
          onSubmit={onSubmitCreateColumnForm}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
        />
      </Modal>

      <Modal
        opened={editColumnModal}
        padding={24}
        title={<div className="font-2xl-24px-bold">컬럼 관리</div>}
        onClose={closeEdit}
        centered
      >
        <EditColumnModal
          closeEdit={closeEdit}
          onSubmit={onSubmitEditColumnForm}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          onClickDelete={onClickDeleteAtEditModal}
          confirmDeleteModal={confirmDeleteModal}
          openConfirm={openConfirm}
          closeConfirm={closeConfirm}
        />
      </Modal>
    </>
  );
}
