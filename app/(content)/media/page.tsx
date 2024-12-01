import ButtonFileUpload from "@/components/button-file-upload";

export default function FileUpload() {
  const fetchDataAssets = async () => {
    const dataAssets = await fetch("/api/upload-file", {
      method: "GET",
    });
    return dataAssets.json();
  };

  console.log(fetchDataAssets());

  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <div className="flex flex-col gap-4">
        <ButtonFileUpload />
        <div className="w-full">
          <h3>List Assets</h3>
          <div></div>
        </div>
      </div>
    </div>
  );
}
