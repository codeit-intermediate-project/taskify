import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  useForm,
} from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';
import Image from 'next/image';

import cn from '@lib/utils/cn';

type Props<T extends FieldValues> = {
  id: Path<T>;
  label: string;
  type: string;
  onVisible?: (name: string) => void;
  onTrigger?: () => void;
  placeholder: string;
  register: ReturnType<typeof useForm<T>>['register'];
  validation: RegisterOptions<T, Path<T>>;
  errors: FieldErrors;
  className?: string;
  disabled?: boolean;
};

function Input<T extends FieldValues>({
  id,
  label,
  type,
  onVisible,
  placeholder,
  register,
  onTrigger,
  validation,
  errors,
  className = '',
  disabled = false,
}: Props<T>) {
  const { ref, ...rest } = register(id, validation);
  const name = id as string;
  const visibleIcon =
    type !== 'password' ? '/icon/visibility.png' : '/icon/invisibility.png';

  const handleVisible = () => {
    if (onVisible) {
      onVisible(name as string);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (onTrigger) onTrigger();
    if (rest.onBlur) rest.onBlur(event);
  };

  return (
    <div className="relative flex flex-col gap-2">
      <label
        className="text-black-600 font-md-14px-regular dark:text-gray-200 md:font-lg-16px-regular"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={cn(
          'bg-secondary-100 rounded-xl border border-border-gray px-4 py-[13px] font-lg-16px-regular placeholder:text-gray-300 placeholder:font-lg-16px-regular dark:border-[#757575]',
          errors[name] ? 'border-red' : '',
          disabled ? 'dark:bg-[#616161]' : 'dark:bg-[#525252]',
          className
        )}
        type={type}
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        ref={ref}
        {...rest}
        onBlur={handleBlur}
      />
      {onVisible && (
        <button
          type="button"
          className="absolute right-4 top-12"
          onClick={handleVisible}
        >
          <Image
            width={24}
            height={24}
            src={visibleIcon}
            alt="visibility btn"
          />
        </button>
      )}
      {errors && (
        <ErrorMessage
          className="pl-6 text-red font-lg-14px-semibold"
          name={name}
          errors={errors}
          as="span"
        />
      )}
    </div>
  );
}

export default Input;
