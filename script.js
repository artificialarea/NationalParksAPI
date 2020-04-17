'use strict';

// GOAL: Display a list of national parks in an area with info
// REQUIREMENTS //////////////////////////////////////////////

// The user must be able to search for parks in one or more states.

// The user must be able to set the max number of results, with a default of 10.

// The search must trigger a call to NPS's API.

// The parks in the given state must be displayed on the page. Include at least:
// Full name
// Description
// Website URL

// The user must be able to make multiple searches and see only the results for the current search.

// As a stretch goal, try adding the park's address to the results.

// end REQUIREMENTS ///////////////////////////////////////////




//////////////////////////////////////////////////////////////
// SEPARATION OF CONCERNS: TYPES OF FUNCTIONS
// (Miscellaneous): Fetch Data
// Template Generators
// Rendering Functions
// Event Handlers
//////////////////////////////////////////////////////////////

// INIT
function init() {
  handleSubmission();
}

// MISCELLANEOUS /////////////////////////////////////////////

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map( key => {
    return `${key}=${params[key]}`;
  });
  return queryItems.join('&');  
}

function fetchStateParkInfo(selectedState, maxResults) {
  // console.log(selectedStat-e, maxResults);

  const apiKey = '5sSsm7fFCYCquxRBY5P0IVUu9Y1OX70vBJb4algf';
  const baseURL = 'https://developer.nps.gov/api/v1/parks';

  const params = {
    stateCode: selectedState,
    limit: maxResults,
    api_key: apiKey,
  };

  const queryString = formatQueryParams(params);
  const url = baseURL + "?" + queryString;
  console.log(url);

  // fetch
  // renderingResults();
}

// TEMPLATE GENERATORS ///////////////////////////////////////

// RENDERING FUNCTIONS ///////////////////////////////////////

function renderingResults() {
  // generating HTML 
  // rendering HTML in da DOM
}

// EVENT HANDLERS ////////////////////////////////////////////
function handleSubmission() {
  // get values of submission
  $('#search-form').on('submit', event => {
    event.preventDefault();
    const selectedState = $('#js-select-state').val();
    const maxResults = $('#max-num-results').val();
    // fetch data
    fetchStateParkInfo(selectedState, maxResults);

  })
}

// INVOKE INIT
$(init);