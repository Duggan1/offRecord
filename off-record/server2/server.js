const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors'); 

const app = express();
const port = 3001; // Choose an available port

// Enable CORS for all routes
app.use(cors());

// const deatilsUrl = 'https://www.ufc.com/event/ufc-fight-night-december-09-2023';
// const Recurl = 'https://www.tapology.com/fightcenter/events/105194-ufc-fight-night';
// const espnurl = 'https://www.espn.com/mma/fightcenter/_/id/600039634/league/ufc'

const deatilsUrl = 'https://www.ufc.com/event/ufc-fight-night-january-13-2024'
const Recurl = 'https://www.tapology.com/fightcenter/events/105485-ufc-fight-night'
const espnurl = 'https://www.espn.com/mma/fightcenter/_/id/600038652/league/ufc'



// wait for JalenTurner>BobbyGreen to Update to auto-patch
// const deatilsUrl = 'https://www.ufc.com/event/ufc-fight-night-december-02-2023';
// const Recurl = 'https://www.tapology.com/fightcenter/events/104486-ufc-fight-night';
// const espnurl = 'https://www.espn.com/mma/fightcenter/_/id/600039593/league/ufc'
// wait for JalenTurner>BobbyGreen to Update to auto-patch

const fightRecords = [];
const addedFighters = [];
const fighters = []
const oddResults = []

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
    let locationCC 
    let tapImage 
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

      const winnerElement = $(element).find('.c-listing-fight__corner-body--red .c-listing-fight__outcome--Win');
      const methodElement = $(element).find('.c-listing-fight__result-text.method');
      const roundElement = $(element).find('.c-listing-fight__result-text.round');
      

      let winner = 'N/A'; 
      if (winnerElement.length > 0) {
          winner = '0'; 
      } else {
        const blueWinnerElement = $(element).find('.c-listing-fight__corner-body--blue .c-listing-fight__outcome--Win');
        if (blueWinnerElement.length > 0) {
          winner = '1'; 
        }
      }

      let method = 'N/A'; 
      if (methodElement.length > 0) {
          method = methodElement.text().trim();
      }

      let round = 'N/A'; 
      if (roundElement.length > 0) {
        const roundText = roundElement.text().trim();
        const match = roundText.match(/\d+/);
        round = match ? match[0] : 'N/A';
      }





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

        const detailsElement = $('.details.details_with_poster.clearfix');
        locationCC = detailsElement.find('li:contains("Location:") a').text();
        tapImage = detailsElement.find('.left img').attr('src');

        

        $('.fightCard').each((index, element) => {
          const redCornerName = $(element).find('.fightCardFighterName').eq(0).text().trim();
          const blueCornerName = $(element).find('.fightCardFighterName').eq(1).text().trim();
          const redCornerRecord = $(element).find('.fightCardRecord').eq(0).text().trim();
          const blueCornerRecord = $(element).find('.fightCardRecord').eq(1).text().trim();

          console.log(redCornerName);
          console.log(blueCornerName);
          console.log(redCornerRecord);
          console.log(blueCornerRecord);

          if (redCornerName && blueCornerName && redCornerRecord && blueCornerRecord) {
            const fighter = {
              redCornerName,
              redCornerRecord,
              blueCornerName,
              blueCornerRecord,
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
            fightRecords.push(oddDetails);
          }
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
          if (!fighters.some(existingDetails => JSON.stringify(existingDetails) === JSON.stringify(fighter))) {
            fighters.push(fighter);
          }

          fighters.push(fighter);
            });
      

      
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
      event_date,
      fights: fightData,
      records: fightRecords,
      backgroundImageSrc,
      arena, city, country, locationCC, tapImage, fighters, oddResults
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while scraping data.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
