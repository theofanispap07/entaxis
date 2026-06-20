/**
 * En Taxis - Modern Client-Side JavaScript
 */
(function($) {
  "use strict";

  // 1. Preloader fadeout (Splash Screen Animation) with Typewriter Effect
  var splashText = "Ev Taxis";
  var currentText = "";
  var charIndex = 0;
  var typingSpeed = 70; // ms per character
  var isTypingComplete = false;
  var windowLoaded = false;

  function typeNextChar() {
    var typedElement = $('#splash-logo-typed');
    if (typedElement.length > 0 && charIndex < splashText.length) {
      currentText += splashText.charAt(charIndex);
      typedElement.text(currentText);
      charIndex++;
      setTimeout(typeNextChar, typingSpeed);
    } else {
      isTypingComplete = true;
      $(window).trigger('splash:typed');
    }
  }

  // Start typing after a short initial delay for the logo icon to scale in
  setTimeout(typeNextChar, 150);

  function checkDismissSplash() {
    if (windowLoaded && isTypingComplete) {
      var loader = $('#ftco-loader');
      if (loader.length > 0) {
        // Minimal delay after typing finishes to let the final state linger briefly
        setTimeout(function() {
          loader.addClass('hide');
          setTimeout(function() {
            loader.remove();
          }, 400); // Quick fade out transition
        }, 150);
      }
    }
  }

  $(window).on('load', function() {
    windowLoaded = true;
    checkDismissSplash();
  });

  $(window).on('splash:typed', function() {
    checkDismissSplash();
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

    };
    
    // Call carousel init if owlCarousel function is defined
    if (typeof $.fn.owlCarousel === 'function') {
      carouselInit();
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

  });

})(jQuery);
