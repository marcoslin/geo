
function SearchBoxViewController() {
    console.log('GeolocationViewController()');

    /* Initialize DOM objects */
    this.nominatimSearch = document.querySelector('#nominatimSearch');
    this.googleSearch = document.querySelector('#googleSearch');
    this.hybridSearch = document.querySelector('#hybridSearch');
}

SearchBoxViewController.prototype = {
    /*
     * search
     * Submit the query to the search engine of the map displayed and show the search results on the map
     * @param {String} query
     */
    search: function(query) {
        console.log('SearchBoxViewController.search(' + query + ')');

        /* Perform the search if a query is specified */
        if (query) {
            window.mMapViewController.search(query);
        }
        else { 
            alert("Please insert a address");
        }
    },
    /*
     * showNominatimSearch
     * Show the nominatim search UI
     */
    showNominatimSearch: function() {
        console.log('SearchBoxViewController.showNominatimSearch()');
        this.googleSearch.style.display = 'none';
        this.hybridSearch.style.display = 'none';
        this.nominatimSearch.style.display = 'block';
    },
    /*
     * showGoogleSearch
     * Show the Google search UI
     */
    showGoogleSearch: function() {
        console.log('SearchBoxViewController.showGoogleSearch()');
        this.nominatimSearch.style.display = 'none';
        this.hybridSearch.style.display = 'none';
        this.googleSearch.style.display = 'block';
    },
    /*
     * showGoogleSearch
     * Show the Google search UI
     */
    showHybridSearch: function() {
        console.log('SearchBoxViewController.showHybridSearch()');
        this.nominatimSearch.style.display = 'none';
        this.googleSearch.style.display = 'none';
        this.hybridSearch.style.display = 'block';
    }
};
