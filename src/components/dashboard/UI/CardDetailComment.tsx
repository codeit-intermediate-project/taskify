import { useRef } from 'react';
import { useForm } from 'react-hook-form';

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
    editingCommentId,
    onClickEditCancel,
    onClickEditComplete,
    onClickDeleteComment,
  } = useComments(card);
  const { register, handleSubmit, setValue } = useForm();
  const editTextAreaRef = useRef<HTMLTextAreaElement>(null);

  const onClickComplete = (commentId: number) => {
    if (!editTextAreaRef.current) {
      return;
    }
    const { value } = editTextAreaRef.current;
    onClickEditComplete(commentId, value);
  };

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
        <div className="relative rounded-md border px-4 pb-10 pt-4">
          <textarea
            {...register('content')}
            placeholder="댓글 작성하기"
            className="w-full resize-none text-wrap border-none outline-none placeholder:font-md-14px-regular md:h-[110px]"
          />
          <button className="absolute bottom-3 right-3 flex h-[28px] w-[84px] items-center justify-center border text-violet md:h-[33px]">
            입력
          </button>
        </div>
      </form>
      <div className="flex flex-col gap-4">
        {commentList.length > 0
          ? commentList.map(comment => {
              return (
                <div className="flex gap-4" key={comment.id}>
                  {comment.author.profileImageUrl ? (
                    <div className="relative h-[34px] w-[34px] shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={comment.author.profileImageUrl}
                        alt="댓글 작성자 프로필"
                        fill
                      />
                    </div>
                  ) : (
                    <div className="h-[34px] w-[34px] shrink-0 overflow-hidden rounded-full bg-yellow-100" />
                  )}
                  <div className="flex grow flex-col">
                    <div className="flex items-center">
                      <span className="font-lg-14px-semibold">
                        {comment.author.nickname}
                      </span>
                      <span className="text-gray-300 font-xs-12px-regular">
                        {dayjs(comment.createdAt).format('YYYY.MM.DD HH:mm')}
                      </span>
                    </div>
                    {editingCommentId === comment.id ? (
                      <textarea
                        ref={editTextAreaRef}
                        defaultValue={comment.content}
                        className='font-md-14px-regular" h-[40px] w-full rounded-lg border outline-none'
                      />
                    ) : (
                      <p className="pb-1 font-md-14px-regular">
                        {comment.content}
                      </p>
                    )}
                    {user?.id === comment.author.id ? (
                      editingCommentId === comment.id ? (
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
                              onClickEditComment(comment.id);
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
      </div>
    </>
  );
}
