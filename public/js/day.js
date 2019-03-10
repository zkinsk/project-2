"use strict";

let infoWindow;
let map;
let markers = new Map(); // Don't get confused! This is a *hash map* and not a google map.

function addParksToMap(parks) {
  for (const park of parks) {
    const marker = new google.maps.Marker({
      map: map,
      position: new google.maps.LatLng(park.lat, park.lon),
    });

    markers.set(park.id, marker);
  
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

function setUpShowOnMapButtons() {
  $(".show-on-map").click((event) => {
    const button = $(event.currentTarget);
    const parkId = button.data("park-id");
    const marker = markers.get(parkId);
    map.panTo(marker.getPosition());
    google.maps.event.trigger(marker, "click");
  });
}

// This is the entry point callback specified in the script tag for the google maps API.
function initMap() {
  map = new google.maps.Map($("#map")[0], {
    center: {lat: 37.5407, lng: -77.4360},
    zoom: 11,
  });

  infoWindow = new google.maps.InfoWindow();

  addParksToMap(parks);
  setUpShowOnMapButtons();
}

function listItemClick(){
  $("a").click(function(){
    // console.log($(this).text());
    let time = $(this).text();
    let parkId = $(this).parent().parent().attr("park-id-data");
    let date = (window.location.href).split("/day/").slice(-1).toString().replace(/[#]/g, "");
    let eventObj = {
      time: time,
      parkId: parkId,
      date: date,
    }
<<<<<<< HEAD
    sessionStorage.setItem('eventObj', JSON.stringify(eventObj));
    document.location.href = "/event/day/" + date + "/" + time + "/" + parkId;
    console.log(eventObj);
=======
    localStorage.setItem('eventObj', JSON.stringify(eventObj));
    document.location.href = "/event/day/" + date + ":" + time + ":" + parkId;
    console.log(eventObj);
    // $.post("/event/day", eventObj)
    // .then(function(response){
    // })
    // .catch(function(err){
    //   console.log(err)
    // })
>>>>>>> 66e09a7c22ebbf9511cf22987292fa5af0ef3fc8
  })
}

$(document).ready(function(){
  console.log(window.location.href);
  listItemClick();
})
<<<<<<< HEAD
=======

>>>>>>> 66e09a7c22ebbf9511cf22987292fa5af0ef3fc8
