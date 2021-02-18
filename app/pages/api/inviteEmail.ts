import { BlitzApiRequest, BlitzApiResponse } from "blitz";
import nodemailerMail from "integrations/nodemailer";
import sendGridMail from "integrations/sendGrid";
import isProduction from "utils/isProduction";

const UploadAPI = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  if (req.method === "POST") {
    const { email, name } = JSON.parse(req.body);

    if (isProduction) {
      await sendGridMail(email, name);
    } else {
      await nodemailerMail(email, name);
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end();
  }
};

export default UploadAPI;
