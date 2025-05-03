import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { InvalidTokenError } from "jwt-decode";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signin`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await res.json();


        if (!res.ok || !data) {
          throw new Error(data.message);
        }

        const { user, access_token } = data;

        return {
          ...user, // email, name, usertype
          accessToken: access_token, // <-- important
        };
      }
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user } : any) {
      // First time the user signs in
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.usertype = user.usertype;
        token.accessToken = user.accessToken; 
      }
      return token;
    },
    async session({ session, token, user } : any) {
      if (token) {  
        session.user.email = token.email;
        session.user.username = token.userName;
        session.user.usertype = token.usertype;
        session.user.accessToken = token.accessToken;
      }
      return session; // <-- save accessToken to session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
