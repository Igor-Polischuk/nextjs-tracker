import { signOut } from "@/auth";
import { Button } from "@nextui-org/button";
import React from "react";

export default function LogOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button variant="flat" color="danger" type="submit">
        Log out
      </Button>
    </form>
  );
}
