import React, { PropsWithChildren } from 'react';

import { Avatar, Flex, Menu, Stack, Text } from '@mantine/core';
import Image from 'next/image';

import { useRoot } from '@core/contexts/RootContexts';

import LinkButton from '../UI/Button/LinkButton';

function DropdownItem({ children, href }: PropsWithChildren<{ href: string }>) {
  return (
    <LinkButton
      className="rounded border-0 hover:bg-violet-white hover:text-violet dark:hover:bg-gray-500"
      href={href}
    >
      <Flex className="h-8 items-center justify-center dark:text-gray-200">
        {children}
      </Flex>
    </LinkButton>
  );
}

export default function UserProfile() {
  const { user, logout } = useRoot();

  return (
    <Menu>
      <Menu.Target>
        <Flex className="cursor-pointer items-center gap-3 rounded-md px-3 py-2 hover:bg-violet-white dark:hover:bg-black-600">
          {user && (
            <>
              <Avatar>
                {user.profileImageUrl && (
                  <Image
                    width={38}
                    height={38}
                    src={user.profileImageUrl}
                    alt="my profile"
                  />
                )}
              </Avatar>
              <Text className="hidden font-lg-16px-medium md:block">
                {user.nickname}
              </Text>
            </>
          )}
        </Flex>
      </Menu.Target>
      <Menu.Dropdown className="rounded-lg p-1 dark:border-gray-500 dark:bg-black-600">
        <Stack className="gap-1">
          <button
            className="rounded border-0 border-border-gray bg-transparent px-3 py-[3px] text-gray-400 hover:bg-violet-white hover:text-violet dark:hover:bg-gray-500 md:px-4 md:py-[6px]"
            onClick={logout}
          >
            <Flex className="h-8 items-center justify-center dark:text-gray-200">
              로그아웃
            </Flex>
          </button>
          <DropdownItem href="/mypage">내 정보</DropdownItem>
          <DropdownItem href="/mydashboard">내 대시보드</DropdownItem>
        </Stack>
      </Menu.Dropdown>
    </Menu>
  );
}
