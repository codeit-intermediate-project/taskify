import {
  CardServiceResponseDto,
  UpdateCardRequestDto,
  type CreateCardRequestDto,
  type GetCardsResponseDto,
} from '@core/dtos/CardsDto';
import { MembersResponseDto } from '@core/dtos/MembersDto';

import axios from './instance';

export const getCards = async (columnId: number) => {
  const res = await axios.get<GetCardsResponseDto>(
    `/cards?size=10&columnId=${columnId}`
  );
  const { data } = res;
  return data.cards;
};

export const deleteCard = async (cardId: number) => {
  await axios.delete<GetCardsResponseDto>(`/cards/${cardId}`);
};
export const postCard = async (formData: CreateCardRequestDto) => {
  const res = await axios.post<CardServiceResponseDto>('/cards', formData);
  const { data } = res;
  return data;
};

export const putCard = async (
  cardId: number,
  formData: UpdateCardRequestDto
) => {
  const res = await axios.put<CardServiceResponseDto>(
    `/cards/${cardId}`,
    formData
  );
  const { data } = res;
  return data;
};

export const getMembers = async (dashboardId: number) => {
  const res = await axios.get<MembersResponseDto>(
    `/members?page=1&size=100&dashboardId=${dashboardId}`
  );
  const { data } = res;
  return data.members;
};

interface ImageResponse {
  imageUrl: string;
}
export const postImage = async (columnId: number, formData: FormData) => {
  const res = await axios.post<ImageResponse>(
    `/columns/${columnId}/card-image`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  const { data } = res;
  return data;
};
