/* eslint-disable no-underscore-dangle */
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/8-3',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  // eslint-disable-next-line no-param-reassign
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const wait = (timeToDelay: number) =>
  new Promise(resolve => {
    setTimeout(resolve, timeToDelay);
  });

instance.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;
    originalRequest._retry = originalRequest._retry
      ? originalRequest._retry + 1
      : 1;
    if (error.response?.status === 401 && originalRequest._retry <= 3) {
      await wait(1000 * originalRequest._retry);
      return instance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default instance;
