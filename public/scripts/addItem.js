
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
