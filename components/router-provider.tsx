"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function RouterProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  const navigate = useRouter();
  if (path == "/") navigate.push("/home");

  return <>{children}</>;
}
