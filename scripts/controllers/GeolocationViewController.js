
function GeolocationViewController() {
    console.log('SearchBoxViewController()');

    /* Initialize DOM objects */
    this.currentPositionButton = document.querySelector('#currentPositionBtn');
    this.enableHighAccuracyInput = document.querySelector('.geolocationOptions #enableHighAccuracy');
    this.timeoutInput = document.querySelector('.geolocationOptions #timeout');
    this.maximumAgeInput = document.querySelector('.geolocationOptions #maximumAge');

    /* Default option values */
    this.defaultEnableHighAccuracy = this.enableHighAccuracyInput.checked; // as configured in the HTML
    this.defaultTimeout = 10000; // 10 seconds
    this.defaultMaximumAge = 0; // 0 seconds, no-cache
    
    var self = this;

    this.currentPositionButton.onclick = function() {
        self.showCurrentPosition();

        return false;
    };
}

GeolocationViewController.prototype = {
    /*
     * showCurrentPosition
     * Show the current position on the map
     */
    showCurrentPosition: function() {
        console.log('GeolocationViewController.showCurrentPosition()');

        var successCallback = window.mMapViewController.showPosition.bind(window.mMapViewController);
        var errorCallback = window.mMapViewController.handleGeolocationErrors.bind(window.mMapViewController);
        var options = this.getOptions();

        window.mGeolocationManager.getCurrentPosition(successCallback, errorCallback, options);
    },
    /*
     * getOptions
     * Return the customized options for the Geolocation API
     * @return {Object} options
     */
    getOptions: function() {
        console.log('GeolocationViewController.getOptions()');
        
        var enableHighAccuracy = this.enableHighAccuracyInput.checked;
        
        var timeout = this.defaultTimeout;
        if (this.timeoutInput.value && this.timeoutInput.value !== "") {
            timeout = this.timeoutInput.value * 1000;
        }
        
        var maximumAge = this.defaultMaximumAge;
        if (this.maximumAgeInput.value && this.maximumAgeInput.value !== "") {
            maximumAge = this.maximumAgeInput.value * 1000;
        }
        
        var options = {
            enableHighAccuracy: enableHighAccuracy,
            timeout: timeout,
            maximumAge: maximumAge
        };
        
        return options;
    }
};
