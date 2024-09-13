export const INIT_INVITATIONS_REQUEST = {
  navigationMethod: 'infiniteScroll',
  size: 10,
};

export const INIT_INVITATIONS_RESPONSE = {
  cursorId: 0,
  invitations: [
    {
      id: 0,
      inviter: {
        nickname: '',
        email: '',
        id: 0,
      },
      teamId: '8-3',
      dashboard: {
        title: '',
        id: 0,
      },
      invitee: {
        nickname: '',
        email: '',
        id: 0,
      },
      inviteAccepted: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
};
