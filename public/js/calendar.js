function calenderCall() {
  $('#calendar').fullCalendar({
    events: response,
    selectable: true,
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month'
    },
    dayClick: function (date) {
      console.log('clicked ' + date.format());
      date = date.format();
      window.location.href = "/day/" + date;
    },
    eventClick: function (calEvent, jsEvent, view) {
      console.log('clicked ', calEvent);
      console.log('clicked ', jsEvent);
      console.log('clicked ', view);
      // date = date.format();
      // window.location.href = "/day/" + date;
    },


  });
}//end of calendar call


// eventClick: function(calEvent, jsEvent, view) {

//   alert('Event: ' + calEvent.title);
//   alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
//   alert('View: ' + view.name);

//   // change the border color just for fun
//   $(this).css('border-color', 'red');

// }
// }

function getCurrentEvents(){
  $.get("/api/event/active-events", (response) => {
    console.log(response);
    response.forEach(obj => {
      obj.title = "Play Date!";
      // obj.allDay = true;
    })
    console.log(response);
    $('#calendar').fullCalendar({
      events: response,
      selectable: true,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month'
      },
      dayClick: function (date) {
        console.log('clicked ' + date.format());
        date = date.format();
        window.location.href = "/day/" + date;
      },
    });
    
  })
}//end of getCurrentEvents

function calendarDates(){

};


$(document).ready(function(){
  var now = moment().format();
  console.log(now);
  // calenderCall();
  getCurrentEvents();
});