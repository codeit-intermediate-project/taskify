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
        'cursor-pointer border border-border-gray bg-violet text-white dark:border-violet',
        disabled && 'bg-gray-200 dark:border-gray-300 dark:bg-gray-300',
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
