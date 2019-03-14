var userID;
var apiCall;
let uploadTarget = null;

function getUserEvents(userID){
    apiCall = "/api/user/user-events/";
    apiCall += userID;
  console.log(apiCall);
    $.get(apiCall).then(function(response) {
      var x;
      console.log("events response: ", response);
      for (x in response) {
        let parkId = ` data-park-id ="${response[x].parkId}" `;
        let time = ` data-time = "${response[x].time}" `;
        let date = ` data-date = "${response[x].date}" `;
        let eventItem = `
          <div class="dropdown-item" ${parkId} ${time} ${date}>
          <p>${response[x].Park.name} - ${response[x].time} of ${response[x].date}</p>
          </div>
          <hr class="dropdown-divider">
          `;
        $("#userEventsDropdown").append(eventItem);
      }
    });
}//end of get user events

function clickEvents(){

  // click on user event to load specific event page
  $("#userEventsDropdown").on("click", ".dropdown-item", function(){
    console.log("click");
    let eventTime = $(this).attr("data-time");
    let eventDate = $(this).attr("data-date");
    let parkId = $(this).attr("data-park-id");
    let url = `/event/day/${eventDate}/${eventTime}/${parkId}`;
    console.log(url);
    window.location.href = url;
  })
}//end of click events


function bulmaListeners() {
  var dropdown = document.querySelector('.dropdown');
  dropdown.addEventListener('click', function (event) {
    event.stopPropagation();
    dropdown.classList.toggle('is-active');
  });

  $("#dogAddModalBackground").click(function() {
    $("#newDogModal").toggleClass("is-active");
  });

  $("#profileImageModalBackground").click(function() {
    $("#profile-image-modal").toggleClass("is-active");
  });
};//end of bulma listener

function makeMeterElement(faIconName, stat) {
  let result = "";

  for (let i = 0; i < 6; i++) {
    if (i < stat) {
      result += `<span class="meter-block"><i class="fas ${faIconName}"></i></span>`;
    } else {
      result += `<span class="meter-block">-</span>`;
    }
  }

  return $(`<span class="dog-meter">${result}</span>`);
}


$(document).ready(function() {
  //reload page if accessed via back navigation
  if(performance.navigation.type == 2){
    location.reload(true);
  };
 
  clickEvents();
  bulmaListeners();
  

  $.get("/api/user_data")
    .then(function(data) {
      userID = data.user.id;
      getUserEvents(userID);;
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
        
        if (response.profileImage) {
          $("#profile-image").attr("src", response.profileImage);
        }
      });
    })
    .then(function() {
      apiCall = "/api/dog/";
      apiCall += userID;
      $.get(apiCall).then(function(response) {
        console.log("dogs response: ", response);
        var x;
        // loops through results and creates HTML elements for each dog
        for (x in response) {
          var dogNameLevel = $(`<div class="level content">`);
          // name
          var dogName = $(
            "<div class='level-left'><strong class='level-item'>" +
              response[x].name +
              "</strong>"
          );
          // delete button
          var dogDelete = $(
            "<button class='button is-danger is-small is-outlined level-item' id='dogDeleteBtn' data-id=" +
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
          let dogEnergy = $(`<p>Energy Level</p>`);
          const energyMeter = makeMeterElement("fa-bolt", response[x].energy);
          dogEnergy.append(energyMeter);
          // patience
          let dogPatience = $(`<p>Patience Level</p>`);
          const patienceMeter = makeMeterElement("fa-paw", response[x].patience);
          dogPatience.append(patienceMeter);
          // dominance
          let dogDominance = $(`<p>Dominance Level</p>`);
          const dominanceMeter = makeMeterElement("fa-bone", response[x].dominance);
          dogDominance.append(dominanceMeter);
          // picture
          let profileImage = "https://bulma.io/images/placeholders/128x128.png";
          if (response[x].profileImage) {
            profileImage = response[x].profileImage;
          }
          var dogPic = $(
            `<figure class="image is-128x128">
              <img src="${profileImage}">
            </figure>
            <button class="button upload-button" data-upload-target-type="dog" data-upload-target-id="${response[x].id}">Update</button>`
          );
          
          var lineBreak = $("<hr>");
          // main dog "row"
          var dogLevel = $("<div class='columns dogLevel'></div>");
          // left column
          var dogPicColumn = $(
            "<div class='column is-narrow dogPicColumn has-text-centered'></div>"
          );
          // right column
          var dogInfoColumn = $(
            "<div class='column dogInfoColumn'></div>"
          );
          $(dogInfoColumn).prepend(
            dogNameLevel,
            dogBio,
            dogGender,
            dogWeight,
            dogEnergy,
            dogPatience,
            dogDominance
          );
          dogName.append(dogDelete);
          dogNameLevel.append(dogName);
          $(dogPicColumn).prepend(dogPic);
          $(dogLevel).prepend(dogPicColumn, dogInfoColumn);
          $(dogLevel).append(lineBreak);
          $("#dogContent").append(dogLevel);
        }
      });
    })
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
    UserId: userID
  };

  if (
    (newDog.name,
    newDog.gender,
    newDog.weight,
    newDog.bio,
    newDog.energy,
    newDog.patience,
    newDog.dominance)
  ) {
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