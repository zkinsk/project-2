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
      var dogCount = $(
        "<h3 class='subtitle'>Dogs found: " + data.dogs.length + "</h3>"
      );
      var userCount = $(
        "<h3 class='subtitle'>Owners found: " + data.users.length + "</h3>"
      );
      if (data.dogs.length != 0) {
        for (x in data.dogs) {
          var dogResultName = $("<hr><p>Name: " + data.dogs[x].name + "</p>");
          var dogResultGender = $("<p>Gender: " + data.dogs[x].gender + "</p>");
          var dogResultBio = $("<p>Bio: " + data.dogs[x].bio + "</p>");
          var dogResultWeight = $("<p>Weight: " + data.dogs[x].weight + "</p>");
          var dogResultEnergy = $(
            "<p>Energy Level: " + data.dogs[x].energy + "</p>"
          );
          var dogResultPatience = $(
            "<p>Patience Level: " + data.dogs[x].patience + "</p>"
          );
          var dogResultDominance = $(
            "<p>Dominance Level: " + data.dogs[x].dominance + "</p>"
          );
          var dogResultOwner = $("<p>Owner's Name: " + data.dogs[x].User.name + "</p>");
          $("#dogResults").append(dogCount);

          $(dogCount).append(
            dogResultName,
            dogResultGender,
            dogResultBio,
            dogResultWeight,
            dogResultEnergy,
            dogResultPatience,
            dogResultDominance,
            dogResultOwner
          );
        }
      }
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
            var userDogResultEnergy = $(
              "<p>Energy Level: " + data.users[x].Dogs[y].energy + "</p>"
            );
            var userDogResultPatience = $(
              "<p>Patience Level: " + data.users[x].Dogs[y].patience + "</p>"
            );
            var userDogResultDominance = $(
              "<p>Dominance Level: " + data.users[x].Dogs[y].dominance + "</p>"
            );
            $("#userResults").append(userCount);
            $(userCount).append(
              userDogResultName,
              userDogResultGender,
              userDogResultBio,
              userDogResultWeight,
              userDogResultEnergy,
              userDogResultPatience,
              userDogResultDominance
            );
          }
        }
      }
    });
  }
});

$("#searchbutton").click(function() {
  $("#searchModal").toggleClass("is-active");
});

$(".modal-background").click(function() {
  $("#dogResults, #userResults").empty();
  $("#searchModal").toggleClass("is-active");
});
