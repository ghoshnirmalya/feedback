import { BlitzApiRequest, BlitzApiResponse } from "blitz";
import { IncomingForm } from "formidable";
import fs from "fs";
import uploadFile from "integrations/imageKit";

export const config = {
  api: {
    bodyParser: false,
  },
};

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

    const response = await uploadFile(file, name);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(response));
  }
};

export default UploadAPI;
