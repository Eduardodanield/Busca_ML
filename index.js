const pup = require('puppeteer');
const url = "https://www.mercadolivre.com.br/";
const searchFor = "macbook";

let c = 1;
const list = [];

(async () => {
    const browser = await pup.launch({ headless: false });
    const page = await browser.newPage();
    
    await page.goto(url);

    await page.waitForSelector('#cb1-edit');
    await page.type('#cb1-edit', searchFor);

    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
        page.click('.nav-search-btn')
    ]);

    await page.waitForSelector('.poly-component__link');

    const links = await page.$$eval('.poly-component__link', el => el.map(link => link.href));

    for(const link of links) {
        if(c === 10) break; // Troquei 'continue' por 'break' para ele parar de vez quando chegar no 10, economiza tempo!
        
        console.log('Pagina', c);
        
        await page.goto(link);
        
        await page.waitForSelector('.ui-pdp-title');

        const title = await page.$eval('.ui-pdp-title', el => el.innerText);
        const price = await page.$eval('.andes-money-amount__fraction', el => el.innerText);

        // A classe que você encontrou na imagem
        const seller = await page.evaluate(() => {
            const el = document.querySelector('.ui-pdp-seller__link');
            if(!el) return 'Vendedor Oculto/Desconhecido'; 
            return el.innerText;    
        });

        const obj = {
            title: title,
            price: price,
            seller: seller, 
            link: link
        };
        
        console.log(obj);
    
        list.push(obj);
        c++;
    }

    console.log("=== RESULTADO FINAL ===");
    console.log(list);

    await new Promise(r => setTimeout(r, 3000));
    await browser.close();
})();