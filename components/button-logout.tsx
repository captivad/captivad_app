"use client";

import { LOGIN } from "@/utils/router";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const ButtonLogout: React.FC = () => {
  const { status } = useSession();

  return (
    <div className="flex items-end tooltip tooltip-bottom" data-tip="Logout">
      {status === "authenticated" ? (
        <button
          onClick={async () => {
            try {
              await signOut();
            } catch (error) {
              toast.error("Logout failed!");
            }
          }}
          className="btn flex gap-4 text-error rounded-box"
        >
          <LogOut />
          <p className="xl:hidden">Log out</p>
          {/* Logout */}
        </button>
      ) : null}
    </div>
  );
};

export default ButtonLogout;
