import { MouseEvent, PropsWithChildren } from 'react';

import cn from '@lib/utils/cn';

import Button from './Button';

interface Props {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
}

export default function PrimaryButton({
  children,
  onClick,
  disabled = true,
  className = '',
}: PropsWithChildren<Props>) {
  return (
    <Button
      className={cn(
        'cursor-pointer border border-border-gray bg-purple text-white dark:border-[#525252]',
        disabled && 'bg-gray-200 dark:border-none dark:bg-[#424141]',
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
