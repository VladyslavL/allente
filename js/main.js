$(document).ready(function(){
  // Init VideoJS
  var player = videojs(document.querySelector('.video-js'), {
    html5: {
        hls: {
            overrideNative: !videojs.browser.IS_SAFARI
        },
    },
  });

  // Init carousel
  $('.carousel').slick({
    dots: true,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  // Dssabling click event triggering on carousel dragging/swipping
  var isSliding = false;
  $('.carousel').on('beforeChange', function() {
      isSliding = true;
  });
  $('.carousel').on('afterChange', function() {
      isSliding = false;
  });
  $('.carousel').find(".carousel__slide").click(function() {
      if (isSliding) {
        event.stopPropagation();
        event.preventDefault();
        return false;
      }
      player.src($(this).data('src'));
      $('html, body').animate({
        scrollTop: 0
      }, 'slow');
  });

  // Determining which one method we will use
  var clickEventType = ((document.ontouchstart!==null)?'click':'touchstart');
  console.log(clickEventType)

  // Scroll the page on .scroll_down click
  $('.scroll_down').on(clickEventType, function () {
    $('html, body').animate({
        // Added "5" to be sure that the player is scrolled
        scrollTop: $('.hero').height() + $('.topbar').height() + 5
    }, 'slow');
  });


  // Play video on .hero__play click
  $('.hero__play').on(clickEventType, function () {
    player.play();
  });
});