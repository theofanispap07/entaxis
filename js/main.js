/**
 * En Taxis - Modern Client-Side JavaScript
 */
(function($) {
  "use strict";

  // 1. Preloader fadeout
  $(window).on('load', function() {
    var loader = $('#ftco-loader');
    if (loader.length > 0) {
      loader.addClass('hide');
      setTimeout(function() {
        loader.remove();
      }, 500);
    }
  });

  $(document).ready(function() {
    // 2. Active scroll state for Navbar
    var checkScroll = function() {
      var navbar = $('#ftco-navbar');
      if (navbar.length > 0) {
        if ($(window).scrollTop() > 30) {
          navbar.addClass('scrolled');
        } else {
          navbar.removeClass('scrolled');
        }
      }
    };
    
    $(window).scroll(function() {
      checkScroll();
    });
    checkScroll(); // Initial check

    // 3. Owl Carousel Initialization
    var carouselInit = function() {
      var homeSlider = $('.home-slider');
      if (homeSlider.length > 0) {
        homeSlider.owlCarousel({
          loop: true,
          autoplay: true,
          margin: 0,
          nav: false,
          dots: true,
          autoplayTimeout: 7000,
          navText: ['<span class="ion-md-arrow-back"></span>', '<span class="ion-md-arrow-forward"></span>'],
          responsive: {
            0: { items: 1 },
            600: { items: 1 },
            1000: { items: 1 }
          }
        });
      }

      var testCarousel = $('.carousel-testimony');
      if (testCarousel.length > 0) {
        testCarousel.owlCarousel({
          autoplay: true,
          autoHeight: true,
          center: true,
          loop: true,
          items: 1,
          margin: 30,
          stagePadding: 0,
          nav: false,
          dots: true,
          responsive: {
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 3 }
          }
        });
      }
    };
    
    // Call carousel init if owlCarousel function is defined
    if (typeof $.fn.owlCarousel === 'function') {
      carouselInit();
    }

    // 4. Stellar Parallax initialization
    if (typeof $.fn.stellar === 'function') {
      $(window).stellar({
        responsive: true,
        parallaxBackgrounds: true,
        parallaxElements: true,
        horizontalScrolling: false,
        hideDistantElements: false,
        scrollProperty: 'scroll'
      });
    }

    // 5. Smooth Scroll navigation
    $('.navbar-nav a[href^="#"], .btn[href^="#"]').on('click', function(e) {
      e.preventDefault();
      var target = this.hash;
      var $target = $(target);
      
      if ($target.length > 0) {
        // Close mobile navbar menu if open
        var navToggler = $('.navbar-toggler');
        var navCollapse = $('.navbar-collapse');
        if (navCollapse.hasClass('show')) {
          navToggler.click();
        }

        $('html, body').stop().animate({
          'scrollTop': $target.offset().top - 80
        }, 800, 'easeInOutExpo');
      }
    });

    // 6. Navigation active state updates on scroll (Simple ScrollSpy)
    var sections = $('section, div[id^="home-section"]');
    var navLinks = $('.navbar-nav li');

    $(window).on('scroll', function() {
      var currentPosition = $(window).scrollTop() + 120;
      
      sections.each(function() {
        var top = $(this).offset().top;
        var bottom = top + $(this).outerHeight();
        var id = $(this).attr('id');
        
        if (currentPosition >= top && currentPosition <= bottom) {
          navLinks.removeClass('active');
          $('.navbar-nav').find('a[href="#' + id + '"]').parent().addClass('active');
        }
      });
    });

    // 7. Counter animation (Waypoint + animateNumber)
    var counterInit = function() {
      var counterSection = $('#section-counter, .ftco-counter');
      if (counterSection.length > 0 && typeof $.fn.waypoint === 'function') {
        counterSection.waypoint(function(direction) {
          if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {
            var comma_separator_number_step = $.animateNumber.numberStepFactor.separator(',');
            $('.number').each(function() {
              var $this = $(this),
                  num = $this.data('number');
              $this.animateNumber({
                number: num,
                numberStep: comma_separator_number_step
              }, 7000);
            });
            $(this.element).addClass('ftco-animated');
          }
        }, { offset: '95%' });
      }
    };
    
    if (typeof $.fn.animateNumber === 'function') {
      counterInit();
    }
  });

})(jQuery);
