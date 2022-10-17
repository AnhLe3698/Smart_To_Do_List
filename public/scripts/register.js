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



