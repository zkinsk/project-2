$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("#signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var passwordVerify = $("input#password-check");
  $("#password-check").keyup(checkPasswordMatch);
  $(".modal-background").click(function(){
    $(".modal").toggleClass("is-active");
  });

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim().toLowerCase(),
      password: passwordInput.val().trim(),
      passwordChek: passwordVerify.val().trim()
    };
    console.log(userData.email);
    let userCount = "/api/user/count/";
    userCount += userData.email;
    console.log(userCount);
    $.get(userCount).then ( function(result){
    console.log("searching");
      console.log(result);
      if (result === 1){
        modalAlert("That user already exists!");
      }else{
        if (!userData.email || !userData.password) {
          modalAlert("Please complete user info.");
          return;
        }
        else if (userData.password !== userData.passwordChek){
          modalAlert("Passwords do not match!");
        }else{
          // If we have an email and password, run the signUpUser function
          signUpUser(userData.email, userData.password);
          emailInput.val("");
          passwordInput.val("");
        }

      }
    });//end of async get
  });//end of signup click binding
    

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password
    })
      .then(function(data) {
        window.location.replace(data);
        // eslint-disable-next-line prettier/prettier
      // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
}); //end of doc ready


function checkPasswordMatch() {
  var password = $("#password-input").val();
  var confirmPassword = $("#password-check").val();

  if (password !== confirmPassword){
    $("#divCheckPasswordMatch").html("Passwords do not match!");
  }
  else{
    $("#divCheckPasswordMatch").html("Passwords match.");
  }
}

function modalAlert(text){
  $(".modal h1").html(text + "<br> Please Try Again!");
  $(".modal").toggleClass("is-active");
}





