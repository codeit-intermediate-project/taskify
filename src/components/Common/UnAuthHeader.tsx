import Link from 'next/link';

export default function UnAuthHeader() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-[60px] items-center justify-between border-b-[1px] border-gray-200 bg-white px-6 dark:border-black-700 dark:bg-black-700 md:h-[70px] md:px-10 xl:px-[70px]">
      <Link
        className="h-6 w-7 bg-[url('/images/small_logo.png')] bg-cover bg-center md:h-[39px] md:w-[130px] md:bg-[url('/images/large_logo.png')]"
        href="/"
      />
      <div className="flex items-center gap-6 font-md-14px-regular md:font-lg-16px-regular">
        <Link href="/login">로그인</Link>
        <Link href="/signup">회원가입</Link>
      </div>
    </header>
  );
}
