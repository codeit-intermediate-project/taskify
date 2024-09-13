import { AxiosError } from 'axios';

export default function findAxiosErrorMessage(
  err: AxiosError<{ message: string }>
) {
  const message = err.response?.data?.message ?? 'unknown error';
  return message;
}
