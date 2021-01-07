import { launchChromium } from "playwright-aws-lambda";

const launchPlaywright = async (url: string) => {
  let browser = null;
  let image = "";

  try {
    browser = await launchChromium({
      headless: true,
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(url);

    const buffer = await page.screenshot();
    image = buffer.toString("base64");

    console.log(image, url);
  } catch (error) {
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }

  return image;
};

export default launchPlaywright;
