import DescriptionCard from '@components/Home/DescriptionCard';
import PointCard from '@components/Home/PointCard';

export default function LandingMain() {
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center p-[16px]">
        <PointCard type="01" />
        <PointCard type="02" />
      </div>
      <div className="mb-[120px] flex w-full flex-col items-center justify-center p-[16px]">
        <p className="mb-[42px] mt-[31px] font-2xl-22px-regular md:font-2xl-28px-bold">
          생산성을 높이는 다양한 설정⚡
        </p>
        <div className="xl:flex xl:flex-row xl:gap-8">
          <DescriptionCard card="01" />
          <DescriptionCard card="02" />
          <DescriptionCard card="03" />
        </div>
      </div>
    </>
  );
}
