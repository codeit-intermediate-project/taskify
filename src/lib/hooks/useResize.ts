import { useEffect } from 'react';

const useResize = (callback: () => void) => {
  useEffect(() => {
    const handleResize = () => {
      callback();
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // 초기 설정

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [callback]);
};

export default useResize;
