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
    layer.bindPopup(`<h3>${feature.properties.Name}</h3>`);
  }

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.

  var greenMarker = L.AwesomeMarkers.icon({
      html: '<span class="glyphicon glyphicon-leaf"></span></p>', 
      iconColor: 'white',
      markerColor: 'green'
    });
        
  var parks = L.geoJSON(parkData, {
    pointToLayer: function(feature, latlng) {
      return L.marker(latlng, {icon: greenMarker});
    },
    onEachFeature: onEachFeature
  });

  // Send our earthquakes layer to the createMap function/
  createMap(parks);
}

function createMap(parks) {

  var map = L.map('map').setView([39.0997, -94.578331], 12);
  var street = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	// maxZoom: 4,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
}).addTo(map);

  // Create a baseMaps object.
  var baseMaps = {
    "World map": street 
  };

  // Create an overlay object to hold our overlay.
  var overlayMaps = {
    NationalParks: parks
  };


  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
   
}