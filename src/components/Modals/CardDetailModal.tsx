import { useContext, useEffect, useState } from 'react';

import { Modal, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import dayjs from 'dayjs';
import Image from 'next/image';

import CardDetailComment from '@components/dashboard/CardDetailComment';
import DropDownEditMenu from '@components/dashboard/UI/DropDownEditMenu';
import { DashBoardContext } from '@core/contexts/DashBoardContext';
import { CardServiceResponseDto } from '@core/dtos/CardsDto';
import close from '@icons/x.png';
import convertHexToRGBA from '@lib/utils/convertHexToRGBA';
import { stringToHex, stringToRgba } from '@lib/utils/convertStringToColor';

import ConfirmDeleteModal from './ConfirmDeleteModal';

interface CardModalProps {
  onClose: () => void;
  openEdit: (card: CardServiceResponseDto) => void;
  card: CardServiceResponseDto;
  onClickDeleteCard: (cardId: number) => void;
}

export default function CardDetailModal({
  onClickDeleteCard,
  onClose,
  card,
  openEdit,
}: CardModalProps) {
  const [columnTitle, setColumnTitle] = useState('');
  const { columnList, dashboardColor } = useContext(DashBoardContext);
  const [deleteCardConfirm, { open: openConfirm, close: closeConfirm }] =
    useDisclosure(false);
  const onClickDelete = () => {
    onClickDeleteCard(card.id);
    closeConfirm();
  };
  useEffect(() => {
    const findColumn = columnList.find(column => column.id === card.columnId);
    if (findColumn) {
      setColumnTitle(findColumn?.title);
    }
  }, [card.columnId, columnList]);
  return (
    <>
      <div className="md:px-4">
        <Title className="flex items-center justify-between pb-6">
          <span className="font-xl-20px-bold md:font-2xl-24px-bold">
            {card.title}
          </span>
          <div className="flex items-center gap-4 md:gap-6">
            <DropDownEditMenu
              openEdit={() => {
                openEdit(card);
              }}
              openConfirm={openConfirm}
            />
            <button
              onClick={onClose}
              className="relative h-6 w-6 md:h-8 md:w-8"
            >
              <Image src={close} alt="모달 닫기" fill />
            </button>
          </div>
        </Title>
        <section className="flex justify-between rounded-lg border px-4 py-[9px] md:fixed md:right-4 md:w-[25%] md:flex-col md:gap-4 md:px-4 md:py-[14.5px]">
          <div className="flex flex-col gap-2">
            <span className="font-xs-12px-semibold">담당자</span>
            <div className="flex items-center gap-2">
              {card.assignee?.profileImageUrl ? (
                <span className="relative block h-[28px] w-[28px] overflow-hidden rounded-full md:h-[34px] md:w-[34px]">
                  <Image
                    src={card.assignee?.profileImageUrl}
                    alt="담당자 프로필이미지"
                    fill
                  />
                </span>
              ) : (
                <span>디폴트이미지</span>
              )}
              <span className="font-md-14px-regular md:font-xs-12px-regular">
                {card.assignee?.nickname}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <span className="font-xs-12px-semibold">마감일</span>
            <span className="font-md-14px-regular md:font-xs-12px-regular">
              {dayjs(card.dueDate).format('YYYY.MM.DD HH:mm')}
            </span>
          </div>
        </section>
        <div className="md:w-[70%]">
          <section className="flex items-center gap-3 pt-4 md:gap-6 md:pt-0">
            <div
              className="flex items-center gap-1.5 rounded-2xl px-2 py-1"
              style={{
                backgroundColor: `${convertHexToRGBA(dashboardColor, 0.1)}`,
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full md:h-2 md:w-2"
                style={{ backgroundColor: `${dashboardColor}` }}
              />
              <span>{columnTitle}</span>
            </div>
            <span className="h-5 border" />
            <div className="flex flex-wrap gap-1.5">
              {card.tags.length > 0 &&
                card.tags.map((tag, index) => (
                  <span
                    key={`${tag},${index * card.id}`}
                    className="flex h-7 items-center rounded px-1.5 font-md-14px-regular md:h-[28px]"
                    style={{
                      color: `${stringToHex(tag)}`,
                      backgroundColor: `${stringToRgba(tag, 0.1)}`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
            </div>
          </section>
          <section className="pt-4 xl:pt-[26px]">
            <div className="pb-8">{card.description}</div>
            <div className="relative w-full overflow-hidden rounded-md pb-[60%]">
              {card?.imageUrl ? (
                <Image src={card.imageUrl} alt="카드 사진" fill />
              ) : null}
            </div>
          </section>
          <section className="pt-6">
            <CardDetailComment card={card} />
          </section>
        </div>
      </div>
      <Modal opened={deleteCardConfirm} onClose={closeConfirm}>
        <ConfirmDeleteModal
          onClickDelete={onClickDelete}
          closeConfirm={closeConfirm}
        >
          할 일 카드가 삭제됩니다.
        </ConfirmDeleteModal>
      </Modal>
    </>
  );
}
