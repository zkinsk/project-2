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
$("#searchbuttonmodal").on("click", function(event) {
  $("#dogContainer").remove();
  $("#userContainer").remove();
  $("#noUsers").remove();
  $("#noDogs").remove();
  console.log("clicked");
  var input = $("#searchinput").val();
  if (input === "") {
  } else {
    console.log(input);
    $.ajax("/api/search/" + input, {
      type: "GET"
    }).then(function(data) {
      console.log(data);
      // starts dog section if dog results

      // starts user section if user results

      // if dogs results, pushes dog info to dog section
      if (data.dogs.length != 0) {
        var dogCount = $(
          "<h3 class='subtitle'>Dogs found: " + data.dogs.length + "</h3>"
        );
        var dogContainer = $("<div id='dogContainer'></div>");
        for (x in data.dogs) {
          var dogColumns = $("<hr><div class='columns' id='dogColumns'></div>");
          var dogLeftColumn = $("<div class='column is-narrow'></div>");
          var dogMiddleColumn = $("<div class='column'></div>");
          var dogRightColumn = $("<div class='column'></div>");
          var dogResultName = $("<p>Name: " + data.dogs[x].name + "</p>");
          var dogResultGender = $("<p>Gender: " + data.dogs[x].gender + "</p>");
          var dogResultBio = $("<p>Bio: " + data.dogs[x].bio + "</p>");
          var dogResultWeight = $("<p>Weight: " + data.dogs[x].weight + "</p>");
          let dogResultEnergy = $(`<p>Energy Level</p>`);
          const energyMeter = makeMeterElement("fa-bolt", data.dogs[x].energy);
          dogResultEnergy.append(energyMeter);
          // patience
          let dogResultPatience = $(`<p>Patience Level</p>`);
          const patienceMeter = makeMeterElement(
            "fa-paw",
            data.dogs[x].patience
          );
          dogResultPatience.append(patienceMeter);
          // dominance
          let dogResultDominance = $(`<p>Dominance Level</p>`);
          const dominanceMeter = makeMeterElement(
            "fa-bone",
            data.dogs[x].dominance
          );
          dogResultDominance.append(dominanceMeter);
          var dogResultOwner = $(
            "<p>Owner's Name: " + data.dogs[x].User.name + "</p>"
          );
          let profileImage = "https://bulma.io/images/placeholders/128x128.png";
          if (data.dogs[x].profileImage) {
            profileImage = data.dogs[x].profileImage;
          }
          var dogResultPic = $(
            `<figure class="image is-128x128">
              <img src="${profileImage}">
            </figure>`
          );
          $(dogLeftColumn).append(dogResultPic);
          $(dogMiddleColumn).append(
            dogResultName,
            dogResultGender,
            dogResultBio
          );
          $(dogRightColumn).append(
            dogResultWeight,
            dogResultEnergy,
            dogResultPatience,
            dogResultDominance,
            dogResultOwner
          );
          $(dogColumns).append(dogLeftColumn, dogMiddleColumn, dogRightColumn);
          $(dogContainer).append(dogColumns);
          $(dogContainer).prepend(dogCount);
        }
        $("#searchModalBody").append(dogContainer);
      } else {
        var noDogs = $(
          "<h4 class='subtitle' id='noDogs'>Dogs found: " +
            data.dogs.length +
            "</h4>"
        );
        $("#searchModalBody").append(noDogs);
      }
      // if user results, pushes user info to user section
      if (data.users.length != 0) {
        console.log("now users");

        var userContainer = $("<div id='userContainer'></div>");
        var userCount = $(
          "<h3 class='subtitle'>Users found: " + data.users.length + "</h3>"
        );

        for (x in data.users) {
          var userResultName = $("<hr><p>User's Name: " + data.users[x].name + "</p>");
          var userResultDogs = $("<p>" + data.users[x].name + "'s dogs: </p>");
          for (y in data.users[x].Dogs) {
            var userColumns = $("<div class='columns' id='userColumns'></div>");
            var userLeftColumn = $("<div class='column is-narrow'></div>");
            var userMiddleColumn = $("<div class='column'</div>");
            var userRightColumn = $("<div class='column'</div>");
            var userDogResultName = $(
              "<p>Name: " + data.users[x].Dogs[y].name + "</p>"
            );
            var userDogResultGender = $(
              "<p>Gender: " + data.users[x].Dogs[y].gender + "</p>"
            );
            var userDogResultBio = $(
              "<p>Bio: " + data.users[x].Dogs[y].bio + "</p>"
            );
            var userDogResultWeight = $(
              "<p>Weight: " + data.users[x].Dogs[y].weight + "</p>"
            );

            let userDogResultEnergy = $(`<p>Energy Level</p>`);
            const energyMeter = makeMeterElement(
              "fa-bolt",
              data.users[x].Dogs[y].energy
            );
            userDogResultEnergy.append(energyMeter);
            // patience
            let userDogResultPatience = $(`<p>Patience Level</p>`);
            const patienceMeter = makeMeterElement(
              "fa-paw",
              data.users[x].Dogs[y].patience
            );
            userDogResultPatience.append(patienceMeter);
            // dominance
            let userDogResultDominance = $(`<p>Dominance Level</p>`);
            const dominanceMeter = makeMeterElement(
              "fa-bone",
              data.users[x].Dogs[y].dominance
            );
            userDogResultDominance.append(dominanceMeter);
            let profileImage =
              "https://bulma.io/images/placeholders/128x128.png";
            if (data.users[x].Dogs[y].profileImage) {
              profileImage = data.users[x].Dogs[y].profileImage;
            }
            var userDogResultPic = $(
              `<figure class="image is-128x128">
              <img src="${profileImage}">
            </figure>`
            );
            $(userLeftColumn).append(userDogResultPic);
            $(userMiddleColumn).append(
              userDogResultName,
              userDogResultGender,
              userDogResultBio
            );
            $(userRightColumn).append(
              userDogResultWeight,
              userDogResultEnergy,
              userDogResultPatience,
              userDogResultDominance
            );
            $(userColumns).append(
              userLeftColumn,
              userMiddleColumn,
              userRightColumn
            );
            $(userContainer).append(userColumns);
          }
        }
        $(userContainer).prepend(userCount);
        $(userCount).after(userResultName, userResultDogs);
        $("#searchModalBody").append(userContainer);
      } else {
        var noUsers = $(
          "<h4 class='subtitle' id='noUsers'>Users found: " +
            data.users.length +
            "</h4>"
        );
        $("#searchModalBody").append(noUsers);
      }
      //Display message if no dogs were found.

      if (data.dogs.length === 0) {
      }
    });
  }
});

$("#searchbutton").click(function() {
  $("#searchModal").toggleClass("is-active");
});

$("#search-modal-background").click(function() {
  $("#dogContainer").remove();
  $("#userContainer").remove();
  $("#noUsers").remove();
  $("#noDogs").remove();
  $("#searchModal").toggleClass("is-active");
});
