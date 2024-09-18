import axios from '@core/api/instance';
import {
  CommentServiceDto,
  CreateCommentRequestDto,
  UpdateCommentRequestDto,
} from '@core/dtos/CommentsDto';

interface CommentResponseDto {
  cursorId: number | null;
  comments: CommentServiceDto[];
}
export const getComments = async (cardId: number, cursorId?: number | null) => {
  const res = await axios.get<CommentResponseDto>(
    `/comments?cardId=${cardId}&size=5${cursorId ? `&cursorId=${cursorId}` : ''}`
  );
  const { data } = res;
  return data;
};

export const deleteComments = async (commentId: number) => {
  const res = await axios.delete<CommentResponseDto>(`/comments/${commentId}`);
  const { data } = res;
  return data;
};

export const postComment = async (formData: CreateCommentRequestDto) => {
  const res = await axios.post<CommentServiceDto>(`/comments`, formData);
  const { data } = res;
  return data;
};
export const putComment = async (
  commentId: number,
  formData: UpdateCommentRequestDto
) => {
  const res = await axios.put<CommentServiceDto>(
    `/comments/${commentId}`,
    formData
  );
  const { data } = res;
  return data;
};
