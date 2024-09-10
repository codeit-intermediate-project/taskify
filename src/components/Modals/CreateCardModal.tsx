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
import { DashBoardContext } from '@core/contexts/DashBoardContext';
import { CreateCardRequestDto } from '@core/dtos/CardsDto';
import addPurple from '@icons/add_purple.png';
import calendar from '@icons/calendar.png';
import convertStringToColorHex from '@lib/utils/convertStringToColorHex';
import convertStringToRGBA from '@lib/utils/convertStringToRGBA';

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
  onSubmitCreateCard: (fieldData: CreateCardRequestDto) => Promise<boolean>;
  closeCreateCard: () => void;
  reset: () => void;
  clearErrors: UseFormClearErrors<CreateCardRequestDto>;
}
export default function CreateCardModal({
  columnId,
  register,
  handleSubmit,
  control,
  setValue,
  setError,
  getValues,
  watch,
  onSubmitCreateCard,
  closeCreateCard,
  errors,
  reset,
  clearErrors,
}: CreateCardModalProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [selectedAssignee, setSelectedAssignee] = useState('');
  const [selectedAssigneeImg, setSelectedAssigneeImg] = useState('');
  const { members } = useContext(DashBoardContext);
  // ---------태그인풋 로직
  const tagInputRef = useRef<HTMLInputElement>(null);
  const tags = watch('tags');
  // 태그 인풋에 value가 없을 때 백스페이스바를 누르면 이전에 등록한 태그가 하나씩 지워진다.
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
      if (tags?.length > 3) {
        setError('tags', {
          type: 'tagsLength',
          message: '태그는 4개 까지 등록 가능합니다.',
        });
        return;
      }
      clearErrors('tags');

      const currentTags = getValues('tags') || [];
      const newTags = tagInputRef.current.value;
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
  // 드롭다운에서 담당자 클릭시 유저 닉네임이 state에 저장되고 해당 정보로 userId를 저장, 프로필 이미지불러옴
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
    handleAssigneeUserIdValue(selectedAssignee);
    const userImage = handleAssigneeUserImage(selectedAssignee);
    setSelectedAssigneeImg(userImage);
  }, [
    selectedAssignee,
    clearErrors,
    handleAssigneeUserIdValue,
    handleAssigneeUserImage,
  ]);

  const onSubmit = async (data: CreateCardRequestDto) => {
    const result = await onSubmitCreateCard(data);
    if (!result) {
      return;
    }
    reset();
    closeCreateCard();
  };
  useEffect(() => {
    setValue('assigneeUserId', 0);
    setValue('title', '');
    setValue('description', '');
    setValue('dueDate', new Date().toString());
    setValue('tags', []);
    setValue('imageUrl', '');
    setValue('columnId', 0);
  }, [setValue]);
  return (
    <>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="flex items-center gap-1">
            <span className="font-2lg-18px-medium">담당자</span>
            <span className="mantine-inputWrapper-required text-[#FA5252] font-md-14px-medium">
              *
            </span>
          </div>
          <Combobox
            store={combobox}
            onOptionSubmit={value => {
              setSelectedAssignee(value);
              combobox.closeDropdown();
            }}
          >
            <Combobox.Target>
              <InputBase
                className="pt-2.5"
                component="button"
                type="button"
                rightSection={<Combobox.Chevron />}
                onClick={() => combobox.toggleDropdown()}
                pointer
              >
                {selectedAssignee ? (
                  <div className="flex items-center gap-2">
                    {selectedAssigneeImg ? (
                      <Image
                        className="rounded-full"
                        src={selectedAssigneeImg}
                        width={25}
                        height={25}
                        alt="멤버 프로필"
                      />
                    ) : (
                      <span className="h-[25px] w-[25px]" />
                    )}
                    <span className="font-lg-16px-regular">
                      {selectedAssignee}
                    </span>
                  </div>
                ) : (
                  <Input.Placeholder>담당자를 선택하세요.</Input.Placeholder>
                )}
              </InputBase>
            </Combobox.Target>
            <p className="pt-1 text-red">{errors.assigneeUserId?.message}</p>
            <Combobox.Dropdown>
              {members.map(member => (
                <Combobox.Option value={member.nickname} key={member.id}>
                  <button className="flex items-center gap-2">
                    {member.profileImageUrl ? (
                      <Image
                        className="rounded-full"
                        src={member.profileImageUrl}
                        width={25}
                        height={25}
                        alt="멤버 프로필"
                      />
                    ) : (
                      <span className="h-[25px] w-[25px]" />
                    )}
                    <span>{member.nickname}</span>
                  </button>
                </Combobox.Option>
              ))}
            </Combobox.Dropdown>
          </Combobox>
        </div>

        <Input.Wrapper
          withAsterisk
          label={<span className="font-2lg-18px-medium">제목</span>}
        >
          <Input
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
                leftSection={
                  <Image src={calendar} alt="마감일" width={22} height={22} />
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

          <div className="wrap mt-2 flex min-h-12 w-full items-center gap-2 border border-[#ced4da] px-2.5">
            <div className="">
              {tags &&
                tags.map((tag, index) => {
                  const keyValue = `${tag}${index}`;
                  return (
                    <span
                      key={keyValue}
                      className="mr-2 border px-0.5 py-1 font-md-14px-regular"
                      style={{
                        color: `#${convertStringToColorHex(tag)}`,
                        backgroundColor: `${convertStringToRGBA(tag, 0.1)}`,
                      }}
                    >
                      {tag}
                    </span>
                  );
                })}
              <input
                ref={tagInputRef}
                onKeyDown={handleKeyDownTag}
                placeholder="입력 후 Enter"
                className="placeholder:text-gray-300 placeholder:font-md-14px-regular"
              />
            </div>
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
              className="flex h-[76px] w-[76px] items-center justify-center rounded-md bg-gray-50"
            >
              <Image
                src={addPurple}
                alt="이미지 추가하기"
                width={28}
                height={28}
              />
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
            className="h-full grow border-gray-200 bg-white text-gray-400"
            onClick={closeCreateCard}
          >
            취소
          </Button>
          <Button type="submit" className="h-full grow bg-violet">
            생성
          </Button>
        </div>
      </form>
      <Modal
        title={<div className="font-2lg-18px-semibold">이미지 업로드</div>}
        opened={cropperModal}
        onClose={closeCropper}
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
