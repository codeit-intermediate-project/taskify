import { MutableRefObject, useState } from 'react';

import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';

import PurpleAddIcon from '@components/@shared/UI/PurpleAddIcon';
import CreateCardModal from '@components/Modals/CreateCardModal';
import EditCardModal from '@components/Modals/EditCardModal';
import { CardServiceResponseDto } from '@core/dtos/CardsDto';
import setting from '@icons/settings.png';
import useCards from '@lib/hooks/useCards';

import Card from './Card';

import type { ColumnServiceResponseDto } from '@core/dtos/ColumnsDto';

interface ColumnProps {
  column: ColumnServiceResponseDto;
  dashboardColor: string;
  onClickEditOpen: (id: number, defaultValue: string) => void;
  columnRef: MutableRefObject<(HTMLDivElement | null)[]>;
  index: number;
}

const INITIAL_CARD = {
  id: 0,
  title: '',
  description: '',
  tags: [],
  dueDate: new Date(),
  assignee: null,
  imageUrl: null,
  teamId: '',
  columnId: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function Column({
  column,
  dashboardColor,
  onClickEditOpen,
  columnRef,
  index,
}: ColumnProps) {
  const [createCardModal, { open: openCreateCard, close: closeCreateCard }] =
    useDisclosure(false);
  const {
    cards,
    register,
    handleSubmit,
    setError,
    errors,
    control,
    setValue,
    getValues,
    watch,
    onSubmitCreateCard,
    reset,
    clearErrors,
    onSubmitEditCard,
    onClickDeleteCard,
    targetRef,
  } = useCards(column.id);
  const [selectedCard, setSelectedCard] =
    useState<CardServiceResponseDto>(INITIAL_CARD);
  const onClickCard = (data: CardServiceResponseDto) => {
    setSelectedCard(data);
  };

  const [edit, { open: openEdit, close: closeEdit }] = useDisclosure(false);

  return (
    <>
      {column?.id > 0 && (
        <div
          ref={el => {
            if (el) {
              const columnRefs = columnRef.current;
              columnRefs[index] = el;
            }
          }}
          className="no-scrollbar mb-4 w-full border-b border-gray-100 px-3 pb-6 md:px-5 xl:mb-0 xl:h-full xl:max-h-[90vh] xl:min-w-[354px] xl:overflow-scroll xl:border-b-0 xl:border-r xl:pb-[100px]"
        >
          <div className="mb-6 mt-4 flex h-[22px] justify-between">
            <div className="flex items-center gap-2 rounded-md">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: `${dashboardColor}` }}
              />
              <span className="pr-1 font-2lg-18px-bold">{column.title}</span>
              <div className="flex h-5 w-5 items-center justify-center rounded bg-gray-100 text-gray-400 font-xs-12px-medium">
                {cards.length}
              </div>
            </div>
            <button
              onClick={() => {
                onClickEditOpen(column.id, column.title);
              }}
            >
              <Image
                src={setting}
                width={22}
                height={22}
                alt="컬럼 수정 버튼"
              />
            </button>
          </div>
          <Button
            onClick={() => {
              openCreateCard();
            }}
            color="#fff"
            className="flex h-8 w-full items-center justify-center border border-gray-200 md:h-10"
          >
            <PurpleAddIcon />
          </Button>
          {cards?.length > 0 &&
            cards.map(card => (
              <Card
                onClickDeleteCard={onClickDeleteCard}
                openEdit={openEdit}
                onClickCard={onClickCard}
                key={card.id}
                card={card}
              />
            ))}
          <div ref={targetRef} />
        </div>
      )}
      <Modal
        centered
        title={<div className="font-2xl-24px-bold">할 일 생성</div>}
        opened={createCardModal}
        onClose={closeCreateCard}
      >
        <CreateCardModal
          columnId={column.id}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          setError={setError}
          control={control}
          onSubmitCreateCard={onSubmitCreateCard}
          watch={watch}
          setValue={setValue}
          getValues={getValues}
          closeCreateCard={closeCreateCard}
          reset={reset}
          clearErrors={clearErrors}
        />
      </Modal>
      <Modal opened={edit} onClose={closeEdit} zIndex={201}>
        <EditCardModal
          columnId={column.id}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          control={control}
          onSubmitEditCard={onSubmitEditCard}
          watch={watch}
          setValue={setValue}
          setError={setError}
          getValues={getValues}
          closeEdit={closeEdit}
          reset={reset}
          clearErrors={clearErrors}
          card={selectedCard}
        />
      </Modal>
    </>
  );
}
