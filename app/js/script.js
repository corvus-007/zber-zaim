document.addEventListener('DOMContentLoaded', function() {
  svg4everybody();


  $('.reviews__slider [data-fancybox]').fancybox({
    transitionEffect: 'slide',
    loop: true,
    infobar: true,
    afterShow: function (instance, slide) {
      $('.reviews__slider').slick('slickGoTo', instance.currIndex - 1);
    }
  });

  $('.reviews__slider').slick({
    accessibility: false,
    dots: true,
    arrows: false,
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [{
      breakpoint: 1300,
      settings: {
        slidesToShow: 5
      }
    }, {
      breakpoint: 770,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: 567,
      settings: {
        slidesToShow: 1,
        arrows: false
      }
    }]
  });

});



$('.gallery-slider [data-fancybox]').fancybox({
  loop: false,
  afterShow: function (instance, slide) {
    $('.gallery-slider').slick('slickGoTo', instance.currIndex - 1);
  }
});

$('.gallery-slider').slick({
  accessibility: false,
  dots: true,
  infinite: false,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [{
    breakpoint: 1290,
    settings: {
      slidesToShow: 3
    }
  }, {
    breakpoint: 567,
    settings: {
      slidesToShow: 1,
      arrows: false
    }
  }]
});
