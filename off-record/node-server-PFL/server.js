const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors'); 
// const puppeteer = require('puppeteer');
const puppeteer = require('puppeteer-core'); // Import Puppeteer
// const { DOMParser } = require('dom-parser'); // Import DOMParser from dom-parser


const app = express();
const port = 3001; // Choose an available port

// Enable CORS for all routes
app.use(cors());



const espnurl = 'https://www.espn.com/mma/fightcenter/_/league/pfl'

const fightRecords = [];
const addedFighters = [];
const fighters = []
const oddResults = []
const liveR = []


function updatePreviousFights(property, value, currentIndex) {
  for (let i = currentIndex - 1; i >= 0; i--) {
      if (fightData[i][property] === 'N/A') {
          fightData[i][property] = value;
      } else {
          // If the value is already updated, break the loop
          break;
      }
  }
}






app.get('/scrape-ufc-website', async (req, res) => {
  try {

    try {
      const response = await axios.get(espnurl);

      if (response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html);
    
        $('.AccordionPanel.mb4').each((index, element) => {
        // .Gamestrip__Overview

        const liveOne = []
        
        $('.Gamestrip__Overview').each((index, element) => {
          // Extract network and odds information
          const network = $(element).find('.ScoreCell__NetworkItem').text();
          const odds = $(element).find('.ScoreCell__Odds').text();
      
          // Extract time, method, and other details
          const timeDetailsElement = $(element).find('.ScoreCell__Time .tc');
          const timeDetails = timeDetailsElement.length > 0 ? timeDetailsElement.text() : '';
        
          const broadcaster = $(element).find('.SomeOtherElementClass').text();
     
          const oddDetails = {
      
            network,
            odds,
            timeDetails,
            broadcaster

          }
          if (!oddResults.some(existingDetails => JSON.stringify(existingDetails) === JSON.stringify(oddDetails))) {
            // fightRecords.push(oddDetails);
            liveOne.push(oddDetails);
          }
          // oddResults.push(oddDetails)
      });
      
        $('.MMACompetitor').each((index, element) => {
          const recordElement = $(element).find('.flex.items-center.n9.nowrap.clr-gray-04');
          const record = recordElement.text().trim();
      
        
          const nameElement = $(element).find('.truncate');
          const name = nameElement.text().trim();

          const headshotImageSrc = $('.MMACompetitor .headshot img[data-mptype="image"]').attr('src');
          const countryFlagImageSrc = $('.MMACompetitor .MMACompetitor__flag[data-mptype="image"]').attr('src');

          const playerImageSrc = $(element).find('img[data-mptype="image"]').attr('src');
      






          // Check for RedArrow
          const hasRedArrow = $(element).find('.MMACompetitor__arrow--reverse').length > 0;

          // Check for BlueArrow
          const hasBlueArrow = $(element).find('.MMACompetitor__arrow:not(.MMACompetitor__arrow--reverse)').length > 0;

          const fighter = {
              name,
              record,
              hasRedArrow,
              hasBlueArrow,
              playerImageSrc,
              headshotImageSrc,countryFlagImageSrc
          };
          // if (!fighters.some(existingDetails => JSON.stringify(existingDetails) === JSON.stringify(fighter))) {
          //   fighters.push(fighter);
          // }

          fighters.push(fighter);
          liveOne.push(fighter);
            });
      

            liveR.push(liveOne);
          
          
          });


      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while scraping data.' });
      return;
    }
    console.log(fighters)
   
    res.json({
       fighters, liveR
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while scraping data.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
