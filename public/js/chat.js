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

var playerName = "Not You";


// chat functions
function chat(){
  $("#chatButton").click(function(event){
      event.preventDefault();
    //   console.log("click");
      let chatText = $("#chatInput").val()
    //   console.log(chatText);
      if (chatText != ""){
        chatDB.push({
            user: "test user",
            // user: playerName,
            chatTextDB: chatText
          });
      }
      $("#chatInput").val("");
    })
};

// update chat box with chat text as it is send to the database
function chatUpdate(){
    chatDB.on("child_added", function(chat){
        // console.log(chat)
        let userName = chat.val().user;
        let chatT = chat.val().chatTextDB
        if (userName === playerName){
            var text = $("<p>").text(chatT);
            var message = $("<div>").append(text);
            message.addClass("myChat");
        }else{
            var text = $("<p>").html('<span class="chatName">' + userName + ': </span>' + chatT)
            var message = $("<div>").append(text);
            message.addClass("otherChat");
        }

        $("#chatArea").prepend(message);
    });
};

$(document).ready(function(){
  chat();
  chatUpdate();

})