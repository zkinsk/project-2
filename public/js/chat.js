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

var myUserName = localStorage.getItem("userName");
var userId = localStorage.getItem("userId");

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
          userId: userId,
          event: 1,
          chatTextDB: chatText
        });
      };
      $("#chatInput").val("");
    })
};

// update chat box with chat text as it is send to the database
function chatUpdate(){
    chatDB.on("child_added", function(chat){
        // console.log(chat)
        let userName = chat.val().user;
        let chatT = chat.val().chatTextDB;
        let currentId = chat.val().userId;
        if (userName === myUserName){
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

function userReview(){
  $("#chatArea").on("click", ".otherChat", function(){
    let userID = $(this).attr("data-user-id")
    // console.log("User Id: " + userID + " was clicked");
    let apiCall = "/api/dog/";
    apiCall += userID;
    $.get(apiCall).then(function(response) {
      console.log(response);
      infoModal(response)
    });
  })//end of chatArea Click
}//end of user review

function infoModal(response){
  let ouput;
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

$(document).ready(function(){
  chat();
  chatUpdate();
  userReview();
  $(".modal-background").click(function() {
    $(".modal-card-title, .modal-card-body").empty()
    $("#dogInfoModal").toggleClass("is-active");
  });

})//end of doc.ready


