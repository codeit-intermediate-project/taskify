import { useCallback, useEffect, useRef, useState } from 'react';

export default function useScrollToColumn() {
  const divRef = useRef<HTMLDivElement | null>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [focusIndex, setFocusIndex] = useState(0);

  const onClickMoveFloatingButton = (index: number) => {
    setFocusIndex(index);
  };
  const scrollToColumn = useCallback(() => {
    const container = divRef.current;
    const column = columnRefs.current[focusIndex];
    if (container && column) {
      column.scrollIntoView({ behavior: 'smooth', inline: 'start' });
    }
  }, [focusIndex]);

  // 좌우로 스크롤 할 때 플로팅컬럼의 focus가 변경되는 로직 (디바운싱적용)
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleScroll = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      const columnListScrollLeft = divRef.current?.scrollLeft;
      if (columnListScrollLeft === undefined || columnListScrollLeft === null) {
        setFocusIndex(0);
        return;
      }
      const divideColumnIndex = columnListScrollLeft / 354;
      const nextFocusIndex =
        columnListScrollLeft % 354 > 177
          ? Math.ceil(divideColumnIndex)
          : Math.floor(divideColumnIndex);

      if (nextFocusIndex === focusIndex) {
        return;
      }
      if (nextFocusIndex >= columnRefs.current.length) {
        setFocusIndex(columnRefs.current.length - 1);
        return;
      }
      setFocusIndex(nextFocusIndex);
    }, 50);
  }, [debounceTimeoutRef, divRef, focusIndex, columnRefs, setFocusIndex]);

  useEffect(() => {
    // 버튼 눌러서 스크롤 되는 중에는 이벤트 잠깐 꺼짐
    divRef.current?.removeEventListener('scroll', handleScroll);
    scrollToColumn();
    divRef.current?.addEventListener('scroll', handleScroll);
  }, [focusIndex, handleScroll, scrollToColumn]);

  useEffect(() => {
    const currentDiv = divRef.current;
    currentDiv?.addEventListener('scroll', handleScroll);

    return () => {
      currentDiv?.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return { divRef, columnRefs, focusIndex, onClickMoveFloatingButton };
}
