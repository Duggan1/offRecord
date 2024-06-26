const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors'); 

const app = express();
const port = 3001;

app.use(cors());

const PFLurl = 'https://pflmma.com/event/2024-bcs-1';
const BELLATORurl = 'https://www.bellator.com/event/320';

const espnurl = 'https://www.espn.com/mma/fightcenter/_/league/bellator';

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

      $('.FightCardstyles__FightCardContainer-sc-1ipy6mb-0').each((index, element) => {
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
//BELLATOR
const scrapeTap = async () => {
  try {
    const response = await axios.get('https://www.tapology.com/fightcenter/events/111172-bellator-champions-series-dublin');
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
      const Data = [];


      const detailsElement = $('#primaryDetailsContainer');
      const locationCC = detailsElement.find('li:contains("Location:") a').text();
      const promotion = detailsElement.find('li:contains("Promotion:") a').text();
      const tapImage = detailsElement.find("img").attr('src').trim();
      const eventTime = detailsElement.find('li:contains("Date:") .text-neutral-700').text();

      $('#sectionFightCard .border-b.border-dotted.border-tap_6').each(function(index, element) {
        const redCornerName = $(element).find('.link-primary-red').eq(0).text().trim();
        const dull = $(element).find('.link-primary-red').eq(1).text().trim();
        // Adjusted approach for blue corner, assuming it's consistently positioned in the markup
        const blueCornerName = $(element).find('.link-primary-red').eq(2).text().trim();
        ///////////////////ERROR//////////////////////////ERROR///////////////////////////
        ///////////////////ERROR//////////////////////////ERROR///////////////////////////
        ///////////////////ERROR//////////////////////////ERROR///////////////////////////
        const redCornerFlag = $(element).find('img.opacity-70').eq(0).attr('src'); // Corrected selector for img with class
        const blueCornerFlag = $(element).find('img.opacity-70').eq(1).attr('src'); // Corrected selector for img with class

        const redCornerRecord = $(element).find('.order-2.text-\\[15px\\]').text().trim();
        const blueCornerRecord = $(element).find('.order-1.text-\\[15px\\]').text().trim();

        const redCornerImage = $(element).find('img.rounded').eq(0).attr('src');
        const blueCornerImage = $(element).find('img.rounded').eq(1).attr('src');

        // const redCornerRecord = $(element).find('.fightCardRecord').eq(0).text().trim();
        // const blueCornerRecord = $(element).find('.fightCardRecord').eq(1).text().trim();
        const redCornerRecordAfterReuslt = $(element).find('.leading-tight.lowercase').eq(0).text().trim();
        const blueCornerRecordAfterReuslt = $(element).find('.leading-tight.lowercase').eq(1).text().trim();
        
        const match = $(element).find('.text-neutral-50').text().trim();
        const method = $(element).find('.text-tap_darkgold').eq(0).text().trim();
        const round = $(element).find('.text-tap_darkgold').eq(1).text().trim();
        // Determine the winner based on class presence
        let winner = null; // Default to null if neither class is found
        if ($(element).find('.w-\\[37\\%\\]').eq(0).hasClass('text-green-900')) {
            winner = 0; // Red corner wins
        } else if ($(element).find('.w-\\[37\\%\\]').eq(1).hasClass('text-green-900')) {
            winner = 1; // Blue corner wins
        }
    
        
    
        if (
          // redCornerName && blueCornerName &&
           redCornerRecord && blueCornerRecord) {
          const fighter = {
              redCornerName,
              redCornerRecord,
              blueCornerName,
              blueCornerRecord, 
              blueCornerFlag, 
              redCornerFlag,
              method,
              round, 
              winner, // Updated to use the winner variable
              redCornerImage, 
              blueCornerImage,
              match
          };
          Data.push(fighter);
      } 
      else if (redCornerName && blueCornerName) {
          const fighter = {
              redCornerName,
              redCornerRecordAfterReuslt, // Note: Ensure this is intentional vs redCornerRecord
              blueCornerName,
              blueCornerRecordAfterReuslt, // Likewise, ensure this is the desired field vs blueCornerRecord
              blueCornerFlag, 
              redCornerFlag,
              method,
              round, 
              winner, // Updated to use the winner variable
              redCornerImage, 
              blueCornerImage,
              match
          };
          Data.push(fighter);
      }
      
    });
    

      return {Data,locationCC,promotion,tapImage,eventTime};
    }
  } catch (error) {
    console.error('Error scraping Bellator:', error);
    throw error;
  }
};

const scrapeTapACA = async () => {
  try {
    const response = await axios.get('https://www.tapology.com/fightcenter/events/113639-aca-177-bagov-vs-batista');
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
      const ACAData = [];
      const fightCardDetails = [];

      const detailsElement = $('#primaryDetailsContainer');
      const ACAlocationCC = detailsElement.find('li:contains("Location:") a').text();
      const ACApromotion = detailsElement.find('li:contains("Promotion:") a').text();
      const ACAtapImage = detailsElement.find("img").attr('src').trim();
      const ACAeventTime = detailsElement.find('li:contains("Date:") .text-neutral-700').text();


    // $('#sectionFightCard').each(function(index, element) {
      $('#sectionFightCard .border-b.border-dotted.border-tap_6').each(function(index, element) {
        const redCornerName = $(element).find('.link-primary-red').eq(0).text().trim();
        const dull = $(element).find('.link-primary-red').eq(1).text().trim();
        // Adjusted approach for blue corner, assuming it's consistently positioned in the markup
        const blueCornerName = $(element).find('.link-primary-red').eq(2).text().trim();
        ///////////////////ERROR//////////////////////////ERROR///////////////////////////
        ///////////////////ERROR//////////////////////////ERROR///////////////////////////
        ///////////////////ERROR//////////////////////////ERROR///////////////////////////
        const redCornerFlag = $(element).find('img.opacity-70').eq(0).attr('src'); // Corrected selector for img with class
        const blueCornerFlag = $(element).find('img.opacity-70').eq(1).attr('src'); // Corrected selector for img with class

        const redCornerRecord = $(element).find('.order-2.text-\\[15px\\]').text().trim();
        const blueCornerRecord = $(element).find('.order-1.text-\\[15px\\]').text().trim();

        const redCornerImage = $(element).find('img.rounded').eq(0).attr('src');
        const blueCornerImage = $(element).find('img.rounded').eq(1).attr('src');

        // const redCornerRecord = $(element).find('.fightCardRecord').eq(0).text().trim();
        // const blueCornerRecord = $(element).find('.fightCardRecord').eq(1).text().trim();
        const redCornerRecordAfterReuslt = $(element).find('.fightCardFighterRank').eq(0).text().trim();
        const blueCornerRecordAfterReuslt = $(element).find('.fightCardFighterRank').eq(1).text().trim();
        
        const match = $(element).find('.text-neutral-50').text().trim();
        const method = $(element).find('.fightCardResult .result').text().trim();
        const round = $(element).find('.fightCardResult .time').text().trim();
        // Determine the winner based on class presence
        let winner = null; // Default to null if neither class is found
        if ($(element).find('.fightCardFighterBout.left').hasClass('win')) {
            winner = 0; // Red corner wins
        } else if ($(element).find('.fightCardFighterBout.right').hasClass('win')) {
            winner = 1; // Blue corner wins
        }
    
        console.log(redCornerName);
        console.log(blueCornerName);
        console.log(redCornerRecord);
        console.log(blueCornerRecord);
    
        if (
          // redCornerName && blueCornerName &&
           redCornerRecord && blueCornerRecord) {
          const fighter = {
              redCornerName,
              redCornerRecord,
              blueCornerName,
              blueCornerRecord, 
              blueCornerFlag, 
              redCornerFlag,
              method,
              round, 
              winner, // Updated to use the winner variable
              redCornerImage, 
              blueCornerImage,
              match
          };
          ACAData.push(fighter);
      } 
      // else if (redCornerName && blueCornerName) {
      //     const fighter = {
      //         redCornerName,
      //         redCornerRecordAfterReuslt, // Note: Ensure this is intentional vs redCornerRecord
      //         blueCornerName,
      //         blueCornerRecordAfterReuslt, // Likewise, ensure this is the desired field vs blueCornerRecord
      //         blueCornerFlag, 
      //         redCornerFlag,
      //         method,
      //         round, 
      //         winner, // Updated to use the winner variable
      //         redCornerImage, 
      //         blueCornerImage,
      //         match
      //     };
      //     ACAData.push(fighter);
      // }
      
    });
    
    

      return {ACAData,ACAlocationCC,ACApromotion,ACAtapImage,ACAeventTime,fightCardDetails};
    }
  } catch (error) {
    console.error('Error scraping ACA:', error);
    throw error;
  }
};

const scrapeTapPFL = async () => {
  try {
    const response = await axios.get('https://www.tapology.com/fightcenter/events/112253-pfl-4-2024-regular-season');
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
      const PFLData = [];


      const detailsElement = $('#primaryDetailsContainer');
      const PFLlocationCC = detailsElement.find('li:contains("Location:") a').text();
      const PFLpromotion = detailsElement.find('li:contains("Promotion:") a').text();
      const PFLtapImage = detailsElement.find("img").attr('src').trim();
      const PFLeventTime = detailsElement.find('li:contains("Date:") .text-neutral-700').text();

        $('#sectionFightCard .border-b.border-dotted.border-tap_6').each(function(index, element) {
        const redCornerName = $(element).find('.link-primary-red').eq(0).text().trim();
        const dull = $(element).find('.link-primary-red').eq(1).text().trim();
        // Adjusted approach for blue corner, assuming it's consistently positioned in the markup
        const blueCornerName = $(element).find('.link-primary-red').eq(2).text().trim();
        ///////////////////ERROR//////////////////////////ERROR///////////////////////////
        ///////////////////ERROR//////////////////////////ERROR///////////////////////////
        ///////////////////ERROR//////////////////////////ERROR///////////////////////////
        const redCornerFlag = $(element).find('img.opacity-70').eq(0).attr('src'); // Corrected selector for img with class
        const blueCornerFlag = $(element).find('img.opacity-70').eq(1).attr('src'); // Corrected selector for img with class

        const redCornerRecord = $(element).find('.order-2.text-\\[15px\\]').text().trim();
        const blueCornerRecord = $(element).find('.order-1.text-\\[15px\\]').text().trim();

        const redCornerImage = $(element).find('img.rounded').eq(0).attr('src');
        const blueCornerImage = $(element).find('img.rounded').eq(1).attr('src');

        // const redCornerRecord = $(element).find('.fightCardRecord').eq(0).text().trim();
        // const blueCornerRecord = $(element).find('.fightCardRecord').eq(1).text().trim();
        const redCornerRecordAfterReuslt = $(element).find('.fightCardFighterRank').eq(0).text().trim();
        const blueCornerRecordAfterReuslt = $(element).find('.fightCardFighterRank').eq(1).text().trim();
        
        const match = $(element).find('.text-neutral-50').text().trim();
        const method = $(element).find('.fightCardResult .result').text().trim();
        const round = $(element).find('.fightCardResult .time').text().trim();
        // Determine the winner based on class presence
        let winner = null; // Default to null if neither class is found
        if ($(element).find('.fightCardFighterBout.left').hasClass('win')) {
            winner = 0; // Red corner wins
        } else if ($(element).find('.fightCardFighterBout.right').hasClass('win')) {
            winner = 1; // Blue corner wins
        }
    
        console.log(redCornerName);
        console.log(blueCornerName);
        console.log(redCornerRecord);
        console.log(blueCornerRecord);
    
        if (
          // redCornerName && blueCornerName &&
           redCornerRecord && blueCornerRecord) {
          const fighter = {
              redCornerName,
              redCornerRecord,
              blueCornerName,
              blueCornerRecord, 
              blueCornerFlag, 
              redCornerFlag,
              method,
              round, 
              winner, // Updated to use the winner variable
              redCornerImage, 
              blueCornerImage,
              match
          };
          PFLData.push(fighter);
      } 
      // else if (redCornerName && blueCornerName) {
      //     const fighter = {
      //         redCornerName,
      //         redCornerRecordAfterReuslt, // Note: Ensure this is intentional vs redCornerRecord
      //         blueCornerName,
      //         blueCornerRecordAfterReuslt, // Likewise, ensure this is the desired field vs blueCornerRecord
      //         blueCornerFlag, 
      //         redCornerFlag,
      //         method,
      //         round, 
      //         winner, // Updated to use the winner variable
      //         redCornerImage, 
      //         blueCornerImage,
      //         match
      //     };
      //     ACAData.push(fighter);
      // }
      
    });
    

      return {PFLData,PFLlocationCC,PFLpromotion,PFLtapImage,PFLeventTime};
    }
  } catch (error) {
    console.error('Error scraping PFL:', error);
    throw error;
  }
};



app.get('/scrape-mma-websites', async (req, res) => {
  try {
    // const pflData = await scrapePFL();
    // const { fighters, liveR } = await scrapeESPN();
    const {Data,locationCC,promotion,tapImage,eventTime} = await scrapeTap();
    const {ACAData,ACAlocationCC,ACApromotion,ACAtapImage,ACAeventTime} = await scrapeTapACA();
    const {PFLData,PFLlocationCC,PFLpromotion,PFLtapImage,PFLeventTime} = await scrapeTapPFL();
    

    res.json({
      // pflData,
      // fighters,
      // liveR,
      Data, locationCC,promotion,tapImage,eventTime,
      ACAData,ACAlocationCC,ACApromotion,ACAtapImage,ACAeventTime,
      PFLData,PFLlocationCC,PFLpromotion,PFLtapImage,PFLeventTime

    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while scraping data.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
