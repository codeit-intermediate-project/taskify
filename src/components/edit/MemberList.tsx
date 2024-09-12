/* eslint-disable import/order */
/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */

'use client';

import { useCallback } from 'react';

import { getMembers, deleteMember } from '@core/api/columnApis';

import Image from 'next/image';

import Pagination from '@/src/components/edit/Pagination';
import usePagination from '@/src/lib/hooks/usePagination';

interface MemberListProps {
  dashboardId: number;
}

// 구성원 데이터 타입 정의
interface Member {
  id: number;
  nickname: string;
  profileImageUrl?: string | null;
}

// 프로필 이미지가 없을 시 사용 할 컬러 팔레트
const colorPalette = [
  '#FFFFFF',
  '#FF0000',
  '#FF8000',
  '#FFFF00',
  '#64FE2E',
  '#04B431',
  '#00BFFF',
  '#0080FF',
  '#08088A',
  '#8000FF',
  '#FF0080',
  '#000000',
];

// 해시 함수를 이용한 색상 결정 함수
const getColorFromName = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colorPalette.length;
  return colorPalette[index];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getRandomColor = () => {
  return colorPalette[Math.floor(Math.random() * colorPalette.length)];
};

export default function MemberList({ dashboardId }: MemberListProps) {
  const itemsPerPage = 4;

  // 데이터를 가져오는 함수 정의
  const fetchMembers = useCallback(
    async (page: number, size: number): Promise<Member[]> => {
      const response = await getMembers(dashboardId);
      const formattedMembers = response.members.map(member => ({
        ...member,
        profileImageUrl: member.profileImageUrl ?? undefined,
      }));
      return formattedMembers.slice((page - 1) * size, page * size);
    },
    [dashboardId]
  );

  // usePagination 훅 사용
  const {
    currentPage,
    handlePageChange,
    data: members,
  } = usePagination<Member>({
    fetchData: fetchMembers,
    itemsPerPage,
    totalItems: 0, // 초기값
  });

  // 멤버 삭제
  const handleDeleteMember = async (memberId: number) => {
    await deleteMember(dashboardId, memberId);
    handlePageChange(1);
  };

  return (
    <div className="max-w-[92%] rounded-md bg-white p-6 shadow md:mx-0 md:max-w-[544px] xl:max-w-[620px]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">구성원</h2>
        <Pagination
          currentPage={currentPage}
          totalItems={members.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>

      <div>
        <div className="mb-2 text-gray-600 font-lg-16px-regular">이름</div>
        {members.map((member: Member) => (
          <div
            key={member.id}
            className="flex items-center justify-between border-b border-gray-100 py-2"
          >
            <div className="flex items-center gap-x-2">
              {member.profileImageUrl ? (
                <Image
                  src={member.profileImageUrl}
                  alt={`${member.nickname}의 프로필 이미지`}
                  width={34}
                  height={34}
                  className="mr-2 h-10 w-10 rounded-full"
                />
              ) : (
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white font-lg-14px-semibold"
                  style={{ backgroundColor: getColorFromName(member.nickname) }}
                >
                  {member.nickname.charAt(0).toUpperCase()}
                </div>
              )}
              <div>{member.nickname}</div>
            </div>
            <button
              type="button"
              onClick={() => handleDeleteMember(member.id)}
              className="flex h-8 w-20 items-center justify-center rounded border border-solid border-gray-200 text-violet font-md-14px-medium"
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
