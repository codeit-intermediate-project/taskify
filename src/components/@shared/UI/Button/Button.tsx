import React, { MouseEvent, PropsWithChildren } from 'react';

import { motion } from 'framer-motion';

import cn from '@lib/utils/cn';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
}

export default function Button({
  type = 'button',
  children,
  onClick,
  className,
  disabled = true,
}: PropsWithChildren<Props>) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      className={cn(
        'flex h-[54px] w-36 items-center justify-center rounded-lg font-md-14px-medium md:w-64',
        className
      )}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
