import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      if (isLoggedIn) return true;
      return false;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
