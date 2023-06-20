import toast from "react-hot-toast";
import { BiCheck, BiErrorAlt } from "react-icons/bi";
import { toastOptions } from "../utlities/toast";
import * as uuid from "uuid";

export async function downloadImage(
  path: string,
  width: number,
  height: number
) {
  if (typeof document == "undefined") return;
  const request = fetch(
    `/api/og?path=${
      path.slice(1).split(".")[0]
    }&width=${width}&height=${height}&ext=${path.split(".")[1]}`
  ).then((res) => res.blob());

  const blob = await toast.promise(
    request,
    {
      error: (
        <div className="flex items-center gap-2">
          <BiErrorAlt className="mr-3 text-brand" size={20} /> Oops! Something
          went wrong.
        </div>
      ),
      loading: (
        <div className="flex flex-col">
          <div className="flex w-full items-center gap-2">
            <div className="aspect-square h-4 w-4 animate-spin rounded-full border-2 border-r-transparent "></div>
            Starting Download...
          </div>
          <p className="mt-1 block text-sm text-gray-light">
            Large images might take some time to download
          </p>
        </div>
      ),
      success: (
        <div className="flex items-center gap-2">
          <BiCheck size={20} className="animate-in mr-3 text-brand" /> Download
          Started!
        </div>
      ),
    },
    { ...toastOptions, icon: null }
  );

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `crackle-${uuid.v1()}.${path.split(".")[1]}`;
  anchor.click();
  anchor.remove();
}
