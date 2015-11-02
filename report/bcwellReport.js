/****************************************
ADDING GOOGLE MAP LAYERS
****************************************/

var map = new L.Map('map', {center: new L.LatLng(54.0000, -125.0000), zoom: 6});
      var googleLayerHybrid = new L.Google('HYBRID');  // Possible types: SATELLITE, ROADMAP, HYBRID
	  var googleLayerSatellite = new L.Google('SATELLITE');
	  var googleLayerStreet = new L.Google('ROADMAP');
	  var esriMapTopo = L.esri.basemapLayer("Topographic");
	  var esriMapImagery = L.esri.basemapLayer("Imagery");	  
	  map.addLayer(googleLayerHybrid);
	  
var baseLayers = {'Google - Street':googleLayerStreet, 'Google - Hybrid':googleLayerHybrid, 'Google - Satellite':googleLayerSatellite, 'ESRI - Imagery':esriMapImagery, 'ESRI - Topo':esriMapTopo};

L.control.groupedLayers(baseLayers).addTo(map);
	  

/****************************************
SETTING MAP ZOOM TO MARKER
****************************************/
var bcWellIcon = L.icon({
    iconUrl: '../css/img/bcWellMarker.png',
    shadowUrl: '../css/img/markers-shadow.png',
    shadowSize:   [36, 16],
    shadowAnchor: [10, -3],
    iconSize: [30, 40],
    popupAnchor:  [2, -20]
 });
 
var marker = L.marker([localStorage.lat, localStorage.lon], {icon: bcWellIcon}).addTo(map);
map.setView(new L.LatLng(localStorage.lat, localStorage.lon), 12);
	        


/****************************************
PRINT REPORT
****************************************/

function myFunction() {
    window.open('bcwellReportPrint.html');
}
