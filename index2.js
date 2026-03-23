const pup = require('puppeteer');

const url = "https://www.mercadolivre.com.br/";
const searchfor = "macbook";

(async () => {
    const browser = await pup.launch({headless: false});
    const page = await browser.newPage();
    console.log("iniciei");

    await page.goto(url);
    console.log("fui para a URL!");

    await page.waitForSelector("#cb1-edit");

    await page.type("#cb1-edit", searchfor);

    await Promise.all([
        page.waitForNavigation(),
        page.click(".nav-search-btn")
    ])

    const links = await page.$$eval('.ui-search-result__wrapper > a', el => el.map(link => link.href));

    console.log(links);


    await page.waitForTimeout(3000);  
    await browser.close();
})();
