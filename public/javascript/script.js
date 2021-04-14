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


$(function() {

  'use strict';

  $('.js-menu-toggle').click(function(e) {

  	var $this = $(this);

  	

  	if ( $('body').hasClass('show-sidebar') ) {
  		$('body').removeClass('show-sidebar');
  		$this.removeClass('active');
  	} else {
  		$('body').addClass('show-sidebar');	
  		$this.addClass('active');
  	}

  	e.preventDefault();

  });

  // click outisde offcanvas
	$(document).mouseup(function(e) {
    var container = $(".sidebar");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ( $('body').hasClass('show-sidebar') ) {
				$('body').removeClass('show-sidebar');
				$('body').find('.js-menu-toggle').removeClass('active');
			}
    }
	}); 

    

});