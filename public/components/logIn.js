$(document).ready(function(){

('#logging-in').submit((event) => {
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

})

