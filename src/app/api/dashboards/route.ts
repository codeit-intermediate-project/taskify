import axios from 'axios';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

import axiosError from '@lib/utils/axiosError';

// eslint-disable-next-line import/prefer-default-export
export async function POST(request: NextRequest) {
  const cookiesList = cookies();
  const accessToken = cookiesList.get('accessToken');
  const formData = await request.formData();
  const body = {
    title: formData.get('title'),
    color: formData.get('color'),
  };

  let res;
  try {
    res = await axios.post(`${process.env.SERVER_HOST}/dashboards`, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken?.value}`,
      },
    });
  } catch (err) {
    const error = axiosError(err);
    return Response.json(error, {
      status: error.status ?? 404,
    });
  }

  return Response.json(res.data, {
    status: 201,
  });
}
