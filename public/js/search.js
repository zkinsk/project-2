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
  $("#dogResults, #userResults").empty();
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
      var dogCount = $(
        "<h3 class='subtitle'>Dogs found: " + data.dogs.length + "</h3>"
      );
      // starts user section if user results
      var userCount = $(
        "<h3 class='subtitle'>Owners found: " + data.users.length + "</h3>"
      );
      // if dogs results, pushes dog info to dog section
      if (data.dogs.length != 0) {
        for (x in data.dogs) {
          var dogResultName = $("<hr><p>Name: " + data.dogs[x].name + "</p>");
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
          $("#dogResults").append(dogCount);
          let profileImage = "https://bulma.io/images/placeholders/128x128.png";
          if (data.dogs[x].profileImage) {
            profileImage = data.dogs[x].profileImage;
          }
          var dogResultPic = $(
            `<figure class="image is-128x128">
              <img src="${profileImage}">
            </figure>`
          );

          $(dogCount).append(
            dogResultName,
            dogResultGender,
            dogResultBio,
            dogResultWeight,
            dogResultEnergy,
            dogResultPatience,
            dogResultDominance,
            dogResultOwner,
            dogResultPic
          );
        }
      }
      // if user results, pushes user info to user section
      if (data.users.length != 0) {
        for (x in data.users) {
          var userResultName = $("<hr><p>Name: " + data.users[x].name + "</p>");
          var userResultDogs = $("<p>" + data.users[x].name + "'s dogs: </p>");
          $(userCount).append(userResultName, userResultDogs);
          for (y in data.users[x].Dogs) {
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
          const energyMeter = makeMeterElement("fa-bolt", data.users[x].Dogs[y].energy);
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
          let profileImage = "https://bulma.io/images/placeholders/128x128.png";
          if (data.users[x].Dogs[y].profileImage) {
            profileImage = data.users[x].Dogs[y].profileImage;
          }
          var userDogResultPic = $(
            `<figure class="image is-128x128">
              <img src="${profileImage}">
            </figure>`
          );
          userDogResultDominance.append(dominanceMeter);
            $("#userResults").append(userCount);
            $(userCount).append(
              userDogResultName,
              userDogResultGender,
              userDogResultBio,
              userDogResultWeight,
              userDogResultEnergy,
              userDogResultPatience,
              userDogResultDominance,
              userDogResultPic
            );
          }
        }
      }
      //Display message if no dogs were found.
      var noDogs = $(
        "<h4 class='subtitle'>Dogs found: " + data.dogs.length + "</h4>"
      );
      if (data.dogs.length === 0) {
        $("#dogResults").append(noDogs);
      }
      // Display message if no users were found.
      var noUsers = $(
        "<h4 class='subtitle'>Users found: " + data.dogs.length + "</h4>"
      );
      if (data.users.length === 0) {
        $("#userResults").append(noUsers);
      }
    });
  }
});

$("#searchbutton").click(function() {
  $("#searchModal").toggleClass("is-active");
});

$("#searchModalBackground").click(function() {
  $("#dogResults, #userResults").empty();
  $("#searchModal").toggleClass("is-active");
});
