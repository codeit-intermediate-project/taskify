import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import dayjs from 'dayjs';
import { useParams } from 'next/navigation';

import { deleteCard, postCard, putCard } from '@core/api/cardApis';
import { DashBoardContext } from '@core/contexts/DashBoardContext';
import {
  CardServiceResponseDto,
  CreateCardRequestDto,
  UpdateCardRequestDto,
} from '@core/dtos/CardsDto';

export default function useCards(columnId: number) {
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
    const formData: UpdateCardRequestDto = {
      columnId: Number(fieldData.columnId),
      assigneeUserId: Number(fieldData.assigneeUserId),
      title: fieldData.title,
      description: fieldData.description,
      dueDate: formattedDueDate,
      tags: fieldData.tags,
      imageUrl: fieldData.imageUrl,
    };

    const data = await putCard(Number(cardId), formData);
    // 컬럼을 옮긴경우
    if (data.columnId !== columnId) {
      moveCard(columnId, data);
    } else {
      setCards(prev => prev.map(card => (card.id === data.id ? data : card)));
    }

    return true;
  };

  const onClickDeleteCard = async (cardId: number) => {
    await deleteCard(cardId);
    setCards(prev => prev.filter(card => card.id !== cardId));
  };
  useEffect(() => {
    const nextCards = cardList2D.find(
      cardList => cardList.columnId === columnId
    );
    if (nextCards) setCards(nextCards.cardList);
  }, [cardList2D, columnId]);

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
