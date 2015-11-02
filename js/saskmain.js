/****************************************
GLOBAL VARIABLES
****************************************/

var markers = L.markerClusterGroup();
var searchData = '';
var search = '';
var saskAbdOtherWellData ='';
var saskAbdDryWellData = '';
var saskCasedWellData = '';
var saskDrillingWellData = '';
var saskOilWellData = '';
//var saskOilPoolData = '';
var saskGasWellData = '';
//var saskGasPoolData = '';
var saskLicenseWellData = '';
var saskWaterInjectorWellData = '';
var saskWaterSourceWellData = '';
var saskOilSteamWellData = '';
var saskMiscellaneousWellData = '';
var saskPotashWellData = '';
var saskSurfaceWellData = '';
var saskWellVectorData = '';
var saskGridData = '';
var saskQuarterSectionGridData = '';
var saskSectionGridData = '';
var saskTownshipGridData = '';
var maxzoom = 11;
var surfaceLocationZoom = 13;
var lat = '';
var lon ='';



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
	  


/****************************************
SEARCH BY SECTION
****************************************/
var inputText = '';
//Accepts only numeric characters

function numericFilter(txb) {
   txb.value = txb.value.replace(/[^\0-9]/ig, "");
}

$(function() {
    $('#dialog').dialog({
        autoOpen: false
    });
    $('#Btn1').click(function() {
        $('#dialog').dialog('open');
    });
});

function onSubmit(){
	var mer = $('#mer').val();
	var twp = $('#twp').val();
	var rge = $('#rge').val();
	var sec = $('#sec').val();
	inputText = mer + twp + rge + sec;
	searchBySection();
	
	
}

var searchurl = "http://mblais-welldata.ca/geoserver/WellData/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=WellData:sask_section_grid_wgs&maxFeatures=50&outputFormat=application%2Fjson&filter=<filter><PropertyIsEqualTo><PropertyName>search</PropertyName><Literal>";
var	searchendUrl = "</Literal></PropertyIsEqualTo></filter>";


function searchBySection(text, callResponse)//callback for 3rd party ajax requests
	{
	$.ajax({
			url: searchurl + inputText + searchendUrl,
			type: 'GET',
			dataType: 'json',
			success: function(search){
					searchSection.addData(search);
					console.log(searchSection.getBounds());
					map.fitBounds(searchSection.getBounds());
			}
		});
};

function removesearchSection(){
	map.removeLayer(searchSection);
}

var searchSection = new L.GeoJSON(search,{
	onEachFeature: function (feature, layer) {
					var popupContent = 'MER: ' + feature.properties.pmer + ' TWP: ' + feature.properties.ptwp + ' RGE: ' + feature.properties.prge + ' SEC: ' + feature.properties.sect;
					layer.bindLabel(popupContent);
				layer.on('click', function (e) {
					removesearchSection();
				});
		}	
}).addTo(map);




  


/****************************************
GLOBAL VARIABLES: SASK Abandoned Dry Well Data
****************************************/

var geojsonLayerSaskAbandonedDryWellData = new L.GeoJSON(saskAbdDryWellData,{
	pointToLayer: function(feature, layer) {
        return new L.marker([feature.properties.lat, feature.properties.lon], {icon: abdDryWellIcon});
    },
	onEachFeature: function (feature, layer) {
				layer.on('click', function (e) {
					var popupContent = "";
			
					if(feature.properties && feature.properties.lic_no) {
		   	 			popupContent = "<strong>LICENSE NUMBER:</strong>" + " " + feature.properties.lic_no + "<br/>" + "<strong>OPERATOR:</strong>" + " " + feature.properties.name + "<br/>";
	
						localStorage.name = feature.properties.name;
						localStorage.lic = feature.properties.lic_no;
						localStorage.lic_date = feature.properties.lic_date;
						localStorage.well_type = feature.properties.well_type;
						localStorage.type = feature.properties.type;
						localStorage.status = feature.properties.status;
						localStorage.du_size = feature.properties.du_size;
						localStorage.loc = feature.properties.loc;
						localStorage.hrzn = feature.properties.hrzn;
						localStorage.depth = feature.properties.depth;
						localStorage.case_depth = feature.properties.case_depth;
						localStorage.case_size = feature.properties.case_size;
						localStorage.pool = feature.properties.pool;
						localStorage.eor = feature.properties.eor;
						localStorage.unit = feature.properties.unit;
						localStorage.owner = feature.properties.owner;
						localStorage.fdd = feature.properties.fdd;
						localStorage.off_con_dt = feature.properties.off_con_dt;
						localStorage.lat = feature.properties.lat;
						localStorage.lon = feature.properties.lon;
	
		    			layer.bindPopup(popupContent + '<a href="report/saskwellReport.html?" target="_blank"><i class="fa fa-info-circle fa-2x"></i></a>');
	    			}
    		});
		}
});

/****************************************
GLOBAL VARIABLES: SASK Abandoned Other Well Data
****************************************/

var geojsonLayerSaskAbandonedOtherWellData = new L.GeoJSON(saskAbdOtherWellData,{
	pointToLayer: function(feature, layer) {
        return new L.marker([feature.properties.lat, feature.properties.lon], {icon: abdOtherWellIcon});
    },
	onEachFeature: function (feature, layer) {
				layer.on('click', function (e) {
					var popupContent = "";
			
					if(feature.properties && feature.properties.lic_no) {
		   	 			popupContent = "<strong>LICENSE NUMBER:</strong>" + " " + feature.properties.lic_no + "<br/>" + "<strong>OPERATOR:</strong>" + " " + feature.properties.name + "<br/>";
	
						localStorage.name = feature.properties.name;
						localStorage.lic = feature.properties.lic_no;
						localStorage.lic_date = feature.properties.lic_date;
						localStorage.well_type = feature.properties.well_type;
						localStorage.type = feature.properties.type;
						localStorage.status = feature.properties.status;
						localStorage.du_size = feature.properties.du_size;
						localStorage.loc = feature.properties.loc;
						localStorage.hrzn = feature.properties.hrzn;
						localStorage.depth = feature.properties.depth;
						localStorage.case_depth = feature.properties.case_depth;
						localStorage.case_size = feature.properties.case_size;
						localStorage.pool = feature.properties.pool;
						localStorage.eor = feature.properties.eor;
						localStorage.unit = feature.properties.unit;
						localStorage.owner = feature.properties.owner;
						localStorage.fdd = feature.properties.fdd;
						localStorage.off_con_dt = feature.properties.off_con_dt;
						localStorage.lat = feature.properties.lat;
						localStorage.lon = feature.properties.lon;
	
		    			layer.bindPopup(popupContent + '<a href="report/saskwellReport.html?" target="_blank"><i class="fa fa-info-circle fa-2x"></i></a>');
	    			}
    		});
		}
});

/****************************************
GLOBAL VARIABLES: SASK Cased Well Data
****************************************/

var geojsonLayerSaskCasedWellData = new L.GeoJSON(saskCasedWellData,{
	pointToLayer: function(feature, layer) {
        return new L.marker([feature.properties.lat, feature.properties.lon], {icon: CasedWellIcon});
    },
	onEachFeature: function (feature, layer) {
				layer.on('click', function (e) {
					var popupContent = "";
			
					if(feature.properties && feature.properties.lic_no) {
		   	 			popupContent = "<strong>LICENSE NUMBER:</strong>" + " " + feature.properties.lic_no + "<br/>" + "<strong>OPERATOR:</strong>" + " " + feature.properties.name + "<br/>";
	
						localStorage.name = feature.properties.name;
						localStorage.lic = feature.properties.lic_no;
						localStorage.lic_date = feature.properties.lic_date;
						localStorage.well_type = feature.properties.well_type;
						localStorage.type = feature.properties.type;
						localStorage.status = feature.properties.status;
						localStorage.du_size = feature.properties.du_size;
						localStorage.loc = feature.properties.loc;
						localStorage.hrzn = feature.properties.hrzn;
						localStorage.depth = feature.properties.depth;
						localStorage.case_depth = feature.properties.case_depth;
						localStorage.case_size = feature.properties.case_size;
						localStorage.pool = feature.properties.pool;
						localStorage.eor = feature.properties.eor;
						localStorage.unit = feature.properties.unit;
						localStorage.owner = feature.properties.owner;
						localStorage.fdd = feature.properties.fdd;
						localStorage.off_con_dt = feature.properties.off_con_dt;
						localStorage.lat = feature.properties.lat;
						localStorage.lon = feature.properties.lon;
	
		    			layer.bindPopup(popupContent + '<a href="report/saskwellReport.html?" target="_blank"><i class="fa fa-info-circle fa-2x"></i></a>');
	    			}
    		});
		}
});

/****************************************
GLOBAL VARIABLES: SASK Drilling Well Data
****************************************/

var geojsonLayerSaskDrillingWellData = new L.GeoJSON(saskDrillingWellData,{
	pointToLayer: function(feature, layer) {
        return new L.marker([feature.properties.lat, feature.properties.lon], {icon: DrillingWellIcon});
    },
	onEachFeature: function (feature, layer) {
				layer.on('click', function (e) {
					var popupContent = "";
			
					if(feature.properties && feature.properties.lic_no) {
		   	 			popupContent = "<strong>LICENSE NUMBER:</strong>" + " " + feature.properties.lic_no + "<br/>" + "<strong>OPERATOR:</strong>" + " " + feature.properties.name + "<br/>";
	
						localStorage.name = feature.properties.name;
						localStorage.lic = feature.properties.lic_no;
						localStorage.lic_date = feature.properties.lic_date;
						localStorage.well_type = feature.properties.well_type;
						localStorage.type = feature.properties.type;
						localStorage.status = feature.properties.status;
						localStorage.du_size = feature.properties.du_size;
						localStorage.loc = feature.properties.loc;
						localStorage.hrzn = feature.properties.hrzn;
						localStorage.depth = feature.properties.depth;
						localStorage.case_depth = feature.properties.case_depth;
						localStorage.case_size = feature.properties.case_size;
						localStorage.pool = feature.properties.pool;
						localStorage.eor = feature.properties.eor;
						localStorage.unit = feature.properties.unit;
						localStorage.owner = feature.properties.owner;
						localStorage.fdd = feature.properties.fdd;
						localStorage.off_con_dt = feature.properties.off_con_dt;
						localStorage.lat = feature.properties.lat;
						localStorage.lon = feature.properties.lon;
	
		    			layer.bindPopup(popupContent + '<a href="report/saskwellReport.html?" target="_blank"><i class="fa fa-info-circle fa-2x"></i></a>');
	    			}
    		});
		}
});

/****************************************
GLOBAL VARIABLES: SASK Oil Well Data
****************************************/

var geojsonLayerSaskOilWellData = new L.GeoJSON(saskOilWellData,{
	pointToLayer: function(feature, layer) {
        return new L.marker([feature.properties.lat, feature.properties.lon], {icon: OilWellIcon});
        return new L.marker([feature.properties.lat, feature.properties.lon], {icon: OilWellIcon});
    },
	onEachFeature: function (feature, layer) {
				layer.on('click', function (e) {
					var popupContent = "";
			
					if(feature.properties && feature.properties.lic_no) {
		   	 			popupContent = "<strong>LICENSE NUMBER:</strong>" + " " + feature.properties.lic_no + "<br/>" + "<strong>OPERATOR:</strong>" + " " + feature.properties.name + "<br/>";
	
						localStorage.name = feature.properties.name;
						localStorage.lic = feature.properties.lic_no;
						localStorage.lic_date = feature.properties.lic_date;
						localStorage.well_type = feature.properties.well_type;
						localStorage.type = feature.properties.type;
						localStorage.status = feature.properties.status;
						localStorage.du_size = feature.properties.du_size;
						localStorage.loc = feature.properties.loc;
						localStorage.hrzn = feature.properties.hrzn;
						localStorage.depth = feature.properties.depth;
						localStorage.case_depth = feature.properties.case_depth;
						localStorage.case_size = feature.properties.case_size;
						localStorage.pool = feature.properties.pool;
						localStorage.eor = feature.properties.eor;
						localStorage.unit = feature.properties.unit;
						localStorage.owner = feature.properties.owner;
						localStorage.fdd = feature.properties.fdd;
						localStorage.off_con_dt = feature.properties.off_con_dt;
						localStorage.lat = feature.properties.lat;
						localStorage.lon = feature.properties.lon;
	
		    			layer.bindPopup(popupContent + '<a href="report/saskwellReport.html?" target="_blank"><i class="fa fa-info-circle fa-2x"></i></a>');
	    			}
    		});
		}
});

/****************************************
GLOBAL VARIABLES: SASK Gas Well Data
****************************************/

var geojsonLayerSaskGasWellData = new L.GeoJSON(saskGasWellData,{
	pointToLayer: function(feature, layer) {
        return new L.marker([feature.properties.lat, feature.properties.lon], {icon: GasWellIcon});
    },
	onEachFeature: function (feature, layer) {
				layer.on('click', function (e) {
					var popupContent = "";
			
					if(feature.properties && feature.properties.lic_no) {
		   	 			popupContent = "<strong>LICENSE NUMBER:</strong>" + " " + feature.properties.lic_no + "<br/>" + "<strong>OPERATOR:</strong>" + " " + feature.properties.name + "<br/>";
	
						localStorage.name = feature.properties.name;
						localStorage.lic = feature.properties.lic_no;
						localStorage.lic_date = feature.properties.lic_date;
						localStorage.well_type = feature.properties.well_type;
						localStorage.type = feature.properties.type;
						localStorage.status = feature.properties.status;
						localStorage.du_size = feature.properties.du_size;
						localStorage.loc = feature.properties.loc;
						localStorage.hrzn = feature.properties.hrzn;
						localStorage.depth = feature.properties.depth;
						localStorage.case_depth = feature.properties.case_depth;
						localStorage.case_size = feature.properties.case_size;
						localStorage.pool = feature.properties.pool;
						localStorage.eor = feature.properties.eor;
						localStorage.unit = feature.properties.unit;
						localStorage.owner = feature.properties.owner;
						localStorage.fdd = feature.properties.fdd;
						localStorage.off_con_dt = feature.properties.off_con_dt;
						localStorage.lat = feature.properties.lat;
						localStorage.lon = feature.properties.lon;
	
		    			layer.bindPopup(popupContent + '<a href="report/saskwellReport.html?" target="_blank"><i class="fa fa-info-circle fa-2x"></i></a>');
	    			}
    		});
		}
});

/****************************************
GLOBAL VARIABLES: SASK License Well Data
****************************************/

var geojsonLayerSaskLicenseWellData = new L.GeoJSON(saskLicenseWellData,{
	pointToLayer: function(feature, layer) {
        return new L.marker([feature.properties.lat, feature.properties.lon], {icon: LicenseWellIcon});
    },
	onEachFeature: function (feature, layer) {
				layer.on('click', function (e) {
					var popupContent = "";
			
					if(feature.properties && feature.properties.lic_no) {
		   	 			popupContent = "<strong>LICENSE NUMBER:</strong>" + " " + feature.properties.lic_no + "<br/>" + "<strong>OPERATOR:</strong>" + " " + feature.properties.name + "<br/>";
	
						localStorage.name = feature.properties.name;
						localStorage.lic = feature.properties.lic_no;
						localStorage.lic_date = feature.properties.lic_date;
						localStorage.well_type = feature.properties.well_type;
						localStorage.type = feature.properties.type;
						localStorage.status = feature.properties.status;
						localStorage.du_size = feature.properties.du_size;
						localStorage.loc = feature.properties.loc;
						localStorage.hrzn = feature.properties.hrzn;
						localStorage.depth = feature.properties.depth;
						localStorage.case_depth = feature.properties.case_depth;
						localStorage.case_size = feature.properties.case_size;
						localStorage.pool = feature.properties.pool;
						localStorage.eor = feature.properties.eor;
						localStorage.unit = feature.properties.unit;
						localStorage.owner = feature.properties.owner;
						localStorage.fdd = feature.properties.fdd;
						localStorage.off_con_dt = feature.properties.off_con_dt;
						localStorage.lat = feature.properties.lat;
						localStorage.lon = feature.properties.lon;
	
		    			layer.bindPopup(popupContent + '<a href="report/saskwellReport.html?" target="_blank"><i class="fa fa-info-circle fa-2x"></i></a>');
	    			}
    		});
		}
});

/****************************************
GLOBAL VARIABLES: SASK Water Injector Well Data
****************************************/

var geojsonLayerSaskWaterInjectorWellData = new L.GeoJSON(saskWaterInjectorWellData,{
	pointToLayer: function(feature, layer) {
        return new L.marker([feature.properties.lat, feature.properties.lon], {icon: WaterInjectorWellIcon});
    },
	onEachFeature: function (feature, layer) {
				layer.on('click', function (e) {
					var popupContent = "";
			
					if(feature.properties && feature.properties.lic_no) {
		   	 			popupContent = "<strong>LICENSE NUMBER:</strong>" + " " + feature.properties.lic_no + "<br/>" + "<strong>OPERATOR:</strong>" + " " + feature.properties.name + "<br/>";
	
						localStorage.name = feature.properties.name;
						localStorage.lic = feature.properties.lic_no;
						localStorage.lic_date = feature.properties.lic_date;
						localStorage.well_type = feature.properties.well_type;
						localStorage.type = feature.properties.type;
						localStorage.status = feature.properties.status;
						localStorage.du_size = feature.properties.du_size;
						localStorage.loc = feature.properties.loc;
						localStorage.hrzn = feature.properties.hrzn;
						localStorage.depth = feature.properties.depth;
						localStorage.case_depth = feature.properties.case_depth;
						localStorage.case_size = feature.properties.case_size;
						localStorage.pool = feature.properties.pool;
						localStorage.eor = feature.properties.eor;
						localStorage.unit = feature.properties.unit;
						localStorage.owner = feature.properties.owner;
						localStorage.fdd = feature.properties.fdd;
						localStorage.off_con_dt = feature.properties.off_con_dt;
						localStorage.lat = feature.properties.lat;
						localStorage.lon = feature.properties.lon;
	
		    			layer.bindPopup(popupContent + '<a href="report/saskwellReport.html?" target="_blank"><i class="fa fa-info-circle fa-2x"></i></a>');
	    			}
    		});
		}
});

/****************************************
GLOBAL VARIABLES: SASK Water Source Well Data
****************************************/

var geojsonLayerSaskWaterSourceWellData = new L.GeoJSON(saskWaterSourceWellData,{
	pointToLayer: function(feature, layer) {
        return new L.marker([feature.properties.lat, feature.properties.lon], {icon: WaterSourceWellIcon});
    },
	onEachFeature: function (feature, layer) {
				layer.on('click', function (e) {
					var popupContent = "";
			
					if(feature.properties && feature.properties.lic_no) {
		   	 			popupContent = "<strong>LICENSE NUMBER:</strong>" + " " + feature.properties.lic_no + "<br/>" + "<strong>OPERATOR:</strong>" + " " + feature.properties.name + "<br/>";
	
						localStorage.name = feature.properties.name;
						localStorage.lic = feature.properties.lic_no;
						localStorage.lic_date = feature.properties.lic_date;
						localStorage.well_type = feature.properties.well_type;
						localStorage.type = feature.properties.type;
						localStorage.status = feature.properties.status;
						localStorage.du_size = feature.properties.du_size;
						localStorage.loc = feature.properties.loc;
						localStorage.hrzn = feature.properties.hrzn;
						localStorage.depth = feature.properties.depth;
						localStorage.case_depth = feature.properties.case_depth;
						localStorage.case_size = feature.properties.case_size;
						localStorage.pool = feature.properties.pool;
						localStorage.eor = feature.properties.eor;
						localStorage.unit = feature.properties.unit;
						localStorage.owner = feature.properties.owner;
						localStorage.fdd = feature.properties.fdd;
						localStorage.off_con_dt = feature.properties.off_con_dt;
						localStorage.lat = feature.properties.lat;
						localStorage.lon = feature.properties.lon;
	
		    			layer.bindPopup(popupContent + '<a href="report/saskwellReport.html?" target="_blank"><i class="fa fa-info-circle fa-2x"></i></a>');
	    			}
    		});
		}
});



/****************************************
GLOBAL VARIABLES: SASK Oil/Steam Well Data
****************************************/

var geojsonLayerSaskOilSteamWellData = new L.GeoJSON(saskOilSteamWellData,{
	pointToLayer: function(feature, layer) {
        return new L.marker([feature.properties.lat, feature.properties.lon], {icon: OilSteamWellIcon});
    },
	onEachFeature: function (feature, layer) {
				layer.on('click', function (e) {
					var popupContent = "";
			
					if(feature.properties && feature.properties.lic_no) {
		   	 			popupContent = "<strong>LICENSE NUMBER:</strong>" + " " + feature.properties.lic_no + "<br/>" + "<strong>OPERATOR:</strong>" + " " + feature.properties.name + "<br/>";
	
						localStorage.name = feature.properties.name;
						localStorage.lic = feature.properties.lic_no;
						localStorage.lic_date = feature.properties.lic_date;
						localStorage.well_type = feature.properties.well_type;
						localStorage.type = feature.properties.type;
						localStorage.status = feature.properties.status;
						localStorage.du_size = feature.properties.du_size;
						localStorage.loc = feature.properties.loc;
						localStorage.hrzn = feature.properties.hrzn;
						localStorage.depth = feature.properties.depth;
						localStorage.case_depth = feature.properties.case_depth;
						localStorage.case_size = feature.properties.case_size;
						localStorage.pool = feature.properties.pool;
						localStorage.eor = feature.properties.eor;
						localStorage.unit = feature.properties.unit;
						localStorage.owner = feature.properties.owner;
						localStorage.fdd = feature.properties.fdd;
						localStorage.off_con_dt = feature.properties.off_con_dt;
						localStorage.lat = feature.properties.lat;
						localStorage.lon = feature.properties.lon;
	
		    			layer.bindPopup(popupContent + '<a href="report/saskwellReport.html?" target="_blank"><i class="fa fa-info-circle fa-2x"></i></a>');
	    			}
    		});
		}
});


/****************************************
GLOBAL VARIABLES: SASK Miscellaneous Well Data
****************************************/

var geojsonLayerSaskMiscellaneousWellData = new L.GeoJSON(saskMiscellaneousWellData,{
	pointToLayer: function(feature, layer) {
        return new L.marker([feature.properties.lat, feature.properties.lon], {icon: MiscellaneousWellIcon});
    },
	onEachFeature: function (feature, layer) {
				layer.on('click', function (e) {
					var popupContent = "";
			
					if(feature.properties && feature.properties.lic_no) {
		   	 			popupContent = "<strong>LICENSE NUMBER:</strong>" + " " + feature.properties.lic_no + "<br/>" + "<strong>OPERATOR:</strong>" + " " + feature.properties.name + "<br/>";
	
						localStorage.name = feature.properties.name;
						localStorage.lic = feature.properties.lic_no;
						localStorage.lic_date = feature.properties.lic_date;
						localStorage.well_type = feature.properties.well_type;
						localStorage.type = feature.properties.type;
						localStorage.status = feature.properties.status;
						localStorage.du_size = feature.properties.du_size;
						localStorage.loc = feature.properties.loc;
						localStorage.hrzn = feature.properties.hrzn;
						localStorage.depth = feature.properties.depth;
						localStorage.case_depth = feature.properties.case_depth;
						localStorage.case_size = feature.properties.case_size;
						localStorage.pool = feature.properties.pool;
						localStorage.eor = feature.properties.eor;
						localStorage.unit = feature.properties.unit;
						localStorage.owner = feature.properties.owner;
						localStorage.fdd = feature.properties.fdd;
						localStorage.off_con_dt = feature.properties.off_con_dt;
						localStorage.lat = feature.properties.lat;
						localStorage.lon = feature.properties.lon;
	
		    			layer.bindPopup(popupContent + '<a href="report/saskwellReport.html?" target="_blank"><i class="fa fa-info-circle fa-2x"></i></a>');
	    			}
    		});
		}
});



/****************************************
GLOBAL VARIABLES: SASK Potash Well Data
****************************************/

var geojsonLayerSaskPotashWellData = new L.GeoJSON(saskPotashWellData,{
	pointToLayer: function(feature, layer) {
        return new L.marker([feature.properties.lat, feature.properties.lon], {icon: PotashWellIcon});
    },
	onEachFeature: function (feature, layer) {
				layer.on('click', function (e) {
					var popupContent = "";
			
					if(feature.properties && feature.properties.lic_no) {
		   	 			popupContent = "<strong>LICENSE NUMBER:</strong>" + " " + feature.properties.lic_no + "<br/>" + "<strong>OPERATOR:</strong>" + " " + feature.properties.name + "<br/>";
	
						localStorage.name = feature.properties.name;
						localStorage.lic = feature.properties.lic_no;
						localStorage.lic_date = feature.properties.lic_date;
						localStorage.well_type = feature.properties.well_type;
						localStorage.type = feature.properties.type;
						localStorage.status = feature.properties.status;
						localStorage.du_size = feature.properties.du_size;
						localStorage.loc = feature.properties.loc;
						localStorage.hrzn = feature.properties.hrzn;
						localStorage.depth = feature.properties.depth;
						localStorage.case_depth = feature.properties.case_depth;
						localStorage.case_size = feature.properties.case_size;
						localStorage.pool = feature.properties.pool;
						localStorage.eor = feature.properties.eor;
						localStorage.unit = feature.properties.unit;
						localStorage.owner = feature.properties.owner;
						localStorage.fdd = feature.properties.fdd;
						localStorage.off_con_dt = feature.properties.off_con_dt;
						localStorage.lat = feature.properties.lat;
						localStorage.lon = feature.properties.lon;
	
		    			layer.bindPopup(popupContent + '<a href="report/saskwellReport.html?" target="_blank"><i class="fa fa-info-circle fa-2x"></i></a>');
	    			}
    		});
		}
});



/****************************************
GLOBAL VARIABLES: SASK Surface Well Data
****************************************/

var geojsonLayerSaskSurfaceWellData = new L.GeoJSON(saskSurfaceWellData,{
	pointToLayer: function(feature, layer) {
        return new L.marker([feature.properties.lat, feature.properties.lon], {icon: SurfaceWellIcon});
    },
	onEachFeature: function (feature, layer) {
				layer.on('click', function (e) {
					var popupContent = "";
			
					if(feature.properties && feature.properties.lic_no) {
		   	 			popupContent = "<strong>LICENSE NUMBER:</strong>" + " " + feature.properties.lic_no + "<br/>" + "<strong>OPERATOR:</strong>" + " " + feature.properties.name + "<br/>";
	
						localStorage.name = feature.properties.name;
						localStorage.lic = feature.properties.lic_no;
						localStorage.lic_date = feature.properties.lic_date;
						localStorage.well_type = feature.properties.well_type;
						localStorage.type = feature.properties.type;
						localStorage.status = feature.properties.status;
						localStorage.du_size = feature.properties.du_size;
						localStorage.loc = feature.properties.loc;
						localStorage.hrzn = feature.properties.hrzn;
						localStorage.depth = feature.properties.depth;
						localStorage.case_depth = feature.properties.case_depth;
						localStorage.case_size = feature.properties.case_size;
						localStorage.pool = feature.properties.pool;
						localStorage.eor = feature.properties.eor;
						localStorage.unit = feature.properties.unit;
						localStorage.owner = feature.properties.owner;
						localStorage.fdd = feature.properties.fdd;
						localStorage.off_con_dt = feature.properties.off_con_dt;
						localStorage.lat = feature.properties.lat;
						localStorage.lon = feature.properties.lon;
	
		    			layer.bindPopup(popupContent + '<a href="report/saskwellReport.html?" target="_blank"><i class="fa fa-info-circle fa-2x"></i></a>');
	    			}
    		});
		}
});
 


/****************************************
GLOBAL VARIABLES: SASK Well Vector Data
****************************************/

var geojsonLayerSaskWellVectorData = new L.GeoJSON(saskWellVectorData,{
	onEachFeature: function (feature, layer) {
    var popupContent = '';
    if (feature.properties && feature.properties.lic_no) {
    popupContent = "<strong>LICENSE NUMBER:</strong>" + " " + feature.properties.lic_no + "<br/>" + "<strong>OPERATOR:</strong>" + " " + feature.properties.name + "<br/>" + "<strong>LENGTH:</strong>" + " " + feature.properties.len;
    	}
    layer.bindPopup(popupContent);
    }
});



/****************************************
GLOBAL VARIABLES: SASK LSD Grid Data
****************************************/

var geojsonLayerSaskGridData = new L.GeoJSON(saskGridData,{
	style: function (feature) {
        return {color: '#990000', weight: 1.5, fillColor: '#110000', opacity: 0.1};
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.lld).bindLabel(feature.properties.lld);
    }
});



/****************************************
GLOBAL VARIABLES: SASK Quarter Section Grid Data
****************************************/

var geojsonLayerSaskQuarterSectionGridData = new L.GeoJSON(saskQuarterSectionGridData,{
	style: function (feature) {
        return {color: '#009900', fillColor: 'none', weight: 1.75};
    },
});



/****************************************
GLOBAL VARIABLES: SASK Section Grid Data
****************************************/

var geojsonLayerSaskSectionGridData = new L.GeoJSON(saskSectionGridData,{
	style: function (feature) {
        return {color: '#000099', fillColor: 'none', weight: 2.0};
    },
});



/****************************************
GLOBAL VARIABLES: SASK Township Grid Data
****************************************/

var geojsonLayerSaskTownshipGridData = new L.GeoJSON(saskTownshipGridData,{
	style: function (feature) {
        return {color: '#FFBC00', fillColor: 'none', weight: 2.25};
    },
});



/****************************************
GLOBAL VARIABLES: SASK Oil Pools
****************************************/
/*
var geojsonLayerSaskOilPool = new L.GeoJSON(saskOilPoolData,{
	style: function (feature) {
        return {color: '#45B745', fillColor: '#00E500', weight: 2.25};
    },    
});

*/

/****************************************
GLOBAL VARIABLES: SASK Gas Pools
****************************************/
/*
var geojsonLayerSaskGasPool = new L.GeoJSON(saskGasPoolData,{
	style: function (feature) {
        return {color: '#CE0000', fillColor: '#FF0000', weight: 2.25};
   },
	onEachFeature: function (feature, layer) {
				var text=[];
				layer.on('click', function (e) {
					alert(feature.properties.pool_name);
	    	});
    		}
});
*/

/****************************************
ADDING GEOSEARCH TO THE MAP
****************************************/

 new L.Control.GeoSearch({
            provider: new L.GeoSearch.Provider.Esri(),
            position: 'bottomright'
        }).addTo(map);	
        


/****************************************
SEARCH LICENSE NUMBER
****************************************/
var url = "http://mblais-welldata.ca/geoserver/WellData/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=WellData:sask_well_search&maxFeatures=50&outputFormat=application%2Fjson&filter=<filter><PropertyIsEqualTo><PropertyName>lic_no</PropertyName><Literal>";
var	endUrl = "</Literal></PropertyIsEqualTo></filter>";


function searchByAjax(text, callResponse)//callback for 3rd party ajax requests
	{
	$.ajax({
			url: url + text + endUrl,
			type: 'GET',
			dataType: 'json',
			success: function(searchData){
					searchCoord.addData(searchData);
					console.log(searchCoord);
					map.fitBounds(searchCoord.getBounds());
			}
		}).done(function (res) {
    		localStorage.setItem("dataCache", JSON.stringify(res));
	});
};


map.addControl( new L.Control.Search({callData: searchByAjax, text:'LICENSE NUMBER...', markerLocation: true}) );
		
var searchCoord = new L.GeoJSON(searchData, {

	pointToLayer: function(feature, layer) {
        return new L.marker([feature.properties.lat, feature.properties.lon], {icon: bcWellIcon}).addTo(markers.addTo(map));       
    },
			onEachFeature: function (feature, layer) {
				layer.on('click', function (e) {
					var popupContent = "";
					console.log(feature.properties.type);
					if(feature.properties && feature.properties.lic_no) {
		   	 			popupContent = "<strong>LICENSE NUMBER:</strong>" + " " + feature.properties.lic_no + "<br/>" + "<strong>OPERATOR:</strong>" + " " + feature.properties.name + "<br/>";
		   	 			
						localStorage.name = feature.properties.name;
						localStorage.lic = feature.properties.lic_no;
						localStorage.lic_date = feature.properties.lic_date;
						localStorage.well_type = feature.properties.well_type;
						localStorage.type = feature.properties.type;
						localStorage.status = feature.properties.status;
						localStorage.du_size = feature.properties.du_size;
						localStorage.loc = feature.properties.loc;
						localStorage.hrzn = feature.properties.hrzn;
						localStorage.depth = feature.properties.depth;
						localStorage.case_depth = feature.properties.case_depth;
						localStorage.case_size = feature.properties.case_size;
						localStorage.pool = feature.properties.pool;
						localStorage.eor = feature.properties.eor;
						localStorage.unit = feature.properties.unit;
						localStorage.owner = feature.properties.owner;
						localStorage.fdd = feature.properties.fdd;
						localStorage.off_con_dt = feature.properties.off_con_dt;
						localStorage.lat = feature.properties.lat;
						localStorage.lon = feature.properties.lon;
						
		    			layer.bindPopup(popupContent + '<a href="report/saskwellReport.html?" target="_blank"><i class="fa fa-info-circle fa-2x"></i></a>');
		    		}	    
    		});
		}
}).addTo(map);




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
var overlayLayers = {"Grid":{'<div class="towngrid"></div> SASK Township Grid Lines': geojsonLayerSaskTownshipGridData, '<div class="secgrid"></div> SASK Section Grid Lines': geojsonLayerSaskSectionGridData, '<div class="quartergrid"></div> SASK Quarter Section Grid Lines': geojsonLayerSaskQuarterSectionGridData, '<div class="grid"></div> SASK LSD Grid Lines': geojsonLayerSaskGridData}, "Well Data":{'<img src="css/img/abdDryWell.png" class="image" alt="abandoned dry wells"/> SASK Oil & Gas Abandoned Dry Wells': geojsonLayerSaskAbandonedDryWellData, '<img src="css/img/abdOtherWell.png" class="image" alt="abandoned other wells"/> SASK Oil & Gas Abandoned Other Wells': geojsonLayerSaskAbandonedOtherWellData, '<img src="css/img/CasedWell.png" class="image" alt="cased wells"/> SASK Oil & Gas Cased Wells': geojsonLayerSaskCasedWellData, '<img src="css/img/drilling.PNG" class="image" alt="drilling wells"/> SASK Oil & Gas Drilling Wells': geojsonLayerSaskDrillingWellData, '<img src="css/img/licensedWell.png" class="image" alt="licensed wells"/> SASK Oil & Gas Licensed Wells': geojsonLayerSaskLicenseWellData, '<img src="css/img/waterInjectorWell.png" class="image" alt="water injector wells"/> SASK Oil & Gas Water Injector Wells': geojsonLayerSaskWaterInjectorWellData, '<img src="css/img/waterSoureWells.png" class="image" alt="water source wells"/> SASK Oil & Gas Water Source Wells': geojsonLayerSaskWaterSourceWellData, '<img src="css/img/oilWell.png" class="imageoilwell" alt="oil wells"/> SASK Oil Wells': geojsonLayerSaskOilWellData, '<img src="css/img/gasWell.png" class="imagegaswell" alt="gas wells"/> SASK Gas Wells': geojsonLayerSaskGasWellData, '<img src="css/img/oilsteamwells.png" class="image" alt="oil steam wells"/> SASK Oil/Steam Wells': geojsonLayerSaskOilSteamWellData, '<img src="css/img/miscellaneouswells.png" class="image" alt="miscellaneous wells"/> SASK Miscellaneous Wells': geojsonLayerSaskMiscellaneousWellData, '<img src="css/img/potashwells.png" class="image" alt="potash wells"/> SASK Potash Wells': geojsonLayerSaskPotashWellData, '<img src="css/img/surfacewelllocations.png" class="image" alt="surface wells"/> SASK Surface Well Location': geojsonLayerSaskSurfaceWellData, '<img src="css/img/wellvectors.png" style="width: 15px; padding: 1px" alt="well vectors"/> SASK Well Vectors': geojsonLayerSaskWellVectorData}};


L.control.groupedLayers(baseLayers, overlayLayers).addTo(map);



/****************************************
LOADING SASK ABANDONED DRY WELL DATA
****************************************/

function loadSaskAbandonedDryWellData(){

	var geoJsonUrl ='http://mblais-welldata.ca/geoserver/WellData/ows';	
		
	var abandonedDryWellParameters = {
		service: 'WFS',
		version: '1.0.0',
		request: 'getFeature',
		typeName: 'WellData:sask_abandoned_dry_wells_wgs',
		maxFeatures: 2500,
		outputFormat: 'application/json'
		};
			
	var customParams = {
		bbox: map.getBounds().toBBoxString(),
		};
			
	var parameters = L.Util.extend(abandonedDryWellParameters, customParams);
		
	$.ajax({
		url: geoJsonUrl + L.Util.getParamString(parameters),
		datatype: 'json',
		type: 'GET',
		success: loadGeoJson
    });
			
	function loadGeoJson(saskAbdDryWellData){
		geojsonLayerSaskAbandonedDryWellData.addData(saskAbdDryWellData);
  	}
};



/****************************************
LOADING SASK ABANDONED OTHER WELL DATA
****************************************/

function loadSaskAbandonedOtherWellData(){

	var geoJsonUrl ='http://mblais-welldata.ca/geoserver/WellData/ows';	
		
	var abandonedOtherWellParameters = {
		service: 'WFS',
		version: '1.0.0',
		request: 'getFeature',
		typeName: 'WellData:sask_abandoned_other_wells_wgs',
		maxFeatures: 2500,
		outputFormat: 'application/json'
		};
			
	var customParams = {
		bbox: map.getBounds().toBBoxString(),
		};
			
	var parameters = L.Util.extend(abandonedOtherWellParameters, customParams);
		
	$.ajax({
		url: geoJsonUrl + L.Util.getParamString(parameters),
		datatype: 'json',
		type: 'GET',
		success: loadGeoJson
    });
			
	function loadGeoJson(saskAbdOtherWellData){
		geojsonLayerSaskAbandonedOtherWellData.addData(saskAbdOtherWellData);
  	}
};



/****************************************
LOADING SASK CASED WELL DATA
****************************************/

function loadSaskCasedWellData(){

	var geoJsonUrl ='http://mblais-welldata.ca/geoserver/WellData/ows';	
		
	var casedWellParameters = {
		service: 'WFS',
		version: '1.0.0',
		request: 'getFeature',
		typeName: 'WellData:sask_cased_wells_wgs',
		maxFeatures: 2500,
		outputFormat: 'application/json'
		};
			
	var customParams = {
		bbox: map.getBounds().toBBoxString(),
		};
			
	var parameters = L.Util.extend(casedWellParameters, customParams);
		
	$.ajax({
		url: geoJsonUrl + L.Util.getParamString(parameters),
		datatype: 'json',
		type: 'GET',
		success: loadGeoJson
    });
			
	function loadGeoJson(saskCasedWellData){
			geojsonLayerSaskCasedWellData.addData(saskCasedWellData);
  	}
};



/****************************************
LOADING SASK DRILLING WELL DATA
****************************************/

function loadSaskDrillingWellData(){

	var geoJsonUrl ='http://mblais-welldata.ca/geoserver/WellData/ows';	
		
	var drillingWellParameters = {
		service: 'WFS',
		version: '1.0.0',
		request: 'getFeature',
		typeName: 'WellData:sask_drilling_wells_wgs',
		maxFeatures: 2500,
		outputFormat: 'application/json'
		};
			
	var customParams = {
		bbox: map.getBounds().toBBoxString(),
		};
			
	var parameters = L.Util.extend(drillingWellParameters, customParams);
		
	$.ajax({
		url: geoJsonUrl + L.Util.getParamString(parameters),
		datatype: 'json',
		type: 'GET',
		success: loadGeoJson
    });
			
	function loadGeoJson(saskDrillingWellData){
		geojsonLayerSaskDrillingWellData.addData(saskDrillingWellData);
  	}
};



/****************************************
LOADING SASK OIL WELL DATA
****************************************/

function loadSaskOilWellData(){

	var geoJsonUrl ='http://mblais-welldata.ca/geoserver/WellData/ows';	
		
	var oilWellParameters = {
		service: 'WFS',
		version: '1.0.0',
		request: 'getFeature',
		typeName: 'WellData:sask_oil_wells_wgs',
		maxFeatures: 5000,
		outputFormat: 'application/json'
		};
			
	var customParams = {
		bbox: map.getBounds().toBBoxString(),
		};
			
	var parameters = L.Util.extend(oilWellParameters, customParams);
		
	$.ajax({
		url: geoJsonUrl + L.Util.getParamString(parameters),
		datatype: 'json',
		type: 'GET',
		success: loadGeoJson
    });
			
	function loadGeoJson(saskOilWellData){
		geojsonLayerSaskOilWellData.addData(saskOilWellData);
  	}
};

/****************************************
LOADING SASK GAS WELL DATA
****************************************/

function loadSaskGasWellData(){

	var geoJsonUrl ='http://mblais-welldata.ca/geoserver/WellData/ows';	
		
	var gasWellParameters = {
		service: 'WFS',
		version: '1.0.0',
		request: 'getFeature',
		typeName: 'WellData:sask_gas_wells_wgs',
		maxFeatures: 5000,
		outputFormat: 'application/json'
		};
			
	var customParams = {
		bbox: map.getBounds().toBBoxString(),
		};
			
	var parameters = L.Util.extend(gasWellParameters, customParams);
		
	$.ajax({
		url: geoJsonUrl + L.Util.getParamString(parameters),
		datatype: 'json',
		type: 'GET',
		success: loadGeoJson
    });
			
	function loadGeoJson(saskGasWellData){
		geojsonLayerSaskGasWellData.addData(saskGasWellData);
  	}
};



/****************************************
LOADING SASK LICENSE WELL DATA
****************************************/

function loadSaskLicenseWellData(){

	var geoJsonUrl ='http://mblais-welldata.ca/geoserver/WellData/ows';	
		
	var gasLicenseWellParameters = {
		service: 'WFS',
		version: '1.0.0',
		request: 'getFeature',
		typeName: 'WellData:sask_license_wells_wgs',
		maxFeatures: 5000,
		outputFormat: 'application/json'
		};
			
	var customParams = {
		bbox: map.getBounds().toBBoxString(),
		};
			
	var parameters = L.Util.extend(gasLicenseWellParameters, customParams);
		
	$.ajax({
		url: geoJsonUrl + L.Util.getParamString(parameters),
		datatype: 'json',
		type: 'GET',
		success: loadGeoJson
    });
			
	function loadGeoJson(saskLicenseWellData){
		geojsonLayerSaskLicenseWellData.addData(saskLicenseWellData);
  	}
};



/****************************************
LOADING SASK WATER INJECTOR WELL DATA
****************************************/

function loadSaskWaterInjectorWellData(){

	var geoJsonUrl ='http://mblais-welldata.ca/geoserver/WellData/ows';	
		
	var waterInjectorWellParameters = {
		service: 'WFS',
		version: '1.0.0',
		request: 'getFeature',
		typeName: 'WellData:sask_water_injector_wells_wgs',
		maxFeatures: 5000,
		outputFormat: 'application/json'
		};
			
	var customParams = {
		bbox: map.getBounds().toBBoxString(),
		};
			
	var parameters = L.Util.extend(waterInjectorWellParameters, customParams);
		
	$.ajax({
		url: geoJsonUrl + L.Util.getParamString(parameters),
		datatype: 'json',
		type: 'GET',
		success: loadGeoJson
    });
			
	function loadGeoJson(saskWaterInjectorWellData){
		geojsonLayerSaskWaterInjectorWellData.addData(saskWaterInjectorWellData);
  	}
};



/****************************************
LOADING SASK WATER SOURCE WELL DATA
****************************************/

function loadSaskWaterSourceWellData(){

	var geoJsonUrl ='http://mblais-welldata.ca/geoserver/WellData/ows';	
		
	var waterSourceWellParameters = {
		service: 'WFS',
		version: '1.0.0',
		request: 'getFeature',
		typeName: 'WellData:sask_water_source_wells_wgs',
		maxFeatures: 5000,
		outputFormat: 'application/json'
		};
			
	var customParams = {
		bbox: map.getBounds().toBBoxString(),
		};
			
	var parameters = L.Util.extend(waterSourceWellParameters, customParams);
		
	$.ajax({
		url: geoJsonUrl + L.Util.getParamString(parameters),
		datatype: 'json',
		type: 'GET',
		success: loadGeoJson
    });
			
	function loadGeoJson(saskWaterSourceWellData){
		geojsonLayerSaskWaterSourceWellData.addData(saskWaterSourceWellData);
  	}
};



/****************************************
LOADING SASK OIL/STEAM WELL DATA
****************************************/

function loadSaskOilSteamWellData(){

	var geoJsonUrl ='http://mblais-welldata.ca/geoserver/WellData/ows';	
		
	var oilSteamWellParameters = {
		service: 'WFS',
		version: '1.0.0',
		request: 'getFeature',
		typeName: 'WellData:sask_oil_steam_wells_wgs',
		maxFeatures: 5000,
		outputFormat: 'application/json'
		};
			
	var customParams = {
		bbox: map.getBounds().toBBoxString(),
		};
			
	var parameters = L.Util.extend(oilSteamWellParameters, customParams);
		
	$.ajax({
		url: geoJsonUrl + L.Util.getParamString(parameters),
		datatype: 'json',
		type: 'GET',
		success: loadGeoJson
    });
			
	function loadGeoJson(saskOilSteamWellData){
		geojsonLayerSaskOilSteamWellData.addData(saskOilSteamWellData);
  	}
};



/****************************************
LOADING SASK MISCELLANEOUS WELL DATA
****************************************/

function loadSaskMiscellaneousWellData(){

	var geoJsonUrl ='http://mblais-welldata.ca/geoserver/WellData/ows';	
		
	var miscellaneousWellParameters = {
		service: 'WFS',
		version: '1.0.0',
		request: 'getFeature',
		typeName: 'WellData:sask_miscellaneous_wells_wgs',
		maxFeatures: 5000,
		outputFormat: 'application/json'
		};
			
	var customParams = {
		bbox: map.getBounds().toBBoxString(),
		};
			
	var parameters = L.Util.extend(miscellaneousWellParameters, customParams);
		
	$.ajax({
		url: geoJsonUrl + L.Util.getParamString(parameters),
		datatype: 'json',
		type: 'GET',
		success: loadGeoJson
    });
			
	function loadGeoJson(saskMiscellaneousWellData){
		geojsonLayerSaskMiscellaneousWellData.addData(saskMiscellaneousWellData);
  	}
};



/****************************************
LOADING SASK POTASH WELL DATA
****************************************/

function loadSaskPotashWellData(){

	var geoJsonUrl ='http://mblais-welldata.ca/geoserver/WellData/ows';	
		
	var potashWellParameters = {
		service: 'WFS',
		version: '1.0.0',
		request: 'getFeature',
		typeName: 'WellData:sask_potash_wells_wgs',
		maxFeatures: 5000,
		outputFormat: 'application/json'
		};
			
	var customParams = {
		bbox: map.getBounds().toBBoxString(),
		};
			
	var parameters = L.Util.extend(potashWellParameters, customParams);
		
	$.ajax({
		url: geoJsonUrl + L.Util.getParamString(parameters),
		datatype: 'json',
		type: 'GET',
		success: loadGeoJson
    });
			
	function loadGeoJson(saskPotashWellData){
		geojsonLayerSaskPotashWellData.addData(saskPotashWellData);
  	}
};



/****************************************
LOADING SASK SURFACE WELL LOCATION
****************************************/

function loadSaskSurfaceWellData(){

	var geoJsonUrl ='http://mblais-welldata.ca/geoserver/WellData/ows';	
		
	var surfaceWellParameters = {
		service: 'WFS',
		version: '1.0.0',
		request: 'getFeature',
		typeName: 'WellData:sask_surface_well_locations_wgs',
		maxFeatures: 5000,
		outputFormat: 'application/json'
		};
			
	var customParams = {
		bbox: map.getBounds().toBBoxString(),
		};
			
	var parameters = L.Util.extend(surfaceWellParameters, customParams);
		
	$.ajax({
		url: geoJsonUrl + L.Util.getParamString(parameters),
		datatype: 'json',
		type: 'GET',
		success: loadGeoJson
    });
			
	function loadGeoJson(saskSurfaceWellData){
		geojsonLayerSaskSurfaceWellData.addData(saskSurfaceWellData);
  	}
};



/****************************************
LOADING SASK WELL VECTORS
****************************************/

function loadSaskWellVectorData(){

	var geoJsonUrl ='http://mblais-welldata.ca/geoserver/WellData/ows';	
		
	var wellVectorParameters = {
		service: 'WFS',
		version: '1.0.0',
		request: 'getFeature',
		typeName: 'WellData:sask_well_vectors_wgs',
		maxFeatures: 5000,
		outputFormat: 'application/json'
		};
			
	var customParams = {
		bbox: map.getBounds().toBBoxString(),
		};
			
	var parameters = L.Util.extend(wellVectorParameters, customParams);
		
	$.ajax({
		url: geoJsonUrl + L.Util.getParamString(parameters),
		datatype: 'json',
		type: 'GET',
		success: loadGeoJson
    });
			
	function loadGeoJson(saskWellVectorData){
		geojsonLayerSaskWellVectorData.addData(saskWellVectorData);
		geojsonLayerSaskWellVectorData.setStyle({color: '#ff0000', weight: 3, opacity: 0.6});
  	}
};



/****************************************
LOADING SASK TOWNSHIP GRID
****************************************/

function loadSaskTownshipGridData(){

	var geoJsonUrl ='http://mblais-welldata.ca/geoserver/WellData/ows';	
		
	var wellVectorParameters = {
		service: 'WFS',
		version: '1.0.0',
		request: 'getFeature',
		typeName: 'WellData:sask_township_grid_wgs',
		maxFeatures: 5000,
		outputFormat: 'application/json'
		};
			
	var customParams = {
		bbox: map.getBounds().toBBoxString(),
		};
			
	var parameters = L.Util.extend(wellVectorParameters, customParams);
		
	$.ajax({
		url: geoJsonUrl + L.Util.getParamString(parameters),
		datatype: 'json',
		type: 'GET',
		success: loadGeoJson
    });
			
	function loadGeoJson(saskTownshipGridData){
			geojsonLayerSaskTownshipGridData.addData(saskTownshipGridData);
  	}
};



/****************************************
LOADING SASK SECTION GRID
****************************************/

function loadSaskSecGridData(){

	var geoJsonUrl ='http://mblais-welldata.ca/geoserver/WellData/ows';	
		
	var wellVectorParameters = {
		service: 'WFS',
		version: '1.0.0',
		request: 'getFeature',
		typeName: 'WellData:sask_section_grid_wgs',
		maxFeatures: 5000,
		outputFormat: 'application/json'
		};
			
	var customParams = {
		bbox: map.getBounds().toBBoxString(),
		};
			
	var parameters = L.Util.extend(wellVectorParameters, customParams);
		
	$.ajax({
		url: geoJsonUrl + L.Util.getParamString(parameters),
		datatype: 'json',
		type: 'GET',
		success: loadGeoJson
    });
			
	function loadGeoJson(saskSectionGridData){
			geojsonLayerSaskSectionGridData.addData(saskSectionGridData);
  	}
};



/****************************************
LOADING SASK QUARTER SECTION GRID
****************************************/

function loadSaskQuarterSecGridData(){

	var geoJsonUrl ='http://mblais-welldata.ca/geoserver/WellData/ows';	
		
	var wellVectorParameters = {
		service: 'WFS',
		version: '1.0.0',
		request: 'getFeature',
		typeName: 'WellData:sask_quartersection_grid_wgs',
		maxFeatures: 5000,
		outputFormat: 'application/json'
		};
			
	var customParams = {
		bbox: map.getBounds().toBBoxString(),
		};
			
	var parameters = L.Util.extend(wellVectorParameters, customParams);
		
	$.ajax({
		url: geoJsonUrl + L.Util.getParamString(parameters),
		datatype: 'json',
		type: 'GET',
		success: loadGeoJson
    });
			
	function loadGeoJson(saskQuarterSectionGridData){
		geojsonLayerSaskQuarterSectionGridData.addData(saskQuarterSectionGridData);
  	}
};




/****************************************
LOADING SASK LSD GRID
****************************************/

function loadSaskGridData(){

	var geoJsonUrl ='http://mblais-welldata.ca/geoserver/WellData/ows';	
		
	var wellVectorParameters = {
		service: 'WFS',
		version: '1.0.0',
		request: 'getFeature',
		typeName: 'WellData:sask_lsd_grid_wgs',
		maxFeatures: 5000,
		outputFormat: 'application/json'
		};
			
	var customParams = {
		bbox: map.getBounds().toBBoxString(),
		};
			
	var parameters = L.Util.extend(wellVectorParameters, customParams);
		
	$.ajax({
		url: geoJsonUrl + L.Util.getParamString(parameters),
		datatype: 'json',
		type: 'GET',
		success: loadGeoJson
    });
			
	function loadGeoJson(saskGridData){
			geojsonLayerSaskGridData.addData(saskGridData);
  	}
};



/****************************************
SASK OIL POOLS
****************************************/
/*
function loadSaskOilPools(){

	var geoJsonUrl ='http://localhost:8085/geoserver/WellKnown/ows';	
		
	var wellVectorParameters = {
		service: 'WFS',
		version: '1.0.0',
		request: 'getFeature',
		typeName: 'WellKnown:sask_oil_pools_wgs',
		maxFeatures: 5000,
		outputFormat: 'application/json'
		};
			
	var customParams = {
		bbox: map.getBounds().toBBoxString(),
		};
			
	var parameters = L.Util.extend(wellVectorParameters, customParams);
		
	$.ajax({
		url: geoJsonUrl + L.Util.getParamString(parameters),
		datatype: 'json',
		type: 'GET',
		success: loadGeoJson
    });
			
	function loadGeoJson(saskOilPoolData){
			geojsonLayerSaskOilPool.addData(saskOilPoolData);
			//console.log(saskOilPoolData);
  	}
};
*/


/****************************************
SASK GAS POOLS
****************************************/
/*
function loadSaskGasPools(){

	var geoJsonUrl ='http://localhost:8085/geoserver/WellKnown/ows';	
		
	var wellVectorParameters = {
		service: 'WFS',
		version: '1.0.0',
		request: 'getFeature',
		typeName: 'WellKnown:sask_gas_pools_wgs',
		maxFeatures: 5000,
		outputFormat: 'application/json'
		};
			
	var customParams = {
		bbox: map.getBounds().toBBoxString(),
		};
			
	var parameters = L.Util.extend(wellVectorParameters, customParams);
		
	$.ajax({
		url: geoJsonUrl + L.Util.getParamString(parameters),
		datatype: 'json',
		type: 'GET',
		success: loadGeoJson
    });
			
	function loadGeoJson(saskGasPoolData){
			geojsonLayerSaskGasPool.addData(saskGasPoolData);
			//console.log(saskGasPoolData);
  	}
};
*/

	
/****************************************
ADDING LAYERS TO THE MAP
****************************************/
map.on('moveend', function(){
	if(map.getZoom() >= surfaceLocationZoom){
		loadSaskSurfaceWellData(clearLayers());
		loadSaskWellVectorData(clearLayers());
	}else{
		map.removeLayer(geojsonLayerSaskSurfaceWellData);
		map.removeLayer(geojsonLayerSaskWellVectorData);
	};
});

		
map.on('moveend', function(){
	if(map.getZoom() >= surfaceLocationZoom){
		loadSaskGridData(clearLayers());
		loadSaskQuarterSecGridData(clearLayers());
	}
	if(map.getZoom() >= maxzoom){
		loadSaskAbandonedDryWellData(clearLayers());
		loadSaskAbandonedOtherWellData(clearLayers());
		loadSaskCasedWellData(clearLayers());
		loadSaskDrillingWellData(clearLayers());
		loadSaskOilWellData(clearLayers());
		loadSaskGasWellData(clearLayers());
		loadSaskLicenseWellData(clearLayers());
		loadSaskWaterInjectorWellData(clearLayers());
		loadSaskWaterSourceWellData(clearLayers());
		loadSaskOilSteamWellData(clearLayers());
		loadSaskMiscellaneousWellData(clearLayers());
		loadSaskPotashWellData(clearLayers());
		loadSaskSecGridData(clearLayers());
		loadSaskTownshipGridData(clearLayers());
		//loadSaskOilPools(clearLayers());
		//loadSaskGasPools(clearLayers());
	
	}else{
		map.removeLayer(geojsonLayerSaskAbandonedDryWellData);
		map.removeLayer(geojsonLayerSaskAbandonedOtherWellData);
		map.removeLayer(geojsonLayerSaskCasedWellData);
		map.removeLayer(geojsonLayerSaskDrillingWellData);
		map.removeLayer(geojsonLayerSaskOilWellData);
		map.removeLayer(geojsonLayerSaskGasWellData);
		map.removeLayer(geojsonLayerSaskLicenseWellData);
		map.removeLayer(geojsonLayerSaskWaterInjectorWellData);
		map.removeLayer(geojsonLayerSaskWaterSourceWellData);
		map.removeLayer(geojsonLayerSaskOilSteamWellData);
		map.removeLayer(geojsonLayerSaskMiscellaneousWellData);
		map.removeLayer(geojsonLayerSaskPotashWellData);
		//map.removeLayer(geojsonLayerSaskOilPool);
		//map.removeLayer(geojsonLayerSaskGasPool);
	};
});




/****************************************************
CLEARING LAYERS BEFORE LOADING MAP WITH NEW GEOJSONS
****************************************************/

function clearLayers(){
	map.on('movestart', function(e){
		geojsonLayerSaskAbandonedDryWellData.clearLayers();
		geojsonLayerSaskAbandonedOtherWellData.clearLayers();
		geojsonLayerSaskCasedWellData.clearLayers();
		geojsonLayerSaskDrillingWellData.clearLayers();
		geojsonLayerSaskOilWellData.clearLayers();
		geojsonLayerSaskGasWellData.clearLayers();
		geojsonLayerSaskLicenseWellData.clearLayers();
		geojsonLayerSaskWaterInjectorWellData.clearLayers();
		geojsonLayerSaskWaterSourceWellData.clearLayers();
		geojsonLayerSaskOilSteamWellData.clearLayers();
		geojsonLayerSaskMiscellaneousWellData.clearLayers();
		geojsonLayerSaskPotashWellData.clearLayers();
		geojsonLayerSaskSurfaceWellData.clearLayers();
		geojsonLayerSaskWellVectorData.clearLayers();
		geojsonLayerSaskGridData.clearLayers();
		geojsonLayerSaskQuarterSectionGridData.clearLayers();
		geojsonLayerSaskSectionGridData.clearLayers();
		geojsonLayerSaskTownshipGridData.clearLayers();
		//geojsonLayerSaskOilPool.clearLayers();
		//geojsonLayerSaskGasPool.clearLayers();
	});
}



/****************************************
STYLES
****************************************/

var bcWellIcon = L.icon({
    iconUrl: 'css/img/bcWellMarker.png',
    shadowUrl: 'css/img/markers-shadow.png',
    shadowSize:   [36, 16],
    shadowAnchor: [10, -3],
    iconSize: [30, 40],
    popupAnchor:  [2, -20]
 });
 
var abdDryWellIcon = L.icon({
    iconUrl: 'css/img/abdDryWellMarker.png',
    shadowUrl: 'css/img/markers-shadow.png',
    shadowSize:   [36, 16],
    shadowAnchor: [10, -3],
    iconSize: [30, 40],
    popupAnchor:  [2, -20]
 });
 
 var abdOtherWellIcon = L.icon({
    iconUrl: 'css/img/abdOtherWellMarker.png',
    shadowUrl: 'css/img/markers-shadow.png',
    shadowSize:   [36, 16],
    shadowAnchor: [10, -3],
    iconSize: [30, 40],
    popupAnchor:  [2, -20]
 });
 
  var CasedWellIcon = L.icon({
    iconUrl: 'css/img/CasedWellMarker.png',
    shadowUrl: 'css/img/markers-shadow.png',
    shadowSize:   [36, 16],
    shadowAnchor: [10, -3],
    iconSize: [30, 40],
    popupAnchor:  [2, -20]
 });
 
 var DrillingWellIcon = L.icon({
    iconUrl: 'css/img/DrillingWellMarker.png',
    shadowUrl: 'css/img/markers-shadow.png',
    shadowSize:   [36, 16],
    shadowAnchor: [10, -3],
    iconSize: [30, 40],
    popupAnchor:  [2, -20]
 });
 
  var OilWellIcon = L.icon({
    iconUrl: 'css/img/oilWellMarker.png',
    shadowUrl: 'css/img/markers-shadow.png',
    shadowSize:   [36, 16],
    shadowAnchor: [10, -3],
    iconSize: [30, 40],
    popupAnchor:  [2, -20]
 });
 
 var GasWellIcon = L.icon({
    iconUrl: 'css/img/gasWellMarker.png',
    shadowUrl: 'css/img/markers-shadow.png',
    shadowSize:   [36, 16],
    shadowAnchor: [10, -3],
    iconSize: [30, 40],
    popupAnchor:  [2, -20]
 });
 
 var LicenseWellIcon = L.icon({
    iconUrl: 'css/img/licensedWellMarker.png',
    shadowUrl: 'css/img/markers-shadow.png',
    shadowSize:   [36, 16],
    shadowAnchor: [10, -3],
    iconSize: [30, 40],
    popupAnchor:  [2, -20]
 });

 var WaterInjectorWellIcon = L.icon({
    iconUrl: 'css/img/waterInjectorWellsMarker.png',
    shadowUrl: 'css/img/markers-shadow.png',
    shadowSize:   [36, 16],
    shadowAnchor: [10, -3],
    iconSize: [30, 40],
    popupAnchor:  [2, -20]
 });
 
 var WaterSourceWellIcon = L.icon({
    iconUrl: 'css/img/waterSourceWellsMarker.png',
    shadowUrl: 'css/img/markers-shadow.png',
    shadowSize:   [36, 16],
    shadowAnchor: [10, -3],
    iconSize: [30, 40],
    popupAnchor:  [2, -20]
 });
 
 var OilSteamWellIcon = L.icon({
    iconUrl: 'css/img/oilsteamwellsmarker.png',
    shadowUrl: 'css/img/markers-shadow.png',
    shadowSize:   [36, 16],
    shadowAnchor: [10, -3],
    iconSize: [30, 40],
    popupAnchor:  [2, -20]
 });
 
 var MiscellaneousWellIcon = L.icon({
    iconUrl: 'css/img/miscellaneouswellmarker.png',
    shadowUrl: 'css/img/markers-shadow.png',
    shadowSize:   [36, 16],
    shadowAnchor: [10, -3],
    iconSize: [30, 40],
    popupAnchor:  [2, -20]
 });
 
 var PotashWellIcon = L.icon({
    iconUrl: 'css/img/potashwellmarker.png',
    shadowUrl: 'css/img/markers-shadow.png',
    shadowSize:   [36, 16],
    shadowAnchor: [10, -3],
    iconSize: [30, 40],
    popupAnchor:  [2, -20]
 });
 
 var SurfaceWellIcon = L.icon({
    iconUrl: 'css/img/surfacewellmarker.png',
    shadowUrl: 'css/img/markers-shadow.png',
    shadowSize:   [36, 16],
    shadowAnchor: [10, -3],
    iconSize: [30, 40],
    popupAnchor:  [2, -20]
 });
 
 



		
		

	







		


		


	
	






