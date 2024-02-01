import React from "react";
import SignUpForm from "./components/SignUpForm";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col gap-5 justify-center items-center min-h-screen">
      <SignUpForm />
      <Link
        className="text-sky-500 opacity-75 font-light text-sm"
        href="/sign-in"
      >
        Already have an account?
      </Link>
    </div>
  );
}
