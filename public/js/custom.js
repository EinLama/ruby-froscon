/*global $:false, jQuery:false, console:false */
jQuery(document).ready(function($) {
  "use strict";

  //scroll to top
  $(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
      $('.scrollup').fadeIn();
    } else {
      $('.scrollup').fadeOut();
    }
  });
  $('.scrollup').click(function(){
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });

  //.parallax(xPosition, speedFactor, outerHeight) options:
  //xPosition - Horizontal position of the element
  //inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
  //outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport

  // parallax background
  $('#intro').parallax("50%", 0.1);
  $('#programm').parallax("50%", 0.2);
  $('#bottom').parallax("50%", 0.1);

  //navigation
  $('.navigation').onePageNav({
    scrollOffset: 0
  });
});

$(window).scroll(function(){
  "use strict";
  if($(window).scrollTop()<10){

    $('.fade').stop(true,true).fadeTo("slow",1);
  } else {
    $('.fade').stop(true,true).fadeTo("slow", 0.33);
  }
});
