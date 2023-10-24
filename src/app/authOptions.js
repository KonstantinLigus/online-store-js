import getUserController from "@/backend/user";
import GoogleProvider from "next-auth/providers/google";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_SECRET } = process.env;
let userDB = null;

const authOptions = {
  secret: NEXTAUTH_SECRET,
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
        const { user: newUserFromDB } = await (
          await getUserController("CREATE_USER")
        )({
          email,
          name,
          image,
        });
        userDB = newUserFromDB;
      }
      return true;
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (!userDB) {
        const { user } = await (
          await getUserController("GET_USER_BY_FIELD")
        )({ email: session.user.email });
        session.user = user;
        session.accessToken = token.accessToken;
        return session;
      }
      session.user = userDB;
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

export default authOptions;
