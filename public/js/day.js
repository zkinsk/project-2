"use strict";

let infoWindow;
let map;

function getUniqueParks(events) {
  const parks = events
    .map(event => event.Park)
    .filter((parkA, index, array) => {
      const foundIndex = array.findIndex((parkB) => {
        return parkA.name === parkB.name;
      });

      return foundIndex === index;
    });

  return parks;
}

function addParksToMap(parks) {
  console.log(parks);

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

function addEventsToList(events) {
  sortEvents(events);

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

// This is the entry point callback for when a connection to the google maps API is established.
function initMap() {
  map = new google.maps.Map($("#map")[0], {
    center: {lat: 37.5407, lng: -77.4360},
    zoom: 11,
  });

  infoWindow = new google.maps.InfoWindow();

  $.get("/api/event?date=" + date)
    .then((events) => {
      addEventsToList(events);

      const parks = getUniqueParks(events);
      addParksToMap(parks);
    });
}