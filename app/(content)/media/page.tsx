"use client";
import ButtonFileUpload from "@/components/button-file-upload";
import { ICloudinaryAssetResponse } from "@/app/api/upload-file/upload-file.interface";
import { CldImage, CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import React from "react";
import { useMedia } from "./media.service";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LOGIN } from "@/utils/router";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";

export default function FileUpload() {
  const { status } = useSession();
  const navigate = useRouter();
  if (status === "unauthenticated") navigate.push(LOGIN);

  const [typeSelected, setTypeSelected] = React.useState("image");
  const [nextCursor, setNextCursor] = React.useState<string | null>(null);
  const [assets, setAssets] = React.useState<ICloudinaryAssetResponse[]>([]);

  const {
    data: dataAssets,
    isLoading,
    refetch,
  } = useMedia({
    type: typeSelected as "image" | "video",
    nextCursor: nextCursor || undefined,
  });

  const loadMore = async () => {
    if (dataAssets?.payload?.nextCursor) {
      setNextCursor(dataAssets.payload.nextCursor);
      refetch();
    }
  };

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard");
  };

  React.useEffect(() => {
    if (
      dataAssets?.payload?.rows.length &&
      dataAssets?.payload?.rows.length > 0
    ) {
      const assetData = dataAssets?.payload?.rows;
      setAssets((prev) => [...prev, ...assetData]);
    }
  }, [dataAssets?.payload?.rows, setAssets]);

  return (
    <div className="w-full min-h-dvh flex justify-center items-center pt-44">
      <div className="flex w-[80%] flex-col gap-4 items-center">
        <ButtonFileUpload />
        <div className="flex w-full justify-between">
          <h3>List Assets</h3>
          <div className="flex gap-2">
            <button
              className={`btn ${
                typeSelected == "image" && "btn-active btn-outline"
              }`}
              onClick={() => {
                setAssets([]);
                setNextCursor(null);
                setTypeSelected("image");
              }}
            >
              Image
            </button>
            <button
              className={`btn ${
                typeSelected == "video" && "btn-active btn-outline"
              }`}
              onClick={() => {
                setAssets([]);
                setNextCursor(null);
                setTypeSelected("video");
              }}
            >
              Video
            </button>
            {/* <button
              onClick={() => {
                refetch();
              }}
              className="btn"
            >
              {isLoading ? (
                <span className="loading loading-infinity loading-sm text-white"></span>
              ) : (
                <RotateCw />
              )}
            </button> */}
          </div>
        </div>
        <div className="flex flex-col items-center gap-10 ">
          <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4 h-[600px] overflow-y-scroll p-4 w-full">
            {(assets || []).length > 0 &&
              assets.map((item: ICloudinaryAssetResponse) => {
                if (item.resource_type == "image") {
                  return (
                    <div key={item.public_id} className="relative col-span-1">
                      <button
                        onClick={() => handleCopyLink(item.url)}
                        className="btn btn-md tooltip btn-circle absolute top-2 right-2 flex justify-center items-center"
                        data-tip="Download"
                      >
                        <Copy size={20} />
                      </button>
                      <CldImage
                        className="object-cover "
                        width="960"
                        height="600"
                        src={item.public_id}
                        sizes="100vw"
                        alt=""
                      />
                    </div>
                  );
                } else if (item.resource_type == "video") {
                  return (
                    <div
                      key={item.public_id}
                      className="col-span-1 w-[330px] scale-100 rounded-lg overflow-hidden relative"
                    >
                      <button
                        onClick={() => handleCopyLink(item.url)}
                        className="btn btn-md tooltip btn-circle absolute top-2 right-2 flex justify-center items-center z-20"
                        data-tip="Download"
                      >
                        <Copy size={20} />
                      </button>
                      <CldVideoPlayer
                        width="1720"
                        height="1200"
                        src={item.url}
                        fontFace="DM Sans"
                      />
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            {!isLoading && dataAssets?.payload?.nextCursor && (
              <div className="col-span-1 md:col-span-3 xl:col-span-4 flex justify-center pb-6">
                <button onClick={loadMore} className="btn btn-neutral">
                  Load More
                </button>
              </div>
            )}
            {isLoading && (
              <div className="col-span-1 md:col-span-3 xl:col-span-4 flex justify-center pb-6">
                <span className="loading loading-infinity loading-lg text-white"></span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
