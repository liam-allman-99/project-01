import $ from 'jquery';
import "bootstrap";
import "slick-carousel";

$(function() {
  initSliders();
});

/**
 * @description initialise the slick sliders for the page
 */
let initSliders = () => {
  $(".global-slider").slick({
    dots: false,
    arrows: true,
    nextArrow: '<button class="slick-arrow slick-next"><i class="fa-solid fa-chevron-right"></i></button>',
    prevArrow: '<button class="slick-arrow slick-prev"><i class="fa-solid fa-chevron-left"></i></button>',
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
    ],
  });
};