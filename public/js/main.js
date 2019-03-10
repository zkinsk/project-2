$(document).ready(function(){
  navBarBurgerToggle();

});//end of doc ready


function navBarBurgerToggle(){
  $(".navbar-burger").click(function() {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });
}//end of navbarburgertoggle
