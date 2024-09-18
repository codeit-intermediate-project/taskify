import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Avatar, Textarea } from '@mantine/core';
import dayjs from 'dayjs';
import Image from 'next/image';

import { CardServiceResponseDto } from '@core/dtos/CardsDto';
import useComments from '@lib/hooks/useComments';

interface CommentProps {
  card: CardServiceResponseDto;
}

export default function CardDetailComment({ card }: CommentProps) {
  const {
    commentList,
    onSubmitCreateCommentForm,
    onClickEditComment,
    user,
    editingComment,
    setEditingComment,
    onClickEditCancel,
    onClickEditComplete,
    onClickDeleteComment,
    targetRef,
  } = useComments(card);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const editedComment = watch('editedContent');

  const onClickComplete = (commentId: number) => {
    if (!editedComment) {
      // 댓글내용을 다 지우고 완료 시 원래 내용으로 돌아감
      setValue('editedContent', editingComment?.content);
      setEditingComment(null);
      return;
    }
    if (editedComment === editingComment?.content) {
      // 수정된 내용이 같으면 패치안하고 완료
      setEditingComment(null);
      return;
    }
    onClickEditComplete(commentId, editedComment);
  };
  // 수정하기 클릭하면 editingComment상태가 변경되고 effect로 이전 value값을 넣어줌
  useEffect(() => {
    if (editingComment?.id) {
      setValue('editedContent', editingComment.content);
    }
  }, [editingComment?.id, editingComment?.content, setValue]);
  return (
    <>
      <form
        onSubmit={handleSubmit(data => {
          onSubmitCreateCommentForm(data.content);
          setValue('content', '');
        })}
        className="pb-6"
      >
        <span className="mb-1 font-lg-16px-medium">댓글</span>
        <div className="relative">
          <Textarea
            autosize
            minRows={5}
            styles={{
              input: {
                width: '100%',
                backgroundColor: '#4B4B4B',
                border: '#4B4B4B',
                color: '#D9D9D9',
              },
            }}
            {...register('content', {
              maxLength: { value: 250, message: '내용이 너무 많습니다.' },
            })}
            placeholder="댓글 작성하기"
            className="w-full resize-none text-wrap placeholder:font-md-14px-regular"
          />
          <button className="absolute bottom-3 right-3 flex h-[28px] w-[84px] items-center justify-center border text-violet dark:border-gray-400 dark:bg-gray-400 dark:text-gray-200 md:h-[33px]">
            입력
          </button>
        </div>

        {errors.content?.message &&
          typeof errors.content.message === 'string' && (
            <small className="text-red">{errors.content.message}</small>
          )}
      </form>
      <div className="flex flex-col gap-4">
        {commentList.length > 0
          ? commentList.map(comment => {
              return (
                <div className="flex gap-4" key={comment.id}>
                  <Avatar>
                    {comment.author.profileImageUrl && (
                      <div className="relative h-[34px] w-[34px] shrink-0 overflow-hidden rounded-full">
                        <Image
                          src={comment.author.profileImageUrl}
                          alt="댓글 작성자 프로필"
                          fill
                        />
                      </div>
                    )}
                  </Avatar>
                  <div className="flex grow flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-lg-14px-semibold">
                        {comment.author.nickname}
                      </span>
                      <span className="text-gray-300 font-xs-12px-regular">
                        {dayjs(comment.updatedAt)
                          .subtract(9, 'hour')
                          .format('YYYY.MM.DD HH:mm')}
                      </span>
                      <span className="text-gray-300 font-xs-12px-regular">
                        {comment.createdAt !== comment.updatedAt
                          ? '(수정됨)'
                          : null}
                      </span>
                    </div>
                    {editingComment?.id === comment.id ? (
                      <Textarea
                        autosize
                        styles={{
                          input: {
                            width: '100%',
                            backgroundColor: '#4B4B4B',
                            border: '#4B4B4B',
                            color: '#D9D9D9',
                          },
                        }}
                        {...register('editedContent', {
                          maxLength: {
                            value: 250,
                            message: '내용이 너무 많습니다.',
                          },
                        })}
                        className='font-md-14px-regular" w-full rounded-lg border outline-none dark:border-none'
                      />
                    ) : (
                      <p className="pb-1 font-md-14px-regular">
                        {comment.content}
                      </p>
                    )}
                    {user?.id === comment.author.id ? (
                      editingComment?.id === comment.id ? (
                        <div className="flex gap-4">
                          <button
                            onClick={() => {
                              onClickComplete(comment.id);
                            }}
                            className="text-gray-300 underline font-xs-12px-regular"
                          >
                            완료
                          </button>
                          <button
                            onClick={() => {
                              onClickEditCancel();
                            }}
                            className="text-gray-300 underline font-xs-12px-regular"
                          >
                            취소
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-4">
                          <button
                            onClick={() => {
                              onClickEditComment(comment.id, comment.content);
                            }}
                            className="text-gray-300 underline font-xs-12px-regular"
                          >
                            수정
                          </button>
                          <button
                            onClick={() => {
                              onClickDeleteComment(comment.id);
                            }}
                            className="text-gray-300 underline font-xs-12px-regular"
                          >
                            삭제
                          </button>
                        </div>
                      )
                    ) : (
                      <div className="h-[18px] w-full" />
                    )}
                  </div>
                </div>
              );
            })
          : null}
        <div ref={targetRef} />
      </div>
    </>
  );
}
