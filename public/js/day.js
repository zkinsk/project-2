"use strict";

let infoWindow;
let map;

function addParksToMap(parks) {
  for (const park of parks) {
    const marker = new google.maps.Marker({
      map: map,
      position: new google.maps.LatLng(park.lat, park.lon),
    });
  
    google.maps.event.addListener(marker, "click", function() {
      const coordinates = encodeURIComponent(park.lat + "," + park.lon);
      const directionsLink = "https://www.google.com/maps/dir/?api=1&destination=" + coordinates;

      const content = "<h1>" + park.name + "</h1>"
        + "<a href=\"" + directionsLink + "\">Get Directions</a>";

      infoWindow.setContent(content);
      infoWindow.open(map, this);
    });
  }
}

// This is the entry point callback for when a connection to the google maps API is established.
function initMap() {
  map = new google.maps.Map($("#map")[0], {
    center: {lat: 37.5407, lng: -77.4360},
    zoom: 11,
  });

  infoWindow = new google.maps.InfoWindow();

  addParksToMap(parks);
}