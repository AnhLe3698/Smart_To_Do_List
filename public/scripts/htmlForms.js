const listItems = function (items) {
  let joinString = items.name.split(' ').join('');
  let markup = `
  <form>
    <li class="dropzone list-group" id="${joinString}" draggable="true"><div>${items.name}</div>
    <!--<select class="form-select" aria-label="Default select example">
        <option selected>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>-->
      <button id="delete-item${joinString}" type="button" class="btn btn-danger">X</button>
    </li>

  </form>
    <script>
      $('#delete-item${joinString}').click(function(event){
        event.preventDefault();
        let varName = $(this).parent().parent().children('#${joinString}').children('div').text().trim() + '';
        let urlStr = '/users/delete/' + varName;
        console.log('this is the text: ',varName)
        console.log('this is the string url: ', urlStr)
        const errorString = 'Invalid item';
        if (varName !== 0) {
          $.post(urlStr).done(function (data) {
            const $data = data;
            //console.log('callback detected');
            if ($data === errorString) {
              $('main').append($data);
            } else {
              $('main').append($data);
              $( "#${joinString}").remove();
            }
          });
        }
      });
    </script>
     `;
  return markup;
}

const loginForm = `
      <h3>Login</h3>
      <form id="logging-in" action="/login" method="POST">
        <div class="form-group">
          <label for="email">Email address</label>
          <input class="form-control" type="email" name="email" placeholder="Enter email" style="width: 300px">
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
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
            $('main').append($data);
          } else {
            let cookie = getCookie('name');
            cookie = cookie.replace('%40', '@');
            // Displays user email when logged in
            if(cookie) {
              $("#register-button-nav").css("visibility", "hidden");
              $("#login-button-nav").css("visibility", "hidden");
              $("#logout-button").css("visibility", "visible");
              $('.logged-as').text('Logged in as: '+ cookie);
            } else {
              $('.logged-as').text('Logged in as:');
            }
            $('main').empty();
            $('main').append(listForms);
            data.map(item => {
              const $item = listItems(item);
              const category = item.category;
              if (category === 'movie') {
                $('.media').append($item);
              } else if (category === 'book') {
                $('.books').append($item);
              } else if (category === 'product') {
                $('.products').append($item);
              } else if (category === 'restaurant') {
                $('.resteraunts').append($item);
              } else {
                $('.sort').append(listItems($data));
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
          console.log('name clicked')
          if (name.length !== 0) {
            $.post('/users/add', { 'name': name }).done(function (data) {
              const $data = data;
              if ($data === errorString) {
                // $('main').append($data);
                $('main').prepend(existsAlert).click(function() {$('.alert').remove()});
              } else {
                if (data.category === 'movie') {
                  $('.media').append(listItems($data));
                } else if (data.category === 'book') {
                  $('.books').append(listItems($data));
                } else if (data.category === 'product') {
                  $('.products').append(listItems($data));
                } else if (data.category === 'restaurant') {
                  $('.resteraunts').append(listItems($data));
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
            <ul class="list-group media">
          </section>
        </section>


        <section class="toEat toDoBox box">
          <header class="toDoHeader">To Eat Section</header>
          <section class="list-container">
            <ul class="list-group resteraunts">
            </ul>
          </section>
        </section>

        <section class="toRead toDoBox box">
          <header class="toDoHeader">To Read Section</header>
          <section>
            <ul class="list-group books">
            </ul>
          </section>
        </section>

        <section class="toBuy toDoBox box">
          <header class="toDoHeader">To Buy Section</header>
          <section>
            <ul class="list-group products">
            </ul>
          </section>
        </section>

        <section class="toSort toDoBox box">
          <header class="toDoHeader">Need Sorting</header>
          <section>
            <ul class="list-group sort">
            </ul>
          </section>
        </section>

      </section>



  `;


const registerForm = `
      <div class="register-container">
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
        const errorString = 'Invalid email';
        let email = formData.get('email');
        let firstName = formData.get('first-name');
        let lastName = formData.get('last-name');
        console.log(email, firstName, lastName);
        if (email.length !== 0 && firstName.length !== 0 && lastName.length !== 0) {
          $.post('/users/register', { 'email': email, 'firstName': firstName, 'lastName': lastName }).done(function (data) {
            const $data = data;
            if ($data === errorString) {
              $('main').append($data);
            } else {
              $('main').append($data);
              // $('main').append('Login Successful');
            }
          });
        }
      });
      </script>
    `;

    const getCookie = function(cname) {
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
    } else {
      $("#register-button-nav").css("visibility", "visible");
      $("#login-button-nav").css("visibility", "visible");
      $("#logout-button").css("visibility", "hidden");
      $('.logged-as').text(`Logged in as:`).css("visibility", "hidden");
    }

    $.get('/users', (data) => {
      const errorString = 'Not logged in';
      const $data = data;
      if ($data === errorString) {
        //$('main').append($data);
        $('main').prepend(notLoggedIn);
      } else {
        $('main').append(listForms);
        data.map(item => {
          const $item = listItems(item);
          const category = item.category;
          if (category === 'movie') {
            $('.media').append($item);
          } else if (category === 'book') {
            $('.books').append($item);
          } else if (category === 'product') {
            $('.products').append($item);
          } else if (category === 'restaurant') {
            $('.resteraunts').append($item);
          } else {
            $('.sort').append(listItems($data));
          };
        });
      }
    });
  })
});
