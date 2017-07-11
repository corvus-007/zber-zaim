document.addEventListener('DOMContentLoaded', function () {
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



  $('.gallery [data-fancybox]').fancybox({
    loop: false,
    afterMove: function (instance, slide) {
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



  var monthSlider = document.querySelector('#month-slider');
  var startRange = 3;

  var formatter = new Intl.NumberFormat('ru', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  noUiSlider.create(monthSlider, {
    start: startRange,
    step: 1,
    connect: [true, false],
    tooltips: wNumb({
      postfix: ' мес.',
      decimals: 0
    }),
    range: {
      'min': 1,
      'max': 24
    }
  });

  var handle = monthSlider.querySelector('.noUi-handle');

  handle.setAttribute('tabindex', 0);

  handle.addEventListener('click', function () {
    this.focus();
  });

  handle.addEventListener('keydown', function (e) {
    var value = Number(monthSlider.noUiSlider.get());

    switch (e.which) {
      case 37:
        monthSlider.noUiSlider.set(value - 1);
        break;
      case 39:
        monthSlider.noUiSlider.set(value + 1);
        break;
    }
  });


  function calculateTarif() {
    return (calculateCoef * amountValue * period + 200);
  }

  var calculatorTarif = 'every-month';
  var tarifs = {
    'every-month': 1.2,
    'save': 2.8
  };
  var calculateCoef = tarifs['every-month'];
  var amountValue = $('.calculator-form__input')[0].value;
  var period = startRange;
  var calculateOutput = document.querySelector('.calculator-form__output');

  calculateTarif();

  $('.calculator-form').on('change', '.calculator-form__radio-input', function (event) {
    calculateCoef = tarifs[this.value];
    calculateOutput.value = formatter.format(calculateTarif());
  });

  $('.calculator-form').on('input', '.calculator-form__input', function (event) {
    console.log('input');
    amountValue = this.value;
    calculateOutput.value = formatter.format(calculateTarif());
  });

  monthSlider.noUiSlider.on('update', function (values, handle) {
    period = values[handle];
    calculateOutput.value = formatter.format(calculateTarif());
  });



  /*=================================
  =            Accordion            =
  =================================*/

  var $accordion = $('.js-accordion');

  if ($accordion.length) {
    $accordion.find('dd').hide();
    $accordion.on('click', 'dt', function (event) {
      event.preventDefault();

      $accordion
        .find('dt')
        .not($(this))
        .removeClass('is-opened')
        .next('dd')
        .slideUp();

      if (!$(this).hasClass('is-opened')) {
        $(this).addClass('is-opened');
        $(this).next('dd').stop().slideDown();
      } else {
        $(this).removeClass('is-opened');
        $(this).next('dd').stop().slideUp();
      }
    });
  }

  /*=====  End of Accordion  ======*/


  $(window).on('load', function () {
    $('.photos-users__list').jMosaic({
      min_row_height: 200,
      margin: 1
    });
  });
});
