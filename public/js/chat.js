var config = {
  apiKey: "AIzaSyA1BX3jB55QNY8OA_lff0fKCgrpgxuP2S0",
  authDomain: "dog-day-chat.firebaseapp.com",
  databaseURL: "https://dog-day-chat.firebaseio.com",
  projectId: "dog-day-chat",
  storageBucket: "dog-day-chat.appspot.com",
  messagingSenderId: "302121490364"
};
firebase.initializeApp(config);
var database = firebase.database();
var chatDB = database.ref("/event/chat");

var myUserName = sessionStorage.getItem("userName");
var myUserId = sessionStorage.getItem("userId");
var eventObject = JSON.parse(sessionStorage.getItem('eventObj'));
// console.log(eventObject);
var currentEvent = `${eventObject.date}&${eventObject.time}&${eventObject.parkId}`;

// when chat form is submitted, push chat text and user data to firebase db
function chat(){
  $("#chatForm").submit(function(event){
      event.preventDefault();
      console.log("click");
      let chatText = $("#chatInput").val()
    //   console.log(chatText);
      if (chatText != ""){
        chatDB.push({
          user: myUserName,
          userId: myUserId,
          event: currentEvent,
          chatTextDB: chatText
        });
      };
      $("#chatInput").val("");
    })
};

// update chat box with chat text as it is send to the database
function chatUpdate(){
    chatDB.orderByChild("event").equalTo(currentEvent).on("child_added", function(chat){
        // console.log(chat)
        let userName = chat.val().user;
        let chatT = chat.val().chatTextDB;
        let currentId = chat.val().userId;
        if (currentId === myUserId){
            var text = $("<p>").text(chatT);
            var message = $("<div>").append(text);
            message.addClass("myChat");
        }else{
            var text = $("<p>").html('<span class="chatName">' + userName + ': </span>' + chatT)
            var message = $("<div>").append(text);
            message.attr({"data-user-id": currentId})
            message.addClass("otherChat");
        }

        $("#chatArea").prepend(message);
    });
};

function buttonActions(){
  $("#chatArea").on("click", ".otherChat", function(){
    let userID = $(this).attr("data-user-id")
    userReview(userID);
  })//end of chatArea Click

  $(".attendee-list").on("click", "li", function(){
    let userID = $(this).attr("data-user-id")
    userReview(userID);
  })//end of user list click

  $("#buttonSwitch").on("click", "#attendeeBtn", function(){
    console.log("User Id: " + myUserId);

    $.post("/api/event/attend", {
      date: eventObject.date,
      time: eventObject.time,
      parkId: eventObject.parkId,
      userId: myUserId
    })//end of post
    .then((response) => {
      console.log(response);
      buttonSwap([{id: myUserId}]);
      addRemoveUser();
    })
  })

  $("#buttonSwitch").on("click", "#attendeeRemove", function(){
    console.log("Remove User");
    $.ajax({
      method: "DELETE",
      url:"/api/event/attend", 
      data: {
      date: eventObject.date,
      time: eventObject.time,
      parkId: eventObject.parkId,
      userId: myUserId
      }
    })//end of delete
    .then((response) => {
      console.log(response);
      console.log("deleted");
      buttonSwap([{id: 0}])
      addRemoveUser("remove");
    })



  });//end of attendeeRemove

}//end of button Actions

function userReview(userID){
    let apiCall = "/api/dog/";
    apiCall += userID;
    $.get(apiCall).then(function(response) {
      console.log(response);
      infoModal(response)
    });

}//end of user review

function infoModal(response){
  let output;
  if (response.length){
    console.log("defined")
    let theirUserName = response[0].User.name;
    $(".modal-card-title").text(theirUserName + " and their dog:")
    response.forEach(dog => {
      let dogDiv = /*html*/`
      <div class="dog-modal-content">
        <div class="clearfix">
        <h2 class="float-left">${dog.name}: &nbsp </h2><p> ${dog.bio}</p>
        </div>
        <p>Gender: ${dog.gender}</p>
        <p>Energy Level: ${dog.energy}</p>
        <p>Patience Level: ${dog.patience}</p>
        <p>Dominance Level: ${dog.dominance}</p>
      </div>
      `
      $(".modal-card-body").append(dogDiv);
    })
  }else{
    console.log("not defined");
    output = "They have no Pets!"
    $(".modal-card-title").text(output)
    $(".modal-card-body").text("Try another User!");
  };
  $("#dogInfoModal").toggleClass("is-active");
}//end of info modal

function checkUser(userArr){
  console.log(userArr);
  let x = false
  userArr.forEach(user =>{
    if (user.id == myUserId){
      x = true
    }
  })
  console.log(x);
  return x
}

function buttonSwap(attending){
  let currentButton;
  if (checkUser(attending)){
    console.log("Your on the list")
    currentButton = `<button class="button" id="attendeeRemove">Remove Your Name</button>`
  }else{
    console.log("youre not on the list");
    currentButton = `<button class="button" id="attendeeBtn">Add Your Name</button>`
  }
  $("#buttonSwitch").html(currentButton)
}

function addRemoveUser (action){
  action === "remove" ?  $(`ul [data-user-id = '${myUserId}']`).remove():
  $(".attendee-list").append(`<li data-user-id="${myUserId}"><h4 class="subtitle is-4">${myUserName}</h4></li>`);
};

$(document).ready(function(){
  chat();
  chatUpdate();
  buttonActions();
  buttonSwap(attending);

//click action for dismissing modal
  $(".modal-background").click(function() {
    $(".modal-card-title, .modal-card-body").empty()
    $("#dogInfoModal").toggleClass("is-active");
  });


})//end of doc.ready



