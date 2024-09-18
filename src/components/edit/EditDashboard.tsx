/* eslint-disable import/order */
import useDashboardDetail from '@lib/hooks/useDashboardDetail';
import DashboardColorPicker from './DashboardColorPicker';
import { updateDashboard } from '@core/api/columnApis';
import PrimaryButton from '@components/@shared/UI/Button/PrimaryButton';
import { useEffect, useState } from 'react';

interface EditDashboardProps {
  dashboardId: number;
}

export default function EditDashboard({ dashboardId }: EditDashboardProps) {
  const {
    dashboardName,
    setDashboardName,
    dashboardColor,
    setDashboardColor,
    refetch,
  } = useDashboardDetail(dashboardId);

  const [initialName, setInitialName] = useState('');
  const [initialColor, setInitialColor] = useState('');

  useEffect(() => {
    if (initialName === '' && initialColor === '') {
      setInitialName(dashboardName);
      setInitialColor(dashboardColor);
    }
  }, [dashboardName, dashboardColor, initialColor, initialName]);

  const hasChanges =
    dashboardName !== initialName || dashboardColor !== initialColor;

  const handleUpdate = async () => {
    // 대시보드 업데이트
    await updateDashboard(dashboardId, {
      title: dashboardName,
      color: dashboardColor,
    });
    refetch();
    window.location.reload();
  };

  return (
    <div className="max-w-[92%] rounded-lg bg-white p-6 shadow md:mx-0 md:max-w-[544px] xl:max-w-[620px]">
      <h2 className="mb-4 text-xl font-bold">{dashboardName}</h2>
      <div className="mb-4">
        <label htmlFor="dashboard-name" className="mb-2 block text-gray-700">
          대시보드 이름
        </label>
        <input
          id="dashboard-name"
          className="w-full rounded border border-gray-300 p-2"
          value={dashboardName}
          onChange={e => setDashboardName(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <div className="mb-2 block text-gray-700">색상 선택</div>
        <div className="align-start flex w-full">
          <DashboardColorPicker
            color={dashboardColor}
            setColor={setDashboardColor}
          />
        </div>
      </div>
      <PrimaryButton
        onClick={handleUpdate}
        disabled={!hasChanges}
        className="h-14 w-[100%] max-w-full rounded-lg text-base shadow md:h-16 md:w-[488px] md:text-lg lg:w-[564px]"
      >
        변경
      </PrimaryButton>
    </div>
  );
}
