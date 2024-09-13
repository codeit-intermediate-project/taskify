import { UserServiceResponseDto } from '@core/dtos/AuthDto';
import axiosError from '@lib/utils/axiosError';

import instance from './instance';

async function putMyProfile<T>(body: T) {
  let res;
  try {
    res = await instance.put<UserServiceResponseDto>('/users/me', body);
  } catch (err) {
    return axiosError(err);
  }
  return res;
}

export default putMyProfile;
