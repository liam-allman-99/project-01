const $ = require('jquery');
require('bootstrap');
require('slick-carousel');

// Triggers all code on DOM load
$(function(){
  initSlick();

  // Setting up global slick slider
  function initSlick () {
    $('.global-slider').slick({
      dots: false,
      arrows: true,
      nextArrow: '<button class="slick-arrow slick-next">Next</button>',
      prevArrow: '<button class="slick-arrow slick-prev">Prev</button>',
      slidesToScroll: 1,
      slidesToShow: 1,
      infinite: false,
      mobileFirst: true,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 1201,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 1441,
          settings: {
            slidesToShow: 4,
          }
        },
      ],
    });
  }
});