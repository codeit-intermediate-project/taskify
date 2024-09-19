import { useState } from 'react';
import Draggable from 'react-draggable';

import { Affix, Combobox, useCombobox } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

import PurpleAddIcon from '@components/@shared/UI/PurpleAddIcon';
import {
  restDayViewValues,
  type RestDayViewType,
} from '@core/contexts/DashboardSideMenuContext';
import { useDashboardSideMenu } from '@core/contexts/DashboardSideMenuContext';
import arrowDropDown from '@icons/arrow_drop_down.png';
import arrowLeft from '@icons/arrow_left_purple.svg';
import arrowRight from '@icons/arrow_right_purple.svg';

import FloatingColumnList from './FloatingColumnList';

interface SideMenuProps {
  focusIndex: number;
  onClickMoveFloatingButton: (index: number) => void;
  onClickCreateOpen: () => void;
}

export default function DashboardSideMenu({
  focusIndex,
  onClickMoveFloatingButton,
  onClickCreateOpen,
}: SideMenuProps) {
  const [opened, handlers] = useDisclosure(false);
  const { restDayView, handleRestDayView } = useDashboardSideMenu();
  const restViewCombobox = useCombobox();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  return (
    <Draggable
      disabled={opened}
      axis="y"
      onDrag={() => {
        setIsDragging(true);
      }}
      onStop={() => {
        setTimeout(() => {
          setIsDragging(false);
        }, 100);
      }}
    >
      <Affix
        className="hidden items-start text-gray-400 xl:flex"
        position={{ top: 230, right: 0 }}
      >
        <AnimatePresence>
          {opened && (
            <motion.div
              key="sideMenu"
              initial={{ x: 150 }}
              animate={{ x: 0 }}
              exit={{ x: 150 }}
              onAnimationComplete={() => setIsAnimating(false)}
              className="flex items-start"
            >
              <button
                onClick={() => {
                  handlers.toggle();
                  setIsAnimating(true);
                }}
                className="rounded-bl-lg rounded-tl-lg border border-r-0 bg-white p-2 shadow-md dark:border-black-500 dark:bg-black-500 dark:text-gray-200"
              >
                {isAnimating ? (
                  <div className="rounded-md bg-violet-white px-0.5 py-0.5 dark:bg-gray-400">
                    <Image
                      src={arrowLeft}
                      alt="펼치기"
                      width={20}
                      height={20}
                    />
                  </div>
                ) : (
                  <div className="rounded-md bg-violet-white px-0.5 py-0.5 dark:bg-gray-400">
                    <Image src={arrowRight} alt="접기" width={20} height={20} />
                  </div>
                )}
              </button>
              <div className="hidden w-[150px] flex-col gap-2 rounded-bl-lg border bg-white p-2 shadow-md dark:border-black-500 dark:bg-black-500 dark:text-gray-200 xl:flex">
                <button
                  className="flex w-full items-center justify-between gap-2"
                  onClick={onClickCreateOpen}
                >
                  <span className="font-lg-14px-semibold">컬럼 목록</span>{' '}
                  <PurpleAddIcon />
                </button>

                <FloatingColumnList
                  focusIndex={focusIndex}
                  onClickMoveFloatingButton={onClickMoveFloatingButton}
                />
                <span className="w-full border" />
                <span className="font-lg-14px-semibold">보기</span>
                <Combobox
                  store={restViewCombobox}
                  onOptionSubmit={value => {
                    handleRestDayView(value as RestDayViewType);
                    restViewCombobox.closeDropdown();
                  }}
                >
                  <Combobox.Target>
                    <button
                      onClick={() => {
                        restViewCombobox.toggleDropdown();
                      }}
                      className="flex items-center justify-between gap-2 rounded-md border px-3 py-1"
                    >
                      <span>{restDayView}</span>
                      <Image
                        src={arrowDropDown}
                        alt="보기"
                        width={15}
                        height={15}
                      />
                    </button>
                  </Combobox.Target>
                  <Combobox.Dropdown>
                    <motion.div
                      initial={{ y: 30 }}
                      animate={{ y: 0 }}
                      exit={{ y: 30 }}
                    >
                      <Combobox.Option value={restDayViewValues.dDay}>
                        {restDayViewValues.dDay}
                      </Combobox.Option>
                      <div className="h-full border-b px-2" />
                      <Combobox.Option value={restDayViewValues.date}>
                        {restDayViewValues.date}
                      </Combobox.Option>
                    </motion.div>
                  </Combobox.Dropdown>
                </Combobox>
              </div>
            </motion.div>
          )}
          {!opened && !isAnimating && (
            <button
              onClick={() => {
                if (!isDragging) handlers.toggle();
              }}
              className="rounded-bl-lg rounded-tl-lg border border-r-0 bg-white p-2 shadow-md dark:border-black-500 dark:bg-black-500 dark:text-gray-200"
            >
              {' '}
              <div className="rounded-md bg-violet-white px-0.5 py-0.5 dark:bg-gray-400">
                <Image
                  onDragStart={e => {
                    e.preventDefault();
                  }}
                  src={arrowLeft}
                  alt="펼치기"
                  width={20}
                  height={20}
                />
              </div>
            </button>
          )}
        </AnimatePresence>
      </Affix>
    </Draggable>
  );
}
