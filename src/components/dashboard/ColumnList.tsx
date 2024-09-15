'use client';

import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import CreateColumnModal from '@components/Modals/CreateColumnModal';
import EditColumnModal from '@components/Modals/EditColumnModal';
import { DashBoardContext } from '@core/contexts/DashBoardContext';
import useColumns from '@lib/hooks/useColumns';

import AddColumnButton from './UI/AddColumnButton';
import Column from './UI/Column';
import FloatingColumnList from './UI/FloatingColumnList';

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

  const divRef = useRef<HTMLDivElement | null>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [focusIndex, setFocusIndex] = useState(0);

  const onClickMoveFloatingButton = (index: number) => {
    setFocusIndex(index);
  };
  const scrollToColumn = useCallback(() => {
    const container = divRef.current;
    const column = columnRefs.current[focusIndex];
    if (container && column) {
      column.scrollIntoView({ behavior: 'smooth', inline: 'start' });
    }
  }, [focusIndex]);

  // 좌우로 스크롤 할 때 플로팅컬럼의 focus가 변경되는 로직 (디바운싱적용)
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleScroll = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      const columnListScrollLeft = divRef.current?.scrollLeft;
      if (columnListScrollLeft === undefined || columnListScrollLeft === null) {
        setFocusIndex(0);
        return;
      }
      const divideColumnIndex = columnListScrollLeft / 354;
      const nextFocusIndex =
        columnListScrollLeft % 354 > 177
          ? Math.ceil(divideColumnIndex)
          : Math.floor(divideColumnIndex);

      if (nextFocusIndex === focusIndex) {
        return;
      }
      if (nextFocusIndex >= columnRefs.current.length) {
        setFocusIndex(columnRefs.current.length - 1);
        return;
      }
      setFocusIndex(nextFocusIndex);
    }, 50);
  }, [debounceTimeoutRef, divRef, focusIndex, columnRefs, setFocusIndex]);

  useEffect(() => {
    // 버튼 눌러서 스크롤 되는 중에는 이벤트 잠깐 꺼짐
    divRef.current?.removeEventListener('scroll', handleScroll);
    scrollToColumn();
    divRef.current?.addEventListener('scroll', handleScroll);
  }, [focusIndex, handleScroll, scrollToColumn]);

  useEffect(() => {
    const currentDiv = divRef.current;
    currentDiv?.addEventListener('scroll', handleScroll);

    return () => {
      currentDiv?.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
  return (
    <>
      <div
        ref={divRef}
        className="no-scrollbar flex snap-x flex-col overflow-hidden md:mx-0 md:max-w-full xl:min-h-[100vh] xl:max-w-[1062px] xl:flex-row xl:overflow-scroll"
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
        <FloatingColumnList
          focusIndex={focusIndex}
          onClickMoveFloatingButton={onClickMoveFloatingButton}
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
