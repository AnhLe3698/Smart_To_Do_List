$(() => {

  $("#register-button-nav").unbind().click(function (event) {
    event.preventDefault();
    let $registerForm = registerForm;
    $("main").empty();
    $("main").append($registerForm);
  });
  $("#login-button-nav").unbind().on("click", function (event) {
    event.preventDefault();
    let $loginForm = loginForm
    $("main").empty();
    $("main").append($loginForm);
  });
  $('#logout-button').unbind().on('click', (event) => {
    event.preventDefault();
    $('ul').empty();
    $("#register-button-nav").css("visibility", "visible");
    $("#login-button-nav").css("visibility", "visible");
    $("#logout-button").css("visibility", "hidden");
    $("#edit-profile-button").css("visibility", "hidden");
    $('.logged-as').text(``);
    const $landingPage = '<img class="landing-page" src="./resources/images/landingLogo.png" alt="">'
    $("main").empty();
    $("main").append($landingPage);
    $.get('/users/logout').done(function (data) {
      const $data = data;
    });
  });
  $('#edit-profile-button').unbind().on("click", function (event) {
    event.preventDefault();
    let $profileForm = profileForm;
    $("main").empty();
    $("main").append($profileForm);
  });
})
