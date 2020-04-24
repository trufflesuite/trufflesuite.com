$(document).ready(function(){
  $('.slides-container').slick({
    adaptiveHeight: false,
    appendDots: ".home-hero-banner",
    arrows: false,
    dots: true,
    dotsClass: "slides-control",
  });

  $('.autoplay').slick({
    slidesToShow:  6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1,
  });     
});