import launchPlaywright from "lib/launch-playwright";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const image = await launchPlaywright(
    "webkit",
    [],
    "https://sindresorhus.com"
  );

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ image }));
};
