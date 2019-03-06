var userID;
$(document).ready(function(){
  $.get("/api/user_data").then(function(data){
    console.log(data);
    userID = data.user.id;
    console.log("User ID: " + userID);
  });
});

$("#addDogBtn").click(function() {
  $(".modal").toggleClass("is-active");
});

$(".modal-close").click(function() {
  $(".modal").toggleClass("is-active");
});

$("#submitDogBtn").click(function(event){
  event.preventDefault();

  var newDog = {
    name: $("#dogName").val().trim(),
    gender: $("#dogGender").val().trim(),
    weight: $("#dogWeight").val().trim(),
    bio: $("#dogBio").val().trim(),
    energy: $("#dogEnergy").val().trim(),
    patience: $("#dogPatience").val().trim(),
    dominance: $("#dogDominance").val().trim(),
    image: $("#dogImg").val().trim(),
    UserId: userID
  };
  
  $.ajax("/api/dog", {
    type: "POST",
    data: newDog
  }).then(
    function() {
      location.reload();
    });
});
