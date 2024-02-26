const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors'); 
const puppeteer = require('puppeteer');
const app = express();
const port = 3001;

app.use(cors());

// const PFLurl = 'https://pflmma.com/event/2024-superfights-1';
const BELLATORurl = 'https://www.bellator.com/event/320';

const espnurl = 'https://www.espn.com/mma/fightcenter/_/league/bellator/year/2024';

const scrapePFL = async () => {
  try {
    const response = await axios.get(PFLurl);
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
      const pflData = [];

      $('.matchupRow').each((index, element) => {
        // Extract left and right section details
        const leftSection = $(element).find('.fightcard-left');
        const rightSection = $(element).find('.fightcard-right');
        const leftBackgroundImg = leftSection.css('background-image').replace(/url\(['"](.+)['"]\)/, '$1');
        const leftImgSrc = leftSection.find('.fighterLeftImg').attr('src');
        const rightBackgroundImg = rightSection.css('background-image').replace(/url\(['"](.+)['"]\)/, '$1');
        const rightImgSrc = rightSection.find('.fighterRightImg').attr('src');

        const matchupData = {
          leftBackgroundImg,
          leftImgSrc,
          rightBackgroundImg,
          rightImgSrc,
        };

        pflData.push(matchupData);
      });

      return pflData;
    }
  } catch (error) {
    console.error('Error scraping PFL:', error);
    throw error;
  }
};


const scrapeBELLATOR = async () => {
  try {
    const response = await axios.get(BELLATORurl);
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
      const BellatorData = [];

      $('.Carouselstyles__CarouselItem-sc-7lb5l5-1').each((index, element) => {
        // Assuming that the class names are correct and the country information is stored in the same element as the fighter's name
        const leftFighterCountry = $(element).find('.FightCardstyles__FighterName-sc-1ipy6mb-4.iYMveZ').first().text().trim();
        const rightFighterCountry = $(element).find('.FightCardstyles__FighterName-sc-1ipy6mb-4.iYMveZ').last().text().trim();

        const leftImgSrc = $(element).find('.img-1 img').attr('src');
        const rightImgSrc = $(element).find('.img-2 img').attr('src');

        const matchupData = {
          leftFighterCountry,
          rightFighterCountry,
          leftImgSrc,
          rightImgSrc,
          // Add other data extraction logic here
        };

        BellatorData.push(matchupData);
      });

      return BellatorData;
    }
  } catch (error) {
    console.error('Error scraping Bellator:', error);
    throw error;
  }
};



async function scrapeAllFights(BELLATORurl) {
  const browser = await puppeteer.launch({
    executablePath: 'google-chrome-stable',
  });
  
    const page = await browser.newPage();
    await page.goto(BELLATORurl);

    const fights = [];

    // Assume there's a "Next" button to navigate the carousel
    let hasNext = await page.$('.CarouselArrowstyles__Arrow-sc-1lfbt80-0.eMpqfL') !== null;

    while (hasNext) {
        // Scrape data from the current carousel item
        const fightsData = await page.evaluate(() => {
            const fights = [];
            document.querySelectorAll('.FightCardstyles__FightCardContainer-sc-1ipy6mb-0').forEach(element => {
                // Adapt this part to match how data is structured in the HTML
                const leftFighter = element.querySelector('.img-1 img').alt;
                const rightFighter = element.querySelector('.img-2 img').alt;
                // Add other details you need
                fights.push({ leftFighter, rightFighter });
            });
            return fights;
        });

        fights.push(...fightsData);

        // Click the "Next" button to load the next set of fights
        const nextButton = await page.$('.CarouselArrowstyles__Arrow-sc-1lfbt80-0.eMpqfL');
        if (nextButton) {
            await nextButton.click();
            // Wait for the next set of data to load if necessary
            await page.waitForTimeout(1000); // Adjust timing as necessary
        }

        hasNext = await page.$('.CarouselArrowstyles__Arrow-sc-1lfbt80-0.eMpqfL') !== null;
    }

    await browser.close();

    return fights;
}

// Example usage
scrapeAllFights(BELLATORurl).then(fights => {
    console.log(fights);
}).catch(err => {
    console.error('Scraping failed:', err);
});






const scrapeESPN = async () => {
  try {
    const response = await axios.get(espnurl);
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
      const fighters = [];
      const liveR = [];

      $('.mb4').each((index, element) => {
        // .Gamestrip__Overview
  
        const liveOne = []
        
        $('.Gamestrip__Overview').each((index, element) => {
          // Extract network and odds information
          const network = $(element).find('.ScoreCell__Network').text();
          const odds = $(element).find('.ScoreCell__Odds').text();
      
          // Extract time, method, and other details
          const timeDetailsElement = $(element).find('.ScoreCell__Time .tc');
          const timeDetails = timeDetailsElement.length > 0 ? timeDetailsElement.text() : '';
        
          const oddDetails = {
      
            network,
            odds,
            timeDetails,
           
  
          }
          
            liveOne.push(oddDetails);
          
          // oddResults.push(oddDetails)
      });
      
        $('.MMACompetitor').each((index, element) => {
          const recordElement = $(element).find('.flex.items-center.n9.nowrap.clr-gray-04');
          const record = recordElement.text().trim();
      
        
          const nameElement = $(element).find('.truncate');
          const name = nameElement.text().trim();
      
  
          // Check for RedArrow
          const hasRedArrow = $(element).find('.MMACompetitor__arrow--reverse').length > 0;
  
          // Check for BlueArrow
          const hasBlueArrow = $(element).find('.MMACompetitor__arrow:not(.MMACompetitor__arrow--reverse)').length > 0;
  
          const fighter = {
              name,
              record,
              hasRedArrow,
              hasBlueArrow,
          };
         
          fighters.push(fighter);
          liveOne.push(fighter);
            });
      
  
            liveR.push(liveOne);
          
          
          });

      return { fighters, liveR };
    }
  } catch (error) {
    console.error('Error scraping ESPN:', error);
    throw error;
  }
};

app.get('/scrape-mma-websites', async (req, res) => {
  try {
    // const pflData = await scrapePFL();
    // const BellatorData = await scrapeBELLATOR();
    const fights = await scrapeAllFights();
    const { fighters, liveR } = await scrapeESPN();

    res.json({
      fights,
      fighters,
      liveR,
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while scraping data.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
