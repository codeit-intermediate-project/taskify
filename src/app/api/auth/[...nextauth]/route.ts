/* eslint-disable import/order */

import NextAuth from 'next-auth';

import KakaoProvider from 'next-auth/providers/kakao';

const handler = NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.API_KAKAO_CLIENT_ID as string,
      clientSecret: process.env.API_KAKAO_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = token.sub as string;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
