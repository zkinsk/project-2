var userID;
var apiCall;

$(document).ready(function() {
  $.get("/api/user_data")
    .then(function(data) {
      userID = data.user.id;
    })
    .then(function() {
      apiCall = "/api/user/name/";
      apiCall += userID;
      $.get(apiCall).then(function(response) {
        let userName = response.name;
        localStorage.setItem("userName", userName);
        localStorage.setItem("userId", userID);
        var nameField = $(
          `<input class="input" type="text" placeholder="${userName}" id="nameInput"></input>`
        );
        $("#nameControl").prepend(nameField);
      });
    })
    .then(function() {
      apiCall = "/api/dog/";
      apiCall += userID;
      $.get(apiCall).then(function(response) {
        console.log(response);
        var x;
        // loops through results and creates HTML elements for each dog
        for (x in response) {
          // name
          var dogName = $(
            "<div class='content'><p class='is-pulled-left'><strong>" +
              response[x].name +
              "</strong></p>"
          );
          // delete button
          var dogDelete = $(
            "<button class='button is-danger is-small is-outlined' id='dogDeleteBtn' data-id=" +
              response[x].id +
              ">Delete</button>"
          );
          // bio
          var dogBio = $("<p>" + response[x].bio + "</p>");
          // gender
          var dogGender = $(
            "<p>" +
              response[x].name +
              "'s Gender: " +
              response[x].gender +
              "</p>"
          );
          // weight
          var dogWeight = $(
            "<p>" +
              response[x].name +
              "'s Weight: " +
              response[x].weight +
              " lb.</p>"
          );
          // energy
          var dogEnergy = $(
            "<p>" +
              response[x].name +
              "'s Energy Level: " +
              response[x].energy +
              "</p>"
          );
          // patience
          var dogPatience = $(
            "<p>" +
              response[x].name +
              "'s Patience Level: " +
              response[x].patience +
              "</p>"
          );
          // dominance
          var dogDominance = $(
            "<p>" +
              response[x].name +
              "'s Dominance Level: " +
              response[x].dominance +
              "</p></div>"
          );
          // picture
          var dogPic = $(
            "<figure class='image is-128x128 is-inline-block'><img src='https://bulma.io/images/placeholders/128x128.png'/></figure>"
          );
          var lineBreak = $("<hr>");
          // main dog "row"
          var dogLevel = $("<nav class='level dogLevel'></nav>");
          // left column
          var dogInfoColumn = $(
            "<div class='column is-half dogInfoColumn'></div>"
          );
          // right column
          var dogPicColumn = $(
            "<div class='column is-half has-text-centered dogPicColumn'></div>"
          );
          $(dogInfoColumn).prepend(
            dogName,
            dogBio,
            dogGender,
            dogWeight,
            dogEnergy,
            dogPatience,
            dogDominance
          );
          $(dogName).append(dogDelete);
          $(dogPicColumn).prepend(dogPic);
          $(dogLevel).prepend(dogInfoColumn, dogPicColumn);
          $(dogLevel).append(lineBreak);
          $("#dogContent").append(dogLevel);
        }
      });
    });
});

$("#addDogBtn").click(function() {
  $(".modal").toggleClass("is-active");
});

$(".modal-close").click(function() {
  $(".modal").toggleClass("is-active");
});

$("#submitDogBtn").click(function(event) {
  event.preventDefault();

  var newDog = {
    name: $("#dogName")
      .val()
      .trim(),
    gender: $("#dogGender")
      .val()
      .trim(),
    weight: $("#dogWeight")
      .val()
      .trim(),
    bio: $("#dogBio")
      .val()
      .trim(),
    energy: $("#dogEnergy")
      .val()
      .trim(),
    patience: $("#dogPatience")
      .val()
      .trim(),
    dominance: $("#dogDominance")
      .val()
      .trim(),
    image: $("#dogImg")
      .val()
      .trim(),
    UserId: userID
  };

  $.ajax("/api/dog", {
    type: "POST",
    data: newDog
  }).then(function() {
    location.reload();
  });
});

$(document).on("click", "#dogDeleteBtn", function() {
  var toDelete = $(this).data("id");
  var apiURL = "/api/dog/";
  apiURL += toDelete;
  $.ajax({
    url: apiURL,
    method: "DELETE"
  }).then(function() {
    location.reload();
  });
});

$("#nameBtn").click(function() {
  var newName = $("#nameInput")
    .val()
    .trim();
  var apiURL = "/api/user/name/";
  apiURL += userID;

  $.ajax({
    url: apiURL,
    method: "PUT",
    data: { name: newName }
  }).then(function() {
    location.reload();
  });
});
