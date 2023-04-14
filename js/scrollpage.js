$(document).ready(function() {
    $('#for-more').click(function() {
      $('html, body').animate({
        scrollTop: $('.aboutme').offset().top
      }, 1000); // The animation duration is 1000ms (1 second)
    });
  });