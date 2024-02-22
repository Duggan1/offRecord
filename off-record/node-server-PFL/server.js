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



const espnurl = 'https://pflmma.com/event/2024-superfights-1'

const fightRecords = [];
const addedFighters = [];
const fighters = []
const pflData = []
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

      const response = await axios.get(espnurl);

      if (response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html);
    
        $('.matchupRow').each((index, element) => {
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


      }
    
    console.log(fighters)
   
    res.json({
      //  fighters, liveR, 
       pflData
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while scraping data.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
