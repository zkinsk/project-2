$(document).ready(function(){
  var now = moment().format();
  console.log(now);
  $(function() {

    $('#calendar').fullCalendar({
      selectable: true,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month'
      },
      dayClick: function(date) {
        console.log(date.format());
        console.log('clicked ' + date.format());
        date = date.format();
        window.location.href = "/day/" + date;
      },
    });
  });
});
