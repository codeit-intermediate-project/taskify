import { DashboardApplicationServiceResponseDto } from '@core/dtos/DashboardsDto';
import COLORS from '@lib/constants/themeConst';
import axiosError from '@lib/utils/axiosError';

import instance from './instance';

type Body = {
  title: string;
  color: keyof typeof COLORS;
};

async function postCreateDashboards(body: Body) {
  let res;
  try {
    res = instance.post<DashboardApplicationServiceResponseDto>(
      '/dashboards',
      body
    );
  } catch (err) {
    return axiosError(err);
  }

  return res;
}

export default postCreateDashboards;
