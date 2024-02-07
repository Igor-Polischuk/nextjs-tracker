import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import bcrypt from "bcrypt";
import * as yup from "yup";
import { createUser, getUserByUsername } from "./services/db/user";
import { SignUpUser } from "@/app/(auth)/sign-up/schema";
import { AppError } from "./services/AppError";

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

        if (!user) return null;
        const newUser = { ...user, id: user.id.toString() };

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) return null;

        return newUser;
      },
    }),
  ],
});

export const signUp = async (userData: SignUpUser) => {
  const usernameAlreadyExistInDb = await getUserByUsername(userData.username);

  if (usernameAlreadyExistInDb) {
    throw new AppError({
      message: "Username already taken",
      type: "usernameTaken",
    });
  }

  const password = await bcrypt.hash(userData.password, 10);

  const user = await createUser({ ...userData, password });

  return user;
};
