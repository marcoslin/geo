
function SearchBoxViewController() {
    console.log('GeolocationViewController()');

    /* Initialize DOM objects */
    this.googleSearch = document.querySelector('#googleSearch');
    this.nominatimSearch = document.querySelector('#nominatimSearch');

    var self = this;

    /* Initialize event handlers */
    this.nominatimSearch.querySelector('button').onclick = function() {
        self.search(window.mMapViewController.searchInput.value);
        return false;
    };
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
        this.nominatimSearch.style.display = 'block';
    },
    /*
     * showGoogleSearch
     * Show the Google search UI
     */
    showGoogleSearch: function() {
        console.log('SearchBoxViewController.showGoogleSearch()');
        this.nominatimSearch.style.display = 'none';
        this.googleSearch.style.display = 'block';
    }
};
