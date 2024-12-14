"use client";

import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  redirect: string;
  children?: React.ReactNode;
}

const ButtonNavigation: React.FC<IProps> = ({
  redirect,
  children,
  ...props
}) => {
  const { status } = useSession();

  return (
    <>
      {status === "authenticated" ? (
        <Link href={redirect} className={`btn flex gap-4 ${props.className}`}>
          {children}
        </Link>
      ) : null}
    </>
  );
};

export default ButtonNavigation;
