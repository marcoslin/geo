
function OpenStreetMapViewController(options) { // extends MapViewController
    MapViewController.call(this, options);

    /* Initialize superclass attributes */
    this.searchInput = document.querySelector('#nominatimSearch input');
    this.searchButton = document.querySelector('#nominatimSearch button');

    /* Declare and initialize OpenStreetMapViewController attributes */
    this.mapnik = new OpenLayers.Layer.OSM();
    this.fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
    this.toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection        
    this.markers = new OpenLayers.Layer.Markers("Markers");
}

/* OpenStreetMapViewController extends MapViewController */
JS.extend(OpenStreetMapViewController, MapViewController);

OpenStreetMapViewController.prototype = {
    /*
     * initMap
     * Initializes and shows the map
     */
    initMap: function() {
        MapViewController.prototype.initMap.call(this);

        /* Initialize superclass attributes */
        this.map = new OpenLayers.Map(this.mapId);

        /* Add layers */
        this.map.addLayer(this.mapnik);
        this.map.addLayer(this.markers);

        /* Show the map */
        var osmPosition = new OpenLayers.LonLat(this.defaultPosition.coords.longitude, this.defaultPosition.coords.latitude).transform(this.fromProjection, this.toProjection);
        this.map.setCenter(osmPosition, this.defaultZoom);
    },
    /*
     * initSearchBox
     * Initialize Nominatim Search Box
     */
    initSearchBox: function() {
        MapViewController.prototype.initSearchBox.call(this);

        var self = this;

        /* Initialize event handlers */
        this.searchButton.onclick = function() {
            self.search(self.searchInput.value);
            return false;
        };
    },
    /*
     * showPosition
     * Show the specified position on the map
     * @param {Position|OpenLayers.LonLat} position
     */
    showPosition: function(position) {

        var plon, plat;

        if (position.coords) { // Standard geolocation coords
            plon = position.coords.longitude;
            plat = position.coords.latitude;
        }
        else { // OpenLayers.LonLat
            plon = position.lon;
            plat = position.lat;
        }

        /* Calculate the OpenStreetMap position */
        var osmPosition = new OpenLayers.LonLat(plon, plat).transform(this.fromProjection, this.toProjection);

        /* Set the center of the map */
        this.map.setCenter(osmPosition, this.defaultZoom);

        if (this.currentPosition === null) { // if this is the first time this method is invoked

            /* Add a marker to the center */
            this.markers.addMarker(new OpenLayers.Marker(osmPosition));

            /* Show POIs only the first time this method is called */
            this.showPOIs(new OpenLayers.LonLat(plon, plat));

            /* Keep track of the current position */
            this.currentPosition = osmPosition;
        }

    },
    /*
     * handleGeolocationErrors
     * Handles geolocation errors
     * @param {PositionError} position
     */
    handleGeolocationErrors: function(positionError) {
        MapViewController.prototype.handleGeolocationErrors.call(this, positionError);
    },
    /*
     * search
     * Perform the search based on the specified query
     * @param {String} query
     */
    search: function(query) {
        MapViewController.prototype.search.call(this, query);

        /* Prepare AJAX communication with nominatim */
        var xhr = new XMLHttpRequest();
        var method = 'GET';
        var url = 'http://nominatim.openstreetmap.org/?q=' + query + '&format=json';
        var self = this;

        /* Send request */
        xhr.open(method, url, true);
        xhr.send();

        /* Handle answer */
        xhr.onreadystatechange = function() {

            /* If success */
            if (this.readyState === 4 && this.status === 200) {

                /* Parse the JSON response */
                var response = JSON.parse(this.responseText);
                console.log(response[0]);

                /* Take the first result and get geo infos */
                var rlon = response[0].lon - 0;
                var rlat = response[0].lat - 0;

                var position = new OpenLayers.LonLat(rlon, rlat).transform(self.fromProjection, self.toProjection);
                var marker = new OpenLayers.Marker(position);


                /* Set the center of the map */
                self.map.setCenter(position);

                /* Add a marker on the place found */
                self.markers.addMarker(marker);

                /* Display points of interest around the position */
                self.showPOIs(new OpenLayers.LonLat(rlon, rlat));

                /* Print place found */
                self.searchInput.value = response[0].display_name;
            }
        };

        console.log(xhr);

        return false;
    },
    /*
     * showPOIs
     * Show the Points Of Interest around the specified position
     * @param {Position|OpenLayers.LonLat} position
     */
    showPOIs: function(position) {
        MapViewController.prototype.showPOIs.call(this, position);

        var plon, plat;

        if (position.coords) { // Standard geolocation coords
            plon = position.coords.longitude;
            plat = position.coords.latitude;
        }
        else { // OpenLayers.LonLat
            plon = position.lon;
            plat = position.lat;
        }

        /* Show random positioned markers */
        var self = this;
        for (var i = 0; i < 10; i++) {
            var lon = plon - 0 + (Math.random() * 0.01) - 0.005;
            var lat = plat - 0 + (Math.random() * 0.01) - 0.005;
            var mposition = new OpenLayers.LonLat(lon, lat).transform(self.fromProjection, self.toProjection);
            var markerIcon = new OpenLayers.Icon('http://openlayers.org/api/img/marker-green.png');
            var marker = new OpenLayers.Marker(mposition, markerIcon);

            marker.popup = new OpenLayers.Popup.FramedCloud("osmpopup",
                    mposition,
                    new OpenLayers.Size(200, 200),
                    "place " + i,
                    null,
                    true);

            marker.events.register("click", marker, function(e) {

                self.map.addPopup(this.popup);
            });

            self.markers.addMarker(marker);
        }

    }
};
