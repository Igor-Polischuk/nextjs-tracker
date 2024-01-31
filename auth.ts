import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import bcrypt from "bcrypt";
import * as yup from "yup";
import { getUserByUsername } from "./sevices/db/user";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const isValid = await yup
          .object({ username: yup.string(), password: yup.string().min(6) })
          .isValid(credentials);

        if (!isValid) {
          console.log("Invalid credentials format");
          return null;
        }
        const { username, password } = credentials as Record<string, string>;
        const user = await getUserByUsername(username);
        console.log(isValid, credentials, user);
        if (!user) return null;
        const newUser = { ...user, id: user.id.toString() };

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) return null;

        return newUser;
      },
    }),
  ],
});
