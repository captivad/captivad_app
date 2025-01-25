"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";

const NavigateToErrorPage: FC = () => {
  const navigate = useRouter();
  navigate.push("/404");
  return null;
};

export default NavigateToErrorPage;
