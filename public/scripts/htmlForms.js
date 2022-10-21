const listItems = function (items) {
  let joinString = items.name.replaceAll(' ', '');
  let markup = `
  <form>
    <li class="zzone list-group" id="${joinString}"><div>${items.name}</div>
      <button id="delete-item${joinString}" type="button" class="btn btn-danger">X</button>
    </li>

  </form>
    <script>
      $("#${joinString}").draggable();
      $('#delete-item${joinString}').click(function(event){
        event.preventDefault();
        let varName = $(this).parent().parent().children('#${joinString}').children('div').text().trim() + '';
        let urlStr = '/users/delete/' + varName;
        const errorString = 'Invalid item';
        if (varName !== 0) {
          $.post(urlStr).done(function (data) {
            const $data = data;
            if ($data === errorString) {
              $('main').append($data);
            } else {
              $('main').prepend($data);
              $( "#${joinString}").remove();
            }
          });
        }
      });
    </script>
     `;
  return markup;
}

let invalidEmailAlert = `<div class="alert alert-warning center-content" role="alert">Invalid Email</div>`;

const loginForm = `
    <div class="custom-centered-container">
      <h3>Login</h3>
      <form id="logging-in" action="/login" method="POST">
        <div class="form-group">
          <label for="email">Email address</label>
          <input class="form-control" type="email" name="email" placeholder="Enter email" style="width: 300px" required>
        </div>
        <button type="submit" class="btn default-button">Login</button>
      </form>
      </div>
      <script>
      $('#logging-in').unbind().submit((event) => {
        event.preventDefault();
        const formData = new FormData(document.querySelector('#logging-in'))
        const errorString = 'Invalid email';
        $('ul').empty();
        $.post('/users/login', { email: formData.get('email') }).done(function (data) {
          // Data we get back from the server
          const $data = data;
          if ($data === errorString) {
            $("#register-button-nav").css("visibility", "visible");
            $("#login-button-nav").css("visibility", "visible");
            $("#logout-button").css("visibility", "hidden");
            $("#edit-profile-button").css("visibility", "hidden");
            let alert = $(invalidEmailAlert);
                $('main').prepend(alert);
                setTimeout(function () {
                  alert.fadeOut(3000);
                }, 2000);
          } else {
            let cookie = getCookie('name');
            cookie = cookie.replace('%40', '@');
            // Displays user email when logged in
            if(cookie) {
              $("#register-button-nav").css("visibility", "hidden");
              $("#login-button-nav").css("visibility", "hidden");
              $("#logout-button").css("visibility", "visible");
              $('.logged-as').text('Logged in as: '+ cookie);
              $("#edit-profile-button").css("visibility", "visible");
            } else {
              $('.logged-as').text('Logged in as:');
            }
            $('main').empty();
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
      });
      </script>
    `;
// Prepend the alert when an item already exists on the list
let existsAlert = `<div class="alert alert-warning center-content" role="alert">
Sorry, that item already exists!
</div>`;

// Creates the list items
let listForms = `
      <form id="add-item2" class="form-inline item-search">
        <div class="add-item form-group">
          <!-- <label for="name">Enter item name</label> --!>
          <input class="form-control form-control-lg" type="text" name="name" placeholder="Enter item name" style="width: 300px; height: 50px; font-size: 20px">
        <button type="submit" class="btn default-button" style="height: 50px; width: 50px; font-size: 25px;
        ">+</button>
        </div>
      </form>
      <script>
        $('#add-item2').unbind().submit((event) => {
          event.preventDefault();
          const formData = new FormData(document.querySelector('#add-item2'))
          const errorString = 'Sorry item already exists';
          let name = formData.get('name');
          let category = formData.get('category');
          if (name.length !== 0) {
            $.post('/users/add', { 'name': name }).done(function (data) {
              const $data = data;
              if ($data === errorString) {
                // $('main').append($data);
                let alert = $(existsAlert);
                $('main').prepend(alert);
                setTimeout(function () {
                  alert.fadeOut(500);
                }, 2000);
              } else {
                if (data.category === 'movie') {
                  $('.movie').append(listItems($data));
                } else if (data.category === 'book') {
                  $('.books').append(listItems($data));
                } else if (data.category === 'product') {
                  $('.products').append(listItems($data));
                } else if (data.category === 'restaurant') {
                  $('.restaurant').append(listItems($data));
                } else {
                  $('.sort').append(listItems($data));
                };
              }
            });
          }
        });
      </script>

      <section class="toDoListBox box">
        <section class="toWatch toDoBox box">
          <header class="toDoHeader">To Watch Section</header>
          <section>
            <ul id="movie" class="list-group movie"

            >
          </section>
        </section>


        <section class="toEat toDoBox box">
          <header class="toDoHeader">To Eat Section</header>
          <section class="list-container" >
            <ul id="restaurant" class="list-group restaurant"

            >
            </ul>
          </section>
        </section>

        <section class="toRead toDoBox box">
          <header class="toDoHeader">To Read Section</header>
          <section >
            <ul id="books" class="list-group books"

            >
            </ul>
          </section>
        </section>

        <section class="toBuy toDoBox box">
          <header class="toDoHeader">To Buy Section</header>
          <section >
            <ul id="products" class="list-group products"

            >
            </ul>
          </section>
        </section>

        <section class="toSort toDoBox box">
          <header class="toDoHeader">Need Sorting</header>
          <section >
            <ul id="sort" class="list-group sort"

            >
            </ul>
          </section>
        </section>

      </section>
      <script>
      $("#movie").droppable({
        drop: function(event, ui) {
          let itemName = $(ui.draggable).text().trim();
          itemName = itemName.substring(0, itemName.length - 1).trim();
          $.post('/users/recat', { 'name': itemName, 'category':  'movie'}).done(function (res) {
            $.get('/users', (data) => {
              const $data = data;
              $('main').empty();
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
            });
          })
        },
        over: function(event, ui) {
            $(this).css('background', 'orange');
        },
        out: function(event, ui) {
            $(this).css('background', 'cyan');
        }
      });
      $("#books").droppable({
        drop: function(event, ui) {
          let itemName = $(ui.draggable).text().trim();
          itemName = itemName.substring(0, itemName.length - 1).trim();
          $.post('/users/recat', { 'name': itemName, 'category':  'book'}).done(function (res) {
            $.get('/users', (data) => {
              const $data = data;
              $('main').empty();
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
            });
          })
        },
        over: function(event, ui) {
            $(this).css('background', 'orange');
        },
        out: function(event, ui) {
            $(this).css('background', 'cyan');
        }
      });
      $("#restaurant").droppable({
        drop: function(event, ui) {
          let itemName = $(ui.draggable).text().trim();
          itemName = itemName.substring(0, itemName.length - 1).trim();
          $.post('/users/recat', { 'name': itemName, 'category':  'restaurant'}).done(function (res) {
            $.get('/users', (data) => {
              const $data = data;
              $('main').empty();
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
            });
          })
        },
        over: function(event, ui) {
            $(this).css('background', 'orange');
        },
        out: function(event, ui) {
            $(this).css('background', 'cyan');
        }
      });
      $("#products").droppable({
        drop: function(event, ui) {
          let itemName = $(ui.draggable).text().trim();
          itemName = itemName.substring(0, itemName.length - 1).trim();
          $.post('/users/recat', { 'name': itemName, 'category':  'product'}).done(function (res) {
            $.get('/users', (data) => {
              const $data = data;
              $('main').empty();
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
            });
          })
        },
        over: function(event, ui) {
            $(this).css('background', 'orange');
        },
        out: function(event, ui) {
            $(this).css('background', 'cyan');
        }
      });
      $("#sort").droppable({
        drop: function(event, ui) {
          let itemName = $(ui.draggable).text().trim();
          itemName = itemName.substring(0, itemName.length - 1).trim();
          $.post('/users/recat', { 'name': itemName, 'category':  'sort'}).done(function (res) {
            $.get('/users', (data) => {
              const $data = data;
              $('main').empty();
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
            });
          })
        },
        over: function(event, ui) {
            $(this).css('background', 'orange');
        },
        out: function(event, ui) {
            $(this).css('background', 'cyan');
        }
      });
    </script>
  `;


const registerForm = `
      <div class="custom-centered-container">
      <h3>Register</h3>
      <form id="register-user" action="/register" method="POST">
        <div class="form-group">
          <label for="email">Email address</label>
              <input class="form-control" type="email" name="email" placeholder="Enter email" style="width: 300px" required>
          <label for="first-name">First Name</label>
              <input class="form-control" type="name" name="first-name" placeholder="Enter first Name" style="width: 300px" required>
          <label for="first-name">Last Name</label>
              <input class="form-control" type="name" name="last-name" placeholder="Enter Last Name" style="width: 300px" required>
        </div>
          <button type="submit" class="btn default-button">Register</button>
      </form>
      </div>
      <script>
      $('#register-user').unbind().submit((event) => {
        event.preventDefault();
        const formData = new FormData(document.querySelector('#register-user'))
        const successString = 'success';
        let email = formData.get('email');
        let firstName = formData.get('first-name');
        let lastName = formData.get('last-name');
        if (email.length !== 0 && firstName.length !== 0 && lastName.length !== 0) {
          $.post('/users/register', { 'email': email, 'firstName': firstName, 'lastName': lastName }).done(function(data) {
            const $data = data;
            console.log($data);
            if (data === successString) {
              $('main').clear();
              cookie = getCookie('name');
              $('main').append(listForms);
              $("#register-button-nav").css("visibility", "hidden");
              $("#login-button-nav").css("visibility", "hidden");
              $("#logout-button").css("visibility", "visible");
              $('.logged-as').text('Logged in as: ' + cookie);
              $('#edit-profile-button').css("visibility", "visible");
            } else {
              $.get('/users', (data) => {
                const $data = data;
                $('main').empty();
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
              });
            }
          });
        }
      });
      </script>
    `;

const profileForm = `
    <div class="custom-centered-container">
    <h3>Edit Profile</h3>
    <form id="edit-profile" action="/profile" method="POST">
        <div class="form-group">
            <label for="first-name">First Name</label>
            <input class="form-control" type="name" name="first-name" placeholder="Enter first Name" style="width: 300px" >
            <label for="first-name">Last Name</label>
            <input class="form-control" type="name" name="last-name" placeholder="Enter Last Name" style="width: 300px">
        </div>
        <button type="submit" class="btn default-button">Edit</button>
    </form>
</div>
<script>
    $('#edit-profile').unbind().submit((event) => {
        console.log('edit profile clicked');
        event.preventDefault();
        const formData = new FormData(document.querySelector('#edit-profile'));
        const errorString = 'Invalid';
        let firstName = formData.get('first-name');
        let lastName = formData.get('last-name');
        $.post('/users/profile', {'firstName': firstName, 'lastName': lastName }).done(function (data) {
          $('main').append(data);
          cookie = getCookie('name');
          //window.location.reload();
        });
    });
</script>
    `;

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

let notLoggedIn = `<div class="alert alert-warning center-content" role="alert">
    Please login
    </div>`;

$(document).ready(function () {
  $(function () {

    let cookie = getCookie('name');
    cookie = cookie.replace('%40', '@');
    // Displays user email when logged in

    if(cookie) {
      $("#register-button-nav").css("visibility", "hidden");
      $("#login-button-nav").css("visibility", "hidden");
      $("#logout-button").css("visibility", "visible");
      $('.logged-as').text(`Logged in as: ${cookie}`);
      $('#edit-profile-button').css("visibility", "visible");
    } else {
      $("#register-button-nav").css("visibility", "visible");
      $("#login-button-nav").css("visibility", "visible");
      $("#logout-button").css("visibility", "hidden");
      $('.logged-as').text(``);
      $('#edit-profile-button').css("visibility", "hidden");
    }

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
