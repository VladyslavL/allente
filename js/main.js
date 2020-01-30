$(document).ready(function(){
  // Init HLS
  var player = document.querySelector('.hero__video');

  var initHLS = function(){
    if(Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(player.src);
      hls.attachMedia(player);
      hls.on(Hls.Events.MANIFEST_PARSED,function() {
        player.play();
    });
   }
  }

  var videoWather = function(){
    player.addEventListener('playing', function(){
      player.classList.remove('paused');
      player.classList.add('playing');
    }, false);
    player.addEventListener('play', function(){
      player.classList.remove('paused');
      player.classList.add('playing');
    }, false);

    player.addEventListener('pause', function(){
      player.classList.remove('playing');
      player.classList.add('paused');
    }, false);
  }

  // Determining which one method we will use
  var clickEventType = ((document.ontouchstart!==null)?'click':'touchstart');
  console.log(clickEventType)

  initHLS();
  videoWather();

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
      player.src = $(this).data('src');
      initHLS();
      $('html, body').animate({
        scrollTop: 0
      }, 'slow');
  });

  // Scroll the page on .scroll_down click
  $('.scroll_down').on(clickEventType, function () {
    $('html, body').animate({
        scrollTop: $('.hero').height() + $('.topbar').height()
    }, 'slow');
  });


  // Play video on .hero__play click
  $('.hero__play').on(clickEventType, function () {
    player.play();
  });
});