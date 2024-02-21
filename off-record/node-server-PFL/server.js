const puppeteer = require('puppeteer-core');

const espnPFL = 'https://www.espn.com/mma/fightcenter/_/league/pfl';

async function scrapeESPNPFL() {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.goto(espnPFL, { waitUntil: 'domcontentloaded' });

  const espnPFLData = await page.evaluate(() => {
    const fighters = [];

    document.querySelectorAll('.MMACompetitor').forEach((element) => {
      const recordElement = element.querySelector('.flex.items-center.n9.nowrap.clr-gray-04');
      const record = recordElement ? recordElement.textContent.trim() : '';

      const nameElement = element.querySelector('.truncate');
      const name = nameElement ? nameElement.textContent.trim() : '';

      const headshotImageSrc = element.querySelector('.MMACompetitor .headshot img[data-mptype="image"]').getAttribute('src');
      const countryFlagImageSrc = element.querySelector('.MMACompetitor .MMACompetitor__flag[data-mptype="image"]').getAttribute('src');
      const playerImageSrc = element.querySelector('img[data-mptype="image"]').getAttribute('src');

      const hasRedArrow = element.querySelector('.MMACompetitor__arrow--reverse') !== null;
      const hasBlueArrow = element.querySelector('.MMACompetitor__arrow:not(.MMACompetitor__arrow--reverse)') !== null;

      fighters.push({
        name,
        record,
        hasRedArrow,
        hasBlueArrow,
        playerImageSrc,
        headshotImageSrc,
        countryFlagImageSrc,
      });
    });

    return fighters;
  });

  await browser.close();
  return espnPFLData;
}

scrapeESPNPFL().then(data => console.log(data)).catch(error => console.error(error));
