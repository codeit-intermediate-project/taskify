import { useCallback, useEffect, useState } from 'react';

import { useParams } from 'next/navigation';

import {
  deleteComments,
  getComments,
  postComment,
  putComment,
} from '@core/api/comments';
import { useRoot } from '@core/contexts/RootContexts';
import { CardServiceResponseDto } from '@core/dtos/CardsDto';
import { CommentServiceDto } from '@core/dtos/CommentsDto';

interface EditingComment {
  id: number;
  content: string;
}

function useComments(card: CardServiceResponseDto) {
  const [commentList, setCommentList] = useState<CommentServiceDto[]>([]);
  const [editingComment, setEditingComment] = useState<EditingComment | null>(
    null
  );
  const { dashboardid } = useParams();
  const { user } = useRoot();
  const LoadComments = useCallback(async () => {
    const { comments } = await getComments(card.id);
    setCommentList(comments);
  }, [card.id]);

  const onSubmitCreateCommentForm = async (content: string) => {
    if (!content) {
      return false;
    }
    const formData = {
      content,
      cardId: card.id,
      columnId: card.columnId,
      dashboardId: Number(dashboardid),
    };
    const data = await postComment(formData);
    setCommentList(prev => [data, ...prev]);
  };

  const onClickEditComment = (commentId: number, value: string) => {
    setEditingComment({ id: commentId, content: value });
  };
  const onClickEditCancel = () => {
    setEditingComment(null);
  };
  const onClickDeleteComment = async (commentId: number) => {
    await deleteComments(commentId);
    setCommentList(prev => prev.filter(comment => comment.id !== commentId));
  };
  const onClickEditComplete = async (commentId: number, value: string) => {
    if (!value) {
      return;
    }
    const formData = {
      content: value,
    };
    const data = await putComment(commentId, formData);
    setCommentList(prev =>
      prev.map(comment => (comment.id === commentId ? data : comment))
    );
    setEditingComment(null);
  };

  useEffect(() => {
    LoadComments();
  }, [LoadComments]);
  return {
    commentList,
    onSubmitCreateCommentForm,
    user,
    editingComment,
    setEditingComment,
    onClickEditComment,
    onClickEditCancel,
    onClickEditComplete,
    onClickDeleteComment,
  };
}

export default useComments;
