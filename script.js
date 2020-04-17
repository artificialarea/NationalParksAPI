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

}

function fetchStateParkInfo(selectedState, maxResults) {
  console.log(selectedState, maxResults);

  // params object
  // formatQueryParams(params);
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