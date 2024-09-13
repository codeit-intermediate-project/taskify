import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import dayjs from 'dayjs';
import Image from 'next/image';

import CardDetailModal from '@components/Modals/CardDetailModal';
import calendar from '@icons/calendar.png';
import { stringToHex, stringToRgba } from '@lib/utils/convertStringToColor';

import type { CardServiceResponseDto } from '@core/dtos/CardsDto';

interface CardProps {
  card: CardServiceResponseDto;
  openEdit: () => void;
  onClickCard: (data: CardServiceResponseDto) => void;
  onClickDeleteCard: (cardId: number) => void;
}

export default function Card({
  card,
  openEdit,
  onClickCard,
  onClickDeleteCard,
}: CardProps) {
  const formattedDueDate = dayjs(card.dueDate).format('YYYY.MM.DD');
  const [cardDetail, { open: openDetail, close: closeDetail }] =
    useDisclosure(false);
  return (
    <>
      <button
        onClick={() => {
          onClickCard(card);
          openDetail();
        }}
        className="mt-4 flex w-full flex-col gap-1 rounded-md border border-gray-200 bg-white px-3 pb-[5px] pt-3 md:flex-row md:gap-5 md:px-5 md:py-5 xl:flex-col xl:gap-4"
      >
        <div className="relative w-full pb-[60%] md:w-[90px] md:pb-[54px] xl:w-full xl:pb-[60%]">
          {card.imageUrl && (
            <Image src={card.imageUrl} fill alt="카드 이미지" />
          )}
        </div>
        <div className="w-full flex-col">
          <p className="pb-2.5 font-lg-16px-semibold">{card.title}</p>
          <div className="flex w-full flex-col justify-between gap-2 md:flex-row xl:flex-col">
            <div className="flex gap-1.5">
              {card.tags.length > 0 &&
                card.tags.map((tag, index) => (
                  <span
                    key={`${tag},${index * card.id}`}
                    className="flex h-[26px] items-center rounded px-1.5 font-md-14px-regular md:h-[28px]"
                    style={{
                      color: `${stringToHex(tag)}`,
                      backgroundColor: `${stringToRgba(tag, 0.1)}`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
            </div>
            <div className="flex items-center justify-between md:grow">
              <div className="flex gap-1.5">
                <Image src={calendar} alt="마감일" width={18} height={18} />
                <span className="text-gray-400 font-xs-12px-medium">
                  {formattedDueDate}
                </span>
              </div>
              {card.assignee?.profileImageUrl ? (
                <Image
                  src={card.assignee.profileImageUrl}
                  alt="담당자 프로필 이미지"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              ) : null}
            </div>
          </div>
        </div>
      </button>
      <Modal
        opened={cardDetail}
        withCloseButton={false}
        size="80%"
        onClose={closeDetail}
      >
        <CardDetailModal
          onClickDeleteCard={onClickDeleteCard}
          openEdit={openEdit}
          onClose={closeDetail}
          card={card}
        />
      </Modal>
    </>
  );
}
