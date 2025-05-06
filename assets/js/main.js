


$(function () {
  // HERO SLIDER
  var menu = [];
  jQuery('.swiper-slide').each(function (index) {
    menu.push(jQuery(this).find('.slide-inner').attr("data-text"));
  });
  var interleaveOffset = 0.5;
  var swiperOptions = {
    loop: true,
    speed: 1000,
    parallax: true,
    // autoplay: {
    //     delay: 5000,
    //     disableOnInteraction: false,
    // },
    autoplay: false,
    watchSlidesProgress: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    on: {
      progress: function () {
        var swiper = this;
        for (var i = 0; i < swiper.slides.length; i++) {
          var slideProgress = swiper.slides[i].progress;
          var innerOffset = swiper.width * interleaveOffset;
          var innerTranslate = slideProgress * innerOffset;
          swiper.slides[i].querySelector(".slide-inner").style.transform =
            "translate3d(" + innerTranslate + "px, 0, 0)";
        }
      },

      touchStart: function () {
        var swiper = this;
        for (var i = 0; i < swiper.slides.length; i++) {
          swiper.slides[i].style.transition = "";
        }
      },

      setTransition: function (speed) {
        var swiper = this;
        for (var i = 0; i < swiper.slides.length; i++) {
          swiper.slides[i].style.transition = speed + "ms";
          swiper.slides[i].querySelector(".slide-inner").style.transition =
            speed + "ms";
        }
      }
    }
  };

  var swiperslider = new Swiper(".bannerslide", swiperOptions);

  // DATA BACKGROUND IMAGE
  var sliderBgSetting = $(".slide-bg-image");
  sliderBgSetting.each(function (index) {
    if ($(this).attr("data-background")) {
      $(this).css("background-image", "url(" + $(this).data("background") + ")");
    }
  });



document.querySelectorAll('.tab-slider--trigger').forEach(tab => {
  tab.addEventListener('click', function () {
      // Remove active class from all tabs
      document.querySelectorAll('.tab-slider--trigger').forEach(item => item.classList.remove('active'));
      this.classList.add('active');

      // Remove active class from all contents
      document.querySelectorAll('.content').forEach(content => content.classList.remove('active'));

      // Show the corresponding content
      const rel = this.getAttribute('rel');
      document.getElementById(rel).classList.add('active');
  });
});
})




// Cursor script

$( document ).ready(function() {

	//attach div to cursor each time mouse moves
	$(document).mousemove(function(e){
	    $(".custom-cursor").css({left:e.pageX, top:e.pageY});
	});

	//attempt to attach div to cursor each time window scrolls
	$(document).on('scroll', function(e){
   		$(".custom-cursor").css({left:e.pageX, top:e.pageY});
	});


	//change cursor over projects
	$('.thumbnail').mouseenter(function() {
	    $('.custom-cursor').addClass('activeproject');
	});

	$('.thumbnail').mouseleave(function() {
	    $('.custom-cursor').removeClass('activeproject');
	});

	//change cursor over menu
	$('body a').mouseenter(function() {
	    $('.custom-cursor').addClass('activemenu');
	});

	$('body a').mouseleave(function() {
	    $('.custom-cursor').removeClass('activemenu');
	});
	
    //change cursor over menu
	$('body p, body h1, body h2, body h3, body h4, body h5, body h6, body span, body li').mouseenter(function() {
	    $('.custom-cursor').addClass('activemenu');
	});

	$('body p, body h1, body h2, body h3, body h4, body h5, body h6, body span, body li').mouseleave(function() {
	    $('.custom-cursor').removeClass('activemenu');
	});

});


$(window).on('load', function() {
  $('.loader').addClass('loaded');
  // Enable scrolling once the preloader is loaded
  $('body').removeClass('no-scroll-y');

  if ($('.loader').hasClass('loaded')) {
      // Remove the preloader section after a delay
      $('.loader').delay(1000).queue(function() {
          $(this).remove();
      });
  }
});



$(document).ready(function () {
  var lastScrollTop = 0;

  function handleScroll() {
      if ($(window).width() >= 768) { // Check if the viewport width is >= 768px
          var st = $(window).scrollTop(); // Get the scroll position of the window
          
          if (st > lastScrollTop && st >= 100) {
              // downscroll code
              $('.headerSection').addClass('scroll-down').removeClass('scroll-up');
          } else if (st < lastScrollTop) {
              // upscroll code
              $('.headerSection').addClass('scroll-up').removeClass('scroll-down');
          }

          if (st <= 1) {
              // Reset classes when at the top of the page
              $('.headerSection').removeClass('scroll-down scroll-up');
          }

          lastScrollTop = st; // Update last scroll position
      } else {
          // For screens smaller than 768px, reset classes
          $('.headerSection').removeClass('scroll-down scroll-up');
      }
  }

  // Call the handleScroll function on scroll
  $(window).scroll(handleScroll);

  // Reapply logic when resizing window
  $(window).resize(function () {
      if ($(window).width() < 768) {
          // Reset classes when the viewport is smaller than 768px
          $('.headerSection').removeClass('scroll-down scroll-up');
      }
  });
});



// Scroll Top Button
document.addEventListener("DOMContentLoaded", () => {
  const scrollToTopBtn = document.querySelector(".scrollToTop");
  const rootElement = document.documentElement;
  const bodyElement = document.body;
  const progressBar = document.getElementById("progress-bar");
  const pathLength = document
    .querySelector("#progress-bar > svg > path")
    .getTotalLength();

  scrollToTopBtn.addEventListener("click", () => {
    rootElement.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.addEventListener("scroll", () => {
    const scrollAmount = pathLength / 100;
    const scrollPosition = Math.round(
      ((rootElement.scrollTop || bodyElement.scrollTop) /
        ((rootElement.scrollHeight || bodyElement.scrollHeight) -
          innerHeight)) *
        100 *
        scrollAmount
    );

    if (scrollPosition > 5) {
      scrollToTopBtn.classList.add("showBtn");
      progressBar.style.setProperty("--scrollAmount", scrollPosition + "px");
    } else {
      scrollToTopBtn.classList.remove("showBtn");
    }
  });
});


// menu Button
document.querySelectorAll(".hamburger").forEach((element) => {
  element.addEventListener("click", (event) => {
    element.classList.toggle("is-active");
  });
  
});

$(document).ready(function () {
  function isMobile() {
    return $(window).width() <= 768; // Check if screen width is 768px or smaller
  }

  $(".hamburger").click(function () {
    if (isMobile()) {
      $(".navSection").animate({ width: "toggle" });
    }
  });

  $(".navibtn").click(function () {
    if (isMobile()) {
      $(".navSection").animate({ width: "toggle" });
      $(".hamburger").removeClass("is-active"); // Remove 'is-active' class
    }
  });

  $(window).resize(function () {
    if (!isMobile()) {
      $(".navSection").removeAttr("style"); // Reset inline styles if screen is larger than 768px
      $(".hamburger").removeClass("is-active");
    }
  });
});


// // go to top with side bar nav
// $(function(){
//   $(window).scroll(function() {
  
  
//   }).scroll();
//   $('.navibtn').click(function() {
//       var target = $(this).data('target'); // Get the target section ID from data attribute
//       $('html, body').animate({
//         scrollTop: $(target).offset().top - 50 // Scroll to the top of the target section with an offset of 100px
//       }, 1000); // Adjust the duration of the animation as needed
//     });
  
//   })
  

//   $(document).ready(function() {
//     $(window).on('scroll', function() {
//         var windscroll = $(window).scrollTop();
//         if (windscroll >= 100) {
//             $('.sectionTop').each(function() {
//                 var sectionID = $(this).attr('id');
//                 if ($(this).position().top <= windscroll + 140) {
//                     $('.navWrapper ul li a.active').removeClass('active');
//                     $('.navWrapper ul li a[href="#' + sectionID + '"]').addClass('active');
//                 }
//             });
//         } else {
//             $('.navWrapper ul li a.active').removeClass('active');
//             $('.navWrapper ul li a:first').addClass('active');
//         }
//     });

// });



$(function () {
  $('.listSlider').owlCarousel({
      loop: false,
      margin: 0,
      nav: true,
      dots: false,
      autoplay: true,
      // slideTransition: 'linear',
      autoplayTimeout: 4000,
      autoplaySpeed: 2000,
      smartSpeed: 550,
      autoplayHoverPause: true,
      // animateIn: 'animate__fadeIn',
      // animateOut: 'animate__fadeOut',
      smartSpeed: 500,
      responsive: {
          0: {
              items: 1
          },
          600: {
              items: 2
          },
          1000: {
              items: 4
          }
      }
  })
})

$(function () {
  $('.testislider').owlCarousel({
      loop: true,
      margin: 20,
      nav: false,
      dots: false,
      autoplay: true,
      // slideTransition: 'linear',
      autoplayTimeout: 10000,
      autoplaySpeed: 2000,
      smartSpeed: 550,
      autoplayHoverPause: true,
      // animateIn: 'animate__fadeIn',
      // animateOut: 'animate__fadeOut',
      smartSpeed: 500,
      responsive: {
          0: {
              items: 1
          },
          600: {
              items: 1
          },
          1000: {
              items: 1
          }
      }
  })
})



document.addEventListener("DOMContentLoaded", function () {
  var logoImage = document.querySelector('img[alt="Optics & Photonic Centre"]');

  function toggleLogoImage() {
    var header = document.querySelector(".headerSection");

    if (header.classList.contains("scroll-up") || header.classList.contains("scroll-down")) {
      logoImage.src = "assets/img/logo.png";
    } else {
      logoImage.src = "assets/img/logo-light.png";
    }
  }

  var observer = new MutationObserver(toggleLogoImage);
  observer.observe(document.querySelector(".headerSection"), {
    attributes: true,
    attributeFilter: ["class"],
  });

  // Initial check to set the correct logo on page load
  toggleLogoImage();
});



$(document).ready(function(e) {
	var newsNum = $(".eventTicker li").length;
	
	var totalNews_H =0;	
	for(var i=0; i<newsNum; i++){
		var news_H = $(".eventTicker li").eq(i).outerHeight(true);
		totalNews_H = totalNews_H + news_H;
	}
	
	$(".eventTicker").css('height', totalNews_H+'px');	
	
	var speed =1, animAmount, animInterval;
	
	animateNews();

	function animateNews(){
		$(".eventTicker li").eq(0).animate({
			'marginTop' : '-='+ speed + 'px'
		},1, function(){
			animAmount = speed;
			var animNews_H = $(".eventTicker li").eq(0).outerHeight(true);
			
			if(animAmount >= animNews_H){
				$(this).parent().append($(this));
				$(this).removeAttr('style');	
			}
			
			animInterval = setTimeout(function(){
				animateNews();	
			},50);	
		});
	}
	
	$(".eventTicker").hover(function(){
		clearTimeout(animInterval);
		$(".eventTicker li").eq(0).stop();	
	}, function(){
		animateNews();	
	});
});


$(document).ready(function () {
  new Swiper('.swiper-gallery-container', {
    loop: false,
    slidesPerView: 3,
    spaceBetween: 20,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    breakpoints: {
      1920: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      1028: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      480: {
        slidesPerView: 1,
        spaceBetween: 10
      }
    }
  });
});

  

// Filter
$(function(){
  var $grid = $('.element-item').parent().isotope({
    itemSelector: '.element-item',
    layoutMode: 'fitRows'
  });

  var buttonFilter = '*'; // default to all
  var selectFilter = '*'; // default to all

  // Button group filter
  $('.js-radio-button-group').on('click', 'button', function () {
    $('.js-radio-button-group .button').removeClass('is-checked');
    $(this).addClass('is-checked');
    buttonFilter = $(this).attr('data-filter');
    filterItems();
  });

  // Select filter
  $('#filters-2').on('change', function () {
    selectFilter = this.value;
    filterItems();
  });

  function filterItems() {
    var filterValue = buttonFilter + selectFilter;
    $grid.isotope({ filter: filterValue });
  }
})