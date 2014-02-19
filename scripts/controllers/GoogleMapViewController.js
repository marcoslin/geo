
function GoogleMapViewController(options) { // extends MapViewController
    MapViewController.call(this, options);

    /* Set GoogleMap options */
    var mapOptions = {
        zoom: 15,
    };

    /* Initialize superclass attributes */
    this.map = new google.maps.Map(document.getElementById(options.mapId), mapOptions);
    this.searchInput = document.querySelector('#googleSearch input');

    /* Declare and initialize GoogleMapViewController attributes */
    this.searchBox = new google.maps.places.SearchBox(this.searchInput);

    var self = this;

    /* Listen for the event fired when the user selects an item from the pick list. */
    google.maps.event.addListener(this.searchBox, 'places_changed', function() {
        self.search(self.searchInput.value);
    });

    /* Bias the SearchBox results towards places that are within the bounds of the current map's viewport. */
    google.maps.event.addListener(this.map, 'bounds_changed', function() {
        var bounds = self.map.getBounds();
        self.searchBox.setBounds(bounds);
    });

}

/* GoogleMapViewController extends MapViewController */
JS.extend(GoogleMapViewController, MapViewController);

GoogleMapViewController.prototype = {
    /*
     * showMap
     * Show the map in the specified position
     * @param {Geoposition} position
     */
    showMap: function(position) {
        MapViewController.prototype.showMap.call(this, position);

        var gmPosition;

        if (position) {
            if (position.coords) { // if coords are provided

                /* Keep track of the current position */
                this.currentPosition = position;
            }
            else {
                /* Show a error message */
                alert(position.message);

                /* Set the position argument to a default position provided by the superclass in case of error */
                position = this.errorPosition;
            }
        }
        else {
            /* Show a error message */
            alert("Geolocation API not supported");

            /* Set the position argument to a default position provided by the superclass in case of error */
            position = this.errorPosition;
        }

        /* Calculate the Google Maps position */
        gmPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        /* Add a marker to the specified position */
        new google.maps.Marker({
            position: gmPosition,
            map: this.map,
            title: 'Current position'
        });

        /* Set the center of the map */
        this.map.setCenter(gmPosition);

        /* Display points of interest around the position */
        this.showPOIs(gmPosition);
    },
    /*
     * showPOIs
     * Show the Points Of Interest around the specified position
     * @param {google.maps.LatLng} position
     */
    showPOIs: function(position) {
        MapViewController.prototype.showPOIs.call(this, position);

        /* Retrieve latitude and longitude */
        var plat = position.d;
        var plon = position.e;

        /* Show random positioned markers */
        var self = this;
        for (var i = 0; i < 10; i++) {
            var lon = plon - 0 + (Math.random() * 0.01) - 0.005;
            var lat = plat - 0 + (Math.random() * 0.01) - 0.005;
            var mposition = new google.maps.LatLng(lat, lon);

            var marker = new google.maps.Marker({
                position: mposition,
                map: self.map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                title: 'Hello World!'
            });

            marker.infowindow = new google.maps.InfoWindow();
            marker.content = 'place ' + i;

            google.maps.event.addListener(marker, 'click', function() {
                this.infowindow.setContent(this.content);
                this.infowindow.open(self.map, this);
            });
        }
    },
    /*
     * showPosition
     * Show the specified position on the map
     * @param {google.maps.LatLng} position
     */
    showPosition: function(position) {
        MapViewController.prototype.showPosition.call(this, position);

        /* Calculate the Google Maps position */
        var gmPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        /* Set the center of the map */
        this.map.setCenter(gmPosition);

        /* Cover the case in which the user firstly denied access to location info and accepted in a second time */
        if (this.currentPosition === null) {
            this.showMap(position);
        }
    },
    /*
     * search
     * Perform the search based on the specified query
     * @param {String} query
     */
    search: function(query) {
        MapViewController.prototype.search.call(this, query);

        /* Retrieve the places found and use the first one */
        var places = this.searchBox.getPlaces();
        var place = places[0];

        /* Add a marker on the place found */
        var marker = new google.maps.Marker({
            map: this.map,
            title: place.name,
            position: place.geometry.location
        });

        /* Set the center of the map */
        this.map.setCenter(place.geometry.location);

        /* Display points of interest around the position */
        this.showPOIs(place.geometry.location);

        return false;
    },
    /*
     * handleGeolocationErrors
     * Handles geolocation errors
     * @param {Geoposition} position
     */
    handleGeolocationErrors: function(position) {
        MapViewController.prototype.handleGeolocationErrors.call(this, position);
    }
};

