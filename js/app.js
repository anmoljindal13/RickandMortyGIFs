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


