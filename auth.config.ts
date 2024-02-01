import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session(params) { 
      if (params.session.user) {
        params.session.user.id = (params as any).token.sub
      }

      return params.session;
    },
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      return isLoggedIn;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
