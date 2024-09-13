import { useEffect, useCallback } from 'react';

const useInfiniteScroll = (
  loadMore: () => void,
  hasMore: boolean | undefined
) => {
  const handleScroll = useCallback(() => {
    const isAtBottom =
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100;

    // hasMore, 추가 데이터를 요청할 상태
    if (isAtBottom && hasMore) {
      loadMore();
    }
  }, [loadMore, hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
};

export default useInfiniteScroll;
