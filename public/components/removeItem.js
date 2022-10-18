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

{/* <h3>Remove item</h3>
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
      </script> */}
