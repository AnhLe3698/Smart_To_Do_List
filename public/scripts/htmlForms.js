const listItems = function (items) {
  let markup = `
    <li class="dropzone list-group" id=${items.name} draggable="true">${items.name}
      <select class="form-select" aria-label="Default select example">
        <option selected>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
      <button id="delete-item" type="button" class="btn btn-danger">X</button>
    </li>

    <script>
      $('#delete-item').click( function(event){
        event.preventDefault();
        let urlStr = '/users/delete/' + $(this).parent().attr('id');
        const errorString = 'Invalid item';
        console.log($(this).parent().attr('id'));
        if ($(this).parent().attr('id').length !== 0) {
          $.post(urlStr).done(function (data) {
            const $data = data;
            console.log('callback detected');
            if ($data === errorString) {
              $('main').append($data);
            } else {
              $('main').append($data);
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
      $('#logging-in').submit((event) => {
        event.preventDefault();
        const formData = new FormData(document.querySelector('#logging-in'))
        const errorString = 'Invalid email';
        $('ul').empty();
        $.post('/users/login', { email: formData.get('email') }).done(function (data) {
          // Data we get back from the server
          const $data = data;
          if ($data === errorString) {
            $('main').append($data);
          } else {
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
              }
            });
          }
        });
      });
      </script>
    `;
// Creates the list items
let listForms = `
      <h3>Add item Part 2</h3>
      <form id="add-item2">
        <div class="add-item form-group">
          <label for="name">Enter item name</label>
          <input class="form-control" type="text" name="name" placeholder="Add name" style="width: 300px">
        <button type="submit" class="btn btn-primary">Add</button>
        </div>
      </form>
      <script>
        $('#add-item2').submit((event) => {
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
                $('main').append($data);
              } else {
                if (data.category === 'movie') {
                  $('.media').append(listItems($data));
                } else if (data.category === 'book') {
                  $('.books').append(listItems($data));
                } else if (data.category === 'product') {
                  $('.products').append(listItems($data));
                } else if (data.category === 'restaurant') {
                  $('.resteraunts').append(listItems($data));
                };
              }
            });
          }
        });
      </script>

      <h3>Remove item</h3>
      <form id="remove-item">
        <div class="form-group">
          <label for="itemName">Enter item name</label>
          <input class="form-control" type="text" name="itemName" placeholder="Add item Name" style="width: 300px">
        </div>
        <button type="submit" class="btn btn-primary">remove</button>
      </form>
      <script>
        $('#remove-item').submit((event) => {
          event.preventDefault();
          const formData = new FormData(document.querySelector('#remove-item'))
          const errorString = 'Invalid item';
          let itemName = formData.get('itemName');
          let urlStr = '/users/delete/' + itemName;
          if (itemName.length !== 0) {
            $.post(urlStr).done(function (data) {
              const $data = data;
              console.log('callback detected');
              if ($data === errorString) {
                $('main').append($data);
              } else {
                $('main').append($data);
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

        </section>
      </section>

      <section class="toRead toDoBox box">
        <header class="toDoHeader">To Read Section</header>
        <section>
          <ul class="list-group books">


        </section>
      </section>

      <section class="toBuy toDoBox box">
        <header class="toDoHeader">To Buy Section</header>
        <section>
          <ul class="list-group products">


          </ul>
        </section>
      </section>
      </section>

  `;


const registerForm = `
      <h3>Register</h3>
      <form id="register-user" action="/register" method="POST">
        <div class="form-group">
          <label for="email">Email address</label>
          <input class="form-control" type="email" name="email" placeholder="Enter email" style="width: 300px">
          <label for="first-name">First Name</label>
          <input class="form-control" type="name" name="first-name" placeholder="Enter first Name" style="width: 300px">
          <label for="first-name">Last Name</label>
          <input class="form-control" type="name" name="last-name" placeholder="Enter Last Name" style="width: 300px">
        </div>
        <button type="submit" class="btn btn-primary">Register</button>
      </form>
      <script>
      $('#register-user').submit((event) => {
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

$(document).ready(function() {
      $(function() {
        $.get('/users', (data) => {
          const errorString = 'Not logged in';
          const $data = data;
          if ($data === errorString) {
            $('main').append($data);
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
              }
            });
          }
        });
      })
});
