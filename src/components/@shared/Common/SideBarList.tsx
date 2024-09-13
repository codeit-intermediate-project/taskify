import React, { useCallback, useEffect } from 'react';

import { Flex, Stack } from '@mantine/core';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useRoot } from '@core/contexts/RootContexts';
import useDashboardsPagination from '@lib/hooks/useDashboardsPagination';
import useDevice from '@lib/hooks/useDevice';
import cn from '@lib/utils/cn';

import SideBarPagination from './SideBarPagination';

export default function SideBarList() {
  const device = useDevice();
  const router = useRouter();
  const { dashboardid, setDashboardid, dashboardsFlag, setDashboardsFlag } =
    useRoot();
  const {
    currentPage,
    totalItems,
    data: dashboards,
    handlePageChange,
    fetchData,
  } = useDashboardsPagination();

  const isMobile = device === 'mobile';

  /** useRoot의 setDashboardid를 업데이트해야 헤더에 상태 반영 가능 */
  const redirectDashboard = useCallback(
    (id: number) => {
      setDashboardid(String(id));
      router.push(`/dashboard/${id}`);
    },
    [router, setDashboardid]
  );

  const handleDashboardClick = (id: number) => {
    redirectDashboard(id);
  };

  useEffect(() => {
    if (dashboardsFlag) {
      fetchData();
      setDashboardsFlag(false);
    }
  }, [dashboardsFlag, fetchData, setDashboardsFlag]);

  return (
    <Stack className="items-center gap-2 md:items-stretch">
      {dashboards &&
        dashboards?.map(dashboard => (
          <Flex
            key={dashboard.id}
            className={cn(
              'h-[43px] items-center rounded hover:border-2 hover:border-blue',
              dashboard.id === Number(dashboardid) && 'bg-violet-white'
            )}
            onClick={() => handleDashboardClick(dashboard.id)}
          >
            <button className="flex h-10 w-10 items-center justify-center">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: dashboard.color }}
                aria-label="link button"
              />
            </button>
            {!isMobile && (
              <Flex className="items-center gap-2">
                <span className="h-[26px] max-w-[75px] overflow-hidden text-ellipsis whitespace-nowrap font-lg-16px-medium xl:max-w-[200px] xl:font-2lg-18px-medium">
                  {dashboard.title}
                </span>
                {dashboard.createdByMe && (
                  <Image
                    width={16}
                    height={12}
                    src="/icons/crown.png"
                    alt="createdByMe"
                  />
                )}
              </Flex>
            )}
          </Flex>
        ))}
      <SideBarPagination
        currentPage={currentPage}
        totalItems={totalItems}
        onPageChange={handlePageChange}
        itemsPerPage={10}
      />
    </Stack>
  );
}
