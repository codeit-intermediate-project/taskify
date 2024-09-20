import { motion } from 'framer-motion';

interface SlideInListProps {
  children: React.ReactNode;
  index: number;
  duration?: number;
  delayMultiplier?: number;
  initial?: object;
  animate?: object;
  exit?: object;
  transition?: object;
}

const SlideInList = ({
  children,
  index,
  duration = 0.18, // 지속 시간
  delayMultiplier = 0.15, // 지연 배수
  initial = { y: 20, opacity: 0 },
  animate = { y: 0, opacity: 1 },
  exit = { y: 20, opacity: 0 },
  transition,
}: SlideInListProps) => (
  <motion.div
    initial={initial}
    animate={animate}
    exit={exit}
    transition={{
      duration,
      delay: index * delayMultiplier,
      ...transition,
    }}
  >
    {children}
  </motion.div>
);

export default SlideInList;
