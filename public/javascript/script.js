//password toggle -show/hide
//Register Page and Login Page
const visibilityToggle = document.querySelector('.visibility');
const input = document.querySelector('.password-input input');


var password = true;

visibilityToggle.addEventListener('click', () => {
  if(password) {
      input.setAttribute('type', 'text');
      visibilityToggle.textContent = 'visibility';
  }
  else{
      input.setAttribute('type', 'password');
      visibilityToggle.textContent = 'visibility_off';
  }
  password = !password;
    
})

//



//Post detail page -  Comment Thread Toggle
const commentIcon = document.querySelector('.fa-comments');
commentIcon.addEventListener('click', function(){
  alert('hello!');
})