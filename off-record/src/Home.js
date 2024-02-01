import React, { useState, useEffect  } from "react";
import './App.css';
import { NavLink } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import P4pHeader from './P4pHeader'


function Home({user, ufcCard, stallUfcCard, state, locationCity,location,weRlive, BGpic, tapImage, countPick, isOwnerAndEventMatch, onLogout, LNmenow}) {
    const navigate = useNavigate()
    const handleOptionClick = (option) => {
        navigate(`${option}`);
      };

      
      console.log(ufcCard)
      const selectedUfcCard = ufcCard.length > 1 ? ufcCard : stallUfcCard;
      console.log(selectedUfcCard)

      const isUfcCardLoaded = ufcCard.length > 1;

      const mainEvent = isUfcCardLoaded ? ufcCard[0].fighters.join(' vs ') : '';
      const mainRedC = isUfcCardLoaded ? ufcCard[0].fighters[0] : '';
      const mainBlueC = isUfcCardLoaded ? ufcCard[0].fighters[1]  : '';
      console.log(tapImage)
      const [firstName, secondName] = LNmenow.split(" vs ");
      
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
      console.log(location)
      const fightingMan = ['p4p8','apple', 'f-Man5', 'f-Man6', 'f-Man7', 'f-Man', 'f-Man2', 'f-Man3',  'f-Man4R','f-Man4','apple'];
      const [currentClass, setCurrentClass] = useState(fightingMan[0]);
    
      useEffect(() => {
        const intervalId = setInterval(() => {
          // Rotate through the classes
          const currentIndex = fightingMan.indexOf(currentClass);
          const nextIndex = (currentIndex + 1) % fightingMan.length;
          setCurrentClass(fightingMan[nextIndex]);
        }, 500);
    
        // Clear the interval when the component is unmounted
        return () => clearInterval(intervalId);
      }, [currentClass, fightingMan]);
      console.log(weRlive.some(item => item.timeDetails1 !== ''))
      const countNonEmptyTimeDetails = weRlive.filter(item => item.timeDetails1 !== '').length;



    return ( <>
    <P4pHeader user={user} onLogout={onLogout} />
    
    
      {isUfcCardLoaded ?  <>
      <div className="homeSpace text-align-center">

      {!user ? <> <p onClick={() => { handleOptionClick('/section1') }} className=" color-red landunder cursor-pointer">Please Sign In or Sign Up </p> <h1 onClick={() => { handleOptionClick('/section1') }} className="fs65 color-red cursor-pointer">&#8599;</h1> </> : <h1 className="fs452 color-blue">Welcome Back, {user?.username} {user?.userName}</h1>}
        
        {user ?  isOwnerAndEventMatch ? <p className="color-green text-alight-right">Picks submitted </p> :  <p className="color-red text-alight-right">Picks missing </p>  : null }
        
        </div>
        <div style={{borderBottom:'solid white 3px',borderTop:'solid white 3px'}} class="element-with-border"></div>
      < div className="home" >
            {/* <p style={{ color: 'yellow' }}>Welcome to</p> */}
            {/* <h1 className="homeheaders"style={{}}
                // Adjust this value as needed
                > */}
                 
                {/* </h1> */}
                
                {/* <h1>{weRlive.some(item => item.fighter1 !== '') ? 'True' : 'False' }</h1> */}
      
                <div  className='crdiv2 box-content'> 

               {mainBlueC ?<>
                        {weRlive.some(item => item.timeDetails1 !== '')? <><p className="snowwhite">We Are <span className="color-green">Live</span></p>
                         <p className="snowwhite">Fight  {countNonEmptyTimeDetails}/{ufcCard.length} </p> </> : null }
                        <center><div  style={{marginBottom:'-5px'}} className="p4pplusBlack2"></div></center>
                 <div className=""
                  style={{zIndex:'1',display:'flex',justifyContent:'center',maxWidth:'100%'}}
                  ><div style={{backgroundColor:'white',color:'white',zIndex:'1',display:'flex',justifyContent:'center',minWidth:'45%'}}>
                  {/* <h6 className='homebullet snow 'style={{marginTop:'0%',paddingTop:'0%',marginBottom:'0%',paddingBottom:'0%',color:'white'}}>{mainRedC}</h6>
                </div><div style={{minWidth:'10%'}}>
                 <h6 className='color-white snow'style={{marginTop:'0%',paddingTop:'0%',marginBottom:'0%',paddingBottom:'0%',backgroundColor:'white',color:'black'}}>  vs  </h6>
                 </div><div style={{backgroundColor:'blue',minWidth:'45%'}}>
                 <h6 className='homebullet snow'style={{marginTop:'0%',paddingTop:'0%',marginBottom:'0%',paddingBottom:'0%',color:'white'}}>{mainBlueC}</h6> */}
                 <h6>
    <span style={{ backgroundColor: 'red', padding: '2px' }}>{firstName}</span>
    <span style={{ backgroundColor: 'white', padding: '2px',color:'black' }}> vs </span>
    <span style={{ backgroundColor: 'blue', padding: '2px' }}>{secondName}</span>
</h6>
                 </div>
                 {/* //////////////////////// */}</div>
                
                 {location ? 
                 <div
                  style={{zIndex:'1',display:'flex',justifyContent:'center'}}>
                 <p className='snow homebullet'style={{marginBottom:'0%',paddingBottom:'0%',marginTop:'0%',paddingTop:'5px',paddingRight:'5px',backgroundColor:'black',color:'white'}}> {locationCity}, {state}</p>
                 <h6 className=' snow color-transp' style={{ backgroundImage: `url("https://flagsapi.com/${getCountryAbbreviation(location)}/flat/64.png")`,
                  backgroundSize: '100% 100%',
                  backgroundRepeat:'no-repeat',
                  marginBottom:'0%',paddingBottom:'0%',marginTop:'0%',paddingTop:'0%',backgroundColor:'black'
                  // paddingTop:'15%',
                  // paddingBottom:'45%',
                  // marginBottom:'0%',marginTop:'0%',
                  // width:'100%',
                  //  justifyContent:'center',textAlign:'center'
                  }} >___</h6></div>
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
                onClick={() => { handleOptionClick('/section3') }}
                className=' snow '  style={{
                  backgroundImage: `url(${tapImage})`,
                backgroundSize: '100% 100%',
                backgroundRepeat:'no-repeat',
                paddingTop:'15%',
                paddingBottom:'15%',marginBottom:'0%',marginTop:'0%', cursor:'pointer',
               height:'200px',
                }} ></h5> }


                  

               
               
                
                  </div>


                {/* ////////////////////// */}
                 <div className="" style={{textAlign:'center',height:'400px'}}>
</div>


                 {/* { !user ? 
                <h6 className='snow'style={{marginBottom:'0%',paddingBottom:'0%',marginTop:'0%',paddingTop:'0%',}}> Login/Signup to make Off the Record Picks </h6>:
                <h6 className='snow'style={{marginBottom:'0%',paddingBottom:'0%',marginTop:'0%',paddingTop:'0%',}}> Welcome Back <span className="color-white">{user.username}</span></h6>

                              } */}


                  {/* //////////////////////////// */}
                
                
                
                {/* { isUfcCardLoaded ? <div className='crdiv' style={{  height: '120px', backgroundImage: `url(${BGpic})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',  position: 'relative' }} onClick={() => handleOptionClick('/section3')}>
                    <NavLink className='color-gold hgysnow' exact to="/section3"></NavLink>
                    <h5 className=' snow' style={{ color:'black',textAlign: 'center',  marginTop: '-6%',textShadow: '0 0 15px white' }}>PICK'EM</h5>
                </div>
                : 


                <div style={{ display: 'flex' }}><div className="loading" style={{ height: '100px', width: '100px' }}></div>
                <h5 style={{ display: 'flex', whiteSpace: 'nowrap' }}>
                  Loading Card Details
                </h5>
              </div>
               }
               
                
                <div className='crdiv ' onClick={() => handleOptionClick('/results')}><NavLink className=' color-black snow' exact to="/results">Check Results</NavLink></div>
                <div className='crdiv ' onClick={() => handleOptionClick('/results/compare')}><NavLink className=' color-black snow' exact to="/results/compare">Compare Picks</NavLink></div>
                <div className='crdiv '   onClick={() => handleOptionClick('/about')}><NavLink className='color-black snow' exact to="/about">About P4P</NavLink></div>
                
                 */}
                
        <div style={{display:'flex', justifyContent:'center',paddingTop:'0%'}}>
        {/* <div style={{borderRight:'solid black 2px',borderLeft:'solid black 2px',borderTop:'solid black 2px',zIndex: '2'}} className="p4pplus"></div> */}
                </div>
                { isUfcCardLoaded ? <div className="home-fighter">
                                    <div className="fi" style={{backgroundImage: `url('${ufcCard[0].fighterPics[0]}')`,backgroundPosition: 'left',marginTop:'50%'}} ></div>
                                    <div className="fi" style={{backgroundImage: `url('${ufcCard[0].fighterPics[1]}')`,backgroundPosition: 'right',marginTop:'50%'}}> </div>
                                    </div> :
                                    
                                    
                                    
                                    <div className="loading" style={{ height: '100px', width: '100px' ,justifyContent:'center'}}></div> }
        

                                   
                                    <span style={{
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
                          }} className='p4pplus'> </span>



                                    <div style={{display:'flex', justifyContent:'center',marginTop:'80px'}}>
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
                </h1></div>


        </div> </>
        :
        
        
        <>
        
                  <div className="homeSpace text-align-center">

          {!user ? <> <p onClick={() => { handleOptionClick('/section1') }} className=" color-red landunder cursor-pointer">Please Sign In or Sign Up </p> <h1 onClick={() => { handleOptionClick('/section1') }} className="fs65 color-red cursor-pointer">&#8599;</h1> </> : <h1 className="fs452 color-blue">Welcome Back, {user?.username} {user?.userName}</h1>}
            
            {user ?  isOwnerAndEventMatch ? <p className="color-green text-alight-right">Picks submitted </p> :  <p className="color-red text-alight-right">Picks missing </p>  : null }
            
            </div>
                 <div style={{borderBottom:'solid white 3px',borderTop:'solid white 3px'}} class="element-with-border"></div>
            <div style={{paddingTop:'15%',paddingBottom:'35%'}}className="element-with-border3">
                  <div style={{marginTop:"5%",
                              
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