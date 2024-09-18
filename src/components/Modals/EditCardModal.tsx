import '@mantine/dates/styles.css';
import {
  ChangeEvent,
  KeyboardEventHandler,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

import {
  Avatar,
  Button,
  Combobox,
  Input,
  InputBase,
  Modal,
  Textarea,
  useCombobox,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import dayjs from 'dayjs';
import Image from 'next/image';

import ImageCropperModal from '@components/Modals/ImageCropperModal';
import { DashBoardContext } from '@core/contexts/DashboardContext';
import { useTheme } from '@core/contexts/ThemeContext';
import {
  CardServiceResponseDto,
  CreateCardRequestDto,
} from '@core/dtos/CardsDto';
import addPurple from '@icons/add_purple.svg';
import { stringToHex, stringToRgba } from '@lib/utils/convertStringToColor';

interface CreateCardModalProps {
  columnId: number;
  register: UseFormRegister<CreateCardRequestDto>;
  handleSubmit: UseFormHandleSubmit<CreateCardRequestDto, undefined>;
  errors: FieldErrors<CreateCardRequestDto>;
  setError: UseFormSetError<CreateCardRequestDto>;
  control: Control<CreateCardRequestDto>;
  setValue: UseFormSetValue<CreateCardRequestDto>;
  getValues: UseFormGetValues<CreateCardRequestDto>;
  watch: UseFormWatch<CreateCardRequestDto>;
  onSubmitEditCard: (
    cardId: number,
    fieldData: CreateCardRequestDto
  ) => Promise<boolean>;
  closeEdit: () => void;
  reset: () => void;
  clearErrors: UseFormClearErrors<CreateCardRequestDto>;
  card: CardServiceResponseDto;
}
export default function EditCardModal({
  columnId,
  register,
  handleSubmit,
  control,
  setValue,
  setError,
  getValues,
  watch,
  onSubmitEditCard,
  closeEdit,
  errors,
  reset,
  clearErrors,
  card,
}: CreateCardModalProps) {
  const assigneeCombobox = useCombobox({
    onDropdownClose: () => assigneeCombobox.resetSelectedOption(),
  });
  const columnCombobox = useCombobox({
    onDropdownClose: () => assigneeCombobox.resetSelectedOption(),
  });
  const { columnList } = useContext(DashBoardContext);
  const [selectedAssignee, setSelectedAssignee] = useState('');
  const [selectedAssigneeImg, setSelectedAssigneeImg] = useState('');
  const { members, dashboardColor } = useContext(DashBoardContext);
  // ---------태그인풋 로직
  const tagInputRef = useRef<HTMLInputElement>(null);
  const tags = watch('tags');
  const handleKeyDownTag: KeyboardEventHandler<HTMLInputElement> = e => {
    if (!tagInputRef.current) {
      return;
    }
    if (tagInputRef.current.value.length > 5) {
      setError('tags', {
        type: 'tagValueLength',
        message: '태그는 5자 까지 등록 가능합니다.',
      });
      return;
    }
    clearErrors('tags');

    if (e.key === 'Enter') {
      e.preventDefault();
      if (!tagInputRef.current.value.trim()) {
        return;
      }
      if (tags?.length > 3) {
        setError('tags', {
          type: 'tagsLength',
          message: '태그는 4개 까지 등록 가능합니다.',
        });
        return;
      }
      clearErrors('tags');

      const currentTags = getValues('tags') || [];
      const newTags = tagInputRef.current.value.trim();
      setValue('tags', [...currentTags, newTags]);
      tagInputRef.current.value = '';
    } else if (
      e.key === 'Backspace' &&
      !tagInputRef.current.value &&
      tags.length
    ) {
      const removedTag = tags.slice(0, tags.length - 1);
      setValue('tags', removedTag);
    }
  };
  // ---------이미지 인풋 로직(+이미지크롭 모달)
  const imgInputRef = useRef<HTMLInputElement>(null);
  const [cropperModal, { open: openCropper, close: closeCropper }] =
    useDisclosure(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const onChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const image = e.target.files[0];
    const encodedImage = URL.createObjectURL(image);
    setImageSrc(encodedImage);
    openCropper();
  };
  const handleImageUrlData = (imageUrl: string) => {
    setValue('imageUrl', imageUrl);
    clearErrors('imageUrl');
  };
  const image = watch('imageUrl');
  //-----
  const nowColumnId = watch('columnId');
  const [selectedColumnTitle, setSelectedColumnTitle] = useState<string>('');
  useEffect(() => {
    setSelectedColumnTitle(prev => {
      const select = columnList.find(column => column.id === nowColumnId);
      return select ? select.title : prev;
    });
  }, [nowColumnId, columnList]);
  const onClickColumnOption = (value: string) => {
    const columnIdNum = Number(value);
    setValue('columnId', columnIdNum);
  };

  const onSubmit = async (data: CreateCardRequestDto) => {
    const result = await onSubmitEditCard(card.id, data);
    if (!result) {
      return;
    }
    closeEdit();
    reset();
  };
  const handleAssigneeUserIdValue = useCallback(
    (nickname: string) => {
      const selectedUser = members.find(member => member.nickname === nickname);
      setValue('assigneeUserId', selectedUser?.userId);
    },
    [members, setValue]
  );

  const handleAssigneeUserImage = useCallback(
    (nickname: string) => {
      const selectedUser = members.find(member => member.nickname === nickname);

      if (!selectedUser?.profileImageUrl) {
        return '';
      }
      return selectedUser.profileImageUrl;
    },
    [members]
  );

  useEffect(() => {
    clearErrors('assigneeUserId');

    // 드롭다운 메뉴 클릭시 유저 닉네임이 state에 저장되고 해당 정보로 userId를 저장, 프로필 이미지불러옴
    handleAssigneeUserIdValue(selectedAssignee);
    const userImage = handleAssigneeUserImage(selectedAssignee);
    setSelectedAssigneeImg(userImage);
  }, [
    selectedAssignee,
    clearErrors,
    handleAssigneeUserIdValue,
    handleAssigneeUserImage,
  ]);

  useEffect(() => {
    setValue('assigneeUserId', card.assignee?.id);
    setValue('title', card.title);
    setValue('description', card.description);
    setValue('dueDate', card.dueDate?.toString());
    setValue('tags', card.tags);
    setValue('imageUrl', card.imageUrl!);
    setValue('columnId', columnId);
  }, [
    card.assignee?.id,
    card.description,
    card.dueDate,
    card.imageUrl,
    card.tags,
    card.title,
    columnId,
    setValue,
  ]);
  const { darkMode } = useTheme();

  return (
    <>
      <form
        className="flex flex-col gap-8"
        onSubmit={handleSubmit(data => {
          onSubmit(data);
        })}
      >
        <div className="flex w-full gap-8">
          <div className="grow">
            <span className="font-2lg-18px-medium">상태</span>

            <Combobox
              store={columnCombobox}
              onOptionSubmit={value => {
                onClickColumnOption(value);
                columnCombobox.closeDropdown();
              }}
              styles={
                darkMode
                  ? {
                      dropdown: {
                        backgroundColor: '#4B4B4B',
                        border: '#4B4B4B',
                        color: '#D9D9D9',
                      },
                    }
                  : {}
              }
            >
              <Combobox.Target>
                <InputBase
                  styles={
                    darkMode
                      ? {
                          input: {
                            backgroundColor: '#4B4B4B',
                            border: '#4B4B4B',
                            color: '#D9D9D9',
                          },
                        }
                      : {}
                  }
                  className="pt-2.5"
                  component="button"
                  type="button"
                  rightSection={<Combobox.Chevron />}
                  onClick={() => columnCombobox.toggleDropdown()}
                  pointer
                >
                  <div className="flex items-center gap-2 px-2.5">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: dashboardColor }}
                    />
                    <span>{selectedColumnTitle}</span>
                  </div>
                </InputBase>
              </Combobox.Target>
              <p className="pt-1 text-red">{errors.assigneeUserId?.message}</p>
              <Combobox.Dropdown>
                {columnList.map(column => (
                  <Combobox.Option value={column.id.toString()} key={column.id}>
                    <button className="flex items-center gap-2 px-2.5">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: dashboardColor }}
                      />
                      <span>{column.title}</span>
                    </button>
                  </Combobox.Option>
                ))}
              </Combobox.Dropdown>
            </Combobox>
          </div>
          <div className="grow">
            <span className="font-2lg-18px-medium">담당자</span>

            <Combobox
              styles={
                darkMode
                  ? {
                      dropdown: {
                        backgroundColor: '#4B4B4B',
                        border: '#4B4B4B',
                        color: '#D9D9D9',
                      },
                    }
                  : {}
              }
              store={assigneeCombobox}
              onOptionSubmit={value => {
                setSelectedAssignee(value);
                assigneeCombobox.closeDropdown();
              }}
            >
              <Combobox.Target>
                <InputBase
                  styles={
                    darkMode
                      ? {
                          input: {
                            backgroundColor: '#4B4B4B',
                            border: '#4B4B4B',
                            color: '#D9D9D9',
                          },
                        }
                      : {}
                  }
                  className="pt-2.5"
                  component="button"
                  type="button"
                  rightSection={<Combobox.Chevron />}
                  onClick={() => assigneeCombobox.toggleDropdown()}
                  pointer
                >
                  {selectedAssignee ? (
                    <div className="flex items-center gap-2">
                      <Avatar size="sm">
                        {selectedAssigneeImg && (
                          <Image
                            className="rounded-full"
                            src={selectedAssigneeImg}
                            width={25}
                            height={25}
                            alt="멤버 프로필"
                          />
                        )}
                      </Avatar>
                      <span className="font-lg-16px-regular">
                        {selectedAssignee}
                      </span>
                    </div>
                  ) : (
                    <div className="flex h-[25px] items-center gap-2">
                      {card?.assignee?.profileImageUrl && (
                        <Image
                          src={card.assignee.profileImageUrl}
                          className="rounded-full"
                          width={25}
                          height={25}
                          alt="멤버 프로필"
                        />
                      )}
                      <span>{card?.assignee?.nickname}</span>
                    </div>
                  )}
                </InputBase>
              </Combobox.Target>
              <p className="pt-1 text-red">{errors.assigneeUserId?.message}</p>
              <Combobox.Dropdown>
                {members.map(member => (
                  <Combobox.Option value={member.nickname} key={member.id}>
                    <button className="flex items-center gap-2">
                      <Avatar size="sm">
                        {member.profileImageUrl && (
                          <Image
                            className="rounded-full"
                            src={member.profileImageUrl}
                            width={25}
                            height={25}
                            alt="멤버 프로필"
                          />
                        )}
                      </Avatar>
                      <span>{member.nickname}</span>
                    </button>
                  </Combobox.Option>
                ))}
              </Combobox.Dropdown>
            </Combobox>
          </div>
        </div>

        <Input.Wrapper
          withAsterisk
          label={<span className="font-2lg-18px-medium">제목</span>}
        >
          <Input
            styles={
              darkMode
                ? {
                    input: {
                      backgroundColor: '#4B4B4B',
                      border: '#4B4B4B',
                      color: '#D9D9D9',
                    },
                  }
                : {}
            }
            {...register('title')}
            className="pt-2.5"
            placeholder="제목을 입력해 주세요."
          />
          <p className="pt-1 text-red">{errors.title?.message}</p>
        </Input.Wrapper>
        <Input.Wrapper
          withAsterisk
          label={<span className="font-2lg-18px-medium">설명</span>}
        >
          <Textarea
            styles={
              darkMode
                ? {
                    input: {
                      backgroundColor: '#4B4B4B',
                      border: '#4B4B4B',
                      color: '#D9D9D9',
                    },
                  }
                : {}
            }
            placeholder="설명을 입력해 주세요."
            className="pt-2.5"
            {...register('description')}
            rows={5}
          />
          <p className="pt-1 text-red">{errors.description?.message}</p>
        </Input.Wrapper>
        <Input.Wrapper
          label={<span className="font-2lg-18px-medium">마감일</span>}
        >
          <Controller
            name="dueDate"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DateInput
                styles={
                  darkMode
                    ? {
                        input: {
                          backgroundColor: '#4B4B4B',
                          border: '#4B4B4B',
                          color: '#D9D9D9',
                        },
                      }
                    : {}
                }
                value={
                  value
                    ? dayjs(value, 'YYYY. MM. DD HH:mm').toDate()
                    : new Date()
                }
                onChange={onChange}
                name="dueDate"
                minDate={new Date()}
                valueFormat="YYYY. MM. DD HH:mm"
                className="pt-2.5"
                clearable
              />
            )}
          />
        </Input.Wrapper>

        <div>
          <span className="font-2lg-18px-medium">태그</span>

          <div className="mt-2 flex h-12 w-full items-center gap-2 whitespace-nowrap border border-[#ced4da] px-2.5 dark:border-black-500 dark:bg-black-500 dark:text-gray-200">
            <div>
              {tags &&
                tags.map((tag, index) => {
                  const keyValue = `${tag}${index}`;
                  return (
                    <span
                      key={keyValue}
                      className="mr-2 px-0.5 py-1 font-md-14px-regular"
                      style={
                        darkMode
                          ? {
                              color: `#cccccc`,
                              backgroundColor: `${stringToRgba(tag, 0.5)}`,
                            }
                          : {
                              color: `${stringToHex(tag)}`,
                              backgroundColor: `${stringToRgba(tag, 0.1)}`,
                            }
                      }
                    >
                      {tag}
                    </span>
                  );
                })}
            </div>
            <input
              ref={tagInputRef}
              onKeyDown={handleKeyDownTag}
              placeholder="입력 후 Enter"
              className="placeholder:text-gray-300 placeholder:font-md-14px-regular dark:border-black-500 dark:bg-black-500 dark:text-gray-200"
            />
          </div>
          <p className="pt-1 text-red">{errors.tags?.message}</p>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="font-2lg-18px-medium">이미지</span>
            <span className="mantine-inputWrapper-required text-[#FA5252] font-md-14px-medium">
              *
            </span>
          </div>
          {image ? (
            <button
              className="max-w-[127px]"
              type="button"
              onClick={() => {
                imgInputRef.current?.click();
              }}
            >
              <Image
                className="rounded-md"
                src={image}
                width={127}
                height={76}
                alt="업로드한 이미지"
              />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                imgInputRef.current?.click();
              }}
              className="flex h-[76px] w-[76px] items-center justify-center rounded-md bg-gray-50 dark:border-black-500 dark:bg-black-500 dark:text-gray-200"
            >
              {darkMode ? (
                '+'
              ) : (
                <Image
                  src={addPurple}
                  alt="이미지 추가하기"
                  width={28}
                  height={28}
                />
              )}
            </button>
          )}
          <input
            onChange={onChangeFileInput}
            ref={imgInputRef}
            type="file"
            className="hidden"
          />
          <p className="pt-1 text-red">{errors.imageUrl?.message}</p>
        </div>
        <div className="flex h-[54px] w-full gap-2">
          <Button
            type="button"
            className="h-full grow border-gray-200 bg-white text-gray-400 dark:border-black-500 dark:bg-black-500 dark:text-gray-200"
            onClick={closeEdit}
          >
            취소
          </Button>
          <Button type="submit" className="h-full grow bg-violet">
            수정
          </Button>
        </div>
      </form>
      <Modal
        title={<div className="font-2lg-18px-semibold">이미지 업로드</div>}
        opened={cropperModal}
        onClose={closeCropper}
        zIndex={202}
      >
        <ImageCropperModal
          closeCropper={closeCropper}
          imageSrc={imageSrc!}
          columnId={columnId}
          handleImageUrlData={handleImageUrlData}
        />
      </Modal>
    </>
  );
}
