import captureWebsite from "capture-website";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const buffer = await captureWebsite.buffer("https://sindresorhus.com");
  const image = buffer.toString("base64");

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ image }));
};
