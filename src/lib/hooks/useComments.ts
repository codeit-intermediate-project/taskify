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

import useInfiniteScroll from './useInfiniteScroll';

interface EditingComment {
  id: number;
  content: string;
}

function useComments(card: CardServiceResponseDto) {
  const [commentList, setCommentList] = useState<CommentServiceDto[]>([]);
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [editingComment, setEditingComment] = useState<EditingComment | null>(
    null
  );
  const { dashboardid } = useParams();
  const { user } = useRoot();

  const loadComments = useCallback(async () => {
    const { comments, cursorId: nextCursorId } = await getComments(card.id);
    setCommentList(comments);
    setCursorId(nextCursorId);
  }, [card.id]);

  const loadMoreComments = async () => {
    const { comments, cursorId: nextCursorId } = await getComments(
      card.id,
      cursorId
    );
    setCommentList(prev => [...prev, ...comments]);
    setCursorId(nextCursorId);
  };
  const onSubmitCreateCommentForm = async (content: string) => {
    if (!content.trim()) {
      return false;
    }
    const trimContent = content.trim();
    const formData = {
      content: trimContent,
      cardId: card.id,
      columnId: card.columnId,
      dashboardId: Number(dashboardid),
    };
    const data = await postComment(formData);
    setCommentList(prev => [data, ...prev]);
  };

  const { targetRef } = useInfiniteScroll(() => {
    loadMoreComments();
  }, Boolean(cursorId));

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
    if (!value.trim()) {
      return;
    }
    const trimContent = value.trim();
    const formData = {
      content: trimContent,
    };
    const data = await putComment(commentId, formData);
    setCommentList(prev =>
      prev.map(comment => (comment.id === commentId ? data : comment))
    );
    setEditingComment(null);
  };

  useEffect(() => {
    loadComments();
  }, [loadComments]);
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
    targetRef,
  };
}

export default useComments;
