import puppeteer from "puppeteer";

(async () => {
  console.log("Launching browser...");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('BROWSER PAGE ERROR:', err.toString()));

  console.log("Navigating to http://localhost:5173/");
  await page.goto("http://localhost:5173/");
  
  console.log("Waiting for network idle...");
  // await page.waitForNetworkIdle();
  
  // Wait a bit for React to render
  await new Promise(r => setTimeout(r, 2000));

  console.log("Clicking 'About Us' link...");
  // Find the exact About Us link
  const linkText = "About Us";
  await page.evaluate((text) => {
    const links = Array.from(document.querySelectorAll('a'));
    const target = links.find(el => el.textContent && el.textContent.includes(text));
    if (target) {
      console.log("Found link! href is:", target.href);
      target.click();
    } else {
      console.log("Could not find link with text:", text);
    }
  }, linkText);

  // Wait a bit.
  await new Promise(r => setTimeout(r, 2000));

  console.log("New URL is:", page.url());

  await browser.close();
})();
