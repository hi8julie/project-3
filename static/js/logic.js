// Store our API endpoint as queryURL
var queryURL = "http://127.0.0.1:5000/np-geojson"

// Perform a GET request to the query URL/
d3.json(queryURL).then(function(data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
  console.log(data.features);
});

function createFeatures(parkData) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.name}</h3>`);
  }

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  var parks = L.geoJSON(parkData, {
    onEachFeature: onEachFeature
  });

  // Send our earthquakes layer to the createMap function/
  createMap(parks);
}

function createMap(parks) {

  // Create the base layers.
  var Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 1,
    maxZoom: 16,
    ext: 'jpg'
  });

  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": Stamen_Watercolor 
  };

  // Create an overlay object to hold our overlay.
  var overlayMaps = {
    Parks: parks
  };

  var map = L.map('map').setView([39.0997, -94.578331], 12);
  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	maxZoom: 4,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
}).addTo(map);

//   L.tileLayer('https://tile.openstreetmap.be/osmbe/{z}/{x}/{y}.png', {
//      attribution:
//          '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors' +
//          ', Tiles courtesy of <a href="https://geo6.be/">GEO-6</a>',
//      maxZoom: 18
//  }).addTo(map);

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  // var myMap = L.map("my-custom-map", {
  //   center: [
  //     37.09, -95.71
  //   ],
  //   zoom: 5,
  //   layers: [Stamen_Watercolor, parks]
  // });

  // var myMap = L.map('my-custom-map').setView([51.505, -0.09], 13);

  // L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
  //     maxZoom: 18,
  //     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
  //         '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
  //         'Imagery © <a href="http://mapbox.com">Mapbox</a>',
  //     id: 'mapbox.streets'
  // }).addTo(myMap);

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(map);

// 
}
