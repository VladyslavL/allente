$(document).ready(function(){
  var player = videojs(document.querySelector('.video-js'), {
    html5: {
        hls: {
            overrideNative: !videojs.browser.IS_SAFARI
        },
    },
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

  var isSliding = false;
  console.log(isSliding)

  $('.carousel').on('beforeChange', function() {
      isSliding = true;
      console.log(isSliding)
  });

  $('.carousel').on('afterChange', function() {
      isSliding = false;
      console.log(isSliding)
  });

  $('.carousel').find(".carousel__slide").click(function() {
      if (isSliding) {
        event.stopImmediatePropagation();
        event.stopPropagation();
        event.preventDefault();
        return false;
      }
      console.log(isSliding)
      
      $(this).on(clickEventType, function(){
        console.log('clicked')
        player.src($(this).data('src'));
        $('html, body').animate({
          scrollTop: 0
        }, 'slow');
      });
  });

  // Adds a class when swipping...
  // $('.slick-slide').on('drag dragover dragstart', function(event, slick, direction){
  //   console.log('dragging');
  // });
  // $('.carousel').on('beforeChange', function(event, slick, direction){
  //   $('.carousel').addClass('swipping');
  //   console.log('beforeChange');
  // });
  // $('.carousel').on('swipe', function(event, slick, direction){
  //   console.log('swiped');
  //   $('.carousel').addClass('swipping');
  // });

  // Remove tha class after swipe was done, AND delayed of ~100 ms
  // $('.carousel').on('afterChange', function(event, slick, currentSlide, nextSlide){
  //     console.log('afterchange');
  //     setTimeout( function(){ $('.carousel').removeClass('swipping'); } , 110 );
  // });
  // Your event on the item when the user clicks on.

  var clickEventType = ((document.ontouchstart!==null)?'click':'touchstart');
  console.log(clickEventType)

  $('.scroll_down').on(clickEventType, function () {
    $('html, body').animate({
        scrollTop: $('.hero').height() + $('.topbar').height() + 5
    }, 'slow');
  });

  $('.hero__play').on(clickEventType, function () {
    player.play();
  });

  $('.carousel__slide').each(function(){
    $(this).on(clickEventType, function(){
      console.log('clicked')
      player.src($(this).data('src'));
      $('html, body').animate({
        scrollTop: 0
      }, 'slow');
    });
  });
});