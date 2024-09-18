import { motion } from 'framer-motion';
import Image from 'next/image';

import { useTheme } from '@core/contexts/ThemeContext';
import dark from '@icons/dark_mode.svg';
import light from '@icons/light_mode.svg';

export default function FloatingThemeChange() {
  const { toggleDarkMode, darkMode } = useTheme();
  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
  };
  return (
    <button
      onClick={toggleDarkMode}
      className="fixed bottom-[30px] right-[30px] flex h-[30px] w-[50px] cursor-pointer items-center justify-start rounded-full bg-[rgba(233,229,96,0.73)] px-1 py-3.5 opacity-30 shadow-md hover:opacity-100 dark:justify-end dark:bg-[rgba(31,25,100,0.68)] md:h-[60px] md:w-[100px]"
    >
      <motion.div
        className="relative h-[25px] w-[25px] rounded-full bg-white md:h-[50px] md:w-[50px]"
        layout
        transition={spring}
      >
        <Image src={darkMode ? dark : light} alt="모드변경" fill />
      </motion.div>
    </button>
  );
}
