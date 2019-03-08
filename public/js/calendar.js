

$(document).ready(function(){
  var now = moment().format();
  console.log(now);
  // var calendar = $('#calendar').fullCalendar('getCalendar');
  $(function() {

    $('#calendar').fullCalendar({
      selectable: true,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      dayClick: function(date) {
        alert('clicked ' + date.format());
      },
      
    });
  
  });
});

// $('#calendar').fullCalendar({
//   dayClick: function(date, jsEvent, view) {

//     alert('Clicked on: ' + date.format());

//     alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);

//     alert('Current view: ' + view.name);

//     // change the day's background color just for fun
//     $(this).css('background-color', 'red');

//   }
// });

  
