import React, { useState, useEffect  } from "react";
import './App.css';
import { NavLink } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import P4pHeader from './P4pHeader'
import HeaderLogin from "./HeaderLogin";


function Home({user, ufcCard, stallUfcCard, state, locationCity,location,weRlive, BGpic, tapImage, countPick, isOwnerAndEventMatch, onLogout, onLogin, LNmenow,bellatorInfo,acaInfo,pflInfo,oldPFLEvent}) {
    const navigate = useNavigate()
    const handleOptionClick = (option) => {
        navigate(`${option}`);
      };

      
  function transformData(initialData) {
    const predictions = initialData.map((fight, index) => {
      const winner =
    (fight.fighter1 && fight.fighter1.hasRedArrow) ? 0 :
      (fight.fighter2 && fight.fighter2.hasBlueArrow) ? 1 :
        fight.timeDetails1 ? 3 : null;
  
                              
                              ; // Assuming red arrow signifies winner
      const methodMapping = {
        'Dec': 'Decision',
        'Sub': 'Submission',
        'KO/TKO': 'TKO/KO',
      };
  
      const methodMatch = fight.timeDetails1 ? fight.timeDetails1.match(/(Dec|Sub|KO\/TKO)/) : null;
      console.log(isOwnerAndEventMatch)
  
      const method = methodMatch ? methodMapping[methodMatch[0]] : null;
      const roundMatch = fight.timeDetails1 ? fight.timeDetails1.match(/R(\d+)/): null;
      const round = roundMatch ? roundMatch[1] : null;
  
      const fighter1Name = fight.fighter1 ? fight.fighter1.name : 'Unknown Fighter 1';
      const fighter2Name = fight.fighter2 ? fight.fighter2.name : 'Unknown Fighter 2';
      
      const fighters = [fighter1Name, fighter2Name];
      
  
      return {
        fighters: fighters,
        method: method,
        round: round,
        winner: winner,
      };
    });
  
    return  predictions ;
  }

      console.log(ufcCard)
      const selectedUfcCard = ufcCard && ufcCard.length > 1 ? ufcCard : stallUfcCard;
      console.log(selectedUfcCard)
      let isUfcCardLoaded = ufcCard.length > 1 || bellatorInfo[0];
      
      // Define variables based on ufcCard
      let mainEvent = ufcCard && ufcCard.length > 1 && ufcCard[0].fighters
  ? ufcCard[0].fighters.join(' vs ')
  : '';

      let mainRedC = ufcCard.length > 1 ? ufcCard[0].fighters[0] : '';
      let mainBlueC = ufcCard.length > 1 ? ufcCard[0].fighters[1] : '';

      useEffect(() => {
        // Check if ufcCard is loaded and has more than one element
        isUfcCardLoaded = ufcCard.length > 1 || bellatorInfo;
      
        // Define variables based on ufcCard
        mainEvent = ufcCard.length > 1 ? ufcCard[0].fighters.join(' vs ') : '';
        mainRedC = ufcCard.length > 1 ? ufcCard[0].fighters[0] : '';
        mainBlueC = ufcCard.length > 1 ? ufcCard[0].fighters[1] : '';
      
        // Do something with the variables if needed
        console.log('Main Event:', mainEvent);
        console.log('Main Red Corner Fighter:', mainRedC);
        console.log('Main Blue Corner Fighter:', mainBlueC);
      
        // You can put additional logic or state updates here based on ufcCard changes
      
      }, [ufcCard]); // Add ufcCard to the dependency array
      
      
      const [firstName, secondName] = LNmenow ? LNmenow.split(" vs ") : ['', ''] ;
      
      const countryData = {
        "Andorra": "AD",
        "United Arab Emirates": "AE",
        "Afghanistan": "AF",
        "Antigua and Barbuda": "AG",
        "Anguilla": "AI",
        "Albania": "AL",
        "Armenia": "AM",
        "Netherlands Antilles": "AN",
        "Angola": "AO",
        "Antarctica": "AQ",
        "Argentina": "AR",
        "American Samoa": "AS",
        "Austria": "AT",
        "Australia": "AU",
        "Aruba": "AW",
        "Åland Islands": "AX",
        "Azerbaijan": "AZ",
        "Bosnia and Herzegovina": "BA",
        "Barbados": "BB",
        "Bangladesh": "BD",
        "Belgium": "BE",
        "Burkina Faso": "BF",
        "Bulgaria": "BG",
        "Bahrain": "BH",
        "Burundi": "BI",
        "Benin": "BJ",
        "Saint Barthélemy": "BL",
        "Bermuda": "BM",
        "Brunei Darussalam": "BN",
        "Bolivia": "BO",
        "Bonaire, Sint Eustatius and Saba": "BQ",
        "Brazil": "BR",
        "Bahamas": "BS",
        "Bhutan": "BT",
        "Bouvet Island": "BV",
        "Botswana": "BW",
        "Belarus": "BY",
        "Belize": "BZ",
        "Canada": "CA",
        "Cocos (Keeling) Islands": "CC",
        "Congo, The Democratic Republic Of The": "CD",
        "Central African Republic": "CF",
        "Congo": "CG",
        "Switzerland": "CH",
        "Côte D'Ivoire": "CI",
        "Cook Islands": "CK",
        "Chile": "CL",
        "Cameroon": "CM",
        "China": "CN",
        "Colombia": "CO",
        "Costa Rica": "CR",
        "Cuba": "CU",
        "Cape Verde": "CV",
        "Curaçao": "CW",
        "Christmas Island": "CX",
        "Cyprus": "CY",
        "Czech Republic": "CZ",
        "Germany": "DE",
        "Djibouti": "DJ",
        "Denmark": "DK",
        "Dominica": "DM",
        "Dominican Republic": "DO",
        "Algeria": "DZ",
        "Ecuador": "EC",
        "Estonia": "EE",
        "Egypt": "EG",
        "Western Sahara": "EH",
        "Eritrea": "ER",
        "Spain": "ES",
        "Ethiopia": "ET",
        "England":"GB",
        "Finland": "FI",
        "Fiji": "FJ",
        "Falkland Islands (Malvinas)": "FK",
        "Micronesia, Federated States Of": "FM",
        "Faroe Islands": "FO",
        "France": "FR",
        "Gabon": "GA",
        "United Kingdom": "GB",
        "Grenada": "GD",
        "Georgia": "GE",
        "French Guiana": "GF",
        "Guernsey": "GG",
        "Ghana": "GH",
        "Gibraltar": "GI",
        "Greenland": "GL",
        "Gambia": "GM",
        "Guinea": "GN",
        "Guadeloupe": "GP",
        "Equatorial Guinea": "GQ",
        "Greece": "GR",
        "South Georgia and the South Sandwich Islands": "GS",
        "Guatemala": "GT",
        "Guam": "GU",
        "Guinea-Bissau": "GW",
        "Guyana": "GY",
        "Hong Kong": "HK",
        "Heard and McDonald Islands": "HM",
        "Honduras": "HN",
        "Croatia": "HR",
        "Haiti": "HT",
        "Hungary": "HU",
        "Indonesia": "ID",
        "Ireland": "IE",
        "Israel": "IL",
        "Isle of Man": "IM",
        "India": "IN",
        "British Indian Ocean Territory": "IO",
        "Iraq": "IQ",
        "Iran, Islamic Republic Of": "IR",
        "Iceland": "IS",
        "Italy": "IT",
        "Jersey": "JE",
        "Jamaica": "JM",
        "Jordan": "JO",
        "Japan": "JP",
        "Kenya": "KE",
        "Kyrgyzstan": "KG",
        "Cambodia": "KH",
        "Kiribati": "KI",
        "Comoros": "KM",
        "Saint Kitts And Nevis": "KN",
        "Korea, Democratic People's Republic Of": "KP",
        "South Korea": "KR",
        "Kuwait": "KW",
        "Cayman Islands": "KY",
        "Kazakhstan": "KZ",
        "Lao People's Democratic Republic": "LA",
        "Lebanon": "LB",
        "Saint Lucia": "LC",
        "Liechtenstein": "LI",
        "Sri Lanka": "LK",
        "Liberia": "LR",
        "Lesotho": "LS",
        "Lithuania": "LT",
        "Luxembourg": "LU",
        "Latvia": "LV",
        "Libya": "LY",
        "Morocco": "MA",
        "Monaco": "MC",
        "Moldova": "MD",
        "Montenegro": "ME",
        "Saint Martin": "MF",
        "Madagascar": "MG",
        "Marshall Islands": "MH",
        "Macedonia, the Former Yugoslav Republic Of": "MK",
        "Mali": "ML",
        "Myanmar": "MM",
        "Mongolia": "MN",
        "Macao": "MO",
        "Northern Mariana Islands": "MP",
        "Martinique": "MQ",
        "Mauritania": "MR",
        "Montserrat": "MS",
        "Malta": "MT",
        "Mauritius": "MU",
        "Maldives": "MV",
        "Malawi": "MW",
        "Mexico": "MX",
        "Malaysia": "MY",
        "Mozambique": "MZ",
        "Namibia": "NA",
        "New Caledonia": "NC",
        "Niger": "NE",
        "Norfolk Island": "NF",
        "Nigeria": "NG",
        "Nicaragua": "NI",
        "Netherlands": "NL",
        "Norway": "NO",
        "Nepal": "NP",
        "Nauru": "NR",
        "Niue": "NU",
        "New Zealand": "NZ",
        "Oman": "OM",
        "Panama": "PA",
        "Peru": "PE",
        "French Polynesia": "PF",
        "Papua New Guinea": "PG",
        "Philippines": "PH",
        "Pakistan": "PK",
        "Poland": "PL",
        "Saint Pierre And Miquelon": "PM",
        "Pitcairn": "PN",
        "Puerto Rico": "PR",
        "Palestine, State of": "PS",
        "Portugal": "PT",
        "Palau": "PW",
        "Paraguay": "PY",
        "Qatar": "QA",
        "Réunion": "RE",
        "Romania": "RO",
        "Serbia": "RS",
        "Russia": "RU",
        "Rwanda": "RW",
        "Saudi Arabia": "SA",
        "Solomon Islands": "SB",
        "Seychelles": "SC",
        "Sudan": "SD",
        "Sweden": "SE",
        "Singapore": "SG",
        "Saint Helena": "SH",
        "Slovenia": "SI",
        "Svalbard And Jan Mayen": "SJ",
        "Slovakia": "SK",
        "Sierra Leone": "SL",
        "San Marino": "SM",
        "Senegal": "SN",
        "Somalia": "SO",
        "Suriname": "SR",
        "South Sudan": "SS",
        "Sao Tome and Principe": "ST",
        "El Salvador": "SV",
        "Sint Maarten": "SX",
        "Syrian Arab Republic": "SY",
        "Swaziland": "SZ",
        "Turks and Caicos Islands": "TC",
        "Chad": "TD",
        "French Southern Territories": "TF",
        "Togo": "TG",
        "Thailand": "TH",
        "Tajikistan": "TJ",
        "Tokelau": "TK",
        "Timor-Leste": "TL",
        "Turkmenistan": "TM",
        "Tunisia": "TN",
        "Tonga": "TO",
        "Turkey": "TR",
        "Trinidad and Tobago": "TT",
        "Tuvalu": "TV",
        "Taiwan, Republic Of China": "TW",
        "Tanzania, United Republic of": "TZ",
        "Ukraine": "UA",
        "Uganda": "UG",
        "United States Minor Outlying Islands": "UM",
        "United States": "US",
        "Uruguay": "UY",
        "Uzbekistan": "UZ",
        "Holy See (Vatican City State)": "VA",
        "Saint Vincent And The Grenadines": "VC",
        "Venezuela, Bolivarian Republic of": "VE",
        "Virgin Islands, British": "VG",
        "Virgin Islands, U.S.": "VI",
        "Vietnam": "VN",
        "Vanuatu": "VU",
        "Wallis and Futuna": "WF",
        "Samoa": "WS",
        "Yemen": "YE",
        "Mayotte": "YT",
        "South Africa": "ZA",
        "Zambia": "ZM",
        "Zimbabwe": "ZW"
      };
      
      function getCountryAbbreviation(countryName) {
        return countryData[countryName] || "Not Found";
      }
      console.log(stallUfcCard[0].fighterPics[1])
      const fightingMan = ['p4p8','apple', 'f-Man5', 'f-Man6', 'f-Man7', 'f-Man', 'f-Man2', 'f-Man3',  'f-Man4R','f-Man4','apple'];
      const [currentClass, setCurrentClass] = useState(fightingMan[0]);
      const [currentfighter, setCurrentfighter] = useState(stallUfcCard[0]);
    console.log(bellatorInfo[0] )
    console.log(ufcCard.length > 1 || bellatorInfo)
      useEffect(() => {
        const intervalId = setInterval(() => {
          // Rotate through the classes
          setCurrentClass(prevClass => {
            const currentIndex = fightingMan.indexOf(prevClass);
            const nextIndex = (currentIndex + 1) % fightingMan.length;
            return fightingMan[nextIndex];
          });
      
          // Rotate through the fighters
          setCurrentfighter(prevFighter => {
            const currentFightIndex = stallUfcCard.indexOf(prevFighter);
            const nextFightIndex = (currentFightIndex + 1) % stallUfcCard.length;
            return stallUfcCard[nextFightIndex];
          });
      
        }, 800);
      
        // Clear the interval when the component is unmounted
        return () => clearInterval(intervalId);
      }, []); // Empty dependency array to ensure the effect runs only once during component mount
      
      const liveNready = weRlive ? transformData(weRlive.filter(item => item)) : [];
      console.log(currentfighter)
      console.log(weRlive.some(item => item.timeDetails1 !== ''))
      const countNonEmptyTimeDetails = weRlive.filter(item => item.timeDetails1 !== '').length;
      console.log(bellatorInfo,acaInfo,pflInfo, oldPFLEvent)
      console.log(liveNready)

      const baseURLForS3Files = "https://dmxg5wxfqgb4u.cloudfront.net";
      const baseURLForThemes = "https://www.ufc.com";
      
      const [backgroundImageUrl, setBackgroundImageUrl] = useState('');
//////////////////////////////////
const [BGindex, setBGindex] = useState(0);

  useEffect(() => {
    // Initial 5-second timeout to change BGindex from 0 to 1
    const initialTimeoutId = setTimeout(() => {
      setBGindex(1);
    }, 5000); // 5 seconds

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(initialTimeoutId);
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    // Function to handle the index update and scheduling the next update
    const updateIndex = () => {
      setBGindex((currentBGindex) => {
        const nextIndex = currentBGindex < ufcCard.length - 1 ? currentBGindex + 1 : 0;
        return nextIndex;
      });
    };
  
    // Scheduling the first update after 3 seconds if starting at index 0, otherwise 500ms
    const initialDelay = BGindex === 0 ? 5000 : 500;
    const timeoutId = setTimeout(updateIndex, initialDelay);
  
    // Cleanup function to clear the scheduled update if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [BGindex, ufcCard.length]); // Dependencies on BGindex and ufcCard.length
  // Dependencies on BGindex and ufcCard.length
  
//////////////////////////////////
  useEffect(() => {
    const baseURLForS3Files = "https://dmxg5wxfqgb4u.cloudfront.net";
    const baseURLForThemes = "https://www.ufc.com";

    const newBackgroundImageUrl = BGpic && BGpic.startsWith("/s3/files/")
    ? `https://dmxg5wxfqgb4u.cloudfront.net/${BGpic.substring("/s3/files/".length)}`
    : BGpic && BGpic.startsWith("/themes/custom/")
      ? `https://www.ufc.com/${BGpic}`
      : '';
  


    setBackgroundImageUrl(newBackgroundImageUrl);
  }, [BGpic]);
  console.log(typeof onLogin);

    return ( <>
    <P4pHeader user={user} onLogout={onLogout} />
   
    
    
      {isUfcCardLoaded ? 
       <>
      <div style={{
  backgroundImage: `url(${
    BGpic && BGpic.startsWith("/s3/files/")
      ? `https://dmxg5wxfqgb4u.cloudfront.net/${BGpic.substring("/s3/files/".length)}`
      : BGpic && BGpic.startsWith("/themes/custom/")
        ? `https://www.ufc.com/${BGpic}`
        : BGpic || ''
  })`,
  backgroundSize: '100% 100%'
}}
>
        
      <div className={` homeSpace  text-align-center`} >
      {!user ?  <HeaderLogin  onLogin={onLogin} onLogout={onLogout} />  : <></>}

        
 
        {!user ? <> 
              <h1 onClick={() => { handleOptionClick('/section1') }} className="fs65 color-red cursor-pointer">&#8599;</h1>
              <p onClick={() => { handleOptionClick('/section1') }} className=" color-red landunder cursor-pointer">
                <span style={{backgroundColor:'white'}}>Please Login or Create an Account</span>
                </p>
                  </> 
          : <h1 className="fs452 color-black">Welcome Back, {user?.username} {user?.userName}</h1>}
        
       
        {user ?  isOwnerAndEventMatch ?

          <>
         {/* <p className="color-green text-alight-right">Picks submitted </p> */}
         <div className="flex " style={{flexWrap: 'wrap'}}>
         {isOwnerAndEventMatch?.predictions?.map((fight, index) => {
    // Check if liveNready[index] and fight are defined
    if (liveNready[index] && fight) {
      return (
        <div key={index} className="flex" style={{
          backgroundColor: 'white',
          padding: '1%',
          margin: '2px',
          borderRadius: '18px',
          color: 'black',
          border: liveNready[index].winner !== null && fight.winner !== null
    ? liveNready[index].winner === fight.winner
      ? 'green 3px solid'
      : 'red 3px solid'
    : 'black 1px solid',
        }}>

{
  liveNready[index].winner && fight.winner
    ? liveNready[index].winner === fight.winner
      ? (
        liveNready[index].method && fight.method
          ? liveNready[index].method === fight.method
            ? (
              liveNready[index].round && fight.round
                ? liveNready[index].round === fight.round
                  ? <p className='color-green bold'>+3</p>
                  : <p className='color-green bold'>+2</p>
                : <p className='color-green bold'>+2</p>
            )
            : <p className='color-green bold'>+1</p>
          : <p className='color-green bold'>+1</p>
      )
      : <p className=''>{index + 1}.</p>
    : <p className=''>{index + 1}.</p>
}




                    

          
          
          
          
          
          <p
            style={{
              backgroundColor: fight.winner !== null
                  ? fight.winner === 1 ? "navy"
                  : fight.winner == 0 ? 'darkred'
                  : "grey"
                  : "gray",

              padding: '1%',
              margin: '2px',
              borderRadius: '18px',
              color: 'white',
              border: 'black 1px solid', width:'60px'
            }}
          >
           {fight.method && fight.method[0] === 'T'
  ? (fight.round ? `KO R${fight.round}` : 'KO')
  : (fight && fight.method
      ? (fight.method[0] === 'D' ? 'Dec' : `${fight.method[0]}${fight.round ? ` R${fight.round}` : ''}`)
      : `S R${fight.round || ''}`)}







          </p>
        </div>
      );
    }
    // Return null if liveNready[index] or fight is undefined
    return null;
  })}
         
          </div>
          </>       
         
         
         :  <p className="color-red text-alight-right">Picks missing </p>  : null }

     


      </div>





        <div style={{borderBottom:'solid white 3px',borderTop:'solid white 3px'}} class="element-with-border"></div>
        { isOwnerAndEventMatch ? <>
       


        <div className="bg-black-trans" style={{padding:'0% 0% 0% 0%' }}> 
        
                <p className=" text-align-center" style={{maxWidth:'100%',padding:'0% 0% 2% 0%' }}>
    <span style={{ backgroundColor: 'darkred', padding: '2px',maxWidth:'40%', fontSize: firstName.length > 7 ? '100%' : '100%',color: 'white', border:'2px white solid' }}>{firstName}</span>
    <span style={{ backgroundColor: 'white', padding: '2px',color:'black',maxWidth:'10%', border:'2px white solid' }}>vs</span>
    <span style={{ backgroundColor: 'navy', padding: '2px',maxWidth:'40%',color: 'white', border:'2px white solid' }}>{secondName}</span>
      </p>
      {weRlive.some(item => item.timeDetails1 !== '') ? (
    <p style={{
      color: 'green',
      fontWeight: 'bold',textAlign:'right',marginRight:'1%',marginTop:'-25px',paddingBottom:'15px'
    }}>     <span style={{backgroundColor:'black',padding:'1%'}}> Live <span style={{
        minHeight: '10px',
        border: 'white solid 1px',
        borderRadius: '50%',
        minWidth: '15px',
        backgroundColor: 'darkgreen',
      }}>_</span></span>
    </p>
  ) : null}
{/* {weRlive.some(item => item.timeDetails1 === '')? <><span className="color-green font-bold"> Live <span style={{minHeight:'10px',border:'white solid 1px ', borderRadius:'50%',minWidth:'15px',backgroundColor:'darkgreen'}}>_</span> </span>
                         </> : null } */}

 <div className="flex " style={{flexWrap: 'wrap'}}>

      
      {liveNready ? (
  liveNready.map((fight, index) => (
    <div key={index} className="flex" style={{
      backgroundColor: 'whitesmoke',
      padding: '1%',
      margin: '2px',
      borderRadius: '18px',
      color: 'black',
      border: fight.winner !== null ? 'black 3px solid' : 'black 1px dotted',
    }}>
      <p>{index + 1}.</p>
      <p
        style={{
          backgroundColor: fight.winner !== null
          ? fight.winner === 1 ? "navy"
          : fight.winner == 0 ? 'darkred'
          : "black"
          : "gray",

          padding: '0px 3%',
          margin: '2px',
          borderRadius: '18px',
          color: fight.winner ? 'white' : 'white',
          border: 'black 1px solid',
          width:'60px',
          textAlign:'center',
        }}
      >
        {fight.method && fight.method[0] !== null ?
        //  fight.method[0]
        ''
          : ' ?'}

        {fight.method && fight.method[0] === 'T'
  ? (fight.round ? `KO R${fight.round}` : 'KO')
  : (fight && fight.method
      ? (fight.method[0] === 'D' ? 'Dec' : `${fight.method[0]}${fight.round ? ` R${fight.round}` : ''}`)
         : (fight && fight.method
           ? (fight.method[0] === 'S'  ? `S R${fight.round}` : 'Sub') : null))}
      </p>
    </div>
  ))
) : null}





</div>
<div style={{borderBottom:'solid white 3px',borderTop:'solid white 3px',marginTop:'2%'}} class="element-with-border"></div>
        </div> </> : null}

        </div>
      < div 
      className="homep4p" 
      >
        
        
<div className="home" >
      
                <div  className='crdiv2 box-content '> 

               {mainBlueC ?<>
                        
                        <center><div  style={{marginBottom:'-5px'}} className="p4pplusBlack23"></div></center>
                 <div className=""
                  style={{zIndex:'1',display:'',justifyContent:'center',maxWidth:'100%'}}
                  ><div style={{backgroundColor:'black',color:'white',zIndex:'1',display:'flx',justifyContent:'center',minWidth:'45%'}}>
       


                 <p style={{maxWidth:'100%',position: 'relative' }}>
    <span style={{ backgroundColor: 'red', padding: '2px',maxWidth:'40%', fontSize: firstName.length > 7 ? '100%' : '100%'  }}>{firstName}</span>
    <span style={{ backgroundColor: 'white', padding: '2px',color:'black',maxWidth:'10%' }}>vs</span>
    <span style={{ backgroundColor: 'blue', padding: '2px',maxWidth:'40%', }}>{secondName}</span>
</p>

                 </div>
                 {/* //////////////////////// */}</div>
                
                 {location ? 
                <></>
                  :
                  
                  <p className='snow homebullet'style={{marginBottom:'0%',paddingBottom:'0%',marginTop:'0%',paddingTop:'0%',backgroundColor:'black',color:'white'}}> Loading Event Details ...</p>}
               
               
                </> : null} 
                
                
                {!tapImage ? 
                  <h5 className=' snow loadingL'  style={{
                    // backgroundImage: `url(${tapImage})`,
                  backgroundSize: '100% 100%',
                  backgroundRepeat:'no-repeat',
                  paddingTop:'15%',
                  paddingBottom:'15%',marginBottom:'0%',marginTop:'0%', cursor:'pointer',
                 height:'200px',
                  }} ></h5> 
                : <h5 
                onClick={() => navigate('/section3')}
                className={`snow fake shake z2`} style={{
                  backgroundImage: `url(${tapImage})`
                  ,
                backgroundSize: '100% 100%',
                backgroundRepeat:'no-repeat',
                paddingTop:'15%',
                paddingBottom:'15%',marginBottom:'0%',marginTop:'0%', cursor:'pointer',
               height:'200px'
                }} ></h5> }

                
                 </div>
                  
                 
    <div style={{display:'flex', justifyContent:'center',paddingTop:'0%'}}>
        {/* <div style={{borderRight:'solid black 2px',borderLeft:'solid black 2px',borderTop:'solid black 2px',zIndex: '2'}} className="p4pplus"></div> */}
                </div>
                { isUfcCardLoaded ? <div className="home-fighter"  style={{alignItems:'start'}}>
                                    <div className="fi2"
                                              style={{
                                                backgroundImage: ufcCard.length > 2 && ufcCard[BGindex]?.fighterPics?.[0]
                                                  ? `url('${
                                                      ufcCard[BGindex].fighterPics[0].startsWith("/s3/files/")
                                                        ? "https://dmxg5wxfqgb4u.cloudfront.net/" + 
                                                          ufcCard[BGindex].fighterPics[0].substring("/s3/files/".length)
                                                        : ufcCard[BGindex].fighterPics[0]
                                                    }')`
                                                  : '',
                                                marginTop: '100px',
                                                width: '100%',
                                                maxWidth: '300px',
                                                backgroundSize: '75% 100%',
                                              }}
                                              ></div>
                                    <div
                                              className="fi2"
                                              style={{
                                                backgroundImage: ufcCard.length > 2 ?  `url('${
                                                  ufcCard[BGindex].fighterPics[1].startsWith("/s3/files/")
                                                    ? "https://dmxg5wxfqgb4u.cloudfront.net/" +
                                                      ufcCard[BGindex].fighterPics[1].substring("/s3/files/".length)
                                                    : ufcCard[BGindex].fighterPics[1]
                                                  }')`: '',
                                                backgroundPosition: 'right',width: '100%',maxWidth:'300px',backgroundSize:'75% 100%',marginLeft: 'auto',
                                                marginTop: '100px'
                                              }}
                                            ></div>

                                    </div> :
                                    
                                    
                                    
                                    <div className="loading" style={{ height: '100px', width: '100px' ,justifyContent:'center'}}></div> }
        
</div>
                                   
                                    {/* <span style={{
                                      borderTop: '15px solid red',
                                      borderRight: '15px solid blue',
                                      borderLeft: '15px solid red',
                                      borderBottom: '15px solid blue',
                                      minHeight:'100px',
                                      width:'200px',
                                      color: 'white',
                                      backgroundColor: 'black',
                                      // padding:'12% 15%',
                                      borderRadius:'50%'

                                
                          }} className='p4pplus'> </span> */}

                          


<div style={{borderBottom:'solid white 3px',borderTop:'solid white 3px',marginTop:'0px'}} class="element-with-border"></div>
            <div style={{width:'100%',backgroundColor:'white',display:'flex', justifyContent:'center'}}>
            <h1 
            style={{
                textAlign: 'center',
                color: 'red',
                margin: "0",
                fontSize:'35px',
                maxWidth: '100%',
                // cursor:'pointer',
                fontFamily:"Copperplate,monospace",
                


                // Adjust this value as needed
                }}>
                P
                </h1><h1 
            
            style={{
                textAlign: 'center',
                color: 'red',
                margin: "0",
                fontSize:'15px',
                maxWidth: '100%',
                marginTop: '10px',
                // cursor:'pointer',
                fontFamily:"Copperplate,monospace",
                


                // Adjust this value as needed
                }}>
                icks
                </h1>
                
                <h1 
            
            style={{
                textAlign: 'center',
                color: 'black',
                margin: "0",
                fontSize:'35px',
                marginTop: '0%',
                // cursor:'pointer',
                fontFamily:"Copperplate,monospace",
                


                // Adjust this value as needed
                }}>
                4
                </h1>
                <h1 
            
            style={{
                textAlign: 'center',
                color: 'blue',
                margin: "0",
                fontSize:'35px',
                marginTop: '0%',
                // cursor:'pointer',
                fontFamily:"Copperplate,monospace",
                


                // Adjust this value as needed
                }}>
                P
                </h1>
                <h1 
            
            style={{
                textAlign: 'center',
                color: 'blue',
                margin: "0",
                fontSize:'15px',
                maxWidth: '100%',
                marginTop: '10px',
                // cursor:'pointer',
                fontFamily:"Copperplate,monospace",
                


                // Adjust this value as needed
                }}>
                oints
                </h1>
                <h1 
            
            style={{
                textAlign: 'center',
                color: 'blue',
                margin: "0",
                fontSize:'15px',
                maxWidth: '100%',
                marginTop: '10px',
                // cursor:'pointer',
                fontFamily:"Copperplate,monospace",
                


                // Adjust this value as needed
                }}>
                .com
                </h1>
                </div>


        </div> 
        </>
        :
        
        
        <>
        
                  <div className="rentingSpace text-align-center">
                  {!user ? <HeaderLogin  onLogin={onLogin} onLogout={onLogout} />  : <></>}

          {!user ? <> <p onClick={() => { handleOptionClick('/section1') }} className=" color-red landunder cursor-pointer">Please Sign In or Sign Up </p> <h1 onClick={() => { handleOptionClick('/section1') }} className="fs65 color-red cursor-pointer">&#8599;</h1> </> : <h1 className="fs452 color-blue">Welcome Back, {user?.username} {user?.userName}</h1>}
            
            {user ?  isOwnerAndEventMatch ? <p className="color-green text-alight-right">Picks submitted </p> :  <p className="color-red text-alight-right">Picks missing </p>  : null }
            
            </div>
                 <div style={{borderBottom:'solid white 3px',borderTop:'solid white 3px'}} class="element-with-border"></div>
            <div style={{paddingTop:'15%',paddingBottom:'500px'}}className="element-with-border3">

            <div className="home-fighter2">
                                    <div className="fi"
                                              style={{
                                                backgroundImage: `url('${
                                                  currentfighter.fighterPics[0]
                                                }')`,
                                                backgroundPosition: 'right',
                                                marginTop: '0%',width: '100%',maxWidth: '300px',backgroundSize:'100% 100%',
                                              }} ></div>
                                    <div
                                              className="fi"
                                              style={{
                                                backgroundImage: `url('${
                                                  currentfighter.fighterPics[1]
                                                }')`,
                                                backgroundPosition: 'right',width: '100%',maxWidth: '300px',backgroundSize:'100% 100%',marginLeft: 'auto',
                                                marginTop: '0%',
                                              }}
                                            ></div>

                                    </div>

                  <div style={{marginTop:"-450px",
                              
                              backgroundPosition: '50% 50%',
                              backgroundColor: currentClass === 'p4p8' ? 'black':'whitesmoke',
                              border:'3px solid black',
                              borderRadius:'50%',
                              backgroundSize: '75% 75%'}} 
                     className={`${currentClass}`}></div> 

                     
            </div>
            
            <div style={{backgroundColor:'whitesmoke'}} >
            <div style={{borderBottom:'solid white 3px',borderTop:'solid white 3px'}} class="element-with-border"></div>
                 <p className=" text-align-center " style={{minHeight:'10px'}}><strong >Loading...</strong></p>
                 <div style={{borderBottom:'solid white 3px',borderTop:'solid white 3px'}} class="element-with-border"></div>         
            </div>
       </>
        }
    </>)
}
export default Home;