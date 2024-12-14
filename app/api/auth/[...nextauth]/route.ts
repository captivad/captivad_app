import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
// import { LOGIN } from "@/router";
import { login } from "./nextauth.service";
import { LOGIN } from "@/utils/router";

export interface IUserSession {
  id: string;
  email: string;
  roleId: number;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET_KEY,
  providers: [
    CredentialProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const userData = await login({ email, password });
          return userData;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (account?.providers === "credentials") {
        token.uuid = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: LOGIN,
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
