import { motion } from 'framer-motion';

interface SlideInListProps {
  children: React.ReactNode;
  index: number;
  initial?: object;
  animate?: object;
  exit?: object;
  transition?: object;
}

const SlideInList = ({
  children,
  index,
  initial = { y: 20, opacity: 0 },
  animate = { y: 0, opacity: 1 },
  exit = { y: 20, opacity: 0 },
  transition = { duration: 0.18 },
}: SlideInListProps) => (
  <motion.div
    initial={initial}
    animate={animate}
    exit={exit}
    transition={{ ...transition, delay: index * 0.15 }}
  >
    {children}
  </motion.div>
);

export default SlideInList;
