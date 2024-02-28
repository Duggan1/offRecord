const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors'); 
const puppeteer = require('puppeteer');
const app = express();
const port = 3001;

app.use(cors());

const PFLurl = 'https://pflmma.com/event/2024-superfights-1';


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


// const scrapeBELLATOR = async (BELLATORurl) => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(BELLATORurl, { waitUntil: 'networkidle2' });

//   const BellatorData = await page.evaluate(() => {
//     const data = [];
//       // Function to simulate clicking the 'Next' button for each carousel item
// function clickThroughCarousel() {
//   // Select the 'Next' button using its class
//   const nextButton = document.querySelector('.CarouselArrowstyles__Arrow-sc-1lfbt80-0.eMpqfL');

//   // Select the list of carousel navigation items
//   const carouselNavItems = document.querySelectorAll('.Carouselstyles__CarouselNavContainer-sc-7lb5l5-3.jBcbRQ li');

//   // Calculate the number of items - assuming each 'li' represents a carousel item
//   const itemCount = carouselNavItems.length;

//   // Click the 'Next' button itemCount - 1 times
//   for (let i = 0; i < itemCount - 1; i++) {
//     // Check if nextButton exists to avoid errors
//     $('.Carouselstyles__CarouselItem-sc-7lb5l5-1').each((index, element) => {
//       // Assuming that the class names are correct and the country information is stored in the same element as the fighter's name
//       const leftFighterCountry = $(element).find('.FightCardstyles__FighterName-sc-1ipy6mb-4.iYMveZ').first().text().trim();
//       const rightFighterCountry = $(element).find('.FightCardstyles__FighterName-sc-1ipy6mb-4.iYMveZ').last().text().trim();

//       const leftImgSrc = $(element).find('.img-1 img').attr('src');
//       const rightImgSrc = $(element).find('.img-2 img').attr('src');

//       const matchupData = {
//         leftFighterCountry,
//         rightFighterCountry,
//         leftImgSrc,
//         rightImgSrc,
//         // Add other data extraction logic here
//       };

//       BellatorData.push(matchupData);
//     });
//     if (nextButton) {
//       // Simulate a click
//       nextButton.click();
      
      
//     } else {
//       console.error("Next button not found.");
//       break;
//     }
//   }
// }

// // Run the function to simulate the clicks
// clickThroughCarousel();


    
// return data;
//   });

//   await browser.close();
//   return BellatorData;
// };
const BELLATORurl = 'https://www.bellator.com/event/320';

const scrapeBELLATOR = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(BELLATORurl);

  let BellatorData = [];
  const numberOfClicks = 5;
  const nextButtonSelector = '.CarouselArrowstyles__Arrow-sc-1lfbt80-0.eMpqfL';

  try {
    for (let i = 0; i < numberOfClicks; i++) {
      if (await page.$(nextButtonSelector) !== null) {
        await page.click(nextButtonSelector);
        // Wait for selector that indicates new content has loaded, or network is idle
        await page.waitForSelector('.CarouselArrowstyles__Arrow-sc-1lfbt80-0.eMpqfL', { timeout: 5000 }); // Modify selector accordingly

        const currentData = await page.evaluate(() => {
          const data = [];
        document.querySelectorAll('.Carouselstyles__CarouselItem-sc-7lb5l5-1').forEach(element => {
          const leftFighterNameElement = element.querySelector('.FightCardstyles__FighterName-sc-1ipy6mb-4.iYMveZ:first-child');
          const rightFighterNameElement = element.querySelector('.FightCardstyles__FighterName-sc-1ipy6mb-4.iYMveZ:last-child');
          
          const leftImgElement = element.querySelector('.img-1 img');
          const rightImgElement = element.querySelector('.img-2 img');
          
          const leftFighterCountry = leftFighterNameElement ? leftFighterNameElement.innerText.trim() : '';
          const rightFighterCountry = rightFighterNameElement ? rightFighterNameElement.innerText.trim() : '';
          
          const leftImgSrc = leftImgElement ? leftImgElement.src : '';
          const rightImgSrc = rightImgElement ? rightImgElement.src : '';
          
          data.push({
            leftFighterCountry,
            rightFighterCountry,
            leftImgSrc,
            rightImgSrc,
          });
        });
        return data;
        });

        BellatorData = BellatorData.concat(currentData);
      } else {
        console.error("Next button not found.");
        break;
      }
    }
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await browser.close();
  }

  console.log(BellatorData);
  return BellatorData;
};










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
    const BellatorData = await scrapeBELLATOR();
    // const fights = await scrapeAllFights();
    const { fighters, liveR } = await scrapeESPN();

    res.json({
      BellatorData,
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
