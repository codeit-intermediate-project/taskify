import { DashboardsResponseDto } from '@core/dtos/DashboardsDto';

import instance from './instance';

interface GetDashboardsParams {
  page?: number;
  size?: number;
  cursorId: number | null;
}

const getDashboards = async (props?: GetDashboardsParams) => {
  const params = { ...props, navigationMethod: 'pagination' };
  const response = await instance.get<DashboardsResponseDto>('/dashboards', {
    params,
  });
  return response.data;
};

export default getDashboards;
