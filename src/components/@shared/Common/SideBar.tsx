import { Flex, Stack, Text, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';

import useDevice from '@lib/hooks/useDevice';

import Rotate from '../animations/Rotate';

import Logo from './Logo';
import DashboardAddModal from './Modals/DashboardAddModal';
import SideBarList from './SideBarList';

export default function SideBar() {
  const device = useDevice();
  const [opened, { open, close }] = useDisclosure(false);

  const isMobile = device === 'mobile';

  return (
    <Stack className="fixed bottom-0 left-0 top-0 z-50 w-[67px] items-center border-r border-border-gray bg-white pt-5 text-gray-400 md:w-40 md:items-stretch md:px-[13px] xl:w-[300px]">
      <Logo />
      <DashboardAddModal opened={opened} onClose={close}>
        <Flex className="mt-4 items-center justify-between md:mt-10">
          {!isMobile && (
            <Text className="font-xs-12px-semibold">Dash Boards</Text>
          )}
          <UnstyledButton
            className="relative flex h-5 w-5 items-center justify-center"
            onClick={open}
          >
            <Rotate className="flex">
              <Image
                width={20}
                height={20}
                src="/icons/add_box.png"
                alt="Dashboard create"
              />
            </Rotate>
          </UnstyledButton>
        </Flex>
      </DashboardAddModal>
      <SideBarList />
    </Stack>
  );
}
