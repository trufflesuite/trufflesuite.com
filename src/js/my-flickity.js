$(document).ready(function(){
    /*let $carousel = $('.slides-container').flickity({
        cellSelector: '.slide',
        //fade: true,
        prevNextButtons: false,
        wrapAround: true
    });*/

    $('.autoplay').flickity({
        cellSelector: '.col-6',
        pageDots: false,
        wrapAround: true
    });
});