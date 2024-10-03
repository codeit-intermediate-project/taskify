import { cookies } from 'next/headers';
import returnFetch, { FetchArgs } from 'return-fetch';

const fetchExtended = returnFetch({
  baseUrl: 'https://sp-taskify-api.vercel.app',
  headers: {
    'Content-Type': 'application/json',
    credentials: 'include',
  },
  interceptors: {
    request: async (args: FetchArgs) => {
      if (args[0] instanceof URL) {
        const url = args[0];
        const { pathname } = url;
        url.pathname = `/8-3${pathname}`;
      }
      const cookieStore = cookies();
      const accessToken = cookieStore.get('accessToken');
      if (accessToken) {
        if (args[1]?.headers) {
          const { headers } = args[1];
          const headerInit: HeadersInit = new Headers(headers);
          headerInit.set('Authorization', `Bearer ${accessToken?.value}`);
          const newArgs: FetchArgs = [
            args[0],
            {
              ...args[1],
              headers: headerInit,
            },
          ];
          return newArgs;
        }
      }
      return args;
    },
  },
});

export default fetchExtended;
