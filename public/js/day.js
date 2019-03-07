"use strict";

let infoWindow;
let map;
let service;

function createMarker(place) {
  const marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
  });

  google.maps.event.addListener(marker, "click", function() {
    infoWindow.setContent(place.name);
    infoWindow.open(map, this);
  });
}

function addPlace(name) {
  const request = {
    query: name,
    fields: ["name", "geometry"],
  };

  service.findPlaceFromQuery(request, (results, status) => {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMarker(results[0]);
    }
  });
}

function initMap() {
  map = new google.maps.Map($("#map")[0], {
    center: {lat: 37.5407, lng: -77.4360},
    zoom: 11,
  });

  infoWindow = new google.maps.InfoWindow();

  service = new google.maps.places.PlacesService(map);

  const places = [
    "Barker Field",
    "Rockwood Park",
    "Church Hill Dog Park",
    "Northside Dog Park",
    "Phideaux Dog Park",
  ];

  for (const name of places) {
    addPlace(name);
  }

  $.get("/api/event?date=" + date)
    .then((response) => {
      console.log(response);
    });
}