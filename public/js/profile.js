var userID;
var apiCall;
let pictureUploadRequest = null;

$(document).ready(function() {
  $.get("/api/user_data")
    .then(function(data) {
      userID = data.user.id;
      console.log("Client Side Initial User ID: " + userID);
    })
    .then(function() {
      apiCall = "/api/user/name/";
      apiCall += userID;
      $.get(apiCall).then(function(response) {
        userName = response.name;
        console.log("Display Name: " + userName);
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
        console.log("Client Side API User ID: " + userID);
        var x;
        for (x in response) {
          var dogName = $(
            "<div class='content'><p><strong>" +
              response[x].name +
              "</strong></p>"
          );
          var dogBio = $("<p>" + response[x].bio + "</p>");
          var dogGender = $(
            "<p>" +
              response[x].name +
              "'s Gender: " +
              response[x].gender +
              "</p>"
          );
          var dogWeight = $(
            "<p>" +
              response[x].name +
              "'s Weight: " +
              response[x].weight +
              " lb.</p>"
          );
          var dogEnergy = $(
            "<p>" +
              response[x].name +
              "'s Energy Level: " +
              response[x].energy +
              "</p>"
          );
          var dogPatience = $(
            "<p>" +
              response[x].name +
              "'s Patience Level: " +
              response[x].patience +
              "</p>"
          );
          var dogDominance = $(
            "<p>" +
              response[x].name +
              "'s Dominance Level: " +
              response[x].dominance +
              "</p></div>"
          );
          var dogPic = $(
            "<figure class='image is-128x128 is-inline-block'><img src='https://bulma.io/images/placeholders/128x128.png'/></figure>"
          );
          var lineBreak = $("<hr>");
          var dogLevel = $(
            "<nav class='level dogLevel'></nav>"
          );
          // var dogColumns = $("<div class='columns'></div>")
          var dogInfoColumn = $(
            "<div class='column is-half dogInfoColumn'></div>"
          );
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
          $(dogPicColumn).prepend(dogPic);
          $(dogLevel).prepend(dogInfoColumn, dogPicColumn);
          // $(dogLevel).prepend(dogColumns);
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

$("#picture-upload").submit((event) => {
  event.preventDefault();

  if ($("#pick-file")[0].files.length === 0) {
    return;
  }

  // Prevent submission while uploading by canceling the upload and restarting.
  if (pictureUploadRequest) {
    pictureUploadRequest.abort();
    pictureUploadRequest = null;
  }

  $("#upload-feedback").hide();
  $("#upload-progress").show();

  pictureUploadRequest = $.ajax({
      url: `/api/user/${userID}/profile-image`,
      type: "PATCH",
      data: new FormData(event.currentTarget),
      cache: false,
      contentType: false,
      processData: false,
      xhr: () => {
        const myXhr = $.ajaxSettings.xhr();
        if (myXhr.upload) {
          myXhr.upload.addEventListener("progress", (event) => {
              if (event.lengthComputable) {
                $("#upload-progress").attr({
                  value: event.loaded,
                  max: event.total,
                });
              }
            }, false);
        }
        return myXhr;
      },
    })
    .then((responseJson) => {
      const response = JSON.parse(responseJson);
      $("#profile-image").attr("src", response.profileImage);
      $("#upload-progress").hide();
    })
    .catch((error) => {
      console.error(error);
      $("#upload-feedback").show();
      $("#upload-progress").hide();
    });
});