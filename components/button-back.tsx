"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton: React.FC = () => {
  const navigate = useRouter();
  return (
    <button
      onClick={() => navigate.back()}
      className="btn btn-circle btn-outline"
    >
      <ChevronLeft size={24} />
    </button>
  );
};

export default BackButton;
