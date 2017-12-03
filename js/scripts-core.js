// Add target="_blank" when user opens external link
(function() {
  var a = document.querySelectorAll('a');
  for (var i = 0; i < a.length; i++) {
    if (a[i].host !== location.host) {
      a[i].setAttribute('target', '_blank');
      a[i].setAttribute('rel', 'noopener noreferrer');
    }
  }
}());

(function() {
    $(document).ready(function() {
        dropDown($('#dropdown__btn'), $('.dropdown__menu')) ;
        setSliderHeight();
        controlSlider();
        initFilmAnimation();
        mobMenu();
        ymaps.ready(initMap);
        $(window).resize(function() {
            setSliderHeight();
        });
    });

    function dropDown($btn, $menu) {
        $btn.click(function() {
            if (!$('body').hasClass('act')) {
                if ($menu.hasClass('slideInDown')) {
                    $menu.removeClass('slideInDown').addClass('slideOutUp');
                } else {
                    $menu.removeClass('slideOutUp').addClass('slideInDown');
                }
            }
            return false;
        });
    }

    function setSliderHeight() {
        var h = $(window).height();
        $('#slider .item').height(h);
    }

    function controlSlider() {
        var owl = $('#slider'),
            time = 9,
            timer;

        function startBarCount() {
            var $bar = $('#progress'),
                progress = 0;

            timer = setInterval(function () {
                if ( progress <= 100 ) {
                    progress += 1 / time;
                    $bar.css('width', progress + '%');
                } else {
                   $(owl).trigger('next.owl.carousel', [1400]); 
                }
            }, 10);
        }

        $(owl).owlCarousel({
            items: 1,
            mouseDrag: false,
            slideSpeed : 1200,
            navSpeed: 1200,
            touchDrag: true,
            navText: ['',''],
            loop: true,
            nav: true,
            dots: false,
            initialize: startBarCount()
        });

        owl.on('initialize.owl.carousel', function(e) {
            startBarCount();
        });

        owl.on('changed.owl.carousel', function(e) {
            clearInterval(timer);
            startBarCount();
        });
    }

    function initFilmAnimation() {
        $('#films .film').each(function( e ) {
            var $parent = $(this),
                w = $($parent).width(),
                h = $($parent).height(),
                $img = $(this).find('.film__img'),
                $shine = $(this).find('.shine');

            function transformImg (offsetX, offsetY, offsetImg, angle, opacity) {
                var translateImg = 'translateY(' + (-offsetX * offsetImg) + 'px) '
                                 +' rotateX(' + (-offsetY * offsetImg) + 'deg) '
                                 +' rotateY(' + (offsetX * (offsetImg * 2)) + 'deg)', 
                    gradient = 'linear-gradient('
                             + angle + 'deg, rgba(255,255,255, '
                             + opacity  + ') '
                             +'0%,rgba(255,255,255,0) 80%)';

                $($shine).css('background', gradient);
                $($img).css('transform', translateImg);
            }

            $($parent).on('mousemove', function(e) {
                var offsetImg = $img.data('offset'),
                    offsetX = 0.5 - e.offsetX / w, 
                    offsetY = 0.5 - e.offsetY / h,
                    opacity = e.offsetY / h,
                    dx = e.offsetX - w / 2,
                    dy = e.offsetY - h / 2, 
                    theta = Math.atan2(dy, dx),
                    angle = theta * 180 / Math.PI - 90;

                if (angle < 0) { angle = angle + 360; }

                transformImg(offsetX, offsetY, offsetImg, angle, opacity);
            }).on('mouseleave', function(e) {
                transformImg(0, 0, 0, 0, 0);
            });
        });
    }

    function initMap(){ 
        var map, myPlacemark;

        map = new ymaps.Map('map', {
            center: [54.7212,20.4820],
            zoom: 16
        });    
        map.behaviors.disable('scrollZoom');

        myPlacemark = new ymaps.Placemark([54.7207,20.4832], {
            iconContent: ' '
        }, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/images/map-point.png',
            iconImageSize: [50, 59],
            iconImageOffset: [-28, -60]
        });
        
        map.geoObjects.add(myPlacemark);
    }

    function mobMenu() {
        $('.menu-switch').click(function() {
            $('body').toggleClass('act');
            return false;
        });
    }
}());
