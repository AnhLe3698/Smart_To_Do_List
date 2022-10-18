$(() => {
  $("#register-button-nav").unbind().click(function(event) {
    event.preventDefault();
    let $registerForm = registerForm;
    $("main").empty();
    $("main").append($registerForm);
});
$("#login-button-nav").unbind().on("click", function(event) {
  event.preventDefault();
  let $loginForm = loginForm
  $("main").empty();
  $("main").append($loginForm);
});
$('#logout-button').unbind().on('click', (event) => {
  event.preventDefault();
  $('ul').empty();
  $('.logged-as').text(`Logged in as:`);
  $("#register-button-nav").css("visibility", "visible");
  $("#login-button-nav").css("visibility", "visible");
  $("#logout-button").css("visibility", "hidden");
  $('.logged-as').text(`Logged in as:`);
  $.get('/users/logout').unbind().done(function (data) {
    const $data = data;
  });
});
})
