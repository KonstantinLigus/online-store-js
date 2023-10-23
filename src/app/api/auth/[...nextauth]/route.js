import getUserController from "@/backend/user";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

let userDB = null;
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user: { name, email, image } }) {
      const { user: userFromDB } = await (
        await getUserController("GET_USER_BY_FIELD")
      )({ email });
      if (userFromDB) {
        userDB = userFromDB;
      } else {
        const newUserFromDB = await (
          await getUserController("CREATE_USER")
        )({ email, name, image });
        userDB = newUserFromDB;
      }
      return true;
    },
    async session({ session }) {
      if (!userDB && !userDB.user) {
        session.user = await (
          await getUserController("GET_USER_BY_FIELD")
        )({ email: session.user.email });
      }
      session.user = userDB;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
