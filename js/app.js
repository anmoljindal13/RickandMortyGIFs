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


function alertContents() {
  var READY_STATE_DONE = 4;
  var HTTP_STATUS_OK   = 200;

  if (request.readyState !== READY_STATE_DONE) {
    return;
  }

  hideLoader();

  if (request.status !== HTTP_STATUS_OK) {
    console.log('There was a problem with the request.');
    return;
  }

  var data = JSON.parse(request.responseText).data;
  var randomIndex = Math.floor(Math.random() * NUMBER_OF_GIFS);
  var item = data[randomIndex];

  var imgSrc  = item.images.fixed_height_still.url;
  var gifSrc  = item.images.fixed_height.url;
  var link = document.createElement("a");
  var img  = document.createElement("img");

  img.setAttribute('src', imgSrc);
  img.setAttribute('data-gif', gifSrc);
  link.setAttribute('href', gifSrc);
  link.classList.add('js-gif');
  link.appendChild(img);
  div.appendChild(link);

  animateGif(link);
}

function animateGif(link) {
  var img    = link.childNodes[0];
  var gifSrc = img.getAttribute('data-gif');
  var imgSrc = img.getAttribute('src');

  link.addEventListener('click', function(e) {
    e.preventDefault();
    var animated = link.classList.contains('js-animate');

    if(!animated) {
      img.setAttribute('src', gifSrc);
      link.classList.add('js-animate');
    } else {
      img.setAttribute('src', imgSrc);
      link.classList.remove('js-animate');
    }
  });
}

function loadGif() {
  var dataURL = 'http://api.giphy.com/v1/gifs/search?q=Rick and Morty&limit='+ NUMBER_OF_GIFS + '&api_key=dc6zaTOxFJmzC';
  div.innerHTML = '';
  makeRequest(dataURL);
}

function showLoader() {
  loader.setAttribute('style', 'display: flex');
}

function hideLoader() {
  loader.setAttribute('style', 'display: none');
}

button.addEventListener('click', function(e) { 
  e.preventDefault();
  loadGif();
}, false);

document.addEventListener('DOMContentLoaded', loadGif);
