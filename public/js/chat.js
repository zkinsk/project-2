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
      let chatText = $("#chatInput").val()
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
    $.post("/api/event/attend", {
      date: eventObject.date,
      time: eventObject.time,
      parkId: eventObject.parkId,
      userId: myUserId
    })//end of post
    .then((response) => {
      buttonSwap([{id: myUserId}]);
      addRemoveUser();
    })
  });

  $("#buttonSwitch").on("click", "#attendeeRemove", function(){
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
      buttonSwap([{id: 0}])
      addRemoveUser("remove");
    })



  });//end of attendeeRemove

}//end of button Actions

//user review gets dog and owner info to display in modal on click in chat and attending list
function userReview(userID){
    let apiCall = "/api/dog/";
    apiCall += userID;
    $.get(apiCall).then(function(response) {
      infoModal(response)
    });

}//end of user review

function infoModal(response){
  let output;
  if (response.length){
    let theirUserName = response[0].User.name;
    let pluralisedDog = "dog";
    if (response.length > 1) {
      pluralisedDog = "dogs";
    }
    $("#dogInfoModalTitle").text(`${theirUserName} and their ${pluralisedDog}`);
    response.forEach(dog => {
      let profileImage = "https://bulma.io/images/placeholders/128x128.png";
      if (dog.profileImage) {
        profileImage = dog.profileImage;
      }

      let dogDiv = /*html*/`
      <div class="columns dog-modal-content">
        <div class="column is-narrow">
          <figure class="image is-128x128">
            <img src="${profileImage}" alt="">
          </figure>
        </div>
        
        <div class="column">
          <h2>${dog.name}</h2>
          <p>${dog.bio}</p>
          <p>Gender: ${dog.gender}</p>
        </div>

        <div class="column">
          <p>Energy Level: ${dog.energy}</p>
          <p>Patience Level: ${dog.patience}</p>
          <p>Dominance Level: ${dog.dominance}</p>
        </div>
      </div>
      `
      $("#dogInfoModalBody").append(dogDiv);
    })
  }else{
    output = "They have no Pets!";
    $("#dogInfoModalTitle").text(output);
    $("#dogInfoModalBody").text("Try another User!");
  };
  $("#dogInfoModal").toggleClass("is-active");
}//end of info modal

//checks to see if the user is in the current list of attendees
function checkUser(userArr){
  let x = false
  userArr.forEach(user =>{
    if (user.id == myUserId){
      x = true
    }
  })
  return x
}

//swaps the add and remove button type based on whether or not the user is attending the current event
function buttonSwap(attending){
  let currentButton;
  if (checkUser(attending)){
    // console.log("Your on the list")
    currentButton = /*html*/`
      <button class="button is-danger is-small is-rounded tooltip is-tooltip-danger is-tooltip-bottom" 
      data-tooltip="Remove Your Name" 
      id="attendeeRemove">
      <i class="fas fa-minus"></i>
      </button>
    `;
  }else{
    // console.log("youre not on the list");
    currentButton = /*html*/`
      <button class="button is-primary is-small is-rounded tooltip is-tooltip-primary is-tooltip-bottom" 
      data-tooltip="Add Your Name" 
      id="attendeeBtn">
      <i class="fas fa-plus"></i>
      </button>
    `;
  }
  $("#buttonSwitch").html(currentButton)
}

//adds and removes user from attendees list based on whether or not they are attending the event
function addRemoveUser (action){
  action === "remove" ?  $(`ul [data-user-id = '${myUserId}']`).remove():
  $(".attendee-list").append(`<li data-user-id="${myUserId}"><h4 class="subtitle is-4">${myUserName}</h4></li>`);
};//end of addRemoveUser

//updates the page title based on current event Time, Date and Park
function updatePageTitle(){
let parkName = eventObject.parkName;
console.log(formatedDate);
let formatedInfo = formatDate(formatedDate);
let title = `
${parkName}<br>
${formatedInfo}
`;
$("#eventTitle").html(title);
}//end of updatePageTitle


//re-formats the date to insert he time "word" into the phrase
function formatDate(date){
  let x = date.indexOf(",");
  let day = date.slice(0, x) + ` ${eventObject.time}</br>${date.slice(x+1, date.legth)}`
  return day
};

$(document).ready(function(){
  chat();
  chatUpdate();
  buttonActions();
  buttonSwap(attending);
  updatePageTitle();
  // console.log(attending);

//click action for dismissing modal
  $("#dogInfoModalBackground").click(function() {
    $("#dogInfoModalBody, #dogInfoModalTitle").empty();
    $("#dogInfoModal").toggleClass("is-active");
  });


})//end of doc.ready



