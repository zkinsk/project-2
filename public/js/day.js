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

function addEventsToList(events) {
  $("#park-list").empty();

  let parkName = null;

  let timeList = null;
  let parkItem = null;
  
  for (const event of events) {
    if (event.Park.name != parkName) {
      parkName = event.Park.name;

      parkItem = $("<li>");
      parkItem.text(parkName);
      $("#park-list").append(parkItem);

      timeList = $("<ul>");
      parkItem.append(timeList);
    }

    const timeItem = $("<li>");

    const timeLink = $("<a>");
    timeLink.attr("href", "/chat/" + event.id);
    timeLink.text(event.time);

    timeItem.append(timeLink);

    timeList.append(timeItem);
  }
}

/** Define an order for the time of day names, since alphabetical doesn't make sense. */
function getTimeSortOrder(time) {
  switch (time) {
    case "Morning":   return 0;
    case "Afternoon": return 1;
    case "Evening":   return 2;
    default:          return 0;
  }
}

/** Sort by park name, then by time of day. */
function sortEvents(events) {
  events.sort((a, b) => {
    if (a.Park.name < b.Park.name) {
      return -1;
    }
    if (a.Park.name > b.Park.name) {
      return 1;
    }
    return getTimeSortOrder(a.time) - getTimeSortOrder(b.time);
  });
}

// This is the entry point callback for when a connection to the google maps API is established.
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
    .then((events) => {
      sortEvents(events);
      addEventsToList(events);
    });
}