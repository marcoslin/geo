
function GeolocationManager() {
    console.log('GeolocationManager()');

    /* Initialize the geolocation object */
    this.geolocation = navigator.geolocation;
}

GeolocationManager.prototype = {
    /*
     * getCurrentPosition
     * Gets the current position of the device
     * @param {Function} successCallback
     * @param {Function} errorCallback
     * @param {Object} options
     */
    getCurrentPosition: function(successCallback, errorCallback, options) {
        console.log('GeolocationManager.getCurrentPosition(successCallback, errorCallback, options)');
        console.log(successCallback);
        console.log(errorCallback);
        console.log(options);
        
        /* If the geolocation object exists in navigator, get the current position of the device */
        if (this.geolocation) {
            this.geolocation.getCurrentPosition(successCallback, errorCallback, options);
        }
        else { // if the geolocation API is not supported
            errorCallback();
        }
    }

};
