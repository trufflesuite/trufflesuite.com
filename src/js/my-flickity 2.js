$(document).ready(function(){
    let $carousel = $('.slides-container').flickity({
        cellSelector: '.slide',
        //fade: true,
        prevNextButtons: false,
        wrapAround: true
    });
  
    $('.autoplay').flickity({
        prevNextButtons: false,
        wrapAround: true
    });     
  });