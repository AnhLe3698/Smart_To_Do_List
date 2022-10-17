$(document).ready(function () {

  const $registerForm = `
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
  `;

  $("#register-button-nav").click(function () {
    $("#container").empty();
    $("#container").append($registerForm);
  });

  $('#register-user').submit((event) => {
    console.log('form submitted')
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
          $('#container').append($data);
        } else {
          $('#container').append($data);
          // $('main').append('Login Successful');
        }
      });
    }

  });


  // recreates the list everytime you refresh
  $(() => {
    $.get('/users', (data) => {
      const errorString = 'Not logged in';
      const $data = data;
      if ($data === errorString) {
        $('main').append($data);
      } else {
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
