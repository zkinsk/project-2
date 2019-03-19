
function newAccountButton(){
  $("#createAccount").click(function() {
    window.location.href = "/user/new";
  });
};

function somethingWentWrong(){
  $("#wentWrongModal").toggleClass("is-active");
}

function modalCloseListener(){
  //click action for dismissing modal
  $(".modal-background").click(function() {
    $("#wentWrongModal").toggleClass("is-active");
  });
};


$(document).ready(function() {
  modalCloseListener()
  newAccountButton();

  // Getting references to our form and inputs
  var loginForm = $("#login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input[type='password']");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim().toLowerCase(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    }).then(function(data) {
      window.location.replace(data);
      console.log(data);
      // If there's an error, log the error
    }).catch(function(err) {
      if (err){
        somethingWentWrong();
      }
      console.log(err);
    });
  }
});
