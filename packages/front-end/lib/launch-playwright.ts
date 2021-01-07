const playwright = require("playwright-aws-lambda");

const launchPlaywright = async (
  browserType: string,
  args: string[],
  url: string
) => {
  console.log(`========== Running Playwright for ${browserType} ==========`);

  let browser = null;
  let image = "";

  try {
    browser = await playwright.launchChromium();
    const context = await browser.newContext();

    const page = await context.newPage();
    await page.goto(url);

    const buffer = await page.screenshot();
    image = buffer.toString("base64");

    console.log(image, url, browserType);
  } catch (error) {
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }

  console.log(`========== /Running Playwright for ${browserType} ==========`);

  return image;
};

export default launchPlaywright;
