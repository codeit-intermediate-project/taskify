import { MouseEvent, PropsWithChildren } from 'react';

import Button from './Button';

interface Props {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export default function SecondaryButton({
  children,
  onClick,
  disabled,
}: PropsWithChildren<Props>) {
  return (
    <Button
      type="submit"
      className="border border-border-gray"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
