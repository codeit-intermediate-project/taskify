import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

export type RestDayViewType = '마감일' | '날짜';
export type SortCardType = '생성일 순' | '마감일 순';
export const restDayViewValues = {
  dDay: '마감일',
  date: '날짜',
} as const;
export const sortCardValues = {
  createAt: '생성일 순',
  dueDate: '마감일 순',
} as const;

interface DashboardSideMenuContextType {
  restDayView: RestDayViewType;
  sortCard: SortCardType;
  handleRestDayView: (value: RestDayViewType) => void;
  handleSortCard: (value: SortCardType) => void;
}

const DashboardSideMenuContext = createContext<
  DashboardSideMenuContextType | undefined
>(undefined);

export default function DashBoardSideMenuProvider({
  children,
}: PropsWithChildren) {
  const [restDayView, setRestDayView] = useState<RestDayViewType>(
    restDayViewValues.date
  );
  const [sortCard, setSortCard] = useState<SortCardType>(
    sortCardValues.createAt
  );

  const handleRestDayView = useCallback(
    (value: RestDayViewType) => {
      setRestDayView(value);
    },
    [setRestDayView]
  );

  const handleSortCard = useCallback(
    (value: SortCardType) => {
      setSortCard(value);
    },
    [setSortCard]
  );
  const value = useMemo(
    () => ({ restDayView, sortCard, handleRestDayView, handleSortCard }),
    [restDayView, sortCard, handleRestDayView, handleSortCard]
  );

  return (
    <DashboardSideMenuContext.Provider value={value}>
      {children}
    </DashboardSideMenuContext.Provider>
  );
}

export const useDashboardSideMenu = () => {
  const context = useContext(DashboardSideMenuContext);
  if (context === undefined) {
    throw new Error(
      'useDashboardSideMenu는 DashBoardSideMenuProvider 하위에서 사용하세요'
    );
  }
  return context;
};
