const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors'); 

const app = express();
const port = 3001; // Choose an available port

// Enable CORS for all routes
app.use(cors());

const deatilsUrl = 'https://www.ufc.com/event/ufc-295';

const Recurl = 'https://www.tapology.com/fightcenter/events/102959-ufc-295-jones-vs-miocic';

const fightRecords = [];
const addedFighters = [];

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
      };

      fightData.push(fightInfo);
    });

   
    // Use async/await to wait for the Tapology request to complete
    try {
      const response = await axios.get(Recurl);

      if (response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html);

        const locationCC = detailsElement.find('li:contains("Location:") a').text();

        

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

   
    res.json({
      event_name,
      event_date,
      fights: fightData,
      records: fightRecords,
      backgroundImageSrc,
      arena, city, country, locationCC
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while scraping data.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
