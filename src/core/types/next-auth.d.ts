declare module 'next-auth' {
  interface Session {
    name: string;
    email: string;
    image: string;
  }
}
