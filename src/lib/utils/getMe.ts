import fetchExtended from '@core/api/fetchExtended';
import { UserServiceResponseDto } from '@core/dtos/AuthDto';
import 'server-only';

async function getMe() {
  const res = await fetchExtended('/users/me');
  const json: UserServiceResponseDto = await res.json();
  return json;
}

export default getMe;
