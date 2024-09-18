import { useInView } from 'react-intersection-observer';

import { motion } from 'framer-motion';

import DescriptionCard from '@components/Home/DescriptionCard';
import PointCard from '@components/Home/PointCard';

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function LandingMain() {
  const [ref1, inView1] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [ref3, inView3] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [ref4, inView4] = useInView({ triggerOnce: false, threshold: 0.1 });

  return (
    <>
      <motion.div
        className="flex w-full flex-col items-center justify-center p-[16px]"
        initial="hidden"
        animate={inView1 ? 'visible' : 'hidden'}
        ref={ref1}
        variants={childVariants}
      >
        <PointCard type="01" />
      </motion.div>

      <motion.div
        className="flex w-full flex-col items-center justify-center p-[16px]"
        initial="hidden"
        animate={inView2 ? 'visible' : 'hidden'}
        ref={ref2}
        variants={childVariants}
      >
        <PointCard type="02" />
      </motion.div>

      <motion.div
        className="mb-[120px] flex w-full flex-col items-center justify-center p-[16px]"
        initial="hidden"
        animate={inView3 ? 'visible' : 'hidden'}
        ref={ref3}
        variants={childVariants}
      >
        <p className="mb-[42px] mt-[31px] font-2xl-22px-regular md:font-2xl-28px-bold">
          생산성을 높이는 다양한 설정⚡
        </p>

        <motion.div
          className="xl:flex xl:flex-row xl:gap-8"
          initial="hidden"
          animate={inView4 ? 'visible' : 'hidden'}
          ref={ref4}
          variants={childVariants}
        >
          <DescriptionCard card="01" />
          <DescriptionCard card="02" />
          <DescriptionCard card="03" />
        </motion.div>
      </motion.div>
    </>
  );
}
