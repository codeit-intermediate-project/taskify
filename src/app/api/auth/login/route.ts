import axios from 'axios';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

import { LoginResponseDto } from '@core/dtos/AuthDto';
import axiosError from '@lib/utils/axiosError';

// eslint-disable-next-line import/prefer-default-export
export async function POST(request: NextRequest) {
  const body = await request.json();
  let res;
  try {
    res = await axios.post<LoginResponseDto>(
      `${process.env.SERVER_HOST}/auth/login`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (err) {
    const error = axiosError(err);
    return Response.json(error, {
      status: error.status ?? 404,
    });
  }
  const { accessToken } = res.data;
  const cookiesList = cookies();
  cookiesList.set('accessToken', accessToken);

  return Response.json(
    { hello: 'hello' },
    {
      status: 201,
    }
  );
}
