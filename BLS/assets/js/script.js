//slider
$(function(){
    'use strict';
    var wing=$(window).height(),
        upperh=$('.navbar').innerHeight();
        $('.slider , .carousel-item').height(wing-upperh);
});

//nav bar
$('.navbar-collapse ul li').on('click',function(){
   $(this).addClass('active').siblings().removeClass('active');
});

//
 /* $(function(){
$("#addClass").click(function () {
          $('#qnimate').addClass('popup-box-on');
            });
          
            $("#removeClass").click(function () {
          $('#qnimate').removeClass('popup-box-on');
            });
  })*/