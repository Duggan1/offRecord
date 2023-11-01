import React, { useState, useEffect  } from "react";
import './App.css';
import { NavLink } from "react-router-dom";
import {useNavigate} from 'react-router-dom'

function Home({user, ufcCard, stallUfcCard, locationCity,location, BGpic}) {
    const navigate = useNavigate()
    const handleOptionClick = (option) => {
        navigate(`${option}`);
      };
    const [ countPick ,setPickCount] = useState(null)
    // const [mainEvent, setMainEvent ] = useState('UFC')
    console.log(BGpic)
    
      useEffect(() => {
        // Fetch results from the API
        fetch('https://off-therecordpicks.onrender.com/picks')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log(data); // Log the data received from the API
            if (Array.isArray(data.picks)) {
                console.log(data)
                setPickCount(data.picks.length);
              
            } 
          })
          .catch(error => {
            console.error('Error fetching results:', error);
            // Handle error as needed
          });
      }, []); // Empty dependency array means this effect runs once after the component mounts
      
      
   
      const selectedUfcCard = ufcCard.length > 1 ? ufcCard : stallUfcCard;
      console.log(selectedUfcCard)

      const isUfcCardLoaded = ufcCard.length > 1;

      const mainEvent = isUfcCardLoaded ? ufcCard[0].fighters.join(' vs ') : '';
    
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


    return (
        < div className="home" >
            {/* <p style={{ color: 'yellow' }}>Welcome to</p> */}
            <h1 className="homeheaders"style={{marginTop:'0%',paddingTop:'0%',marginBottom:'0%',paddingBottom:'0%'}}
                // Adjust this value as needed
                >
                Off The Record Picks!
                </h1><h6 className='color-gold snow'style={{marginTop:'0%',paddingTop:'0%',marginBottom:'10%',paddingBottom:'10%'}}>{mainEvent}</h6>
               
               
                <div className='crdiv2'style={{
                  
                  // paddingLeft:'5%',
                }} > 
                { !user ? 
                <h6 className='color-yellow snow'style={{marginBottom:'10%',paddingBottom:'10%',marginTop:'0%',paddingTop:'0%',}}> Login/Signup to make Off the Record Picks </h6>:
                <h6 className='color-yellow snow'style={{marginBottom:'10%',paddingBottom:'10%',marginTop:'0%',paddingTop:'0%',}}> Welcome Back <span className="color-white">{user.username}</span></h6>

                              }
               
               
                <h5 className='color-black  snow' style={{marginTop:'0%',paddingTop:'0%', backgroundImage: `url("https://flagsapi.com/${getCountryAbbreviation(location)}/flat/64.png")`,
                  backgroundSize: '100% 100%',
                  backgroundRepeat:'no-repeat',
                  paddingTop:'15%',
                  paddingBottom:'15%',marginBottom:'0%'
                  }} ></h5>
                  <h6 className='color-white snow'style={{marginBottom:'0%',paddingBottom:'0%',marginTop:'0%',paddingTop:'0%'}}>  {locationCity} </h6><br></br></div>
                
                { isUfcCardLoaded ? <div className='crdiv' style={{ height: '120px', backgroundImage: `url(${BGpic})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundColor: "black", position: 'relative' }} onClick={() => handleOptionClick('/section3')}>
                    <NavLink className='color-gold hgysnow' exact to="/section3"></NavLink>
                    <h5 className='purple2 snow' style={{ textAlign: 'center',  marginTop: '-6%' }}>UFC PICK'EMS</h5>
                </div>
                : 


                <div style={{ display: 'flex' }}><div className="loading" style={{ height: '100px', width: '100px' }}></div>
                <h5 style={{ display: 'flex', whiteSpace: 'nowrap' }}>
                  Loading Card Details
                </h5>
              </div>
               }
               
                
                <div className='crdiv' onClick={() => handleOptionClick('/results')}><NavLink className=' purple2 snow' exact to="/results">Check Results</NavLink></div>
                <div className='crdiv'  onClick={() => handleOptionClick('/about')}><NavLink className='purple2 snow' exact to="/about">About Us</NavLink></div>
                
               
                <h2 style={{paddingTop:'15%'}} className="homeheaders">{countPick} - Off-The-Record-Picks -  </h2>
        
                { isUfcCardLoaded ? <div className="home-fighter">
                                    <div className="fi" style={{backgroundImage: `url('${ufcCard[0].fighterPics[0]}')`,backgroundPosition: 'left'}} ></div>
                                    <div className="fi" style={{backgroundImage: `url('${ufcCard[0].fighterPics[1]}')`,backgroundPosition: 'right'}}> </div>
                                    </div> : <div className="loading" style={{ height: '100px', width: '100px' ,justifyContent:'center'}}></div> }
        

        
        </div>
    )
}
export default Home;