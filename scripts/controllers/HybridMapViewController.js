
function HybridMapViewController(options) { // extends GoogleMapViewController
    GoogleMapViewController.call(this, options);
}

/* HybridMapViewController extends GoogleMapViewController */
JS.extend(HybridMapViewController, GoogleMapViewController);

/*
 * initMap
 * Initializes and shows the map
 */
HybridMapViewController.prototype.initMap = function() {
    MapViewController.prototype.initMap.call(this);

    /* Set GoogleMap options */
    var mapOptions = {
        zoom: this.defaultZoom,
        mapTypeId: "OSM",
        mapTypeControl: false,
        streetViewControl: false
    };

    /* Initialize superclass attributes */
    this.map = new google.maps.Map(document.getElementById(this.mapId), mapOptions);
    this.searchInput = document.querySelector('#hybridSearch input');

    /* Define OSM map type pointing at the OpenStreetMap tile server */
    this.map.mapTypes.set("OSM", new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
            return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
        },
        tileSize: new google.maps.Size(256, 256),
        name: "OpenStreetMap",
        maxZoom: 18
    }));

    /* Show the map */
    var gmPosition = new google.maps.LatLng(this.defaultPosition.coords.latitude, this.defaultPosition.coords.longitude);
    this.map.setCenter(gmPosition);
};