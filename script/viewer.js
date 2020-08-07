/*----------------------------------------------------------------
  Name:        viewer.js
  Date:        November 2019
  Description: Base code for the - Web Programming - exercise
               (data viewer page)
  Version:     2.0
----------------------------------------------------------------*/
 
/*-- Draws a bar chart based on mean population deviation per province  
function drawBarChart(){
 
  var margin = {top: 20, right: 20, bottom: 45, left: 50},
    width = 800 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;
 
  var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
  var y = d3.scaleLinear().rangeRound([height, 0]);
  var xAxis = d3.axisBottom(x);
  var yAxis = d3.axisLeft(y);
 
  var barChart = d3.select("#chart_container")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
  d3.json("https://gisedu.itc.utwente.nl/student/s2326965/simple-website/services/prov_population.py", function(err, provinces){
    x.domain(provinces.map(function(p) { return p.prov_abbr; }));
    y.domain([
      d3.min(provinces, function(p) { return p.popdev - 0.1; }),
      d3.max(provinces, function(p) { return p.popdev + 0.1; })
    ]);
 
    barChart.selectAll(".bar")
    .data(provinces)
  .enter().append("rect")
    .attr("id", function(p) { return "bar_" + p.prov_abbr; })
    .attr("class", "bar")
    .attr("x", function(p) { return x(p.prov_abbr); })
    .attr("y", function(p) { return y(Math.max(0, p.popdev)); })
    .attr("width", x.bandwidth())
    .attr("height", function(p) { return Math.abs(y(p.popdev) - y(0)); });

barChart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
  .append("text")
    .attr("x", width/2)
    .attr("y", 40)
    .attr("fill", "#000")
    .style("text-anchor", "middle")
    .text("Deviation per Province"
    );

barChart.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("x", 5)
    .attr("y", 3)
    .attr("fill", "#000")
    .style("text-anchor", "start")
    .text("Millions of Inhabitants");

});

};
*/
/*---*/

/*----------------------------------------------------------------
  Name:        viewer.js
  Date:        November 2019
  Description: Base code for the - Web Programming - exercise
               (data viewer page)
  Version:     2.1
----------------------------------------------------------------*/
 
var navMap;
 
 
/*-- Initialization function --*/
function initial() {
  

  //define map object & link to placeholder div:
  navMap = new ol.Map({target: "mapDiv"});

  // define layer as tiled map:
  osmLayer = new ol.layer.Tile({
    // load OSM (a connector predefined in the API) as source:
    source: new ol.source.OSM()
  });

  // add layer to map:
  navMap.addLayer(osmLayer);

  // create a map view:
  navMap.setView(
    //center coords and zoom level:
    new ol.View({
      center: ol.proj.transform([6.84, 52.49], 'EPSG:4326', 'EPSG:3857'),
      zoom: 10
    })
  );
 
  navMap.addControl(new ol.control.Zoom());
  

  navMap.addControl(new ol.control.MousePosition({
      projection: 'EPSG:4326',  
      coordinateFormat: ol.coordinate.createStringXY(4)
    })
  ); 
  
 /*
var belgium = new ol.layer.Image({
    source: new ol.source.ImageWMS({
      url: 'http://owsgip.itc.utwente.nl/cgi-bin/services/world_borders?',
      params: {
        'LAYERS': 'world_border',
        'COUNTRYNAME': "'Belgium'",
        'STYLES': 'green_line',
        'TILED': true
      }
    }),
    name: 'Belgium',
    visible: true
  });  

 navMap.addLayer(belgium);
  */
  var germany = new ol.layer.Image({
    source: new ol.source.ImageWMS({
      url: 'http://owsgip.itc.utwente.nl/cgi-bin/services/world_borders?',
      params: {
        'LAYERS': 'world_border',
        'COUNTRYNAME': "'Germany'",
        'STYLES': 'red_line',
        'TILED': true
      }
    }),
    name: 'Germany',
    visible: true
  });  

 /* navMap.addLayer(germany);   
*/
  var prov_style =  new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'MediumPurple',
      // lineDash: [4],
      width: 2
    }),
    fill: new ol.style.Fill({
      color: 'rgba(147, 112, 219, 0.2)'
    })
  });  
  
  var nl_provinces = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: 'https://gisedu.itc.utwente.nl/student/s2326965/simple-website/services/provinces.py?country_name=netherlands',
      format: new ol.format.GeoJSON({
        defaultDataProjection :'EPSG:4326', 
        projection: 'EPSG:3857'
      })
    }),
    style: prov_style,
    name: 'Dutch Provinces'
  });  

/*navMap.addLayer(nl_provinces); 
*/
  var scaleline = new ol.control.ScaleLine();
  navMap.addControl(scaleline);
}
/*var scaleline = new ol.Control.ScaleLine({units: 'degrees',minWidth: 100});
  navmap.addControl(scaleline);*/
/*---*/