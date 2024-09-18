import { useContext, useRef } from 'react';

import { motion } from 'framer-motion';

import { DashBoardContext } from '@core/contexts/DashboardContext';

interface FloatingColumnListProps {
  onClickMoveFloatingButton: (index: number) => void;
  focusIndex: number;
}
export default function FloatingColumnList({
  onClickMoveFloatingButton,
  focusIndex,
}: FloatingColumnListProps) {
  const { columnList } = useContext(DashBoardContext);
  const buttonRefs = useRef<HTMLButtonElement[] | null[]>([]);
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 1, x: 150 },
    show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="flex flex-col"
    >
      {columnList.map((column, index) => (
        <motion.button
          variants={item}
          ref={el => {
            buttonRefs.current[index] = el;
          }}
          key={column.id}
          onClick={() => {
            onClickMoveFloatingButton(index);
          }}
          className={`${index === focusIndex ? 'focused-column' : ''} columns pointer hover:column-hover flex w-full items-center gap-1 pl-2 transition-all duration-300 ease-in-out`}
        >
          <span className="overflow-hidden overflow-ellipsis whitespace-nowrap font-md-14px-medium">
            {column.title}
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
}
