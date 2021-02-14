import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
});

const uploadFile = async (file, name) => {
  const response = await imagekit.upload({
    file,
    fileName: name,
  });

  return response;
};

export default uploadFile;
