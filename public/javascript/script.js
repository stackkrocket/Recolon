//password toggle -show/hide
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
