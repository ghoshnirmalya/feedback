import { File } from "@prisma/client";

const calculateImageHost = (file: File) => {
  if (file?.url.includes("https://ik.imagekit.io/gitflash")) {
    return `https://ik.imagekit.io/gitflash/tr:h-${
      document.getElementById("js-image-container")?.clientHeight
    }${file?.filePath}`;
  }

  return file?.url;
};

export default calculateImageHost;
