
function HybridMapViewController(options) { // extends GoogleMapViewController
    GoogleMapViewController.call(this, options);

    /* Set GoogleMap options */
    var mapOptions = {
        zoom: 15,
        mapTypeId: "OSM",
        mapTypeControl: false,
        streetViewControl: false
    };

    /* Initialize superclass attributes */
    this.map = new google.maps.Map(document.getElementById(options.mapId), mapOptions);

    /* Define OSM map type pointing at the OpenStreetMap tile server */
    this.map.mapTypes.set("OSM", new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
            return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
        },
        tileSize: new google.maps.Size(256, 256),
        name: "OpenStreetMap",
        maxZoom: 18
    }));
}

/* HybridMapViewController extends GoogleMapViewController */
JS.extend(HybridMapViewController, GoogleMapViewController);
