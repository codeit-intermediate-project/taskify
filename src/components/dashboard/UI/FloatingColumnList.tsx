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
    <>
      {columnList.map((column, index) => (
        <button
          ref={el => {
            buttonRefs.current[index] = el;
          }}
          key={column.id}
          onClick={() => {
            onClickMoveFloatingButton(index);
          }}
          className={`${index === focusIndex ? 'focused-column' : ''} pointer hover:column-hover flex w-full items-center gap-1 pl-2 transition-all duration-300 ease-in-out`}
        >
          <span className="overflow-hidden overflow-ellipsis whitespace-nowrap font-md-14px-medium">
            {column.title}
          </span>
        </button>
      ))}
    </>
  );
}
