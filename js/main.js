$(document).ready(function(){
  var player = videojs(document.querySelector('.video-js'), {
    html5: {
        hls: {
            overrideNative: !videojs.browser.IS_SAFARI
        },
    },
  });

  $('.scroll_down').on('click touch', function () {
    $('html, body').animate({
        scrollTop: $(window).height()
    }, 'slow');
  });

  $('.hero__play').on('click touch', function () {
    player.play();
  });

  $('.carousel__slide').each(function(){
    $(this).on('click touch', function(){
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
          slidesToScroll: 1,
          variableWidth: true
        }
      }
    ]
  });
});