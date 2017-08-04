document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  svg4everybody();
  $('input[type="tel"]').mask("+7 (999) 999-99-99", {});


  function Sound(obj) {
    var self = this;
    this.nameSound = obj.name;
    this.volume = obj.volume || 0.3;

    var audioElement = null;

    function createAudio() {
      audioElement = document.createElement('audio');
      audioElement.src = self.nameSound + '.mp3';
      audioElement.volume = self.volume;
      audioElement.load();
    }
    createAudio();

    this.play = function () {
      audioElement.play();
    };

    this.reset = function () {
      audioElement.currentTime = 0;
    }
  }

  var soundHoverButtons = new Sound({
    name: 'button-hover'
  });

  var soundOpenModal = new Sound({
    name: 'modal-open'
  });

  var soundCloseModal = new Sound({
    name: 'modal-close'
  });

  $("[data-fancybox]").fancybox({
    animationEffect: 'zoom-in-out',
    animationDuration: 555,
    beforeShow: function () {
      soundOpenModal.play();
    },
    beforeClose: function () {
      soundCloseModal.play();
    }
  });

  $('.cta__form, .callback-form').on('submit', function (event) {
    event.preventDefault();
    var formData = $(this).serialize();

    var ajaxResponse = $.ajax({
      type: "POST",
      url: "send_email.php",
      data: formData + '&send_form=""'
    });

    ajaxResponse.done(function (data, textStatus, jqXHR) {
      if (data === 'success') {
        $.fancybox.close();
        setTimeout(function () {
          $.fancybox.open('<div class="popup"><h2 class="popup__title">Спасибо!</h2><p style="text-align: center;">Ваша заявка отправлена. Менеджер свяжется с вами в ближайшее время.</p></div>');
        }, 500);
      } else {
        setTimeout(function () {
          $.fancybox.open('<div class="popup"><h2 class="popup__title">Упс!</h2><p style="text-align: center;">Что-то пошло не так. Повторите попытку позже.</p></div>');
        }, 500);
      }
    });

    ajaxResponse.fail(function (jqXHR, textStatus, errorThrown) {
      setTimeout(function () {
        $.fancybox.open('<div class="popup"><h2 class="popup__title">Упс!</h2><p style="text-align: center;">Что-то пошло не так. Повторите попытку позже.</p></div>');
      }, 500);
    });
  });



  $('.button, .cta__form-submit, .communications-header__callback, .welcome__video-play').on('mouseenter', function () {
    soundHoverButtons.reset();
    soundHoverButtons.play();
  });


  $('.certs__slider [data-fancybox]').fancybox({
    transitionEffect: 'slide',
    loop: true,
    infobar: true,
    afterShow: function (instance, slide) {
      $('.certs__slider').slick('slickGoTo', instance.currIndex - 1);
    }
  });

  $('.certs__slider').slick({
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
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
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
      'min': [3, 3],
      '50%': [6, 6],
      'max': 12
    },
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

  function calculateMonths() {
    var percentage = 0;

    if (period == 12) {
      percentage = 14;
    } else if (period == 6) {
      percentage = 13;
    } else if (period == 3) {
      percentage = 12;
    }

    return ((amountValue * percentage) / 100) / 12 * period;
  }

  function calculateSber() {
    var percentage = 0;

    if (period == 12) {
      percentage = 17;
    } else if (period == 6) {
      percentage = 16;
    } else if (period == 3) {
      percentage = 15;
    }

    return ((amountValue * percentage) / 100) / 12 * period - (((percentage - 14) * amountValue / 100) * 0.35) / 12 * period;
  }

  var tarifs = {
    'every-month': calculateMonths,
    'save': calculateSber
  };
  var currentTarif = 'every-month';
  var amountValue = $('.calculator-form__input')[0].value;
  var period = startRange;
  var calculateOutput = document.querySelector('.calculator-form__output');
  var calculateOutputNdfl = document.querySelector('.calculator-form__output-ndfl');
  var ndflSpan = document.createElement('span');

  tarifs[currentTarif]();

  function outtputCalc() {
    calculateOutput.innerHTML = formatter.format(tarifs[currentTarif]()) + '<span> / ' + +period + ' мес.</span>';
    ndflSpan.textContent = formatter.format(tarifs[currentTarif]() / period);
    if (currentTarif === 'save') {
      calculateOutputNdfl.innerHTML = '&nbsp;';
    } else {
      // ndflSpan = document.createElement('span');
      calculateOutputNdfl.textContent = 'Ежемесячная компенсация за вычетом НДФЛ 35%: ';
      calculateOutputNdfl.appendChild(ndflSpan);
    }
  }

  $('.calculator-form').on('change', '.calculator-form__radio-input', function (event) {
    currentTarif = this.value;
    tarifs[currentTarif]();
    outtputCalc();
  });

  $('.calculator-form').on('input', '.calculator-form__input', function (event) {
    amountValue = this.value;
    outtputCalc();
  });

  monthSlider.noUiSlider.on('update', function (values, handle) {
    period = values[handle];
    outtputCalc();
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
      items_type: 'a',
      min_row_height: 200,
      margin: 1,
      is_first_big: true
    });
  });


  // Locations
  var locationsMap = null,
    markers = [],
    offices = null,
    locationsList = document.querySelector('.locations-list'),
    getmarkers = $.getJSON('js/offices.json'),
    ICONPATH = 'images/location-pin.svg',
    currInfoWindow;

  function initOfficesMap() {
    getmarkers.done(function (data) {
      offices = data;

      var districtMapCenter = offices[0].location;

      locationsMap = new google.maps.Map(document.getElementById('locations-map'), {
        center: districtMapCenter,
        zoom: 15,
        scrollwheel: false
      });

      markers = offices.map(function (office, index) {
        var element = getElementFromTemplate(office);
        locationsList.appendChild(element);

        return addMarker(office);
      });

      $('.locations-slider')
        .slick({
          accessibility: false,
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: true,
          responsive: [{
            breakpoint: 677,
            settings: {
              slidesToShow: 1,
            }
          }]
        }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
          var activeSlide = slick.$slides[nextSlide];
          var activeSlideLocation = JSON.parse(activeSlide.dataset.location);
          locationsMap.panTo(activeSlideLocation);
        });
    });
  }


  function addMarker(markerOption) {
    var svgIcon = {
      url: ICONPATH,
    };

    var marker = new google.maps.Marker({
      position: markerOption.location,
      icon: svgIcon,
      map: locationsMap,
      title: markerOption.city + ', ' + markerOption.street
    });

    marker.addListener('click', function () {
      var index = markers.indexOf(this);
      $('.locations-slider').slick('slickGoTo', index);
    });

    return marker;
  }

  function getElementFromTemplate(data) {
    var template = document.querySelector('#location-template');
    if ('content' in template) {
      var officeTemplate = template.content.children[0].cloneNode(true);
    } else {
      var officeTemplate = template.children[0].cloneNode(true);
    }
    officeTemplate.dataset.location = JSON.stringify(data.location);
    officeTemplate.querySelector('.locations-list__item-city').textContent = data.city;
    officeTemplate.querySelector('.locations-list__item-street').textContent = data.street;
    // data.phones.forEach(function (phone) {
    //   var phoneElem = document.createElement('span');
    //   var phoneLink = document.createElement('a');
    //   phoneElem.textContent = 'т. ';
    //   phoneElem.classList.add('locations-list__item-phone');
    //   phoneLink.classList.add('locations-list__item-phone-link');
    //   phoneLink.textContent = phone;
    //   phoneLink.href = 'tel: ' + phone;
    //   phoneElem.appendChild(phoneLink);
    //   officeTemplate.querySelector('.locations-list__item-phones-list').appendChild(phoneElem);
    // });
    // officeTemplate.querySelector('.locations-list__item-working-time-weekdays').textContent = data.workingTime.weekdays;
    // officeTemplate.querySelector('.locations-list__item-working-time-weekend').textContent = data.workingTime.weekend;
    return officeTemplate;
  }

  initOfficesMap();
});
