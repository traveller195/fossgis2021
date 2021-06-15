console.log('run JS file: app_framework7.js');
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Include core of framework7
import Framework7, { Dom7 } from 'framework7';

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Include 'routes' from external JS file... for navigation of pages, etc...
import routes from './routes.js';

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Import additional components
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//import Searchbar from 'framework7/components/searchbar/searchbar.js';
//import Calendar from 'framework7/components/calendar/calendar.js';
//import Popup from 'framework7/components/popup/popup.js';

import Panel from 'framework7/components/panel/panel.js';
// import Card from 'framework7/components/card/card.js';

// directly import from npm swiper... not via framework7
// by using bundle, also Navigation and Pagination is already installed!
import Swiper from 'swiper/bundle';
// import Swiper styles
// import 'swiper/swiper-bundle.css';

// import Swiper from 'framework7/components/swiper/swiper.js';
import Appbar from 'framework7/components/appbar/appbar.js';
import Block from 'framework7/components/block/block.js';
import Button from 'framework7/components/button/button.js';

import Sheet_Modal from 'framework7/components/sheet/sheet.js';

import Toolbar from 'framework7/components/toolbar/toolbar.js';
import Subnavbar from 'framework7/components/subnavbar/subnavbar.js';

import Accordion from 'framework7/components/accordion/accordion.js';
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// !!! important !!! also register imported component here with .use !!!

// because Swiper is now imported from swiperjs, it is not necessary to register it here... 
Framework7.use([Panel, Block, Button, Sheet_Modal, Toolbar, Subnavbar, Appbar, Accordion]);
// !!!           !!!
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
console.log('var app = new Framework7()');

// globally var
var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'ESP App',
  // App id
  id: 'com.myapp.test',
  // aurora as Theme, zB fuer abgerundete Ecken etc.
  theme: 'aurora',
  // Enable swipe panel
  // default values for all panels:
  panel: {
    swipe: 'left',
    swipeOnlyClose: true

  },

  // assign routes / navigation between pages, see routes.js
  routes: routes,
  popup: {
    closeOnEscape: true
  },
  on: {
    pageInit: function () {
      //init();
    },
  },

});

console.log('var mainView = app.views.create( view-main');

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//init the main view:

// globally var
var mainView = app.views.create('.view-main', {
  url: '/'
});



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Zugriff auf DOM Elemente (HTML)
var $$ = Dom7;



window.checkLocalStorage = function () {
  // function to create local storage key-values, if not existing (set default values)
  // key-values are for settings, if layer in ol-map is visible or not
  console.log('FUNCTION: check local storage');

  if (localStorage.getItem('lyr_osm') == null) {
    // add key value
    localStorage.setItem('lyr_osm', 'y');
  };

  if (localStorage.getItem('lyr_ele') == null) {
    // add key value
    localStorage.setItem('lyr_ele', 'n');
  };

  if (localStorage.getItem('lyr_rou') == null) {
    // add key value
    localStorage.setItem('lyr_rou', 'y');
  };

  if (localStorage.getItem('lyr_ess') == null) {
    // add key value
    localStorage.setItem('lyr_ess', 'n');
  };

  if (localStorage.getItem('lyr_poi') == null) {
    // add key value
    localStorage.setItem('lyr_poi', 'y');
  };

  if (localStorage.getItem('lyr_bez') == null) {
    // add key value
    localStorage.setItem('lyr_bez', 'n');
  };


  // Map View - Center + Zoom (initial for AOI of project area)
  if (localStorage.getItem('view_center') == null) {
    // add key value
    localStorage.setItem('view_center', '13.710164431108614, 51.026934250748468');
  };


  if (localStorage.getItem('view_zoom') == null) {
    // add key value
    localStorage.setItem('view_zoom', '14');
  };

  // Geolocation on off
  if (localStorage.getItem('geol') == null) {
    // add key value
    localStorage.setItem('geol', 'off');
  };


  if (localStorage.getItem('geol_marker') == null) {
    // add key value
    localStorage.setItem('geol_marker', 'y');
  };


  if (localStorage.getItem('geol_follow_me') == null) {
    // add key value
    localStorage.setItem('geol_follow_me', 'y');
  };

  

  // Route / Spaziergang Status speichern
  if (localStorage.getItem('route_state') == null) {
    // add key value
    localStorage.setItem('route_state', 'off');
  };

  if (localStorage.getItem('route_id') == null) {
    // add key value
    localStorage.setItem('route_id', '-1');
  };

  // language modus
  if (localStorage.getItem('lang') == null) {
    // add key value
    localStorage.setItem('lang', 'de');
  };

};

// diese Funktion wird zukuenftig nicht mehr benoetigt!!
window.adapt_home_CSS = function () {
  console.log('FUNCTION: adapt_home_CSS');
  // adapt CSS rules for state of 'route'
  // if route_state == 'off'
  if (localStorage.getItem('route_state') == 'off') {
    // CSS rule for div elements
    document.getElementById('section-map').style.height = "100%";
    document.getElementById('section-footer').style.height = "0%";
    document.getElementById('section-footer').style.display = "none";
  }


  // if route_state == 'on'
  if (localStorage.getItem('route_state') == 'on') {
    // CSS rule for div elements
    document.getElementById('section-map').style.height = "60%";
    document.getElementById('section-footer').style.height = "40%";
    document.getElementById('section-footer').style.display = "block";
  }

};



// This script [in Javascript] calculates great-circle distances between the two points – that is, the shortest distance over the earth’s surface – using the ‘Haversine’ formula.
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}



import Map from 'ol/Map';
import View from 'ol/View';
import GeoJSON from 'ol/format/GeoJSON';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {OSM, Vector as VectorSource} from 'ol/source';
import {ZoomToExtent} from 'ol/control';
import {transform} from 'ol/proj';
import {Circle, Fill, RegularShape, Stroke, Style, Icon} from 'ol/style';
import {defaults as defaultControls, ScaleLine, Control} from 'ol/control';
import Geolocation from 'ol/Geolocation';

import 'ol/ol.css';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { none } from 'ol/centerconstraint';

window.initMap = function () {
  // destroy_map();
  // // count number of div ol-viewport elements
  // console.log('Anzahl viewport: ' + $$('.ol-viewport').length);
  // // remove all existing ol-viewport to avoid multiple maps


// force refresh / force destroy of ol map
// controlling ol map by DOM
// delete / remove all DOM elements

// example
// This is what I'd do:

// var map = new ol.Map({
//   target: 'map'
//   // ...
// });
// $('#map').data('map', map);

// With that you can get a reference to the map using:

// var map = $('#map').data('map');





  // $$('.ol-viewport').remove();






  // $$('.map-main').remove(); 
  
 
  console.log(typeof(map));
  console.log(map);

  console.log(typeof($$('.map-main')));
  console.log($$('.map-main'));

  console.log(typeof($$('#map')));
  console.log($$('#map'));

  console.log(typeof(view));
  console.log(view);

  if (map){
    map.destroy();
    map = null;
  } 
  
  
  // console.log('Anzahl viewport: ' + $$('.ol-viewport').length);
  console.log('FUNCTION: initMap function');

  // init map and view
  // center to centroid of AOI
  // prepare view center and zoom load drom local storage
  var str_center = localStorage.getItem('view_center');
  var coords_center = str_center.split(',');
  // console.log(coords_center[0]);
  // console.log(coords_center[1]);
  var center_lon = parseFloat(coords_center[0].replace(' ', ''));
  var center_lat = parseFloat(coords_center[1].replace(' ', ''));

  console.log('current center of view: ' + center_lon + '   ' + center_lat);


  // console.log('View ' + typeof view);

  // for constrained extent see also http://bboxfinder.com
  var view = new View({
    // extent: [-572513.341856, 5211017.966314, 916327.095083, 6636950.728974],
    center: transform([center_lon, center_lat], 'EPSG:4326', 'EPSG:3857'),
    zoom: parseInt(localStorage.getItem('view_zoom')),
    
    enableRotation: false
  });

  var map = new Map({
    layers: [],
    target: 'map',
    view: view,
    controls: defaultControls().extend([
      new ScaleLine()
    ]),
  });


  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // ++++++++ STYLE FUNCTION ++++++
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // style for current line and stations
  var image_station = new Circle({
    radius: 5,
    fill: new Fill({ color: 'red' }),
    stroke: new Stroke({ color: 'red', width: 1 }),
  });

  // style for active point
  var circle_active_point = new Circle({
    radius: 5,
    fill: new Fill({ color: 'yellow' }),
    stroke: new Stroke({ color: 'red', width: 1 }),
  });

  // import EqualTo from 'ol/format/filter/EqualTo';
  // // SELECTOR for selected features
  // new OpenLayers.Filter.Comparison({
  //   type: EqualTo,
  //   property: "state",
  //   value: "active"
  // });

  var styles_current_route = {
    'Point': new Style({
      image: new Circle({
        radius: 5,
        fill: new Fill({ color: 'red' }),
        stroke: new Stroke({ color: 'red', width: 1 }),
      }),
    }),
    'Station_default': new Style({
      image: new Circle({
        radius: 5,
        fill: new Fill({ color: 'red' }),
        stroke: new Stroke({ color: 'red', width: 1 }),
      }),
    }),
    'Station_active': new Style({
      image: new Circle({
        radius: 6,
        fill: new Fill({ color: 'yellow' }),
        stroke: new Stroke({ color: 'red', width: 2 }),
      }),
    }),


    'Station_essbar_active': new Style({
      image: new Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: 'map-icons/greengrocer_yellow_red.svg',
        opacity: 1,
        // size: [52, 52],
        scale: 0.04,
      }),
    }),

    'Station_essbar_default': new Style({
      image: new Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: 'map-icons/greengrocer_green.svg',
        opacity: 1,
        // size: [52, 52],
        scale: 0.04,
      }),
    }),



    'Station_poi_active': new Style({
      image: new Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: 'map-icons/eye_red.svg',
        opacity: 1,
        // size: [52, 52],
        scale: 0.04,
      }),
    }),

    'Station_poi_default': new Style({
      image: new Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: 'map-icons/eye_green.svg',
        opacity: 1,
        // size: [52, 52],
        scale: 0.04,
      }),
    }),



    'LineString': new Style({
      stroke: new Stroke({
        color: 'red',
        width: 2,
      }),
    }),



    // here OL styles for Line
    'MultiLineString': new Style({
      stroke: new Stroke({
        color: 'red',
        width: 2,
      }),
    }),






    'MultiPoint': new Style({
      image: image,
    }),
    'MultiPolygon': new Style({
      stroke: new Stroke({
        color: 'yellow',
        width: 1,
      }),
      fill: new Fill({
        color: 'rgba(255, 255, 0, 0.1)',
      }),
    }),
    'Polygon': new Style({
      stroke: new Stroke({
        color: 'green',
        lineDash: [4],
        width: 3,
      }),
      fill: new Fill({
        color: 'rgba(0, 255, 0, 0.1)',
      }),
    }),
    'GeometryCollection': new Style({
      stroke: new Stroke({
        color: 'magenta',
        width: 2,
      }),
      fill: new Fill({
        color: 'magenta',
      }),
      image: new Circle({
        radius: 10,
        fill: null,
        stroke: new Stroke({
          color: 'magenta',
        }),
      }),
    }),
    'Circle': new Style({
      stroke: new Stroke({
        color: 'green',
        width: 2,
      }),
      fill: new Fill({
        color: 'rgba(255,0,0,0.2)',
      }),
    }),
  };


  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // ++++++++++++ STYLE FUNCTION for current route/stations ++++++++++++++
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // later could also change depending of zoom level / resolution
  var styleFunction_current = function (feature, resolution) {
    console.log('styleFunction_current - ' + feature.getGeometry().getType());
    // will return a style object
    // console.log(feature.getProperties()); // <== all geojson properties

    var geometry = feature.getGeometry();
    var coords = geometry.getCoordinates();
    // console.log(coords);
 
    
    

    //  build a decision making tree
    // first: check geometry type
    if (feature.getGeometry().getType() != 'Point'){

      // if feature is LINE
      if (feature.getGeometry().getType() == 'MultiLineString'){
        console.log('draw line');
        var styles_line = [
          // linestring
          styles_current_route[feature.getGeometry().getType()] 
        ];
        // iterate segment by segment for arrow line

        // counter to onlye edit every third/... segment with arrow
        let counter_segment = 0;
        let sum_distance = 0;



        console.log(coords[0].length);
        var i;
        // iterate from 0 until length-1
        for (i = 0; i < coords[0].length-1; i++) {
          // console.log(i); 
          // sum_distance = sum_distance + getDistanceFromLatLonInKm(coords[0][i][1], coords[0][i][0], coords[0][i+1][1], coords[0][i+1][0]);
          sum_distance = sum_distance + Math.sqrt((coords[0][i][0] - coords[0][i+1][0]) ** 2 + (coords[0][i][1] - coords[0][i+1][1]) ** 2);

          // only first and last segment get arrow OR in between every XX kilometer
          if (i==0 || i == coords[0].length-2 || sum_distance > 1000.0) {
            // console.log('current sum_distance:  ' + sum_distance);
            
            
            // clear sum_distance
            sum_distance = 0;

            let start = coords[0][i];
            let end = coords[0][i+1];

            // console.log(start);
            // console.log(end);

          // geometry.forEachSegment(function (start, end) {

            counter_segment = counter_segment + 1;
            // console.log(counter_segment);
            // calculate rotation 
            let dx = end[0] - start[0];
            let dy = end[1] - start[1];
            let rotation = Math.atan2(dy, dx);

            // calculate new point for arrow
            let nx = (end[0] + start[0])/2;
            let ny = (end[1] + start[1])/2;
            let new_point = [nx, ny];
            // arrows
            styles_line.push(
              new Style({
                geometry: new Point(new_point),
                image: new RegularShape({
                  fill: new Fill({color: 'red'}),
                  stroke: new Stroke({color: 'red', width: 0}),
                  points: 3,
                  radius: 7,
                  rotation: -rotation + 2 * Math.PI/4,
                  angle: 0,
                }),                 
                
                
                // new Icon({
                //   src: 'data/arrow.png',
                //   anchor: [0.75, 0.5],
                //   rotateWithView: true,
                //   rotation: ,
                // }),
              })
            );

          }

      }
        
        return styles_line;

      } else {
        return styles_current_route[feature.getGeometry().getType()];
      }

      
    } else {
      // if 'point', check if it is 
      // if there is a 'state'='active' value
      if (feature.get('ol-style')=='default' && feature.get('type')=='station-essbar'){
        return styles_current_route['Station_essbar_default'];

      }
      if (feature.get('ol-style')=='default' && feature.get('type')=='station-poi'){
        return styles_current_route['Station_poi_default'];

      }

      if (feature.get('ol-style')=='active' && feature.get('type')=='station-essbar'){
        return styles_current_route['Station_essbar_active'];

      }

      if (feature.get('ol-style')=='active' && feature.get('type')=='station-poi'){
        return styles_current_route['Station_poi_active'];

      } else {

        // return undefined; // feature will not be displayed
        return styles_current_route['Point'];
      }



    }









    return styles_current_route[feature.getGeometry().getType()];
  };





  // console.log(typeof map);
  // if (typeof map !== 'undefined'){
  //   map.destroy;
  //   console.log('map object destroyed ');
  // }
  // if (typeof view !== 'undefined'){
  //   view.destroy;
  //   console.log('view object destroyed ');
  // }
  // console.log(typeof map);
  // console.log(typeof map);
  // console.log(map.getViewport());
  // // delete map as function (not called here)
  // function destroy_map () {
  // // if exists remove old map
  //   console.log(typeof map);
  //   if (typeof map !== 'undefined'){
  //     map.destroy();
  //     console.log('map object destroyed ');
  //   }
  // }
  // geolocation
  var geolocation = new Geolocation({
    // enableHighAccuracy must be set to true to have the heading value.
    trackingOptions: {
      enableHighAccuracy: true
    },
    projection: view.getProjection()
  });


  var fill_m = new Fill({
    color: '#e31e10'
  });
  var stroke_m = new Stroke({
    color: '#f2df0a',
    width: 1.25
  });
  var iconStyle = [
    new Style({
      image: new Circle({
        fill: fill_m,
        stroke: stroke_m,
        radius: 5
      })
    })
  ];

  // var iconStyle = new ol.style.Style({
  //   image: new ol.style.Icon({
  //     anchor: [0.5, 100],
  //     anchorXUnits: 'fraction',
  //     anchorYUnits: 'pixels',
  //     opacity: 1.0,
  //     src: './_img/marker_.png'
  //      })
  //     });
  // add an empty iconFeature to the source of the layer
  var iconSource = new VectorSource({
    // features: [iconFeature]
  });
  var iconLayer = new VectorLayer({
    source: iconSource,
    style: iconStyle
  });

  // event position change
  geolocation.on('change:position', function (evt) {
    if (localStorage.getItem('geol') == 'on') {
      console.log(geolocation.getPosition());

      // only view center if 'GPS_Follow_Me' is true
      if (localStorage.getItem('geol_follow_me') == 'y'){
        // getPosition() ist already in WebMercator 3857 coords
        view.setCenter(geolocation.getPosition());
      }
     

      if (localStorage.getItem('geol_marker') == 'y') {
        // create marker for current position
        var iconFeature = new Feature({
          geometry: new Point(geolocation.getPosition())
        });
        iconFeature.setStyle(iconStyle);
        // iconFeature.setGeometry(new Point());
        // var pp = iconFeature.getGeometry();
        iconSource.clear();
        iconSource.addFeature(iconFeature);
        iconSource.refresh();
        map.addLayer(iconLayer);

        console.log('Marker moved - ');

        // remove old marker or move existing marker?
      } else {
        // remove marker if existing!
        iconSource.clear();
      }
    }
  });

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++=
  // new structure:
  // declare and add all layers here
  // later, during updateMap() function will be set "setVisible" to show or hide the layers
  // OSM basmap
  var osm_layer = new TileLayer({
    source: new OSM()
  });

  // essbare Objekte vector layer
  var source_essbare_obj = new VectorSource({
    url: 'json/2020_10_06-19_58_42_result.geojson',
    format: new GeoJSON()
  });

  // var self = this;
  // var app = self.$app;
  // request user data on page init
  // app.request.get('json/2020_10_06-19_58_42_result.geojson', (daten) => {
  //   // update component state with new state
  //   console.log(daten);
  //   var daten_json = JSON.parse(daten);
  //   console.log(daten_json);
  //   // console.log(obj.title);
  //   self.$setState({
  //     tours: obj,                
  //   });
  // });
  // style for essbare objecte
  // var fill = new Fill({
  //   color: '#75CA42'
  // });
  // var stroke = new Stroke({
  //   color: '#3399CC',
  //   width: 1.25
  // });
  // var styles = [
  //   new Style({
  //     image: new Circle({
  //       fill: fill,
  //       stroke: stroke,
  //       radius: 5
  //     }),
  //     fill: fill,
  //     stroke: stroke
  //   })
  // ];
  var image = new Circle({
    radius: 5,
    fill: null,
    stroke: new Stroke({ color: 'green', width: 1 }),
  });

  var styles_essb_obj = {
    'Point': new Style({
      image: image,
    }),
    'LineString': new Style({
      stroke: new Stroke({
        color: 'green',
        width: 1,
      }),
    }),
    'MultiLineString': new Style({
      stroke: new Stroke({
        color: 'green',
        width: 1,
      }),
    }),
    'MultiPoint': new Style({
      image: image,
    }),
    'MultiPolygon': new Style({
      stroke: new Stroke({
        color: 'yellow',
        width: 1,
      }),
      fill: new Fill({
        color: 'rgba(255, 255, 0, 0.1)',
      }),
    }),
    'Polygon': new Style({
      stroke: new Stroke({
        color: 'green',
        lineDash: [4],
        width: 3,
      }),
      fill: new Fill({
        color: 'rgba(0, 255, 0, 0.1)',
      }),
    }),
    'GeometryCollection': new Style({
      stroke: new Stroke({color: 'magenta', width: 2}),
      fill: new Fill({color: 'magenta'}),
      image: new Circle({radius: 10, fill: null, stroke: new Stroke({color: 'magenta'})  }),
    }),
    'Circle': new Style({
      stroke: new Stroke({color: 'green', width: 2 }),
      fill: new Fill({color: 'rgba(255,0,0,0.2)'}),
    }),
  };

  // later could also change depending of zoom level
  var styleFunction = function (feature) {
    return styles_essb_obj[feature.getGeometry().getType()];
  };


  var layer_source_essbare_obj = new VectorLayer({
    source: source_essbare_obj,
    style: styleFunction
  });

  // layer elevation lines / contours
  var source_contours = new VectorSource({
    url: 'json/dgm1_contours10m_paek20m_length_ab20m.geojson',
    format: new GeoJSON()
  });

  var stroke_cont = new Stroke({color: '#663300',width: 1.0 });

  var styles_cont = [
    new Style({stroke: stroke_cont})
  ];

  var layer_contours = new VectorLayer({
    source: source_contours,
    style: styles_cont
  });

  // layer : statistische bezirke
  var source_stat_bezirke = new VectorSource({
    url: 'json/stat_bezirke_4326.geojson',
    format: new GeoJSON()
  });

  var layer_stat_bezirke = new VectorLayer({
    source: source_stat_bezirke
  });

  // ++++++++++++++++++++++++++++++++++++
  // now I can add the layers, all of them. Later by using "setVisible" I can handle visibility
  // order will be also order for rendering... maybe I can also use 'z index'?
  map.addLayer(osm_layer);
  map.addLayer(layer_contours);
  map.addLayer(layer_stat_bezirke);
  map.addLayer(layer_source_essbare_obj);

  window.drawCurrentRoute = function (line, stations) {
    console.log('FUNCTION: drawCurrentRoute');
    // will be called from home.f7.html JS part
    // to draw line and points of Route
    // data is in GeoJSON...
    // improve input data into only one GeoJSON!
    var current_geojson = JSON.parse('{"type": "FeatureCollection","crs": {"type": "name","properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},"features": []}');
    // add line geometry
    current_geojson['features'].push(line);

    console.log(stations);
    // add all stations from array
    for (let i = 0; i < stations.length; i++) {      

      // console.log(stations[i].point);
      // add ol-style='default' to all stations of current route
      stations[i]['point']['properties']['ol-style'] = "default";
      // add station to GeoJSON for openlayers layer
      current_geojson['features'].push(stations[i].point);
    }

    console.log(JSON.stringify(current_geojson));


    // // style for current line and stations
    // var image = new Circle({
    //   radius: 5,
    //   fill: new Fill({ color: 'red' }),
    //   stroke: new Stroke({ color: 'red', width: 1 }),
    // });

    // // style for active point
    // var circle_active_point = new Circle({
    //   radius: 5,
    //   fill: new Fill({ color: 'yellow' }),
    //   stroke: new Stroke({ color: 'red', width: 1 }),
    // });

    // // import EqualTo from 'ol/format/filter/EqualTo';
    // // // SELECTOR for selected features
    // // new OpenLayers.Filter.Comparison({
    // //   type: EqualTo,
    // //   property: "state",
    // //   value: "active"
    // // });

    // var styles_current_route = {
    //   'Point': new Style({
    //     image: image,
    //   }),
    //   'LineString': new Style({
    //     stroke: new Stroke({
    //       color: 'red',
    //       width: 2,
    //     }),
    //   }),
    //   'MultiLineString': new Style({
    //     stroke: new Stroke({
    //       color: 'red',
    //       width: 2,
    //     }),
    //   }),
    //   'MultiPoint': new Style({
    //     image: image,
    //   }),
    //   'MultiPolygon': new Style({
    //     stroke: new Stroke({
    //       color: 'yellow',
    //       width: 1,
    //     }),
    //     fill: new Fill({
    //       color: 'rgba(255, 255, 0, 0.1)',
    //     }),
    //   }),
    //   'Polygon': new Style({
    //     stroke: new Stroke({
    //       color: 'green',
    //       lineDash: [4],
    //       width: 3,
    //     }),
    //     fill: new Fill({
    //       color: 'rgba(0, 255, 0, 0.1)',
    //     }),
    //   }),
    //   'GeometryCollection': new Style({
    //     stroke: new Stroke({
    //       color: 'magenta',
    //       width: 2,
    //     }),
    //     fill: new Fill({
    //       color: 'magenta',
    //     }),
    //     image: new Circle({
    //       radius: 10,
    //       fill: null,
    //       stroke: new Stroke({
    //         color: 'magenta',
    //       }),
    //     }),
    //   }),
    //   'Circle': new Style({
    //     stroke: new Stroke({
    //       color: 'green',
    //       width: 2,
    //     }),
    //     fill: new Fill({
    //       color: 'rgba(255,0,0,0.2)',
    //     }),
    //   }),
    // };

    // // later could also change depending of zoom level / resolution
    // var styleFunction_current = function (feature) {
    //   // will return a style object
    //   // if there is a 'state'='active' value

    //   // if feature.... == 'active':
    //   //   return {style:}
    //   // else:



    //   return styles_current_route[feature.getGeometry().getType()];
    // };
    // projection crs problems
    var current_geojson_3857 = new GeoJSON({ featureProjection: 'EPSG:3857' }).readFeatures(current_geojson);

    var vectorSource_current_route = new VectorSource({
      features: current_geojson_3857,
      // features: new GeoJSON().readFeatures(current_geojson),
      format: new GeoJSON({ featureProjection: "EPSG:3857" })
    });


    var layer_current_route = new VectorLayer({
      source: vectorSource_current_route,
      style: styleFunction_current
    });
    layer_current_route.set('name', 'current_route');


    // if layer already existing... remove
    map.getLayers().forEach(layer => {
      if (layer && layer.get('name') === 'current_route') {
        map.removeLayer(layer);
      }
    });


    map.addLayer(layer_current_route);
    // zoom to extent of layer --> must use VectorSource not Layer!!!
    map.getView().fit(vectorSource_current_route.getExtent());


    // ++++++++++++++++++ CLICK EVENT ++++++++++++++++++++++++
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // start event handler for CLICK event on feature
    map.on('click', function(evt) {
      var f = map.forEachFeatureAtPixel(
        evt.pixel,
        function(ft, layer){return ft;}
      );

      // if (f && f.get('type') == 'click') {
        if (f) {
        var geometry = f.getGeometry();
        var coord = geometry.getCoordinates();

        // get into Dom7 and framework7 structure
        
        
        
        

        // console.log(app);
        // console.log(app.views.main.router.currentPageEl);

        // only click on stations should init event... not point of GPS position or lines...
        console.log('typeof ' + typeof f.get('order'));
        if (typeof f.get('order') == 'number' || typeof f.get('order') == 'string'){
          // call method from home.f7.html from outside
          $$('[data-name="home"]')[0].f7Component.map_element_clicked(f.get('order')); 


          console.log('map event CLICK : ' + coord + ' - order: ' + f.get('order'));
          // map_element_clicked();
          
          // var content = '<p>'+f.get('desc')+'</p>';
          
          // popup.show(coord, content);

        }


          
      } else {
        console.log('map event CLICK : no feature'); 
        
      }
    });




    // function to remove current route and stations again... will be called from outside
    window.removeCurrentRoute = function () {
      console.log('FUNCTION: removeCurrentRoute');

      // function for removing current route again as layer
      map.removeLayer(layer_current_route);
    };

    // function to set station of current route to 'active'
    window.setStationActive = function (nr) {
      console.log('FUNCTION: setStationActive');

      // set all stations first to 'default'
      var source_current_route = layer_current_route.getSource();
      var features_current_route = source_current_route.getFeatures().forEach(function(f) {
        console.log("forEachFeature");
        if (f.get('order')==parseInt(nr, 10)){
          // set [nr] station to 'active'
          f.set('ol-style', 'active');
        } else {
          f.set('ol-style', 'default');
        }
      });

    };

  };

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // function for updating map content 
  // e.g. after settings changed
  window.updateMap = function () {
    console.log('FUNCTION: updateMap function');

    // resize ol map e.g. after closing current route mode
    map.updateSize();


    // // remove all current layers 
    // // const arrLayers = map.getLayers();
    // const arrLayers = map.getLayers().getArray();
    // console.log(arrLayers);
    // // arrLayers.forEach(function (layer) {
    // //   map.removeLayer(layer);
    // // });
    // var zaehler = 0;
    // console.log('Update Map - remove old layers:');
    // arrLayers.forEach(function (layer) {
    //   // console.log(zaehler + '  ' + layer.get('name'));
    //   console.log(zaehler + '  ' + layer.values_.source.url_);
    //   map.removeLayer(layer);
    //   // um herauszufinden welche Layer entfernt werden... nichts darf mehr im Cache/RAM verbleiben!
    //   zaehler += 1;
    // });
    // //map.render();
    // ++++++++++++++++++++++++++++++++++++
    // now I can handle the Visibility of the layers, depending on localStorage values
    // setVisible - true or false
    if (localStorage.getItem('lyr_osm') == 'y') {
      osm_layer.setVisible(true);
    } else {
      // osm_layer.setVisible(false);
      osm_layer.setVisible(true);
    }


    // currently layer 'statistische bezirke' 
    if (localStorage.getItem('lyr_bez') == 'y') {
      // layer_stat_bezirke.setVisible(true);
      layer_stat_bezirke.setVisible(false);

    } else {
      layer_stat_bezirke.setVisible(false);
    }


    // show layer if localstorage value is yes
    if (localStorage.getItem('lyr_ele') == 'y') {
      layer_contours.setVisible(true);
    } else {
      layer_contours.setVisible(false);
    }

    if (localStorage.getItem('lyr_ess') == 'y') {
      // layer_source_essbare_obj.setVisible(true);
      layer_source_essbare_obj.setVisible(false);
    } else {
      layer_source_essbare_obj.setVisible(false);
    }


    // remove current route if existing:
    // if layer already existing... remove
    map.getLayers().forEach(layer => {
      if (layer && layer.get('name') === 'current_route') {
        map.removeLayer(layer);
      }
    });


    //map.render();
  }

  // call function updateMap in initMap
  updateMap();

  // add icon layer for geolocation icon
  // with empty Geometry
  // map.addLayer(iconLayer); 
  // console.log('addLayer iconLayer for Marker');
  // test funktion
  // map.on("click", function(evt){
  //     //var extent = [[32.958984, -5.353521], [43.50585, 5.615985]];
  //     //map.getView().fit(extent, map.getSize());
  //     alert('Achtung Achtung... hier spricht OpenLayers!');
  // });


  window.setTrackingGeolocation = function(bool){
    if (bool=true){
      geolocation.setTracking(true);
    }
    if (bool=false){
      geolocation.setTracking(false);
      // remove marker if existing!
      iconSource.clear();
    }
  }

  window.setGPS_Follow_Me = function(){
    // change status of Follow Me

    console.log('setGPS_Follow_Me');
    if (localStorage.getItem('geol_follow_me')=='y'){
      localStorage.setItem('geol_follow_me', 'n');

    }

    if (localStorage.getItem('geol_follow_me')=='n'){
      localStorage.setItem('geol_follow_me', 'y');
      
    }
  }

  $$(document).on('page:beforeout', '.page[data-name="settings"]', function (e, page) {

    // when settings are closing, update status of geolocation
    if ($$('#toggle-settings-standort').prop('checked') == true) {

      // enable geolocation
      geolocation.setTracking(true);

      // check marker settings and create marker if required
    } else {
      // disable geolocation
      geolocation.setTracking(false);

      // remove marker if existing!
      iconSource.clear();
    }

  });



  // Zoom to AOI 
  window.zoom_to_aoi = function () {
    console.log('FUNCTION: zoom_to_aoi function');
    view.setCenter(transform([13.710164431108614, 51.026934250748468], 'EPSG:4326', 'EPSG:3857'));
    view.setZoom(14);
  };





  // TEST TEST
  // $$('.btn_geolocation').on('click', function () {


  //   console.log('button Geolocation clicked');




  // });

  // old zoom level
  var currZoom = map.getView().getZoom();

  // if map was moved, write current center and zoom to local storage
  map.on("moveend", function (evt) {
    localStorage.setItem("view_center", transform(map.getView().getCenter(), 'EPSG:3857', 'EPSG:4326'));
    localStorage.setItem("view_zoom", map.getView().getZoom());
    console.log('MoveEnd Event ol.map');

    // to detect change of zoom
    var newZoom = map.getView().getZoom();
    if (currZoom != newZoom) {
      console.log('zoom end, new zoom: ' + newZoom);
      currZoom = newZoom;

      if (localStorage.getItem('geol_follow_me')=='y'){
        console.log('GPS Follow Me mode was stopped');
        localStorage.setItem('geol_follow_me', 'n');
      }
    }
  });

};

