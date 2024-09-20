import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

export type RestDayViewType = '마감일' | '날짜';

export const restDayViewValues = {
  dDay: '마감일',
  date: '날짜',
} as const;

interface DashboardSideMenuContextType {
  restDayView: RestDayViewType;

  handleRestDayView: (value: RestDayViewType) => void;
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

  const handleRestDayView = useCallback(
    (value: RestDayViewType) => {
      setRestDayView(value);
    },
    [setRestDayView]
  );

  const value = useMemo(
    () => ({ restDayView, handleRestDayView }),
    [restDayView, handleRestDayView]
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
