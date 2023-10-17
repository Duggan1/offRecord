const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors'); 
// const puppeteer = require('puppeteer');

const app = express();
const port = 3001; // Choose an available port

// Enable CORS for all routes
app.use(cors());

const deatilsUrl = 'https://www.ufc.com/event/ufc-294';

// const deatilsUrl = 'https://www.ufc.com/event/ufc-fight-night-september-16-2023';
const Recurl = 'https://www.tapology.com/fightcenter/events/99416-ufc-294';


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
  
      
      event_name = event_name.replace(/\s+/g, ' ').trim();
      // Clean up event date
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





axios.get(Recurl)
  .then((response) => {
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);

 // Create an array to track added fighters

      $('.fightCard').each((index, element) => {
        const redCornerName = $(element).find('.fightCardFighterName').eq(0).text().replace(/\s+/g, ' ');
        const blueCornerName = $(element).find('.fightCardFighterName').eq(1).text().replace(/\s+/g, ' ');
        const redCornerRecord = $(element).find('.fightCardRecord').eq(0).text().trim();
        const blueCornerRecord = $(element).find('.fightCardRecord').eq(1).text().trim();

        if (redCornerName && blueCornerName && redCornerRecord && blueCornerRecord) {
            const fighter = { redCornerName, redCornerRecord, blueCornerName, blueCornerRecord };
            
            // Check if the fighter has already been added
            const isDuplicate = addedFighters.some((addedFighter) => {
                return (
                    addedFighter.redCornerName === fighter.redCornerName &&
                    addedFighter.redCornerRecord === fighter.redCornerRecord &&
                    addedFighter.blueCornerName === fighter.blueCornerName &&
                    addedFighter.blueCornerRecord === fighter.blueCornerRecord
                );
            });

            // If it's not a duplicate, add the fighter to the array
            if (!isDuplicate) {
                fightRecords.push(fighter);
                addedFighters.push(fighter); // Add the fighter to the addedFighters array
            }
        }
    });

    // Print the fighter records
    console.log(fightRecords);

        
      
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  
      res.json({ event_name, event_date, fights: fightData, records: fightRecords });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while scraping data.' });
    }
  });
  
  
  
  

  
  
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
