$(document).ready(function() {

  var logoutHandler = function() {
    $('.home-logout').on('click', function(e) {
      e.preventDefault();
      localStorage.clear();
      $('.play-container').animate({
        'top': '47em'
      }, 800);
      $('.login-signup-container').css('display', '');
      $('.home-logout').remove();
      $('.cbp-af-inner nav').append('<a class="home-login-button" href="#login-signup">Login/Signup</a>');
      $('.home-login-button').on('click', function(e) {
        e.preventDefault();
        var scroll = $('.login-signup-container').offset().top - 95 // adjust for header
        $(document.body).animate({
          'scrollTop': scroll
        }, 900);
      });
    })
  }

  if (localStorage.user && localStorage.jwt) {
    $('.home-login-button').remove();
    $('.login-signup-container').css('display', 'none');
    $('.play-container').animate({
      'top': '22em'
    }, 500);
    $('.cbp-af-inner nav').append('<a class="home-logout" href="#login-signup">Logout</a>');
    logoutHandler();
  } else {
    localStorage.clear();
  }

  $('.form').find('input, textarea').on('keyup blur focus', function(e) {

    var $this = $(this),
      label = $this.prev('label');

    if (e.type === 'keyup') {
      if ($this.val() === '') {
        label.removeClass('active highlight');
      } else {
        label.addClass('active highlight');
      }
    } else if (e.type === 'blur') {
      if ($this.val() === '') {
        label.removeClass('active highlight');
      } else {
        label.removeClass('highlight');
      }
    } else if (e.type === 'focus') {

      if ($this.val() === '') {
        label.removeClass('highlight');
      } else if ($this.val() !== '') {
        label.addClass('highlight');
      }
    }

  });

  $('.tab a').on('click', function(e) {

    e.preventDefault();

    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');

    target = $(this).attr('href');

    $('.tab-content > div').not(target).hide();

    $(target).fadeIn(600);

  });

  $('.signup').on('click', function(e) {
    e.preventDefault();
    if (!$('.signup-first-name').val() || !$('.signup-last-name').val() || !$('.signup-email').val() || !$('.signup-password').val()) {
      console.log('sup')
    } else {
      var data = {
        firstName: $('.signup-first-name').val(),
        lastName: $('.signup-last-name').val(),
        email: $('.signup-email').val(),
        password: $('.signup-password').val()
      }

      var signup = function() {
        return $.ajax({
          type: "POST",
          url: 'https://salty-reaches-7186.herokuapp.com/signup',
          data: data
        });
      };

      signup().done(function(data) {
        console.log(data);
        if (data.success) {
          localStorage.setItem('user', JSON.stringify(data.success.user));
          localStorage.setItem('jwt', data.success.jwt);
          $('.home-login-button').remove();
          $('.login-signup-container').css('display', 'none');
          $('.play-container').animate({
            'top': '22em'
          }, 800);
          $('.cbp-af-inner nav').append('<a class="home-logout" >Logout</a>');
          $('.signup-first-name').val('');
          $('.signup-last-name').val('');
          $('.signup-email').val('');
          $('.signup-password').val('');
        }
      });

    }

  })

  $('.login').on('click', function(e) {
    e.preventDefault();
    if (!$('.login-email').val() || !$('.login-password').val()) {
      return false;
    } else {
      var data = {
        email: $('.login-email').val(),
        password: $('.login-password').val()
      }
      var login = function() {
        return $.ajax({
          type: "POST",
          url: 'https://salty-reaches-7186.herokuapp.com/login',
          data: data
        });
      };

      login().done(function(data) {
        if (data.success) {
          localStorage.setItem('user', JSON.stringify(data.success.user));
          localStorage.setItem('jwt', data.success.jwt);
          $('.home-login-button').remove();
          $('.login-signup-container').css('display', 'none');
          $('.play-container').animate({
            'top': '22em'
          }, 800);
          $('.cbp-af-inner nav').append('<a class="home-logout" href="#">Logout</a>');
          logoutHandler();
          $('.login-email').val('');
          $('.login-password').val('');
        }
      });

    }
  })

  $('.home-play-button').on('click', function(e) {
    e.preventDefault();
    var scroll = $('.play-container').offset().top - 95 // adjust for header
    $(document.body).animate({
      'scrollTop': scroll
    }, 900);
  });


  $('.home-login-button').on('click', function(e) {
    e.preventDefault();
    var scroll = $('.login-signup-container').offset().top - 95 // adjust for header
    $(document.body).animate({
      'scrollTop': scroll
    }, 900);
  });

});
