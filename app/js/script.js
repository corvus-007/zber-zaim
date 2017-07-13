document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  svg4everybody();
  $('input[type="tel"]').mask("+7 (999) 999-99-99", {});

  var audio = null;

  function createAudio() {
    audio = document.createElement('audio');
    if (audio.canPlayType('audio/ogg; codecs="vorbis"')) {
      audio.src = '/glass.ogg';
    }
    audio.load();
  }

  $('.button').on('mouseover', function() {
    audio.play();
  });

  createAudio();


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


  // Locations
  // var offices = {},
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

      offices.forEach(function (office) {
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
    data.phones.forEach(function (phone) {
      var phoneElem = document.createElement('span');
      var phoneLink = document.createElement('a');
      phoneElem.textContent = 'т. ';
      phoneElem.classList.add('locations-list__item-phone');
      phoneLink.classList.add('locations-list__item-phone-link');
      phoneLink.textContent = phone;
      phoneLink.href = 'tel: ' + phone;
      phoneElem.appendChild(phoneLink);
      officeTemplate.querySelector('.locations-list__item-phones-list').appendChild(phoneElem);
    });
    officeTemplate.querySelector('.locations-list__item-working-time-weekdays').textContent = data.workingTime.weekdays;
    officeTemplate.querySelector('.locations-list__item-working-time-weekend').textContent = data.workingTime.weekend;
    return officeTemplate;
  }

  initOfficesMap();

});
