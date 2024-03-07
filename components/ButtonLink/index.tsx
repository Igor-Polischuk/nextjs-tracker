import { Button } from "@nextui-org/button";
import Link from "next/link";
import React from "react";

type ButtonLinkProps = {
  href: string;
  children: JSX.Element | string;
} & React.ComponentProps<typeof Button>;

export default function ButtonLink({
  href,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Button {...rest} className="my-3 p-0">
      <Link
        href={href}
        className="flex w-full h-full justify-center items-center p-3"
      >
        {children}
      </Link>
    </Button>
  );
}
