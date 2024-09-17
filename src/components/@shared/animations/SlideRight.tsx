import { motion } from 'framer-motion';

import cn from '@lib/utils/cn';

interface SlideRightProps {
  children: React.ReactNode;
  initial?: object;
  whileHover?: object;
  transition?: object;
  className?: string;
}

const SlideRight = ({
  children,
  initial,
  whileHover = { x: 5 },
  transition = { duration: 0.3 },
  className,
}: SlideRightProps) => (
  <motion.div
    initial={initial}
    whileHover={whileHover}
    transition={transition}
    className={cn(className)}
  >
    {children}
  </motion.div>
);

export default SlideRight;
