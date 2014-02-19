
/* Initialize the web app */
function init() {

    /* Initialize Javascript objects */
    window.mGeolocationManager = new GeolocationManager();
    window.mGeolocationViewController = new GeolocationViewController();
    window.mSearchBoxViewController = new SearchBoxViewController();
    window.mMapSwitcherViewController = new MapSwitcherViewController();
}


/* Call init() when window is loaded */
window.onload = init;
