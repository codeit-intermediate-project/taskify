import React, { memo, MouseEvent, PropsWithChildren } from 'react';

import { motion } from 'framer-motion';

import cn from '@lib/utils/cn';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const AcceptButton = memo(function AcceptButton({
  type = 'button',
  children,
  onClick,
  className,
}: PropsWithChildren<Props>) {
  return (
    <motion.button
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className={cn(
        'flex w-full justify-center rounded-[4px] py-[7px] font-md-14px-medium md:px-[6px]',
        className
      )}
      type={type}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
});

export default AcceptButton;
