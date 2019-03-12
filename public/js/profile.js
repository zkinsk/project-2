var userID;
var apiCall;
let uploadTarget = null;

$(document).ready(function() {
  $.get("/api/user_data")
    .then(function(data) {
      userID = data.user.id;
    })
    .then(function() {
      apiCall = "/api/user/";
      apiCall += userID;
      $.get(apiCall).then(function(response) {
        let userName = response.name;
        sessionStorage.setItem("userName", userName);
        sessionStorage.setItem("userId", userID);
        var nameField = $(
          `<input class="input" type="text" placeholder="${userName}" id="nameInput"></input>`
        );
        $("#nameControl").prepend(nameField);
        $("#profile-image").attr("src", response.profileImage);
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
          let profileImage = "https://bulma.io/images/placeholders/128x128.png";
          if (response[x].profileImage) {
            profileImage = response[x].profileImage;
          }
          var dogPic = $(
            `<figure class="image is-128x128 is-inline-block">
              <img src="${profileImage}">
              <button class="button upload-button" data-upload-target-type="dog" data-upload-target-id="${response[x].id}">Change</button>
            </figure>`
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
  $("#newDogModal").toggleClass("is-active");
});

$(".modal-close").click((event) => {
  $(".modal").removeClass("is-active");
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

  if (newDog.name, newDog.gender, newDog.weight, newDog.bio, newDog.energy, newDog.patience, newDog.dominance, newDog.image) {
    $.ajax("/api/dog", {
      type: "POST",
      data: newDog
    }).then(function() {
      location.reload();
    });
  } else {
    alert("Please fill out the entire form.");
  }
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

$(document).on("click", ".upload-button", (event) => {
  const button = $(event.currentTarget);

  uploadTarget = {
    type: button.data("upload-target-type"),
    id: button.data("upload-target-id"),
  };

  $("#pick-file").val(null);
  $("#pick-file-name").text("");
  $("#upload-feedback").hide();

  $("#profile-image-modal").toggleClass("is-active");
});

$("#pick-file").change((event) => {
  const input = event.currentTarget;
  if (input.files.length > 0) {
    $("#pick-file-name").text(input.files[0].name);
  } else {
    $("#pick-file-name").text("");
  }
});

$("#picture-upload").submit((event) => {
  event.preventDefault();

  if ($("#pick-file")[0].files.length === 0) {
    return;
  }

  $("#upload-feedback").hide();
  $("#upload-progress").show();

  let apiUrl;
  switch (uploadTarget.type) {
    case "user":
      apiUrl = `/api/user/${userID}/profile-image`;
      break;

    case "dog":
      apiUrl = `/api/dog/${uploadTarget.id}/profile-image`;
      break;
  }

  $.ajax({
      url: apiUrl,
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
      location.reload();
    })
    .catch((error) => {
      console.error(error);
      $("#upload-feedback").show();
      $("#upload-progress").hide();
    });
});