import Image from 'next/image';

import DashboardEmpty from '@images/dashboard_empty.png';

interface NoDashboardProps {
  text: string;
}

export default function NoDashboard({ text }: NoDashboardProps) {
  return (
    <div className="flex flex-col items-center gap-4 pb-10 pt-5 md:gap-6 md:pb-[120px] md:pt-10">
      <Image
        src={DashboardEmpty}
        alt="빈 대시보드 이미지"
        width={100}
        height={100}
      />
      <p className="text-center text-base font-normal text-gray-300 md:text-lg">
        {text}
      </p>
    </div>
  );
}
