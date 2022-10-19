$('#edit-profile').click((event) => {
    event.preventDefault();
    const formData = new FormData(document.querySelector('#edit-profile'))
    const errorString = 'Invalid email';
    let email = formData.get('email');
    let firstName = formData.get('first-name');
    let lastName = formData.get('last-name');
    if(email === ''){
        console.log('email is empty');   
    } else if (firstName === '') {
        console.log('first name is empty');
    } else if (lastName === '') {
        console.log('last name is empty');
    }
    console.log(email, firstName, lastName);
});



