document.addEventListener('DOMContentLoaded', function(){
  // Init HLS
  var player = document.querySelector('.hero__video');

  var initHLS = function(){
    if(Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(player.getAttribute('data-src'));
      // hls.loadSource(player.src);
      hls.attachMedia(player);
      hls.on(Hls.Events.MANIFEST_PARSED,function() {
        // player.play();
    });
   }else{
     player.src = player.getAttribute('data-src');
    //  player.play();
     console.log('no hls');
     if(window.MSInputMethodContext) {
      player.classList.add('video-js')
      player.classList.add('vjs-default-skin')
       var videojsPlayer = videojs(player, {
         fluid: true
       });
       videojsPlayer.src(
         {
           src: player.src
         }
       );
     }
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
      if (this.seeking) return false;
      player.classList.remove('playing');
      player.classList.add('paused');
    }, false);
  }

  // Determining which one method we will use
  var clickEventType = ((document.ontouchstart!==null)?'click':'touchstart');
  console.log(clickEventType)

  initHLS();
  videoWather();

  if(document.querySelector('.carousel') !== null){
    // Init carousel
    var carousel = tns({
      "container": '.carousel',
      "items": 1,
      "gutter": 0,
      "controls": false,
      "mouseDrag": true,
      "responsive": {
        "576": {
          "items": 2,
          "gutter": 10
        },
        "768": {
          "items": 3,
          "gutter": 20
        }
      },
    });
  
    // // Dssabling click event triggering on carousel dragging/swipping
    var isSliding = false;
    carousel.events.on('touchMove', function() {
        isSliding = true;
    });
    carousel.events.on('touchEnd', function() {
        isSliding = false;
    });
    carousel.events.on('dragMove', function() {
      isSliding = true;
    });
    carousel.events.on('dragEnd', function() {
        isSliding = false;
    });
  
    var slides = document.querySelectorAll(".carousel__slide");
    for( i=0; i < slides.length; i++){
      slides[i].addEventListener('click', function() {
        if (isSliding) {
          event.stopPropagation();
          event.preventDefault();
          return false;
        }
        player.src = this.getAttribute('data-src');
        initHLS();
        document.querySelector('.topbar').scrollIntoView({behavior: 'smooth'})
        player.play();
      });
    }
  }

  // Scroll the page on .scroll_down click
  if(document.querySelector('.scroll_down') !== null){
    document.querySelector('.scroll_down').addEventListener(clickEventType, function () {
      document.querySelector('.content').scrollIntoView({behavior: 'smooth'})
    });
  }


  // Play video on .hero__play click
  if(document.querySelector('.hero__play') !== null){
    document.querySelector('.hero__play').addEventListener('click', function () {
      player.play();
    });
  }

  // function for Ajax POST
  function postAjax(url, data, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
            function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
        ).join('&');

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    xhr.send(params);
    return xhr;
  }

  var buttons = document.querySelectorAll("a");
  for( i=0; i < buttons.length; i++){
    buttons[i].addEventListener('click', function() {
      postAjax(document.querySelector('html').getAttribute('data-register-event'), 
              JSON.stringify({ 
                event: 'A_CLICK',
                originalUrl: window.location.href,
                lpid: document.querySelector('html').getAttribute('data-page-id'),
                href: this.href,
                title: this.title
              }), 
              function(data){ console.log(data); }
      );
      
    });

  }

  player.addEventListener('play', function(){
    if (this.seeking || this.currentTime >= 0.1) return;

    postAjax(document.querySelector('html').getAttribute('data-register-event'), 
            JSON.stringify({ 
              event: 'VID_PLAY',
              originalUrl: window.location.href,
              lpid: document.querySelector('html').getAttribute('data-page-id')
            }), 
            function(data){ console.log(data); }
    );
  }, false);

  player.addEventListener('ended', function(){
    postAjax(document.querySelector('html').getAttribute('data-register-event'), 
            JSON.stringify({ 
              event: 'VID_WATCHED',
              originalUrl: window.location.href,
              lpid: document.querySelector('html').getAttribute('data-page-id')
            }), 
            function(data){ console.log(data); }
    );
  }, false);
});