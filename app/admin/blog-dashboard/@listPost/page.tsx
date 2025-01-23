"use client";

import Search from "@/components/search";
import { BLOG } from "@/utils/router";
import { ChevronLeft, Ellipsis, Globe, Trash, Upload } from "lucide-react";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";

const list = [
  {
    id: 1,
    name: "Item 1",
    createdDt: "2023-01-01",
  },
  {
    id: 2,
    name: "Item 2",
    createdDt: "2023-01-01",
  },
  {
    id: 3,
    name: "Item 3",
    createdDt: "2023-01-01",
  },
];
export default function ListPost() {
  const navigate = useRouter();
  const searchParams = useSearchParams();

  const startEditPost = (uuid: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("action", "edit");
    params.set("id", uuid);
    navigate.push(`?${params.toString()}`);
  };
  return (
    <div className="min-w-96 max-w-min h-full">
      <h5 className="font-bold mb-4 flex items-center gap-2">
        <label
          onClick={() => navigate.push(BLOG)}
          className="btn btn-square rounded-full tooltip flex justify-center items-center"
          data-tip="Back to blog"
        >
          <ChevronLeft size={25} />
        </label>
        List Post
      </h5>
      <div className="w-full mb-4">
        <Search />
      </div>
      <div className="mb-2 w-full flex justify-between">
        <div className="form-control">
          <label className="label cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-sm checkbox-primary"
            />
            <span className="label-text ml-2">Select All</span>
          </label>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-sm">
            <Upload size={16} color="white" />
          </button>
          <button className="btn btn-sm">
            <Trash size={16} color="red" />
          </button>
        </div>
      </div>

      <ul className="menu menu-md bg-gray-500/30 w-full h-dvh overflow-y-auto p-4 rounded-box">
        {list.map((item) => (
          <li key={item.id} className="my-1 border-b-[1px] border-gray-400">
            <div className="flex justify-start gap-4 relative">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="checkbox checkbox-sm checkbox-primary"
                  />
                </label>
              </div>
              <label
                onClick={() => startEditPost(item.id.toString())}
                className="flex justify-between w-full items-center"
              >
                <div className="flex flex-col">
                  <span className="text-sm">{item.name}</span>
                  <span className="text-sm text-gray-400">
                    {moment(item.createdDt).fromNow()}
                  </span>
                </div>

                <div className="dropdown dropdown-end">
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
                </div>
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
