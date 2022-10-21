////////////////////////////////////////
//////////User Session Management//////
//////////////////////////////////////

// Grabs cookies and parses the string
const getCookie = function (cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

// Alert message
let notLoggedIn = `<div class="alert alert-warning center-content" role="alert">
    Please login
    </div>`;

// Upon each page refresh, the following is executed
$(document).ready(function () {
  $(function () {

    let cookie = getCookie('name');
    cookie = cookie.replace('%40', '@');
    // Displays user email when logged in

    // Upon Refresh the page displays appropriate nav bar icons
    if(cookie) {
      $("#register-button-nav").css("display", "none");
      $("#login-button-nav").css("display", "none");
      $("#logout-button").css("display", "block");
      $('.logged-as').text(`Logged in as: ${cookie}`);
      $('#edit-profile-button').css("display", "block");
    } else {
      $("#register-button-nav").css("display", "block");
      $("#login-button-nav").css("display", "block");
      $("#logout-button").css("display", "none");
      $('.logged-as').text(``);
      $('#edit-profile-button').css("display", "none");
    }

    // Displays the list items upon page refresh
    $.get('/users', (data) => {
      const errorString = 'Not logged in';
      const $data = data;
      if ($data === errorString) {
        //$('main').append($data);
        $('main').prepend(notLoggedIn);
        const $data = data;
        let $landingPage = '<img class="landing-page" src="./resources/images/landingLogo.png" alt="">';
        $("main").append($landingPage);
      } else {
        $('main').append(listForms);
        data.map(item => {
          const $item = listItems(item);
          const category = item.category;
          if (category === 'movie') {
            $('.movie').append($item);
          } else if (category === 'book') {
            $('.books').append($item);
          } else if (category === 'product') {
            $('.products').append($item);
          } else if (category === 'restaurant') {
            $('.restaurant').append($item);
          } else {
            $('.sort').append($item);
          };
        });
      }
    });

  })
});
