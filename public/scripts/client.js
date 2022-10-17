$(() => {
  $("#register-button-nav").click(function(event) {
    event.preventDefault();
    let $registerForm = registerForm;
    $("main").empty();
    $("main").append($registerForm);
});
$("#login-button-nav").on("click", function () {
  event.preventDefault();
  let $loginForm = loginForm
  $("main").empty();
  $("main").append(loginForm);
});
$('#logout-button').on('click', (event) => {
  event.preventDefault();
  $('ul').empty();
  $.get('/users/logout').done(function (data) {
    const $data = data;
  });
});
})
