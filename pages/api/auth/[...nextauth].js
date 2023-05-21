import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
// import { Providers } from 'next-auth/providers';

export const authOptions = {
  //   secret: process.env.NEXTAUTH_SECRET,
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);