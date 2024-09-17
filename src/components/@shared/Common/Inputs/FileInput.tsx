/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { FieldErrors, Path, RegisterOptions, useForm } from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';
import Image from 'next/image';

interface FormData {
  email: string;
  nickname: string;
  image: File | string;
}

type Props<T extends FormData> = {
  id: Path<T>;
  value: File | string;
  validation: RegisterOptions<T, Path<T>> & {
    validate?: {
      required: (files: any) => string | boolean;
      acceptedFormats?: (files: any) => string | boolean;
    };
  };
  setValue: ReturnType<typeof useForm<T>>['setValue'];
  register: ReturnType<typeof useForm<T>>['register'];
  errors: FieldErrors;
};

function FileInput<T extends FormData>({
  id,
  value,
  setValue,
  register,
  validation,
  errors,
}: Props<T>) {
  const { ref, ...rest } = register(id, validation);
  const [preview, setPreview] = useState('');
  const [isHover, setIsHover] = useState(false);
  const handleFileInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const nextFile = e.target.files[0];
      setValue(id, nextFile as any, { shouldValidate: true });
    }
  };

  const onHover = () => {
    setIsHover(true);
  };

  const onBlur = () => {
    setIsHover(false);
  };

  useEffect(() => {
    if (!value) return;
    let nextPreview: string | undefined;

    if (typeof value === 'string') {
      setPreview(value);
    } else if (value instanceof File) {
      nextPreview = URL.createObjectURL(value);
      setPreview(nextPreview);
    }

    return () => {
      if (nextPreview) {
        setPreview('');
        URL.revokeObjectURL(nextPreview);
      }
    };
  }, [value]);

  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor="image"
        className="relative flex h-[100px] w-[100px] cursor-pointer items-center justify-center rounded-md bg-[#f5f5f5] hover:bg-gray-200 md:h-[182px] md:w-[182px]"
        onMouseOver={onHover}
        onFocus={onHover}
        onMouseOut={onBlur}
        onBlur={onBlur}
      >
        {!preview && (
          <Image
            width={20}
            height={20}
            src="/icons/add_purple.png"
            alt="file input button"
          />
        )}
        {preview && (
          <div className="absolute h-full w-full bg-white">
            <Image
              className="rounded-full bg-cover"
              fill
              src={preview}
              alt="preview"
            />
          </div>
        )}
        {isHover && (
          <div className="absolute z-20 flex h-full w-full items-center justify-center rounded-md bg-[#000000] opacity-60">
            <Image
              fill
              className="bg-cover"
              src="/icons/pencil.png"
              alt="preview"
            />
          </div>
        )}
      </label>
      <input
        className="hidden"
        ref={ref}
        {...rest}
        id={id}
        name={id}
        type="file"
        onChange={handleFileInputChange}
      />
      {errors && (
        <ErrorMessage
          className="pl-2 text-red font-lg-14px-semibold"
          name={id}
          errors={errors}
          as="span"
        />
      )}
    </div>
  );
}

export default FileInput;
