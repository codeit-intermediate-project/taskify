import { DashboardsResponseDto } from '@core/dtos/DashboardsDto';
import axiosError from '@lib/utils/axiosError';

import instance from './instance';

interface GetDashboardsParams {
  page?: number;
  size?: number;
  cursorId: number | null;
}

const getDashboards = async (props?: GetDashboardsParams) => {
  const params = { ...props, navigationMethod: 'pagination' };
  let res;
  try {
    res = await instance.get<DashboardsResponseDto>('/dashboards', {
      params,
    });
  } catch (err) {
    return axiosError(err);
  }
  return res.data;
};

export default getDashboards;
