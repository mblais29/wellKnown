/****************************************
GLOBAL VARIABLES
****************************************/

var bcOgcData = '';
var searchData = '';
var bcWellData = '';
var bcPipelineData = '';
var maxzoom = 11;



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
	  
	  

/****************************************
GLOBAL VARIABLES: BC Well Popup Data
****************************************/

var geojsonLayerBcWells = new L.GeoJSON(bcWellData, {
	pointToLayer: function(feature, layer) {
        return new L.marker([feature.properties.lat, feature.properties.lon], {icon: bcWellIcon});
    },
	onEachFeature: function (feature, layer) {
		/*Stores the data locally when layer is selected for report*/
		var popupContent = '';
		layer.on('click', function (e) {
	   		localStorage.wa = feature.properties.wa_num;
			localStorage.drillev = feature.properties.drillng_ev;
			localStorage.uwi = feature.properties.uwi;
			localStorage.file = feature.properties.file_num;
			localStorage.mode = feature.properties.mode_code;
			localStorage.fluid = feature.properties.fluid_type;
			localStorage.operational = feature.properties.ops_type;
			localStorage.directional = feature.properties.dirctnl_fl;
			localStorage.confidential = feature.properties.confdntl;
			localStorage.rigrel = feature.properties.rigrls_dat;
			localStorage.wellName = feature.properties.well_name;
			localStorage.area = feature.properties.area_name;
			localStorage.surface = feature.properties.sh_loc;
			localStorage.bottom = feature.properties.bh_loc;
			localStorage.operator = feature.properties.oper_abbre;
			localStorage.operator2 = feature.properties.oper_abbre2;
			localStorage.spud = feature.properties.spud_date;
			localStorage.status = feature.properties.status_eff;
			localStorage.lat = feature.properties.lat;
			localStorage.lon = feature.properties.lon;
		});
	
		if (feature.properties && feature.properties.uwi) {
	   		popupContent = "<strong>UWI:</strong>" + " " + feature.properties.uwi + "<br/>" + "<strong>OPERATOR:</strong>" + " " + feature.properties.oper_abbre;
	    		}
		layer.bindPopup(popupContent + "<br/>" + '<a href="report/bcwellReport.html?" target="_blank"><i class="fa fa-info-circle fa-2x"></i></a>');
	}
});



/****************************************
GLOBAL VARIABLES: BC Pipeline Popup Data
****************************************/
   
var geojsonLayerBcPipelines = new L.GeoJSON(bcPipelineData, {
	onEachFeature: function (feature, layer) {
    	var popupContent = "";
        if (feature.properties && feature.properties.file_num) {
        	popupContent = feature.properties.client_nam + "<br/>" + feature.properties.appl_type + "<br/>" + feature.properties.file_num + "<br/>" + feature.properties.proj_no + "<br/>" + feature.properties.length;
        }
        layer.bindPopup(popupContent);
    }
});



/****************************************
GLOBAL VARIABLES: BC OGC Incident Data
****************************************/

var geojsonLayerBcOGCIncident = new L.GeoJSON(bcOgcData,{
	pointToLayer: function(feature, layer) {
        return new L.marker([feature.properties.lat, feature.properties.lon], {icon: redFlagMarker});
    },
	onEachFeature: function (feature, layer) {
    var popupContent = '';
    if (feature.properties && feature.properties.incident_n) {
    popupContent = "<strong>INCIDENT NUMBER:</strong>" + " " + feature.properties.incident_n + "<br/>" + "<strong>OPERATOR:</strong>" + " " + feature.properties.operator + "<br/>" + "<strong>MATERIAL:</strong>" + " " + feature.properties.material + "<br/>" + "<strong>LIQUID VOLUME:</strong>" + " " + feature.properties.liquid_vol + "<br/>" + "<strong>GAS VOLUME:</strong>" + " " + feature.properties.gas_volume + "<br/>" + "<strong>INCIDENT DATE:</strong>" + " " + feature.properties.incident_d + "<br/>" + "<strong>COMPLETE DATE:</strong>" + " " + feature.properties.complete_d + "<br/>" + "<strong>STATUS:</strong>" + " " + feature.properties.status_des;
    	}
    layer.bindPopup(popupContent);
    }
});



/****************************************
ADDING GEOSEARCH TO THE MAP
****************************************/

 new L.Control.GeoSearch({
            provider: new L.GeoSearch.Provider.Esri(),
            position: 'bottomright'
        }).addTo(map);	
        


/****************************************
SEARCH FOR UWI
****************************************/

var url = "http://mblais-welldata.ca/geoserver/WellData/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=WellData:bc_well_data_wgs&maxFeatures=50&outputFormat=application%2Fjson&filter=<filter><PropertyIsEqualTo><PropertyName>uwi</PropertyName><Literal>";
var endUrl = "</Literal></PropertyIsEqualTo></filter>";


function searchByAjax(text, callResponse)//callback for 3rd party ajax requests
	{
		
	$.ajax({
			url: url + text + endUrl,
			type: 'GET',
			dataType: 'json',
			success: function(searchData){
					searchCoord.addData(searchData);
					map.fitBounds(searchCoord.getBounds());
			}
		}).done(function (res) {
    		localStorage.setItem("dataCache", JSON.stringify(res));
	});
};

var searchCoord = new L.GeoJSON(searchData, {
	pointToLayer: function(feature, layer) {
        return new L.marker([feature.properties.lat, feature.properties.lon], {icon: bcWellIcon});
    },
			onEachFeature: function (feature, layer) {
    		var popupContent = '';
    		
    		if (feature.properties && feature.properties.uwi) {
	   			popupContent = "<strong>UWI:</strong>" + " " + feature.properties.uwi + "<br/>" + "<strong>OPERATOR:</strong>" + " " + feature.properties.oper_abbre + "<br/>";
	    	}
			
			layer.on('click', function (e) {
		   		localStorage.wa = feature.properties.wa_num;
				localStorage.drillev = feature.properties.drillng_ev;
				localStorage.uwi = feature.properties.uwi;
				localStorage.file = feature.properties.file_num;
				localStorage.mode = feature.properties.mode_code;
				localStorage.fluid = feature.properties.fluid_type;
				localStorage.operational = feature.properties.ops_type;
				localStorage.directional = feature.properties.dirctnl_fl;
				localStorage.confidential = feature.properties.confdntl;
				localStorage.rigrel = feature.properties.rigrls_dat;
				localStorage.wellName = feature.properties.well_name;
				localStorage.area = feature.properties.area_name;
				localStorage.surface = feature.properties.sh_loc;
				localStorage.bottom = feature.properties.bh_loc;
				localStorage.operator = feature.properties.oper_abbre;
				localStorage.operator2 = feature.properties.oper_abbre2;
				localStorage.spud = feature.properties.spud_date;
				localStorage.status = feature.properties.status_eff;
				localStorage.lat = feature.properties.lat;
				localStorage.lon = feature.properties.lon;
			});
			layer.bindPopup(popupContent + '<a href="report/bcwellReport.html?" target="_blank"><i class="fa fa-info-circle fa-2x"></i></a>');
		}
	}).addTo(map);

	
map.addControl( new L.Control.Search({callData: searchByAjax, text:'UWI...', markerLocation: true}) );
/****************************************
REMOVES SEARCH MARKERS
****************************************/

function removeSearchMarker(){
	
	map.removeLayer(searchCoord);
};



/****************************************
BASEMAP AND LAYER CONTROL FOR LEGEND
****************************************/

var baseLayers = {'Google - Street':googleLayerStreet, 'Google - Hybrid':googleLayerHybrid, 'Google - Satellite':googleLayerSatellite, 'ESRI - Imagery':esriMapImagery, 'ESRI - Topo':esriMapTopo};
var overlayLayers = {"British Columbia":{'<img src="css/img/bcwells.png" class="imagebcwell" alt="bc wells"/> BC Oil & Gas Wells': geojsonLayerBcWells, '<img src="css/img/bcpipeline.png" style="width: 15px; padding: 1px"/> BC Oil & Gas Pipelines': geojsonLayerBcPipelines, '<i class="fa fa-flag"style="background-color: red; padding: 3px; border-radius: 4px; color:white"></i> BC Oil & Gas Incidents': geojsonLayerBcOGCIncident}};

L.control.groupedLayers(baseLayers, overlayLayers).addTo(map);

/****************************************
LOADING BC WELL DATA
****************************************/

function loadBcWells(){
	var geoJsonUrlWells ='http://mblais-welldata.ca/geoserver/WellData/ows';	
		
	var defaultParameters = {
		service: 'WFS',
		version: '1.0.0',
		request: 'getFeature',
		typeName: 'WellData:bc_well_data_wgs',
		maxFeatures: 3000,
		outputFormat: 'application/json'
		};
			
	var customParams = {
		bbox: map.getBounds().toBBoxString(),
		};
			
	var parameters = L.Util.extend(defaultParameters, customParams);
		
	$.ajax({
		url: geoJsonUrlWells + L.Util.getParamString(parameters),
		datatype: 'json',
		type: 'GET',
		success: loadGeoJson
    });
			
	function loadGeoJson(bcWellData){
		geojsonLayerBcWells.addData(bcWellData);
		console.log(bcWellData);
  		}
};

	
	
/****************************************
LOADING BC PIPELINE DATA
****************************************/

function loadBcPipelines(){			
	var geoJsonUrlPipelines ='http://mblais-welldata.ca/geoserver/WellData/ows';	
		
	var defaultParameters = {
		service: 'WFS',
		version: '1.0.0',
		request: 'getFeature',
		typeName: 'WellData:bc_pipeline_data_wgs',
		maxFeatures: 3000,
		outputFormat: 'application/json'
		};
			
	var customParams = {
		bbox: map.getBounds().toBBoxString(),
		};
			
	var parameters = L.Util.extend(defaultParameters, customParams);
		
	$.ajax({
		url: geoJsonUrlPipelines + L.Util.getParamString(parameters),
		datatype: 'json',
		type: 'GET',
		success: loadGeoJson
		});
				
	function loadGeoJson(bcPipelineData) {
		geojsonLayerBcPipelines.addData(bcPipelineData);
		console.log(bcPipelineData);
	};
};
	
	

/****************************************
LOADING BC OGC INCIDENT DATA
****************************************/

function loadBcOGCData(){

	var geoJsonUrlOGC ='http://mblais-welldata.ca/geoserver/WellData/ows';	
		
	var defaultParameters = {
		service: 'WFS',
		version: '1.0.0',
		request: 'getFeature',
		typeName: 'WellData:bc_ogc_incident_data_sept_2014',
		maxFeatures: 2500,
		outputFormat: 'application/json'
		};
			
	var customParams = {
		bbox: map.getBounds().toBBoxString(),
		};
			
	var parameters = L.Util.extend(defaultParameters, customParams);
		
	$.ajax({
		url: geoJsonUrlOGC + L.Util.getParamString(parameters),
		datatype: 'json',
		type: 'GET',
		success: loadGeoJson
    });
			
	function loadGeoJson(bcOgcData){
		geojsonLayerBcOGCIncident.addData(bcOgcData);
		console.log(bcOgcData);
  		}
};



/****************************************
ADDING LAYERS TO THE MAP
****************************************/
		
map.on('moveend', function(){
	if(map.getZoom() >= maxzoom){
		loadBcWells(clearLayers());
		loadBcPipelines(clearLayers());
		loadBcOGCData(clearLayers());
	}else{
		map.removeLayer(geojsonLayerBcWells);
		map.removeLayer(geojsonLayerBcPipelines);
		map.removeLayer(geojsonLayerBcOGCIncident);
	};
});



/****************************************************
CLEARING LAYERS BEFORE LOADING MAP WITH NEW GEOJSONS
****************************************************/

function clearLayers(){
	map.on('movestart', function(e){
		geojsonLayerBcWells.clearLayers();
		geojsonLayerBcPipelines.clearLayers();
		geojsonLayerBcOGCIncident.clearLayers();
	});
}



/****************************************
STYLES
****************************************/

var redFlagMarker = L.AwesomeMarkers.icon({
	prefix: 'fa',
	icon: 'flag',
    markerColor: 'red'
  });

var bcWellIcon = L.icon({
    iconUrl: 'css/img/bcWellMarker.png',
    shadowUrl: 'css/img/markers-shadow.png',
    shadowSize:   [36, 16],
    shadowAnchor: [10, -3],
    iconSize: [30, 40],
    popupAnchor:  [2, -20]
 });

