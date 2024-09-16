import { useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import dayjs from 'dayjs';
import { useParams } from 'next/navigation';

import { deleteCard, postCard, putCard } from '@core/api/cardApis';
import { DashBoardContext } from '@core/contexts/DashboardContext';
import { useDashboardSideMenu } from '@core/contexts/DashboardSideMenuContext';
import {
  CardServiceResponseDto,
  CreateCardRequestDto,
  UpdateCardRequestDto,
} from '@core/dtos/CardsDto';
import showSuccessNotification from '@lib/utils/notifications/showSuccessNotification';

export default function useCards(columnId: number) {
  const { sortCard } = useDashboardSideMenu();
  const [cards, setCards] = useState<CardServiceResponseDto[]>([]);
  const { cardList2D, moveCard } = useContext(DashBoardContext);
  const { dashboardid } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
    watch,
    setError,
    reset,
    clearErrors,
  } = useForm<CreateCardRequestDto>({
    mode: 'onSubmit',
    defaultValues: {
      dueDate: new Date().toString(),
    },
  });

  // 카드 생성, 수정시 폼데이터 검사
  const requestCardFormValidator = (fieldData: CreateCardRequestDto) => {
    let result = true;
    if (!fieldData.assigneeUserId) {
      setError('assigneeUserId', {
        type: 'required',
        message: '담당자를 선택해 주세요.',
      });
      result = false;
    }
    if (!fieldData.imageUrl) {
      setError('imageUrl', {
        type: 'required',
        message: '이미지를 업로드 해주세요.',
      });
      result = false;
    }
    if (!fieldData.description.trim()) {
      setError('description', {
        type: 'required',
        message: '설명을 입력해 주세요.',
      });
      result = false;
    }
    if (!fieldData.title) {
      setError('title', {
        type: 'required',
        message: '제목을 입력해 주세요.',
      });
      result = false;
    }
    return result;
  };
  // 카드생성 submit
  const onSubmitCreateCard = async (fieldData: CreateCardRequestDto) => {
    const result = requestCardFormValidator(fieldData);
    if (!result) {
      return false;
    }

    const formattedDueDate = dayjs(fieldData.dueDate).format(
      'YYYY-MM-DD HH:mm'
    );
    const formData: CreateCardRequestDto = {
      assigneeUserId: Number(fieldData.assigneeUserId),
      dashboardId: Number(dashboardid),
      columnId: Number(columnId),
      title: fieldData.title,
      description: fieldData.description,
      dueDate: formattedDueDate,
      tags: fieldData.tags,
      imageUrl: fieldData.imageUrl,
    };

    const data = await postCard(formData);
    setCards(prev => [...prev, data]);
    showSuccessNotification({ message: '할 일이 생성 되었습니다.' });
    return true;
  };

  // 카드수정 submit
  const onSubmitEditCard = async (
    cardId: number,
    fieldData: CreateCardRequestDto
  ) => {
    const result = requestCardFormValidator(fieldData);
    if (!result) {
      return false;
    }
    const formattedDueDate = dayjs(fieldData.dueDate).format(
      'YYYY-MM-DD HH:mm'
    );
    const beforeEdit = cards.find(card => cardId === card.id);
    const beforeData = {
      columnId: beforeEdit?.columnId,
      assigneeUserId: beforeEdit?.assignee?.id,
      title: beforeEdit?.title,
      description: beforeEdit?.description,
      dueDate: beforeEdit?.dueDate?.toString(),
      tags: beforeEdit?.tags,
      imageUrl: beforeEdit?.imageUrl,
    };
    const formData: UpdateCardRequestDto = {
      columnId: Number(fieldData.columnId),
      assigneeUserId: Number(fieldData.assigneeUserId),
      title: fieldData.title,
      description: fieldData.description,
      dueDate: formattedDueDate,
      tags: fieldData.tags,
      imageUrl: fieldData.imageUrl,
    };
    if (JSON.stringify(beforeData) === JSON.stringify(formData)) {
      return true;
    }

    const data = await putCard(Number(cardId), formData);
    moveCard(columnId, data);
    showSuccessNotification({ message: '할 일이 수정 되었습니다.' });
    return true;
  };

  const onClickDeleteCard = async (cardId: number) => {
    await deleteCard(cardId);
    setCards(prev => prev.filter(card => card.id !== cardId));
    showSuccessNotification({ message: '할 일이 삭제 되었습니다.' });
  };
  useEffect(() => {
    const nextCards = cardList2D.find(
      cardList => cardList.columnId === columnId
    );
    if (nextCards) setCards(nextCards.cardList);
  }, [cardList2D, columnId]);

  // 카드 정렬 변경 로직
  const handleCardsSort = useCallback(() => {
    const sortedCards: CardServiceResponseDto[] = [...cards];

    if (sortCard === '생성일 순') {
      sortedCards.sort((card, nextCard) => {
        const createdAt1 = new Date(card.createdAt).getTime();
        const createdAt2 = new Date(nextCard.createdAt).getTime();
        return createdAt1 - createdAt2;
      });
    } else if (sortCard === '마감일 순') {
      sortedCards.sort((card, nextCard) => {
        const dueDate1 = new Date(card.dueDate).getTime();
        const dueDate2 = new Date(nextCard.dueDate).getTime();
        return dueDate1 - dueDate2;
      });
    }
    setCards(sortedCards);
  }, [sortCard, setCards, cards]);
  useEffect(() => {
    handleCardsSort();
  }, [sortCard, handleCardsSort]);

  return {
    cards,
    register,
    handleSubmit,
    errors,
    control,
    setValue,
    setError,
    getValues,
    watch,
    onSubmitCreateCard,
    onSubmitEditCard,
    onClickDeleteCard,
    reset,
    clearErrors,
  };
}
