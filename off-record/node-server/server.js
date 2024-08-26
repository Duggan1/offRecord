const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors'); 
// const puppeteer = require('puppeteer');
// const puppeteer = require('puppeteer-core'); // Import Puppeteer
// const { DOMParser } = require('dom-parser'); // Import DOMParser from dom-parser


const app = express();
const port = 3001; // Choose an available port

// Enable CORS for all routes
app.use(cors());


const deatilsUrl = 'https://www.ufc.com/event/ufc-fight-night-august-24-2024'
const Recurl = 'https://www.tapology.com/fightcenter/events/114902-ufc-fight-night'
const espnurl = 'https://www.espn.com/mma/fightcenter/_/id/600048324/league/ufc'
// const espnPFL = 'https://www.espn.com/mma/fightcenter/_/league/pfl'


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
    const url = deatilsUrl;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    


    // Scrape the event name and date
    let event_name = $('.c-hero__headline').text().trim();
    let event_date = $('.e-eventDate').text().trim();

    const backgroundImageSrc = $('picture img').attr('src');
    console.log('Background Image Source:', backgroundImageSrc);
    const locationString = $('.field--name-venue.field__item').text().trim();

// Split the locationString by the line break and remove any leading/trailing whitespace
    const locationParts = locationString.split('\n').map(part => part.trim());

    // Extract the components
    const arena = locationParts[0]; // The first part should be the arena
    const city = locationParts[1];  // The second part should be the city
    const country = locationParts[2];
    let locationCC ;
    let tapImage ;
    // let eventTime
    event_name = event_name.replace(/\s+/g, ' ').trim();
    event_date = event_date.replace(/\s+/g, ' ').trim();

    const fightData = [];

    $('.c-listing-fight__content').each((index, element) => {
      const weightClass = $(element).find('.c-listing-fight__class-text').text().trim().replace(/\s+/g, ' ');
      const redCornerName = $(element).find('.c-listing-fight__corner-name--red a').text().trim().replace(/\s+/g, ' ');
      const blueCornerName = $(element).find('.c-listing-fight__corner-name--blue a').text().trim().replace(/\s+/g, ' ');
      const redCornerCountry = $(element).find('.c-listing-fight__country--red .c-listing-fight__country-text').text().trim().replace(/\s+/g, ' ');
      const blueCornerCountry = $(element).find('.c-listing-fight__country--blue .c-listing-fight__country-text').text().trim().replace(/\s+/g, ' ');
    
      const redCornerImage = $(element).find('.c-listing-fight__corner-image--red img').attr('src');
      const blueCornerImage = $(element).find('.c-listing-fight__corner-image--blue img').attr('src');
    
      // Check for winner
      let winner = 'N/A'; 
      if ($(element).find('.c-listing-fight__corner-body--red .c-listing-fight__outcome--win').length > 0) {
        winner = '0'; // Red corner is the winner
      } else if ($(element).find('.c-listing-fight__corner-body--blue .c-listing-fight__outcome--win').length > 0) {
        winner = '1'; // Blue corner is the winner
      }
    
      const method = $(element).find('.c-listing-fight__result-text.method').first().text().trim() || 'N/A';
      const roundMatch = $(element).find('.c-listing-fight__result-text.round').first().text().trim().match(/\d+/);
      const round = roundMatch ? roundMatch[0] : 'N/A';
    
      const fightInfo = {
        weightClass,
        redCornerName,
        blueCornerName,
        redCornerCountry,
        blueCornerCountry,
        redCornerImage,
        blueCornerImage,
        winner,
        method,
        round,
      };
    
      fightData.push(fightInfo);
    });
    

   
    // Use async/await to wait for the Tapology request to complete
    try {
      const response = await axios.get(Recurl);

      if (response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html);

        const detailsElement = $('#primaryDetailsContainer');
        locationCC = detailsElement.find('li:contains("Location:") a').text().trim();
        tapImage = detailsElement.find("img").attr('src').trim();

        $('.border-b.border-dotted.border-tap_6').each(function(index, element) {
          const redCornerName = $(element).find('.link-primary-red').eq(0).text().trim();
          const dull = $(element).find('.link-primary-red').eq(1).text().trim();
        // Adjusted approach for blue corner, assuming it's consistently positioned in the markup
          const blueCornerName = $(element).find('.link-primary-red').eq(2).text().trim();
          const redCornerFlag = $(element).find('img.opacity-70').eq(0).attr('src'); // Corrected selector for img with class
          const blueCornerFlag = $(element).find('img.opacity-70').eq(1).attr('src'); // Corrected selector for img with class
  
          const redCornerRecord = $(element).find('.order-2.text-\\[15px\\]').text().trim();
          const blueCornerRecord = $(element).find('.order-1.text-\\[15px\\]').text().trim();


          console.log(redCornerName);
          console.log(blueCornerName);
          console.log(blueCornerFlag);
          console.log(redCornerFlag);

          if (redCornerName && blueCornerName && redCornerRecord && blueCornerRecord) {
            const fighter = {
              redCornerName,
              redCornerRecord,
              blueCornerName,
              blueCornerRecord, blueCornerFlag, redCornerFlag
            };
            if (!fightRecords.some(existingFighter => JSON.stringify(existingFighter) === JSON.stringify(fighter))) {
              fightRecords.push(fighter);
            }
            
          }
        });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while scraping data.' });
      return;
    }

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
            // method,
            // round,
            // winner,
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
      event_name,
      // eventTime,

      fights: fightData,
      records: fightRecords,
      backgroundImageSrc,
      arena, city, country, locationCC, tapImage, fighters, oddResults,liveR, 
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while scraping data.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
