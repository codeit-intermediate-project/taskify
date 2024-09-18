import dayjs from 'dayjs';

const formatDDay = (date: Date) => {
  const dayjsNowDate = dayjs(new Date());
  const dayjsDueDate = dayjs(date);
  const diffDay = dayjsNowDate.diff(dayjsDueDate, 'day');
  const diffHour = dayjsNowDate.diff(dayjsDueDate, 'hour') % 24;
  const overDay = dayjsDueDate.diff(dayjsNowDate, 'day');
  const overHour = dayjsDueDate.diff(dayjsNowDate, 'hour') % 24;

  if (new Date().getTime() - new Date(date).getTime() >= 0) {
    return diffDay > 0
      ? `${diffDay}일 ${diffHour}시간 남음`
      : `${diffHour}시간 남음`;
  }
  return overDay > 0
    ? `${overDay}일 ${overHour}시간 남음`
    : `${overHour}시간 남음`;
};

export default formatDDay;
