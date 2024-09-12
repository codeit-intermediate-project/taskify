import useDevice from '@lib/hooks/useDevice';
import useGetInvitations from '@lib/hooks/useGetInvitations';
import useHandleInvitationResponse from '@lib/hooks/useHandleInvitationResponse';
import useInvitationsList from '@lib/hooks/useInvitationsList';
import useSearch from '@lib/hooks/useSearch';

import AcceptButton from './UI/AcceptButton';
import InviteHeader from './UI/InviteHeader';
import NoDashboard from './UI/NoDashboard';
import ReturnButton from './UI/ReturnButton';
import SearchForm from './UI/SearchForm';

import type { InvitationsDto } from '@core/dtos/InvitationsDto';

export default function InvitedDashboardList() {
  const { data, isLoading, error, callApi, hasNoInvitations } =
    useGetInvitations();
  const deviceType = useDevice();
  const { handleInvitationResponse } = useHandleInvitationResponse(() =>
    callApi(undefined)
  );
  const invitationList = useInvitationsList(data!);

  // 검색 기능
  const { filteredResults, handleSearch, handleReset } = useSearch(
    {
      list: invitationList,
      totalCount: invitationList.length,
    },
    () => {},
    (invitation: InvitationsDto) => invitation.dashboard.title
  );

  // 렌더링 결정
  const renderContent = () => {
    if (isLoading) return <p>로딩 중...</p>;
    if (error) return <p>오류가 발생했습니다</p>;
    if (hasNoInvitations)
      return <NoDashboard text="아직 초대받은 대시보드가 없어요" />;

    return (
      <>
        <SearchForm onSearch={handleSearch} />
        {(deviceType === 'tablet' || deviceType === 'desktop') && (
          <InviteHeader />
        )}
        {isLoading && <p>초대 목록을 불러오고 있습니다...</p>}
        {error && <p>오류가 발생했습니다</p>}
        <ul className="flex flex-col gap-[20px]">
          {filteredResults.length === 0 ? (
            <li className="mt-12 flex flex-col items-center justify-center gap-2">
              <NoDashboard text="검색 결과에 해당하는 대시보드가 없어요." />
              <ReturnButton buttonText="전체 목록 보기" onClick={handleReset} />
            </li>
          ) : (
            filteredResults.map((invitation: InvitationsDto) => (
              <li
                key={invitation.id}
                className="relative block w-full border-b border-gray-100 pb-[20px] text-center text-black-600 font-md-14px-regular md:flex md:font-lg-16px-regular xl:px-10"
              >
                {deviceType === 'mobile' && <InviteHeader />}
                <p className="absolute left-16 top-0 w-4/6 truncate md:static md:w-1/3 md:text-left">
                  {invitation.dashboard.title}
                </p>
                <p className="absolute left-16 top-7 w-4/6 md:static md:w-1/3 md:text-left">
                  {invitation.inviter.nickname}
                </p>
                <div className="mt-[14px] flex justify-center gap-[10px] md:mt-0 md:w-1/3 md:gap-0">
                  <AcceptButton
                    divClassName="bg-violet"
                    buttonClassName="text-white"
                    onClick={() => handleInvitationResponse(invitation, true)}
                  >
                    수락
                  </AcceptButton>
                  <AcceptButton
                    divClassName="border-1 md:ml-2 border border-gray-200"
                    buttonClassName="text-violet"
                    onClick={() => handleInvitationResponse(invitation, false)}
                  >
                    거절
                  </AcceptButton>
                </div>
              </li>
            ))
          )}
        </ul>
      </>
    );
  };

  return (
    <section className="flex flex-col gap-6 rounded-2xl bg-white px-6 pb-8 pt-6">
      <h1
        className="whitespace-normal break-words font-2xl-24px-bold max-md:font-xl-20px-bold"
        style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}
      >
        초대받은 대시보드
      </h1>
      {renderContent()}
    </section>
  );
}
