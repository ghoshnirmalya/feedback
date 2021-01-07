const playwright = require("playwright");

const launchPlaywright = async (
  browserType: string,
  args: string[],
  url: string
) => {
  console.log(`========== Running Playwright for ${browserType} ==========`);

  const browser = await playwright[browserType].launch({ args });
  const browserPage = await browser.newPage();

  await browserPage.goto(url);

  const buffer = await browserPage.screenshot();
  const image = buffer.toString("base64");

  console.log(image, url, browserType);

  await browser.close();

  console.log(`========== /Running Playwright for ${browserType} ==========`);

  return image;
};

export default launchPlaywright;
