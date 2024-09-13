import React, { MouseEvent, PropsWithChildren } from 'react';

import cn from '@lib/utils/cn';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export default function AcceptButton({
  type = 'button',
  children,
  onClick,
  className,
}: PropsWithChildren<Props>) {
  return (
    <button
      className={cn(
        'flex w-full justify-center rounded-[4px] py-[7px] font-md-14px-medium md:px-[6px]',
        className
      )}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
