import React from 'react';

import { Divider, Flex, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';

import { useRoot } from '@core/contexts/RootContexts';
import showErrorNotification from '@lib/utils/notifications/showErrorNotification';

import LinkButton from '../UI/Button/LinkButton';
import Rotate from '../animations/Rotate';

import HeaderInviteModal from './HeaderInviteModal';
import HeaderTitle from './HeaderTitle';
import MembersProfile from './MembersProfile';
import UserProfile from './UserProfile';

export default function AuthHeader() {
  const { dashboardid } = useRoot();
  const [opened, { open, close }] = useDisclosure();

  const handleInvitedModalOpen = () => {
    if (!dashboardid)
      return showErrorNotification({ message: '지정된 대시보드가 없습니다.' });
    open();
  };

  return (
    <Flex className="fixed left-0 right-0 top-0 z-50 h-[60px] min-w-[300px] items-center justify-end border-b-[1px] border-border-gray bg-white pl-[84px] pr-3 dark:border-b-black-500 dark:bg-black-700 md:h-[70px] md:px-10 md:pl-[200px] md:pr-10 xl:px-[70px] xl:pl-[340px] xl:pr-20">
      <HeaderTitle />
      {dashboardid && (
        <>
          <Group className="shrink-0 gap-[6px] pl-4 font-md-14px-medium">
            <LinkButton
              href={`/dashboard/${dashboardid}/edit`}
              className="flex items-center dark:border-gray-400 dark:text-gray-300 dark:hover:bg-black-600 md:gap-2"
            >
              <Rotate className="flex">
                <Image
                  className="hidden md:inline"
                  width={20}
                  height={20}
                  src="/icons/settings.png"
                  alt="settings"
                />
              </Rotate>
              관리
            </LinkButton>
            <HeaderInviteModal opened={opened} onClose={close}>
              <button
                onClick={handleInvitedModalOpen}
                className="flex items-center rounded-lg border border-border-gray bg-transparent px-3 py-[3px] text-gray-400 hover:bg-gray-200 dark:border-gray-400 dark:text-gray-300 dark:hover:bg-black-600 md:gap-2 md:px-4 md:py-[6px]"
              >
                <Rotate className="flex">
                  <Image
                    className="hidden md:inline"
                    width={20}
                    height={20}
                    src="/icons/add_box.png"
                    alt="invitation"
                  />
                </Rotate>
                초대하기
              </button>
            </HeaderInviteModal>
          </Group>
          <MembersProfile />
          <Divider
            className="ml-4 mr-1 bg-border-gray dark:border-gray-500"
            my="sm"
            orientation="vertical"
          />
        </>
      )}
      <UserProfile />
    </Flex>
  );
}
