import { useCallback, useState } from 'react';

import { AxiosRequestConfig } from 'axios';

import instance from '@core/api/instance';
import axiosError from '@lib/utils/axiosError';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export default function useApi<T>(url: string, method: Method) {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const callApi = useCallback(
    async <R>(body: R, config?: AxiosRequestConfig) => {
      setIsLoading(true);
      setError(null);
      let res;
      try {
        res = await instance(url, {
          method,
          data: body,
          ...config,
        });
        setData(res?.data);
      } catch (err) {
        const axiosErr = axiosError(err);
        setError(axiosErr.message ?? 'Unknown error');
        // toast 에러: 요청 실패
      } finally {
        setIsLoading(false);
      }
    },
    [url, method]
  );

  return { data, setData, isLoading, error, callApi };
}
