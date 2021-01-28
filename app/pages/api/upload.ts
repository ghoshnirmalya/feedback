import { BlitzApiRequest, BlitzApiResponse } from "blitz";
import ImageKit from "imagekit";
import { IncomingForm } from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
});

const UploadAPI = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  if (req.method === "POST") {
    const data = (await new Promise((resolve, reject) => {
      const form = new IncomingForm();

      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    })) as any;

    const file = (fs.createReadStream(
      data.files.file.path
    ) as unknown) as Buffer;
    const name = data.files.file.name;

    const response = await imagekit.upload({
      file,
      fileName: name,
    });

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(response));
  }
};

export default UploadAPI;
