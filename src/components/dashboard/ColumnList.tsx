'use client';

import { useContext } from 'react';

import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import CreateColumnModal from '@components/Modals/CreateColumnModal';
import EditColumnModal from '@components/Modals/EditColumnModal';
import { DashBoardContext } from '@core/contexts/DashboardContext';
import useColumns from '@lib/hooks/useColumns';
import useScrollToColumn from '@lib/hooks/useScrollToColumn';

import AddColumnButton from './UI/AddColumnButton';
import Column from './UI/Column';
import DashboardSideMenu from './UI/DashboardSideMenu';

export default function ColumnList() {
  const {
    onSubmitCreateColumnForm,
    onSubmitEditColumnForm,
    handleSubmit,
    register,
    errors,
    clearErrors,
    setValue,
    setTargetColumnId,
    onClickDeleteAtEditModal,
  } = useColumns();

  const { divRef, columnRefs, focusIndex, onClickMoveFloatingButton } =
    useScrollToColumn();
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
      <div
        ref={divRef}
        className="no-scrollbar flex snap-x flex-col overflow-hidden md:mx-0 md:max-w-full xl:min-h-[100vh] xl:flex-row xl:overflow-scroll"
      >
        {Boolean(columnList?.length) &&
          columnList.map(
            (column, index) =>
              Boolean(column.id) && (
                <Column
                  columnRef={columnRefs}
                  index={index}
                  onClickEditOpen={onClickEditOpen}
                  key={column.id}
                  column={column}
                  dashboardColor={columnColor}
                />
              )
          )}
        <AddColumnButton open={onClickCreateOpen} clearErrors={clearErrors} />
        <DashboardSideMenu
          focusIndex={focusIndex}
          onClickMoveFloatingButton={onClickMoveFloatingButton}
          onClickCreateOpen={onClickCreateOpen}
        />
      </div>
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
