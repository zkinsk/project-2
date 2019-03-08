"use strict";

// TEST CODE! Remove this!
$(() => {
  $.get("/api/event/date?month=2019-03")
    .then((response) => {
      console.log(response);
    });
});