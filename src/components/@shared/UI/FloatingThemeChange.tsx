import { motion } from 'framer-motion';

import useDarkMode from '@lib/hooks/useDarkMode';

export default function FloatingThemeChange() {
  const { toggleDarkMode, darkMode } = useDarkMode();
  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
  };
  return (
    <button
      onClick={toggleDarkMode}
      className={`${darkMode ? 'justify-end' : 'justify-start'} fixed bottom-[30px] right-[30px] flex h-[60px] w-[100px] cursor-pointer items-center rounded-full bg-[rgba(233,233,233,0.5)] px-1 py-3.5 opacity-30 shadow-md hover:opacity-100`}
    >
      <motion.div
        className="h-[50px] w-[50px] rounded-full bg-white"
        layout
        transition={spring}
      >
        {darkMode ? '다크' : '안다크'}
      </motion.div>
    </button>
  );
}
