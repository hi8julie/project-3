// Store our API endpoint as queryURL
var queryURL = "https://national-parks.onrender.com/np-geojson"

// Perform a GET request to the query URL/
d3.json(queryURL).then(function(data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
  console.log(data.features);
});

function createFeatures(parkData) {
  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the name the park.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.Name}</h3>`);
  }
// Adding custom markers with ExtraMarkers plugin 
      var greenMarker = L.ExtraMarkers.icon({
        icon: 'fa-tree',
        shape: 'star', 
        markerColor: 'green-light',
        prefix: 'fa'
      });

    var parks = L.geoJSON(parkData, {
      pointToLayer: function(feature, latlng) {
        return L.marker(latlng, {icon: greenMarker});
      },
      onEachFeature: onEachFeature
    });

  // Send our park layer to the createMap function
  createMap(parks);
}

function createMap(parks) {

  var map = L.map('map').setView([39.0997, -94.578331], 4);
  var street = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
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


// Store a URL in a constant variable 
const url = 'https://national-parks.onrender.com/np-visitation'

// Fetch the JSON data and console log it
d3.json(url).then(
  function(data) {
    console.log(data);
  });

// Create functions to update our bar charts when we choose a different park from the dropdown menu. 

function updatePlotly(newdata, title) {
  Plotly.update('bar', {'y': [newdata]}, {'title': title});
}
function updateBarChart(newdata, title) {
  Plotly.update('bar-2', {'y': [newdata]}, {'title': title});
}
// Create a function that populates the park info box.
function buildParkInfo()
{
    // Use the D3 library to get all the parks data
    d3.json(url).then((data) => {
      // Use D3 to select the dropdown menu
      let dropdownMenu = d3.select("#selDataset");
      // Assign the value of the dropdown menu option to a variable
      let park = dropdownMenu.property("value");

        // Get all the metadata
        let metaData = data.result;

        // Filter the metadata 
        let parkResult = metaData.filter(parkResult => parkResult.national_park == park);
        // Get the data on the first park
        let resultData = parkResult[0];
        // Clean the metadata (so that the previous park data disappears once the new park is selected)
        d3.select("#park-metadata").html("");

        // Update the park info box with keys and values from the park data
        Object.entries(resultData).forEach(([key, value]) => {
            d3.select("#park-metadata")
                .append("h5").text(`${key}: ${value}`);
        
        });
        // Call the UpdatePlotly functions 
        updatePlotly([resultData.visitation_2020, resultData.visitation_2021, resultData.visitation_2022], `Visitation at ${resultData.national_park}` );
        updateBarChart([resultData.total_recreation_visitor_hours_2020, resultData.total_recreation_visitor_hours_2021, resultData.total_recreation_visitor_hours_2022], `Visitation at ${resultData.national_park}` );
    
    });
};

function buildBarChart(park)
{
     // Use the D3 library to get all the parks data
    d3.json(url).then((data) => {

        var metaData = data.result;
  
        let resultData = metaData[0];

        let visitation_2020 = park.visitation_2020;
        let visitation_2021 = resultData.visitation_2021;
        let visitation_2022 = resultData.visitation_2022;

        let allVisitation = [visitation_2020, visitation_2021, visitation_2022];

        // Display the chart
        const yticks = allVisitation;
        let xValues = ["2020", "2021", "2022"];
        
        // Create a bar chart 
        let barChart = {
            y: yticks,
            x: xValues,
            text: resultData.national_park,
            type: "bar",
            orientation: "v",
            mode: 'markers',
            marker: {
                color: "#072E74"
            }
        };

        let barData = [barChart];

        // Set a layout for the bar chart
        let layout = {
            title: `Visitation at ${resultData.national_park}`,
            xaxis: {tickmode: "linear", tick0: "2020", dtick: 1}
        };

        // Plot a bar chart using Plotly
        Plotly.newPlot("bar", barData, layout)

        let totalHours2020 = resultData.total_recreation_visitor_hours_2020;
        let totalHours2021 = resultData.total_recreation_visitor_hours_2021;
        let totalHours2022 = resultData.total_recreation_visitor_hours_2022;

        let totalHours = [totalHours2020, totalHours2021, totalHours2022]
        const yAxis = totalHours;
        let xAxis = ["2020", "2021", "2022"];

        // Create a bar chart 
        let barChart2 = {
          y: yAxis,
          x: xAxis,
          text: resultData.national_park,
          type: "bar",
          orientation: "v",
          mode: 'markers',
          marker: {
              color: "#A4C100"
          }
      };

      let barData2 = [barChart2]

      // Set a layout for the bar chart
      let layout2 = {
          title: `Total Hours at ${resultData.national_park}`,
          xaxis: {tickmode: "linear", tick0: "2020", dtick: 1}
      };

      // Plot the bar chart using Plotly
      Plotly.newPlot("bar-2", barData2, layout2)
    });
};


// Create a function that initializes the dashboard
function startDashboard()
{
    // Create a variable for the dropdown menu using the html id
    let select = d3.select("#selDataset");

    // Use the D3 library to get the park names and populate the dropdown menu
    d3.json(url).then((data) => {
        let allParks = data.result;
        allParks.forEach((park) => {
            select.append("option")
                .text(park.national_park)
                .property("value", park.national_park);
        });

        let park1 = allParks[0];

        // Call the function to build the initial park info box
        buildParkInfo(park1);
        buildBarChart(park1);
      });    
    };

d3.selectAll("#selDataset").on("change", buildParkInfo);


// Call the function to start the dashboard
startDashboard();