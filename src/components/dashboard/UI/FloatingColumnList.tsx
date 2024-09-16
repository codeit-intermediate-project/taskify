import { useContext, useRef } from 'react';

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

  return (
    <div className="absolute right-10 top-[300px] hidden flex-col items-end gap-2 text-gray-300 xl:flex">
      {columnList.map((column, index) => (
        <button
          ref={el => {
            buttonRefs.current[index] = el;
          }}
          key={column.id}
          onClick={() => {
            onClickMoveFloatingButton(index);
          }}
          className={`${index === focusIndex ? 'focused-column' : ''} pointer hover:column-hover flex items-center gap-1 rounded-[20px] transition-all duration-300 ease-in-out`}
        >
          <span className="pr-1font-lg-16px-semibold">{column.title}</span>
        </button>
      ))}
    </div>
  );
}
