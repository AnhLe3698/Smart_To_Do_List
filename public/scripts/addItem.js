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

{/* <form id="add-item">
  <div class="form-group">
    <label for="name">Enter item name</label>
    <input class="form-control" type="text" name="name" placeholder="Add name" style="width: 300px">
    <label for="category">Enter item category</label>
    <input class="form-control" type="text" name="category" placeholder="Add category" style="width: 300px">
  </div>
  <button type="submit" class="btn btn-primary">Add</button>
</form> */}

$('#add-item').submit((event) => {
  event.preventDefault();
  const formData = new FormData(document.querySelector('#add-item'))
  const errorString = 'Sorry item already exists';
  let name = formData.get('name');
  let category = formData.get('category');

  if (name.length !== 0 && category.length !== 0) {
    $.post('/users/insert', { 'name': name, 'category': category }).done(function (data) {
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
