"use client";
import ButtonFileUpload from "@/components/button-file-upload";
import { ICloudinaryAssetResponse } from "@/app/api/upload-file/upload-file.interface";
import { CldImage, CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
// import { RotateCw } from "lucide-react";
import React from "react";
import { useMedia } from "./media.service";

export default function FileUpload() {
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

  React.useEffect(() => {
    if (
      dataAssets?.payload?.rows.length &&
      dataAssets?.payload?.rows.length > 0
    ) {
      // const filterAssetAxist = dataAssets?.payload?.rows.filter(
      //   (item) => !assets.find((asset) => asset.public_id === item.public_id)
      // );
      setAssets([...assets, ...dataAssets?.payload?.rows]);
    }
  }, [dataAssets?.payload?.rows, assets]);

  return (
    <div className="w-full h-dvh flex justify-center items-center pt-24">
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
          <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4 h-[600px] overflow-y-scroll p-4">
            {(assets || []).length > 0 &&
              assets.map((item: ICloudinaryAssetResponse) => {
                if (item.resource_type == "image") {
                  return (
                    <CldImage
                      key={item.public_id}
                      className="object-cover col-span-1"
                      width="960"
                      height="600"
                      src={item.public_id}
                      sizes="100vw"
                      alt=""
                    />
                  );
                } else if (item.resource_type == "video") {
                  return (
                    <CldVideoPlayer
                      key={item.public_id}
                      className="col-span-1"
                      width="1620"
                      height="1080"
                      src={item.url}
                      fontFace="DM Sans"
                    />
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
