import axios from 'axios';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

import axiosError from '@lib/utils/axiosError';

// eslint-disable-next-line import/prefer-default-export
export async function POST(request: NextRequest) {
  const cookiesList = cookies();
  const accessToken = cookiesList.get('accessToken');
  const formData = await request.formData();
  let res;
  try {
    res = await axios.post(
      `${process.env.SERVER_HOST}/users/me/image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken?.value}`,
        },
      }
    );
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
