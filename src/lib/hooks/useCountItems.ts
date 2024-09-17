import { useState, useCallback } from 'react';

import useResize from './useResize';

const useCountItemsByWidth = (mobile: number, tablet: number, pc: number) => {
  const calculateItemCount = useCallback(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width > 1280) {
        return pc;
      }
      if (width >= 768) {
        return tablet;
      }
      return mobile;
    }
    return mobile;
  }, [mobile, tablet, pc]);

  const [itemCount, setItemCount] = useState<number>(calculateItemCount());

  useResize(() => {
    setItemCount(calculateItemCount());
  });

  return itemCount;
};

export default useCountItemsByWidth;
