import ProfileEditCardServer from '@components/MyPage/ProfileEditCardServer';

export default async function MyPage() {
  return (
    <main className="ml-[67px] mt-[60px] md:ml-[160px] md:mt-[70px] xl:ml-[300px]">
      <div className="max-w-[630px] gap-6 px-3 py-4">
        <ProfileEditCardServer />
      </div>
    </main>
  );
}
