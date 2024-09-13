import { useCallback, useState } from 'react';

import { AxiosError, AxiosRequestConfig } from 'axios';

import instance from '@core/api/instance';

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
        // console.log(`res`);
        // console.log(res);
        setData(res?.data);
      } catch (err) {
        // console.log(`err`);
        // console.log(err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        if (err instanceof AxiosError) return err;
      } finally {
        setIsLoading(false);
      }
      return res;
    },
    [url, method]
  );

  return { data, setData, isLoading, error, callApi };
}
