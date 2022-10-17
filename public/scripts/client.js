


// $(() => {

//   $.get('/users', (data) => {
//     const errorString = 'Not logged in';
//     const $data = data;
//     if ($data === errorString) {
//       $('main').append($data);
//     } else {
//       data.map(item=>{
//           const $item = listItems(item);
//           $('#items-to-buy').append($item)
//         });
//     }
//   });
// })
// const listItems = function (items) {
//   let markup = `
//     <li class="dropzone list-group" id=${items.id} draggable="true">${items.name}</li>
//      `;
//   return markup;
// }

// $('#logging-in').submit((event) => {
//   event.preventDefault();
//   const formData = new FormData(document.querySelector('#logging-in'))
//   const errorString = 'Invalid email';
//   $.post('/users/login', { email: formData.get('email') }).done(function (data) {
//     const $data = data;
//     if ($data === errorString) {
//       $('main').append($data);
//     } else {
//       data.map(item=>{
//           const $item = listItems(item);
//           const category = item.category;
//           if(category === 'media') {
//             $('.media').append($item);
//           } else if(category === 'books') {
//             $('.books').append($item);
//           } else if(category === 'products') {
//             $('.products').append($item);
//           } else if( category === 'resteraunts') {
//             $('.resteraunts').append($item);
//           }
//         });
//     }
//   });
// });

// $('#register-user').submit((event) => {
//   event.preventDefault();
//   const formData = new FormData(document.querySelector('#register-user'))
//   const errorString = 'Invalid email';
//   let email = formData.get('email');
//   let firstName = formData.get('first-name');
//   let lastName = formData.get('last-name');
//   console.log(email, firstName, lastName);
//   if (email.length !== 0 && firstName.length !== 0 && lastName.length !== 0) {
//     $.post('/users/register', { 'email': email, 'firstName': firstName, 'lastName': lastName }).done(function (data) {
//       const $data = data;
//       if ($data === errorString) {
//         $('main').append($data);
//       } else {
//         $('main').append($data);
//         // $('main').append('Login Successful');
//       }
//     });
//   }

// });
