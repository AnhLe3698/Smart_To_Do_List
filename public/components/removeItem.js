$('#remove-item').submit((event) => {
  event.preventDefault();
  const formData = new FormData(document.querySelector('#remove-item'))
  const errorString = 'Invalid item';
  let itemName = formData.get('itemName');
  console.log('clicked and detected');
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
