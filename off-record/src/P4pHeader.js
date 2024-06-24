import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
// import './tailwind.css'
import { ChevronUpIcon, PlusIcon } from '@heroicons/react/24/solid';
import HeaderLogin from "./HeaderLogin";

import { NavLink, useLocation } from "react-router-dom";

import {useNavigate} from 'react-router-dom'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const paths = {
  'UFC': '/section3',
  'Bellator': '/bellator',
  'ACA': '/aca',
  'PFL': '/pfl-europe',
};


export default function P4pHeader({user, onLogout,onLogin}) {

    console.log(user)
    const navigate = useNavigate();
    const handleOptionClick = (option) => {
        // Implement the functionality for each option here if needed
        console.log(`Option "${option}" clicked.`);
        
        
        navigate(`${option}`);
    };


    const location = useLocation();
  const currentPath = location.pathname;

  console.log('Current route:', currentPath);


  return (
  <>
    <Disclosure as="nav" className="bg-white shadow" style={{
      maxWidth: '100%', // Set maximum width
      // Hide overflow
      textOverflow: 'ellipsis', // Add ellipsis if text overflows
      whiteSpace: 'nowrap', // Keep text on a single line
    }}>
      {({ open }) => (
        <>
        {/* <div style={{borderBottom:'solid white 3px',borderTop:'solid white 3px'}} class="element-with-border"></div> */}
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8" >
          
            <div className="relative flex h-16 justify-between"  style={{}}>
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <div onClick={() => { handleOptionClick('/') }}
                    className="h-8 w-auto p4pHI cursor-pointer"
                    // src="./p4p+whitegreen.png"
                    // alt=""
                  ></div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  
                  
                  {/* <a
                    href="#"
                    onClick={() => { handleOptionClick('/section3') }}
                    className={`${currentPath === "/section3" ? " inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900":'inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'} `}
                  >
                    Pick 4 UFC
                  </a>
                  <a
                    href="#"
                    
                    onClick={() => { handleOptionClick('/bellator') }}
                    className={`${currentPath === "/bellator" ? " inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900":'inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'} `}
                  >
                    Pick 4 Bellator 
                  </a>
                  <a
                    href="#"
                    
                    onClick={() => { handleOptionClick('/aca') }}
                    className={`${currentPath === "/aca" ? " inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900":'inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'} `}
                  >
                    Pick 4 ACA 
                  </a>
                  <a
                    href="#"
                    
                    onClick={() => { handleOptionClick('/pfl-europe') }}
                    className={`${currentPath === "/pfl-europe" ? " inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900":'inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'} `}
                  >
                    Pick 4 PFL 
                  </a> */}
                  
                    <a className={`${currentPath === "/section3" || currentPath === "/aca" || currentPath === "/one-championship" || currentPath === "/pfl-europe" || currentPath === "/bellator" ? " mt-3 items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900":' mt-3 items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'} `}>
        <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button style={{
    background: 'linear-gradient(to right, darkred 50%, navy 50%)',
  }}
 className={` ${open || currentPath == "/section3" || currentPath === "/aca" || currentPath === "/one-championship" || currentPath === "/pfl-europe" || currentPath === "/bellator" ? '': 'shake'} flex justify-between w-full px-4 py-2 text-white text-sm font-medium text-left bg-darkred-navy  rounded-lg hover:bg-purple-300 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75`}>
              <span className='bg-white text-black' style={{}}>Pick <span className='color-green'>4</span> Points !</span>
              {/* <ChevronUpIcon
                className={`${open ? 'transform rotate-180' : ''
                  } w-5 h-5 text-white-500`}
              /> */}
              <PlusIcon
  className={`${open ? 'transform rotate-45 text-red-700 bg-white br-50  '  : 'text-green-500 bg-black '} w-5 h-5 `}
/>
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 bg-white pt-4  text-sm text-gray-500" style={{borderRight:'navy 4px solid',borderLeft:'darkred 4px solid',marginTop:'-5px'}}>
              <div className="space-y-1">
                {['UFC',
                 'PFL',
                  'ACA',
                   'Bellator'].map((organization) => (
                  <a
                    key={organization}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={(e) => {
                      e.preventDefault();
                      handleOptionClick(paths[organization]);
                      // Your navigation logic here
                      console.log(`${paths[organization]} clicked`);
                    }}
                  >
                    {organization} 
                  </a>
                ))}
              </div>
              <div style={{borderBottom:'solid white 0px',width:'140%',marginLeft:'-20%'}} class="element-with-border2"></div>
              
            </Disclosure.Panel>
          </>
        )}
         </Disclosure>
      </a>
     
      <a
                    href="#"
                    onClick={() => { handleOptionClick('/') }}
                    className={`${currentPath === "/" ? " inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900":'inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'} `}
                  >
                    Home
                  </a>
                  <a
                    href="#"
                    onClick={() => { handleOptionClick('/about') }}
                    className={`${currentPath === "/about" ? " inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900":'inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'} `}
                  >
                    About
                  </a>
                  <a
                    href="#"
                    onClick={() => { handleOptionClick('/results') }}
                    className={`${currentPath === "/results" ? " inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900":'inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'} `}
                  >
                    Results
                  </a>
                  <a
                    href="#"
                    className={`${currentPath === "/results/compare" ? " inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900":'inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'} `}
                    onClick={() => { handleOptionClick('/results/compare') }}
                  >
                    Compare
                  </a>
                 
                  <a
                    href="#"
                    className={`${currentPath === "/leagues" ? " inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900":'inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'} `}
                    onClick={() => { handleOptionClick('/leagues') }}
                  >
                    Leagues
                  </a>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* <button
                  type="button"
                  className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                      style={{ border: user ? '1px navy solid' : '1px red solid' }}

                        className="h-8 w-8 rounded-full"
                        src={user?.image || 'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1'}
                        alt=""
                        />


                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      
                      {user ? <>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            onClick={() => { handleOptionClick('/profile') }}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            onClick={() => { handleOptionClick('/profile/settings') }}
                         >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            onClick={onLogout}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                      </>: <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            onClick={() => { handleOptionClick('/section1') }}

                          >
                            Login / Sign up
                          </a>
                        )}
                      </Menu.Item> }
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              
            </div>
            
            
          </div>
          <div style={{borderBottom:'solid white 3px',borderTop:'solid white 3px'}} class="element-with-border"></div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-4 ">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <Disclosure.Button
                as="a"
                href="#"
                onClick={() => { handleOptionClick('/') }}
                className={`${currentPath === "/" ? "block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700": "block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"}`}
              >
                Home
              </Disclosure.Button>




              <Disclosure>
        {({ open }) => (
          <>
          
            <Disclosure.Button style={{
    background: 'linear-gradient(to right, darkred 50%, navy 50%)',
  }}
 className={` ${!open ? 'shake': ''} flex  justify-between w-full px-4 py-2 text-white text-sm font-medium text-left bg-darkred-navy  rounded-lg hover:bg-purple-300 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75`}>
              <span className='text-bold'>Pick 4 Points!</span>
              <PlusIcon
  className={`${open ? 'transform rotate-45 text-red-700 bg-white br-50  '  : 'text-green-500 bg-black '} w-5 h-5 `}
/>
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 text-sm text-gray-500" style={{borderRight:'navy 4px solid',borderLeft:'darkred 4px solid',marginTop:'-6px',marginBottom:'-6px'}}>
              <div className="space-y-1">
                {['UFC',
                 'PFL',
                  'ACA',
                   'Bellator'].map((organization) => (
                  <a
                    key={organization}
                    href="#"
                    className={`block px-4 py-2 text-sm text-gray-700 hover ${currentPath === paths[organization] ? 'bg-gray-100 block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700' : ''} `}
                    onClick={(e) => {
                      e.preventDefault();
                      handleOptionClick(paths[organization]);
                      // Your navigation logic here
                      console.log(`${paths[organization]} clicked`);
                    }}
                  >
                    {organization} 
                  </a>
                ))}
              </div>
              
            </Disclosure.Panel>
            
            { open ?   <div style={{borderBottom:'solid white 3px',width:'100%',
      // maxWidth: '100%', // Set maximum width
      // Hide overflow
      textOverflow: 'ellipsis', // Add ellipsis if text overflows
      whiteSpace: 'nowrap', // Keep text on a single line
    }} class="element-with-border2"></div>: null}
          </> 
        )}
      </Disclosure>


             {/* ////////////////////////
              <Disclosure.Button
                as="a"
                href="#"
                onClick={() => { handleOptionClick('/section3') }}
                className={`${currentPath === "/section3" ? "block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700": "block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"}`}
              >
                Pick 4 UFC 
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                onClick={() => { handleOptionClick('/pfl-europe') }}
                className={`${currentPath === "/pfl-europe" ? "block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700": "block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"}`}
              >
                Pick 4 PFL maria J
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                onClick={() => { handleOptionClick('/aca') }}
                className={`${currentPath === "/aca" ? "block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700": "block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"}`}
              >
                Pick 4 ACA
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                onClick={() => { handleOptionClick('/bellator') }}
                className={`${currentPath === "/bellator" ? "block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700": "block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"}`}
              >
                Pick 4 Bellator
              </Disclosure.Button>
              /////////////////////////////// */}
              <Disclosure.Button
                as="a"
                href="#"
                onClick={() => { handleOptionClick('/about') }}
                className={`${currentPath === "/about" ? "block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700": "block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"}`}
              >
                About
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                onClick={() => { handleOptionClick('/results') }}
                className={`${currentPath === "/results" ? "block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700": "block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"}`}
              >
                Results
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                onClick={() => { handleOptionClick('/results/compare') }}
                className={`${currentPath === "/results/compare" ? "block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700": "block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"}`}
              >
                Compare
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                onClick={() => { handleOptionClick('/leagues') }}
                className={`${currentPath === "/leagues" ? "block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700": "block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"}`}
              >
                Leagues
              </Disclosure.Button>
              
              
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
     {!user ?  <HeaderLogin  onLogin={onLogin} onLogout={onLogout} />  : <></>}


</>

  )
}
