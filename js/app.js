var request = new XMLHttpRequest();
/*
built-in browser object that allows to make HTTP requests in JavaScript.
*/
var button  = document.getElementById('button'); //get button by id
var div     = document.getElementById('GIF-container');
var loader  = document.getElementById('loader');

var SIMULATED_SLOWNESS = 0;
var NUMBER_OF_GIFS = 50;

function makeRequest(url) {
  request = new XMLHttpRequest();

  if (!request) {
    alert('Giving up :( Cannot create an XMLHTTP instance');
    return false;
  }

  showLoader();

  request.open("GET", url);
  request.onreadystatechange = alertContents;
  setTimeout(function() {
    request.send();
  }, SIMULATED_SLOWNESS);
}
