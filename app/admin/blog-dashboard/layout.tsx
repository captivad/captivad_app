import React from "react";

interface IBlogDashboardLayoutProps {
  listPost: React.ReactNode;
  actionPost: React.ReactNode;
}
export default function AdminLayout({
  listPost,
  actionPost,
}: IBlogDashboardLayoutProps) {
  return (
    <div className="w-full h-full flex p-10 gap-10">
      {listPost}
      {/* <div className="divider rounded-md w-1 bg-base-200 divider-horizontal"></div> */}
      {actionPost}
    </div>
  );
}
