
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