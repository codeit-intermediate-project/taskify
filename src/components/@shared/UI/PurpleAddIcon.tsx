import Image from 'next/image';

import addPurple from '@icons/add_purple.svg';

import Rotate from '../animations/Rotate';

export default function PurpleAddIcon() {
  return (
    <span className="flex h-[22px] w-[22px] items-center justify-center rounded bg-violet-white dark:bg-gray-400">
      <Rotate>
        <Image
          src={addPurple}
          alt="보라색 더하기 아이콘"
          width={16}
          height={16}
        />
      </Rotate>
    </span>
  );
}
