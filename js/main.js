$(document).ready(function(){
  var player = videojs(document.querySelector('.video-js'), {
    html5: {
        hls: {
            overrideNative: !videojs.browser.IS_SAFARI
        },
    },
  });

  var clickEventType = ((document.ontouchstart!==null)?'click':'touchstart');
  console.log(clickEventType)

  $('.scroll_down').on('click', function () {
    $('html, body').animate({
        scrollTop: $('.hero').height() + $('.topbar').height() + 5
    }, 'slow');
  });

  $('.hero__play').on('click', function () {
    player.play();
  });

  $('.carousel__slide').each(function(){
    $(this).on('click', function(){
      console.log('clicked')
      player.src($(this).data('src'));
      $('html, body').animate({
        scrollTop: 0
      }, 'slow');
    });
  });

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
});