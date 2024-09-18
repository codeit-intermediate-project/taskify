import { motion } from 'framer-motion';

import cn from '@lib/utils/cn';

interface GradientFrameProps {
  children: React.ReactNode;
  whileTap?: object;
  whileHover?: object;
  className?: string;
}

const GradientFrame = ({
  children,
  whileTap = { scale: 0.98 },
  whileHover = {
    boxShadow: '0 0 4px rgba(85, 52, 218, 0.5), 0 0 8px rgba(85, 52, 218, 0.5)',
    transition: { duration: 0.08 },
  },
  className,
}: GradientFrameProps) => (
  <motion.div
    whileTap={whileTap}
    whileHover={whileHover}
    className={cn(className)}
  >
    {children}
  </motion.div>
);

export default GradientFrame;
