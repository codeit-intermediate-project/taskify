import { AxiosError } from 'axios';

export default function axiosError(err: unknown) {
  const error = err as AxiosError<{ message: string }>;
  return error;
}
