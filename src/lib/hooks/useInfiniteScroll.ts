import { useEffect, useRef } from 'react';

const useInfiniteScroll = (
  loadMore: () => void,
  hasMore: boolean | undefined
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    // 이전 옵저버가 존재하면 정리
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && hasMore) {
            loadMore(); // 추가 데이터 로드
          }
        });
      },
      { threshold: 1.0 }
    );

    const currentTarget = targetRef.current;

    if (currentTarget) {
      observerRef.current.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observerRef.current?.unobserve(currentTarget);
      }
      observerRef.current?.disconnect();
    };
  }, [loadMore, hasMore]);

  // 스크롤 위치 복원
  useEffect(() => {
    window.scrollTo(0, scrollYRef.current); // 스크롤 위치 복원
  }, [loadMore]);

  // 스크롤 위치 저장
  const saveScrollPosition = () => {
    scrollYRef.current = window.scrollY; // 현재 스크롤 위치 저장
  };

  return { targetRef, saveScrollPosition }; // 감지할 요소의 ref와 스크롤 위치 저장 함수 반환
};

export default useInfiniteScroll;
