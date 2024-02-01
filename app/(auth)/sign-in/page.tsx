"use client";

import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const [errorMessage, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    if (!password || !username) {
      setError("Fill required fields");
      return;
    }

    const body = JSON.stringify({ username, password });

    setLoading(true);

    const response = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    setLoading(false);

    if (!response.ok) {
      setError("SOMETHING WENT WRONG");
      return;
    }

    router.push("/");
  }

  return (
    <div className="flex flex-col gap-5 justify-center items-center max-h-screen">
      <Card>
        <CardHeader className="w-screen max-w-md">
          <h1>Sign in</h1>
        </CardHeader>
        <CardBody>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <Input size="sm" label="Username" name="username" required />
            <Input
              size="sm"
              label="Password"
              type="password"
              name="password"
              required
            />
            <p className="text-red-500 text-center capitalize h-[24px]">
              {errorMessage}
            </p>
            <Button fullWidth color="primary" type="submit" isLoading={loading}>
              Sign in
            </Button>
          </form>
        </CardBody>
      </Card>
      <Link
        className="text-sky-500 opacity-75 font-light text-sm"
        href="/sign-up"
      >
        Don`t have an account?
      </Link>
    </div>
  );
}
