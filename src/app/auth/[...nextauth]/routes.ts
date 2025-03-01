import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
    // add the user id in the jwt token
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.id = account.providerAccountId;
            }
            return token;
        },
    },
});

export { handler as GET, handler as POST };
