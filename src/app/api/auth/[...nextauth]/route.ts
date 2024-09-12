/* eslint-disable import/order */

import NextAuth from 'next-auth/next';

import KakaoProvider from 'next-auth/providers/kakao';

const handler = NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.API_KAKAO_CLIENT_ID || '',
      clientSecret: process.env.API_KAKAP_CLIENT_SECRET || '',
    }),
  ],
});

export { handler as GET, handler as POST };
