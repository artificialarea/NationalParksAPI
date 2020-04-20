'use strict';

//////////////////////////////////////////////////////////////
// SEPARATION OF CONCERNS: TYPES OF FUNCTIONS
// Miscellaneous (incl Fetch Requests)
// Template Generators
// Rendering Functions
// Event Handlers
//////////////////////////////////////////////////////////////

// INIT
function init() {
  handleSubmission();
  // renderDropdownMenu();
}

// MISCELLANEOUS /////////////////////////////////////////////

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map( key => {
    return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
  });
  return queryItems.join('&');  
}

function fetchStateParkInfo(states, maxResults) {
  // console.log(states, maxResults);

  const apiKey = '5sSsm7fFCYCquxRBY5P0IVUu9Y1OX70vBJb4algf';
  const baseURL = 'https://developer.nps.gov/api/v1/parks';

  const params = {
    stateCode: states,
    limit: maxResults,
    // extra param not in requirements
    // per: https://www.nps.gov/subjects/developer/faqs.htm#CP_JUMP_5619871
    fields: 'images',   
    api_key: apiKey,
  };

  const queryString = formatQueryParams(params);
  
  const url = baseURL + '?' + queryString;
  console.log(url);
  
  // BECAUSE OFTEN IT TAKES SO LONG FOR THE PROMISE TO BE FULFILLED
  // INFORMING THE USER TO BE PATIENT ;P
  $('.js-please-wait').removeClass('hidden').html('<b>Searching...</b> Please be patient wait while we fetch this data for you...');

  fetch(url)
  .then(response => {
    // console.log('response to fetch query fulfilled');
    if(!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  })
  .then(data => {
    // console.log(data);
    renderStateParkInfo(data);
    $('.js-please-wait').addClass('hidden').html('');
  })
  .catch(err => {
    console.log(err);
    $('.js-error-msg').removeClass('hidden').html(err);
  });
}



// TEMPLATE GENERATORS ///////////////////////////////////////

function generateStateParkInfo(dataInfo) {
  const arr = [];
  for (let i = 0; i < dataInfo.data.length; i++) {
    arr.push(`<li> 
        <h3 class="park-name">${dataInfo.data[i].fullName}</h3>
        <img src="${dataInfo.data[i].images[0].url}" alt="${dataInfo.data[i].images[0].caption}">
        <p class="park-description"><b>${dataInfo.data[i].states}</b> ${dataInfo.data[i].description}</p>
        <p class="park-website"><a href="${dataInfo.data[i].url}" target="_blank">${dataInfo.data[i].url}</a></p>
        <p class="park-address"></p>
      </li>
    `);
  }
  return arr.join('');
}



// RENDERING FUNCTIONS ///////////////////////////////////////

function renderStateParkInfo(dataInfo) {
  const results = generateStateParkInfo(dataInfo);
  $('#js-list-results').html(results);
  $('#js-results').removeClass('hidden');
}



// EVENT HANDLERS ////////////////////////////////////////////
function handleSubmission() {
  $('#search-form').on('submit', event => {
    event.preventDefault();
    const maxResults = $('#max-num-results').val();
    const selectedStatesPre = $('#js-select-state').val();
    // precaution to remove potential whitespace within string
    const selectedStates = selectedStatesPre.split(' ').join('');
    fetchStateParkInfo(selectedStates, maxResults);
    // clear out previous result, if applicable
    $('#js-list-results').empty();
  });
}


// INVOKE INIT
$(init);



// _                  _         _                   
// | |                | |       | |                  
// | |_ ___  _ __ ___ | |__  ___| |_ ___  _ __   ___ 
// | __/ _ \| '_ ` _ \| '_ \/ __| __/ _ \| '_ \ / _ \
// | || (_) | | | | | | |_) \__ \ || (_) | | | |  __/
//  \__\___/|_| |_| |_|_.__/|___/\__\___/|_| |_|\___|

// GRAVEYARD /////////////////////////////////////////////

// 1. SELECT STATE VIA DROPDOWN //////////////////////////

/*

function generateDropdownMenu(STATES) {
  const options = STATES.map(item => {
    return `<option value=${item.abbreviation}>${item.name}</option>
    `;
  });
  return `<option value="" disabled selected>Select a State</option>
    ${options}
  `;
}

function renderDropdownMenu() {
  const listOfStates = generateDropdownMenu(STATES);
  $('#js-select-state').html(listOfStates);
}






*/

// 2. GET ADDRESS ////////////////////////////////////////

/*

function renderStateParkAddress(dataInfo) {
  console.log(JSON.stringify(dataInfo));
  // $('#js-address-results').append(
  //   `<li>
  //       <p>${dataInfo.results[0].formatted_address}</p>
  //   </li>`
  // );

  $('#js-address-test').removeClass('hidden');

}

function fetchAddress(latitude, longitude) {

  const apiKey =  'removed so not public';
  const baseURL = 'https://maps.googleapis.com/maps/api/geocode/json';

  // should I use Headers to pass apiKey instead via fetch(url, options)?
  const options = {
    headers: new Headers({
      'X-Api-Key': apiKey})   
  };

  const params = {
    key: apiKey,
    latlng: latitude + ',' + longitude,
  };
  
  const queryString = formatQueryParams(params);
  
  const url = baseURL + '?' + queryString;
  console.log(url);

  fetch(url)
  .then(response => response.json)
  .then(data => {
    console.log(data);
    // renderStateParkAddress(data);
  })
  .catch(err => console.log(err));

}


// <excerpt within renderStateParkInfo(dataInfo)>

  for (let i=0; i < dataInfo.data.length; i++) {

    // get latitude and longitude to reverse geocode the address
    // via Google Maps Geocode API
    const latitude = dataInfo.data[i].latitude;
    const longitude = dataInfo.data[i].longitude;
    // fetchAddress(latitude, longitude);
    // ^^^^^^^^^^^^^^
    // Suspending attempt to get address because exeeded timebox
    // ** REFACTOR ** later
  
// </excerpt>

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map( key => {
    return `${key}=${params[key]}`;

    // had to remove encodeURIComponent 
    // because for google maps URL it converts the comma (,)
    // in latlng to %2C 
    // e.g. ...latlng=37.81005871%2C-122.4244415
    // return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
  });
  return queryItems.join('&');  
}

*/



