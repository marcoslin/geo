# Geo

Geo is a map locator web application. It let users choose among OpenStreetMap, Google Maps, or an hybrid map that is a Google Map with OpenStreetMap tiles placed on it. 

![Screenshot](https://mdn.mozillademos.org/files/7175/osm-search.png)

Try it [live](http://goo.gl/FVhr5L).

## Notes

The web app uses the Geolocation API to get the current position with the possibility for the user to choose the options (enableHighAccuracy, timeout, maximumAge) by user interface. The demo also provides a search tool that uses the Google Searchbox in the case of Google and Hybrid maps and pure XmlHttpRequests to Nominatim in the case of OpenStreetMap.

This demo is part of [this MDN page](https://developer.mozilla.org/en-US/Apps/Developing/gather_and_modify_data/Plotting_yourself_on_the_map) that explains how to use interactive maps in a Open Web App.

## Contributing

- navigator (watchPosition)
- route
- FxOS installer
- better look&feel
- add tests
- open github issues
