import { Button } from '@mantine/core';

import PurpleAddIcon from '@components/@shared/UI/PurpleAddIcon';

import FloatingColumnList from './FloatingColumnList';

interface AddColumnButtonProps {
  open: () => void;
  onClickMoveFloatingButton: (index: number) => void;
  focusIndex: number;
}
export default function AddColumnButton({
  open,
  onClickMoveFloatingButton,
  focusIndex,
}: AddColumnButtonProps) {
  return (
    <div className="relative border-gray-100 px-3 md:px-5 xl:min-w-[354px] xl:border-l">
      <div className="mt-[58px] flex h-[66px] w-full items-center justify-center rounded-md border border-gray-200 md:h-[70px]">
        <Button
          onClick={open}
          color="#fff"
          className="h-full w-full text-[#000000]"
        >
          <span className="pr-3 font-2lg-18px-bold">새로운 컬럼 추가하기</span>
          <PurpleAddIcon />
        </Button>
      </div>
      <FloatingColumnList
        focusIndex={focusIndex}
        onClickMoveFloatingButton={onClickMoveFloatingButton}
      />
    </div>
  );
}
