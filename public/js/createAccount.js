$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $(".button");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var passwordVerify = $("input#password-check");
  $("#password-check").keyup(checkPasswordMatch);
  $(".modal-background").click(function(){
    $(".modal").toggleClass("is-active");
  });

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("click", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };
    $.get("/api/user/count" + userData.email).then ( function(result){
      console.log(result);
      // if (result)
      if (!userData.email || !userData.password) {
        return;
      }
      else if (passwordInput !== passwordVerify){
        $(".modal").toggleClass("is-active");
      }else{
        // If we have an email and password, run the signUpUser function
        signUpUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val("");
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





