// Store our API endpoint as queryURL
var queryURL = "https://www.nps.gov/lib/npmap.js/4.0.0/examples/data/national-parks.geojson"

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
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": street
  };

  // Create an overlay object to hold our overlay.
  var overlayMaps = {
    Parks: parks
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, parks]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}




// // Store a URL in a constant variable 
// const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

// // Fetch the JSON data and console log it
// d3.json(url).then(
//   function(data) {
//     console.log(data);
//   });
 
// // Create a function that builds the bar chart
// function buildBarChart(sample)
// {
//      // Use the D3 library to get all the sampels data
//     d3.json(url).then((data) => {

//         let sampleData = data.samples;

//         // Filter the metadata 
//         let sampleResult  = sampleData.filter(sampleResult => sampleResult.id == sample);

//         // Get the data on the first sample
//         let resultData = sampleResult[0];

//         // Get the otu_ids, lables, and sample_values
//         let otu_ids = resultData.otu_ids;
//         let otu_labels = resultData.otu_labels;
//         let sample_values = resultData.sample_values;

//         // Slice top 10 to display in the chart 
//         let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}` );
//         let xValues = sample_values.slice(0, 10);
//         let textLabels = otu_labels.slice(0, 10);

//         // Create a bar chart 
//         let barChart = {
//             y: yticks.reverse(),
//             x: xValues.reverse(),
//             text: textLabels.reverse(),
//             type: "bar",
//             orientation: "h",
//             mode: 'markers',
//             marker: {
//                 color: "#602060"
//             }
//         };

//         let barData = [barChart]

//         // Set a layout for the bar chart
//         let layout = {
//             title: "Top 10 Belly Button Bacteria"
//         };

//         // Plot the bar chart using Plotly
//         Plotly.newPlot("bar", barData, layout)
//     });
// };

// // Create a funtion that builds the bubble chart
// function buildBubbleChart(sample)
// {
//      // Use the D3 library to get all the sampels data
//      d3.json(url).then((data) => {

//         let sampleData = data.samples;

//         // Filter the metadata 
//         let sampleResult = sampleData.filter(sampleResult => sampleResult.id == sample);

//         // Get the data on the first sample
//         let resultData = sampleResult[0];

//         // Get the otu_ids, lables, and sample_values
//         let otu_ids = resultData.otu_ids;
//         let otu_labels = resultData.otu_labels;
//         let sample_values = resultData.sample_values;

//         // Set up a bubble chart
//         let bubbleChart = {
//             y: sample_values,
//             x: otu_ids,
//             text: otu_labels,
//             mode: "markers",
//             marker: {
//                 size: sample_values,
//                 color: otu_ids,
//                 colorscale: "Electric"
//             }
//         };
//         let bubbleData = [bubbleChart]

//         // Set up a layout for the Bubble Chart
//         let layout = {
//             title: "Belly Button Bacteria Per Sample",
//             hovermode: "closest",
//             xaxis: {title: "OTU ID"}
//         };

//         // Plot the bar chart using Plotly
//         Plotly.newPlot("bubble", bubbleData, layout)
//     });
// };

// // Create a function that populates the demographics box
// function buildDemographInfo(sample)
// {
//     // Use the D3 library to get all the sampels data
//     d3.json(url).then((data) => {
        
//         // Get all the metadata
//         let metaData = data.metadata;

//         // Filter the metadata 
//         let sampleResult = metaData.filter(sampleResult => sampleResult.id == sample);

//         // Get the data on the first sample
//         let resultData = sampleResult[0];
//         // Clean the metadata (so that the previous sample data disappears once the new sample is selected)
//         d3.select("#sample-metadata").html("");

//         // Update the demographics box with keys and values from the sample data
//         Object.entries(resultData).forEach(([key, value]) => {
//             d3.select("#sample-metadata")
//                 .append("h5").text(`${key}: ${value}`);
//         });
//     });
// };

// // Create a function that initializes the dashboard
// function startDashboard()
// {
//     // Create a variable for the dropdown menu using the html id
//     let select = d3.select("#selDataset");

//     // Use the D3 library toget the sample names and populate the dropdown menu
//     d3.json(url).then((data) => {
//         let sampleNames = data.names;
//         sampleNames.forEach((sample) => {
//             select.append("option")
//                 .text(sample)
//                 .property("value", sample);
//         });

//         let sample1 = sampleNames[0];

//         // Call the function to build the initial demographics box
//         buildDemographInfo(sample1);

//         // Call the function to build the initial bar chart
//         buildBarChart(sample1);

//         // Call the function to build the initial bubble chart
//         buildBubbleChart(sample1);

//       });    
//     };

//   // Create a function that updates the dashboard once another sample is selected 
//   function optionChanged(item)
//   {
//     // Call the function to build the updated demographics box
//     buildDemographInfo(item);
//     // Call the function to build the updated bar chart
//     buildBarChart(item);
//      // Call the function to build the updated bubble chart
//     buildBubbleChart(item);
  
//   }
  
// // Call the function to start the dashboard
// startDashboard();
