import { motion } from 'framer-motion';

import cn from '@lib/utils/cn';

interface RotateProps {
  children: React.ReactNode;
  rotationDegrees?: number;
  className?: string;
}

const Rotate = ({
  className,
  children,
  rotationDegrees = 360,
}: RotateProps) => (
  <motion.div
    whileHover={{ rotate: rotationDegrees }}
    animate={{ rotate: 0 }}
    transition={{ type: 'spring', stiffness: 300 }}
    className={cn(className)}
  >
    {children}
  </motion.div>
);

export default Rotate;
