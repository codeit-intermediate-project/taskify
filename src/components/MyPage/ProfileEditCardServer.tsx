import getMe from '@lib/utils/getMe';

import ProfileEditInputs from './ProfileEditInputs';

export default async function ProfileEditCardServer() {
  const user = await getMe();

  return (
    <>
      <ProfileEditInputs user={user} />
      <div>card</div>
    </>
  );
}
