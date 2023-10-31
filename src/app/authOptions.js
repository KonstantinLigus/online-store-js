import getUserController from "@/backend/entities/users";
import GoogleProvider from "next-auth/providers/google";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_SECRET } = process.env;
export async function getAuthOptions() {
  const getUserByField = await getUserController("GET_USER_BY_FIELD");
  const createNewUser = await getUserController("CREATE_USER");
  return {
    secret: NEXTAUTH_SECRET,
    providers: [
      GoogleProvider({
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
      }),
    ],
    callbacks: {
      async signIn({ user: { name, email, image } }) {
        const { user: userFromDB } = await getUserByField({ email });
        if (!userFromDB) {
          await createNewUser({
            email,
            name,
            image,
          });
        }
        return true;
      },

      async session({ session }) {
        const { user } = await getUserByField({ email: session.user.email });
        session.user = user;
        return session;
      },
    },
  };
}

export default getAuthOptions;
