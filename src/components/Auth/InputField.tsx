import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';
import Image from 'next/image';

interface InputFieldProps<T extends FieldValues> {
  id: Path<T>;
  type?: string;
  placeholder: string;
  autoComplete?: string;
  labelName?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors;
  validation: object;
  showPassword?: boolean;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InputField<T extends FieldValues>({
  id,
  type = 'text',
  labelName,
  placeholder,
  autoComplete,
  showPassword,
  setShowPassword,
  register,
  errors,
  validation,
}: InputFieldProps<T>) {
  const name = id as string;
  return (
    <div className="mt-0">
      <label htmlFor={id} className="font-lg-16px-regular">
        {labelName}
      </label>
      <div className="relative">
        <input
          id={id}
          type={showPassword ? 'text' : type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...register(id, validation)}
          className={`mt-[8px] block w-full rounded-[8px] border bg-white px-3 py-2 focus:outline-none ${
            errors[id] ? 'border-red' : 'border-[#D9D9D9]'
          } font-lg-16px-regular focus:border-violet focus:ring-indigo-500`}
        />
        {type === 'password' && setShowPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute inset-y-0 right-0 top-1/2 flex -translate-y-1/2 transform items-center px-3"
            aria-label="Toggle password visibility"
          >
            <Image
              src={`/icons/${
                showPassword ? 'visibility_off' : 'visibility_on'
              }.png`}
              alt={showPassword ? '비밀번호 숨기기' : '비밀번호 표시하기'}
              width={20}
              height={20}
            />
          </button>
        )}
      </div>
      {errors && (
        <ErrorMessage
          className="mt-1 text-sm text-red"
          name={name}
          errors={errors}
          as="span"
        />
      )}
    </div>
  );
}
