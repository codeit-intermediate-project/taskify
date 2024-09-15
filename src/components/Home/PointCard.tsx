import Image from 'next/image';

interface PointCardProps {
  point: string;
  title: string;
  image: string;
  alt: string;
}

interface MyComponentProps {
  type: string;
}
export default function PointCard({ type }: MyComponentProps) {
  const type1: PointCardProps = {
    point: '01',
    title: '일의 우선순위를 관리하세요',
    image: '/images/landing1.png',
    alt: 'landing1',
  };

  const type2: PointCardProps = {
    point: '02',
    title: '해야 할 일을 등록하세요',
    image: '/images/landing2.png',
    alt: 'landing2',
  };

  const { point, title, image, alt } = type === '01' ? type1 : type2;

  return (
    <div className="mb-[59px] flex w-full flex-col items-center rounded-lg bg-[rgba(23,23,23,1)] xl:h-[600px] xl:w-[1200px] xl:flex-row">
      <div className="flex flex-col items-center">
        <h2 className="mt-[60px] text-gray-300 font-2lg-18px-medium">
          Point{point}
        </h2>
        <p className="mt-[61px] text-white font-4xl-36px-bold">{title}</p>
      </div>
      <div className="mt-[194px] w-full">
        <Image src={image} alt={alt} width={260} height={248} priority />
      </div>
    </div>
  );
}
