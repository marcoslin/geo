
function MapViewController(options) {
    console.log('MapViewController(options)');
    console.log(options);

    /* Attributes */
    this.map = null;
    this.searchInput = null;
    this.currentPosition = null;
    this.defaultZoom = 15;
    this.defaultPosition = {
        coords: {
            longitude: 12.4830619,
            latitude: 41.8932575
        }
    };
}

MapViewController.prototype = {
    /*
     * showPosition
     * Show the specified position on the map
     * @param {Position|OpenLayers.LonLat} position
     */
    showPosition: function(position) {
        console.log('MapViewController.showPosition(position)');
        console.log(position);
    },
    /*
     * handleGeolocationErrors
     * Handles geolocation errors
     * @param {Position} position
     */
    handleGeolocationErrors: function(positionError) {
        console.log('MapViewController.handleGeolocationErrors(positionError)');
        console.log(positionError);

        if (positionError) {

            /* Show the error message */
            alert(positionError.message);

        }
        else {

            /* Show a error message */
            alert("Geolocation API not supported");

        }
    },
    /*
     * search
     * Perform the search based on the specified query
     * @param {String} query
     */
    search: function(query) {
        console.log('MapViewController.search(query)');
        console.log(query);
    },
    /*
     * showPOIs
     * Show the Points Of Interest around the specified position
     * @param {Position|OpenLayers.LonLat} position
     */
    showPOIs: function(position) {
        console.log('MapViewController.showPOIs(position)');
        console.log(position);
    }
};
