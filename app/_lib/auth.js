import { getUser, createUser } from "./data-service";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        const existingUser = await getUser(user.email);

        const username = profile.name;

        if (!existingUser)
          await createUser({
            email: user.email,
            username,
            role: "user",
          });

        return true;
      } catch {
        return false;
      }
    },
    async session({ session, user }) {
      const myUser = await getUser(session.user.email);
      session.user.userId = myUser.id;
      session.user.role = myUser.role;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
