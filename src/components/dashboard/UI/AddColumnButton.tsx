import { Button } from '@mantine/core';

import PurpleAddIcon from '@components/@shared/UI/PurpleAddIcon';

interface AddColumnButtonProps {
  open: () => void;
  clearErrors: () => void;
}
export default function AddColumnButton({
  open,
  clearErrors,
}: AddColumnButtonProps) {
  return (
    <div className="relative border-gray-100 px-3 md:px-5 xl:mr-[354px] xl:min-w-[354px]">
      <div className="mt-[58px] flex h-[66px] w-full items-center justify-center rounded-md border border-gray-200 dark:border-black-500 md:h-[70px]">
        <Button
          onClick={() => {
            clearErrors();
            open();
          }}
          color="#fff"
          className="h-full w-full text-[#000000] dark:bg-black-500"
        >
          <span className="pr-3 font-2lg-18px-bold dark:text-gray-200">
            새로운 컬럼 추가하기
          </span>
          <PurpleAddIcon />
        </Button>
      </div>
    </div>
  );
}
