/****************************************
STYLES
****************************************/

var bcWellIcon = L.icon({
    iconUrl: '../css/img/bcWellMarker.png',
    shadowUrl: '../css/img/markers-shadow.png',
    shadowSize:   [36, 16],
    shadowAnchor: [10, -3],
    iconSize: [30, 40],
    popupAnchor:  [2, -20]
 });
 
var abdDryWellIcon = L.icon({
    iconUrl: '../css/img/abdDryWellMarker.png',
    shadowUrl: '../css/img/markers-shadow.png',
    shadowSize:   [36, 16],
    shadowAnchor: [10, -3],
    iconSize: [30, 40],
    popupAnchor:  [2, -20]
 });
 
 var abdOtherWellIcon = L.icon({
    iconUrl: '../css/img/abdOtherWellMarker.png',
    shadowUrl: '../css/img/markers-shadow.png',
    shadowSize:   [36, 16],
    shadowAnchor: [10, -3],
    iconSize: [30, 40],
    popupAnchor:  [2, -20]
 });
 
  var CasedWellIcon = L.icon({
    iconUrl: '../css/img/CasedWellMarker.png',
    shadowUrl: '../css/img/markers-shadow.png',
    shadowSize:   [36, 16],
    shadowAnchor: [10, -3],
    iconSize: [30, 40],
    popupAnchor:  [2, -20]
 });
 
 var DrillingWellIcon = L.icon({
    iconUrl: '../css/img/DrillingWellMarker.png',
    shadowUrl: '../css/img/markers-shadow.png',
    shadowSize:   [36, 16],
    shadowAnchor: [10, -3],
    iconSize: [30, 40],
    popupAnchor:  [2, -20]
 });
 
  var OilWellIcon = L.icon({
    iconUrl: '../css/img/oilWellMarker.png',
    shadowUrl: '../css/img/markers-shadow.png',
    shadowSize:   [36, 16],
    shadowAnchor: [10, -3],
    iconSize: [30, 40],
    popupAnchor:  [2, -20]
 });
 
 var GasWellIcon = L.icon({
    iconUrl: '../css/img/gasWellMarker.png',
    shadowUrl: '../css/img/markers-shadow.png',
    shadowSize:   [36, 16],
    shadowAnchor: [10, -3],
    iconSize: [30, 40],
    popupAnchor:  [2, -20]
 });
 
 var LicenseWellIcon = L.icon({
    iconUrl: '../css/img/licensedWellMarker.png',
    shadowUrl: '../css/img/markers-shadow.png',
    shadowSize:   [36, 16],
    shadowAnchor: [10, -3],
    iconSize: [30, 40],
    popupAnchor:  [2, -20]
 });

 var WaterInjectorWellIcon = L.icon({
    iconUrl: '../css/img/waterInjectorWellsMarker.png',
    shadowUrl: '../css/img/markers-shadow.png',
    shadowSize:   [36, 16],
    shadowAnchor: [10, -3],
    iconSize: [30, 40],
    popupAnchor:  [2, -20]
 });
 
 var WaterSourceWellIcon = L.icon({
    iconUrl: '../css/img/waterSourceWellsMarker.png',
    shadowUrl: '../css/img/markers-shadow.png',
    shadowSize:   [36, 16],
    shadowAnchor: [10, -3],
    iconSize: [30, 40],
    popupAnchor:  [2, -20]
 });
 
 var OilSteamWellIcon = L.icon({
    iconUrl: '../css/img/oilsteamwellsmarker.png',
    shadowUrl: '../css/img/markers-shadow.png',
    shadowSize:   [36, 16],
    shadowAnchor: [10, -3],
    iconSize: [30, 40],
    popupAnchor:  [2, -20]
 });
 
 var MiscellaneousWellIcon = L.icon({
    iconUrl: '../css/img/miscellaneouswellmarker.png',
    shadowUrl: '../css/img/markers-shadow.png',
    shadowSize:   [36, 16],
    shadowAnchor: [10, -3],
    iconSize: [30, 40],
    popupAnchor:  [2, -20]
 });
 
 var PotashWellIcon = L.icon({
    iconUrl: '../css/img/potashwellmarker.png',
    shadowUrl: '../css/img/markers-shadow.png',
    shadowSize:   [36, 16],
    shadowAnchor: [10, -3],
    iconSize: [30, 40],
    popupAnchor:  [2, -20]
 });
 
 var SurfaceWellIcon = L.icon({
    iconUrl: '../css/img/surfacewellmarker.png',
    shadowUrl: '../css/img/markers-shadow.png',
    shadowSize:   [36, 16],
    shadowAnchor: [10, -3],
    iconSize: [30, 40],
    popupAnchor:  [2, -20]
 });
 
 
 
/****************************************
ADDING GOOGLE MAP LAYERS
****************************************/

var map = new L.Map('map', {center: new L.LatLng(55.0000, -106.0000), zoom: 6});
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
var markerIcon = "";

window.onload = init();

function init(){
	if(localStorage.type == 'OIL_WELL'){
		markerIcon = OilWellIcon;
	}
	if(localStorage.type == 'GAS_WELL'){
		markerIcon = GasWellIcon;
	}
	if(localStorage.type == 'ABD_DRY_WELL'){
		markerIcon = abdDryWellIcon;
	}
	if(localStorage.type == 'ABD_OTHER_WELL'){
		markerIcon = abdOtherWellIcon;
	}
	if(localStorage.type == 'CASED_WELL'){
		markerIcon = CasedWellIcon;
	}
	if(localStorage.type == 'DRILLING_WELL'){
		markerIcon = DrillingWellIcon;
	}
	if(localStorage.type == 'LICENSE_WELL'){
		markerIcon = LicenseWellIcon;
	}
	if(localStorage.type == 'WATER_INJECTOR_WELL'){
		markerIcon = WaterInjectorWellIcon;
	}
	if(localStorage.type == 'WATER_SOURCE_WELL'){
		markerIcon = WaterSourceWellIcon;
	}
	if(localStorage.type == 'OIL_STEAM_WELL'){
		markerIcon = OilSteamWellIcon;
	}
	if(localStorage.type == 'MISCELLANEOUS_WELL'){
		markerIcon = MiscellaneousWellIcon;
	}
	if(localStorage.type == 'POTASH_WELL'){
		markerIcon = PotashWellIcon;
	}
	if(localStorage.type == 'SURFACE_WELL_LOCATION'){
		markerIcon = SurfaceWellIcon;
	}

	var marker = L.marker([localStorage.lat, localStorage.lon], {icon: markerIcon}).addTo(map);
	map.setView(new L.LatLng(localStorage.lat, localStorage.lon), 12);
}

        


/****************************************
PRINT REPORT
****************************************/

function myFunction() {
    window.open('saskwellReportPrint.html');
}



