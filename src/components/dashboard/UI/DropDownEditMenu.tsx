import { Menu } from '@mantine/core';
import Image from 'next/image';

import { useTheme } from '@core/contexts/ThemeContext';
import kebob from '@icons/kebab.png';

interface EditMenuProps {
  openEdit: () => void;
  openConfirm: () => void;
}

export default function DropDownEditMenu({
  openEdit,
  openConfirm,
}: EditMenuProps) {
  const { darkMode } = useTheme();
  return (
    <Menu
      styles={
        darkMode
          ? {
              dropdown: {
                backgroundColor: '#4B4B4B',
                border: '#4B4B4B',
                color: '#D9D9D9',
              },
            }
          : {}
      }
    >
      <Menu.Target>
        <button className="relative h-5 w-5 md:h-[28px] md:w-[28px]">
          <Image src={kebob} alt="카드관리메뉴" fill />
        </button>
      </Menu.Target>
      <Menu.Dropdown className="flex flex-col gap-1 px-1.5 py-[7px]">
        <Menu.Item
          onClick={() => {
            openEdit();
          }}
          className="flex h-8 w-[81px] items-center justify-center hover:bg-violet-white hover:text-violet"
        >
          수정하기
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            openConfirm();
          }}
          className="flex h-8 w-[81px] items-center justify-center hover:bg-violet-white hover:text-violet"
        >
          삭제하기
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
