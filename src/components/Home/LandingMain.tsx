import DescriptionCard from '@components/Home/DescriptionCard';
import PointCard from '@components/Home/PointCard';

export default function LandingMain() {
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center p-[16px]">
        <PointCard type="01" />
        <PointCard type="02" />
      </div>
      <div className="mb-[120px] flex w-full flex-col items-center justify-center">
        <p className="mb-[42px] mt-[31px] font-2xl-22px-regular">
          생산성을 높이는 다양한 설정⚡
        </p>
        <DescriptionCard
          title="대시보드 설정"
          des="대시보드 사진과 이름을 변경할 수 있어요."
          image="/images/landing3.png"
        />
        <DescriptionCard
          title="초대"
          des="새로운 팀원을 초대할 수 있어요."
          image="/images/landing4.png"
        />
        <DescriptionCard
          title="구성원"
          des="구성원을 초대하고 내보낼 수 있어요."
          image="/images/landing5.png"
        />
      </div>
    </>
  );
}
