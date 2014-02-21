
function GeolocationViewController() {
    console.log('SearchBoxViewController()');

    /* Initialize DOM objects */
    this.currentPositionButton = document.querySelector('#currentPositionBtn');
    this.enableHighAccuracyInput = document.querySelector('.positionOptions #enableHighAccuracy');
    this.timeoutInput = document.querySelector('.positionOptions #timeout');
    this.maximumAgeInput = document.querySelector('.positionOptions #maximumAge');

    /* Default option values */
    this.defaultEnableHighAccuracy = this.enableHighAccuracyInput.checked; // as configured in the HTML
    this.defaultTimeout = 8000; // 8 seconds
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
        var positionOptions = this.getPositionOptions();

        window.mGeolocationManager.getCurrentPosition(successCallback, errorCallback, positionOptions);
    },
    /*
     * getPositionOptions
     * Return the customized options for the Geolocation API
     * @return {Object} options
     */
    getPositionOptions: function() {
        console.log('GeolocationViewController.getPositionOptions()');
        
        var enableHighAccuracy = this.enableHighAccuracyInput.checked;
        
        var timeout = this.defaultTimeout;
        if (this.timeoutInput.value && this.timeoutInput.value !== "") {
            timeout = this.timeoutInput.value;
        }
        
        var maximumAge = this.defaultMaximumAge;
        if (this.maximumAgeInput.value && this.maximumAgeInput.value !== "") {
            maximumAge = this.maximumAgeInput.value;
        }
        
        var options = {
            enableHighAccuracy: enableHighAccuracy,
            timeout: timeout,
            maximumAge: maximumAge
        };
        
        return options;
    }
};
