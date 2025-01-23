"use client";

import { useRouter, useSearchParams } from "next/navigation";
import CreateNewPost from "../components/create-new-post";
import { CloudUpload } from "lucide-react";
import EditPost from "../components/edit-post";
import { useSession } from "next-auth/react";
import { LOGIN } from "@/utils/router";

export default function ActionPost() {
  const { status } = useSession();
  const navigate = useRouter();
  if (status === "unauthenticated") navigate.push(LOGIN);

  const searchParams = useSearchParams();
  const action = searchParams.get("action") as "create" | "edit" | "";

  const startCreateNewPost = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("action", "create");
    navigate.push(`?${params.toString()}`);
  };

  return (
    <div className="w-full h-full p-4 border-2 rounded-xl border-gray-500/50">
      {action === "create" && <CreateNewPost />}
      {action === "edit" && <EditPost />}
      {!action && (
        <div className="w-full h-dvh flex justify-center items-center flex-col gap-2">
          <button onClick={startCreateNewPost} className="btn">
            <span>
              <CloudUpload size={20} />
            </span>
            Add New Post
          </button>
          let`s start writing articles
        </div>
      )}
    </div>
  );
}
