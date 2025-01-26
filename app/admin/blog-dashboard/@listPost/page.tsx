"use client";

import Search from "@/components/search";
import { BLOG } from "@/utils/router";
import { ChevronLeft, Ellipsis, Globe, Trash, Upload } from "lucide-react";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import {
  useDeletePostDashboard,
  useGetPostDashboard,
  useUpdateStatusPostDashboard,
} from "../blog-dashboard.service";
import { Blog, StatusContent } from "@/prisma/prisma/client";
import ModalConfirmAlert from "@/components/modal-confirm";
import PaginationButton from "@/components/PaginationButton";
import { IResponsePagination } from "@/helpers/general.helper";
import { data } from "framer-motion/m";
import EmptyData from "@/components/empty-data";

export default function ListPost() {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const [postSelected, setPostSelected] = React.useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const startEditPost = (uuid: string) => {
    window.localStorage.removeItem("editorContent");
    params.set("action", "edit");
    params.set("id", uuid);
    navigate.push(`?${params.toString()}`);
  };

  const handleTabPublish = () => {
    params.set("tab", StatusContent.publish);
    // params.delete("search");
    params.delete("action");
    params.delete("id");
    navigate.push(`?${params.toString()}`);
    setCurrentPage(1);
    setPostSelected([]);
  };

  const handleTabDraft = () => {
    params.set("tab", StatusContent.draft);
    // params.delete("search");
    params.delete("action");
    params.delete("id");
    navigate.push(`?${params.toString()}`);
    setCurrentPage(1);
    setPostSelected([]);
  };

  const { data: listpost, isLoading } = useGetPostDashboard({
    page: currentPage,
    search: params.get("search") || "",
    status: params.get("tab") as StatusContent,
  });

  //feature select all
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setPostSelected(listpost?.payload?.rows || []);
    } else {
      setPostSelected([]);
    }
  };

  const handleSelectPost = (checked: boolean, post: Blog) => {
    if (checked) {
      setPostSelected((prev) => [...prev, post]);
    } else {
      setPostSelected((prev) => prev.filter((item) => item.uuid !== post.uuid));
    }
  };

  //feature delete
  const { mutate: deleteMutate, isPending } = useDeletePostDashboard({
    onSuccess: () => {
      setPostSelected([]);
      setCurrentPage(1);
    },
  });
  const handleDeletePost = (uuids: string) => {
    deleteMutate(uuids);
  };

  //feature update status
  const { mutate: updateMutate, isPending: isPendingUpdate } =
    useUpdateStatusPostDashboard({
      onSuccess: () => {
        setPostSelected([]);
        setCurrentPage(1);
      },
    });

  return (
    <>
      <div className="min-w-96 max-w-min h-full">
        <h5 className="font-bold mb-4 flex items-center justify-between gap-2">
          <label
            onClick={() => navigate.push(BLOG)}
            className="btn btn-square rounded-full tooltip flex justify-center items-center"
            data-tip="Back to blog"
          >
            <ChevronLeft size={25} />
          </label>
          List Post
        </h5>
        <div role="tablist" className="tabs tabs-lifted tabs-md mb-4">
          <label
            onClick={handleTabPublish}
            role="tab"
            className={`tab ${
              params.get("tab") === StatusContent.publish && "tab-active"
            }`}
          >
            Publish
          </label>
          <label
            onClick={handleTabDraft}
            role="tab"
            className={`tab ${
              params.get("tab") === StatusContent.draft && "tab-active"
            }`}
          >
            Draft
          </label>
        </div>
        <div className="w-full mb-4">
          <Search />
        </div>
        <div className="mb-2 w-full flex justify-between">
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                onChange={(e) => handleSelectAll(e.target.checked)}
                checked={
                  postSelected.length === listpost?.payload?.rows?.length
                }
                className="checkbox checkbox-sm checkbox-primary"
              />
              <span className="label-text ml-2">Select All</span>
            </label>
          </div>
          {postSelected.length > 0 && (
            <div className="flex gap-2">
              {params.get("tab") === StatusContent.draft ? (
                <button
                  onClick={() => {
                    const modal = document.getElementById(
                      "my_modal_status_selected_post"
                    ) as HTMLDialogElement;
                    modal?.showModal();
                  }}
                  className="btn btn-sm"
                >
                  <Upload size={16} color="white" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    const modal = document.getElementById(
                      "my_modal_status_selected_post"
                    ) as HTMLDialogElement;
                    modal?.showModal();
                  }}
                  className="btn btn-sm bg-red-700"
                >
                  <Upload size={16} color="white" className="rotate-180" />
                </button>
              )}
              <button
                onClick={() => {
                  const modal = document.getElementById(
                    "my_modal_delete_selected_post"
                  ) as HTMLDialogElement;
                  modal?.showModal();
                }}
                className="btn btn-sm"
              >
                <Trash size={16} color="red" />
              </button>
            </div>
          )}
        </div>

        <div className="w-full max-h-[700px] overflow-y-auto p-4 rounded-box bg-gray-500/30">
          <ul className="menu menu-md">
            {!isLoading &&
              (listpost?.payload?.rows || []).map((item) => (
                <li
                  key={item.uuid}
                  className="my-1 border-b-[1px] border-gray-400"
                >
                  <div className="flex justify-start gap-4 relative">
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <input
                          onChange={(e) =>
                            handleSelectPost(e.target.checked, item)
                          }
                          checked={postSelected.some(
                            (post) => post.uuid === item.uuid
                          )}
                          type="checkbox"
                          className="checkbox checkbox-sm checkbox-primary"
                        />
                      </label>
                    </div>
                    <label
                      onClick={() => startEditPost(item.uuid.toString())}
                      className="flex justify-between w-full items-center"
                    >
                      <div className="flex flex-col gap-2">
                        <span className="text-sm">{item.title}</span>
                        <span className="text-sm text-gray-400">
                          {moment(item.created_dt).fromNow()}
                        </span>
                      </div>

                      {/* <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-sm btn-ghost btn-circle avatar"
                    >
                      <Ellipsis size={20} />
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                      <li>
                        <button className="flex justify-start gap-4">
                          <span>
                            <Trash size={16} color="red" />
                          </span>
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div> */}
                    </label>
                  </div>
                </li>
              ))}
            {isLoading && (
              <div className="w-full flex justify-center mt-20">
                <span className="loading loading-dots loading-lg"></span>
              </div>
            )}
            {!isLoading && listpost?.payload?.rows?.length === 0 && (
              <EmptyData />
            )}
          </ul>
          {!isLoading &&
            listpost?.payload &&
            listpost?.payload?.totalPage > 1 && (
              <PaginationButton
                data={listpost?.payload as IResponsePagination<any>}
                setCurrentPage={setCurrentPage}
              />
            )}
        </div>
      </div>
      <ModalConfirmAlert
        title="Delete Post Confirmation"
        description="Are you sure you want to delete selected post?"
        submitLabel="Delete"
        id={"delete_selected_post" as string}
        onSubmit={() =>
          handleDeletePost(postSelected.map((item) => item.uuid).join(","))
        }
        isLoading={isPending}
      />
      <ModalConfirmAlert
        title={
          params.get("tab") === StatusContent.draft
            ? "Publish Post Confirmation"
            : "Unpublish Post Confirmation"
        }
        description={
          params.get("tab") === StatusContent.draft
            ? "Are you sure you want to publish selected post?"
            : "Are you sure you want to unpublish selected post?"
        }
        submitLabel={
          params.get("tab") === StatusContent.draft ? "Publish" : "Unpublish"
        }
        id={"status_selected_post" as string}
        onSubmit={() => {
          updateMutate({
            status:
              params.get("tab") === StatusContent.draft
                ? StatusContent.publish
                : StatusContent.draft,
            uuids: postSelected.map((item) => item.uuid),
          });
        }}
        color={
          params.get("tab") === StatusContent.publish ? "#ba1c1c" : "#17803d"
        }
        isLoading={isPendingUpdate}
      />
    </>
  );
}
