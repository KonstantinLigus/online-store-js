import userControllers from "@/backend/entities/users";
import GoogleProvider from "next-auth/providers/google";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_SECRET } = process.env;

const authOptions = {
  secret: NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user: { name, email, image } }) {
      const { user: userFromDB } = await userControllers.getUserByField({
        email,
      });
      if (!userFromDB) {
        await userControllers.createNewUser({
          email,
          name,
          image,
        });
      }
      return true;
    },

    async session({ session }) {
      const { user } = await userControllers.getUserByField({
        email: session.user.email,
      });
      session.user = user;
      return session;
    },
  },
};

export default authOptions;
