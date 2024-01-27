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
    async signIn({ profile }) {
      let {
        given_name: firstName,
        family_name: surname,
        email,
        picture: image,
      } = profile;
      const { user: userFromDB } = await userControllers.getUserByField({
        email,
      });
      if (!userFromDB) {
        await userControllers.createUser({
          firstName,
          surname: surname || null,
          email,
          image,
        });
      }
      return true;
    },

    async session({ session }) {
      const { user: userFromDB } = await userControllers.getUserByField({
        email: session.user.email,
      });
      session.user = userFromDB;
      return session;
    },
  },
};

export default authOptions;
