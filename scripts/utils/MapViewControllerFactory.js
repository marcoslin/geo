
var MapViewControllerFactory = {
    /*
     * create
     * Factory method that creates a new MapViewController
     * @param {Object} options
     * @return {MapViewController} object
     */
    create: function(options) {
        var mapClass = OpenStreetMapViewController;

        if (options.mapType === 'openstreetmap') {
            mapClass = OpenStreetMapViewController;
        }
        else if (options.mapType === 'googlemap') {
            mapClass = GoogleMapViewController;
        }
        else if (options.mapType === 'hybridmap') {
            mapClass = HybridMapViewController;
        }

        return new mapClass(options);

    }
};
