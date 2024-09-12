import { FieldErrors, UseFormRegister } from 'react-hook-form';

import Image from 'next/image';

interface FormValues {
  nickname: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  terms?: boolean;
}

interface InputFieldProps {
  id: keyof FormValues;
  type?: string;
  placeholder: string;
  autoComplete?: string;
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>[keyof FormValues] | undefined;
  validation: object;
  showPassword?: boolean;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InputField({
  id,
  type = 'text',
  placeholder,
  autoComplete,
  showPassword,
  setShowPassword,
  register,
  errors,
  validation,
}: InputFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {placeholder}
      </label>
      <div className="relative">
        <input
          id={id}
          type={showPassword ? 'text' : type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...register(id, validation)}
          className={`mt-1 block w-full rounded-md border bg-white px-3 py-2 focus:outline-none ${
            errors ? 'border-red' : 'border-[#D9D9D9]'
          } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
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
      {errors && <p className="mt-1 text-sm text-red">{errors.message}</p>}
    </div>
  );
}
