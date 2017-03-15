$(document).ready(function(){
    //====================================
    //--------- Functions ----------------
    //====================================

    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this;
            var args = arguments;

            var later = function () {
                timeout = null;
                if (!immediate) {
                    func.apply(context, args);
                }
            };

            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                func.apply(context, args);
            }
        };
    }

    // HOW IT USE
    // var myEfficientFn = debounce(function () {
    //     // All the taxing stuff you do
    // }, 250);
    //
    // window.addEventListener('resize', myEfficientFn);
    function equalHeight(container) {
        var currentTallest = 0;
        var currentRowStart = 0;
        var rowDivs = new Array();
        var $el;
        var topPosition = 0;

        $(container).each(function () {

            $el = $(this);
            $($el).height('auto');
            topPostion = $el.position().top;

            if (currentRowStart !== topPostion) {
                for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                    rowDivs[currentDiv].height(currentTallest);
                }
                rowDivs.length = 0; // empty the array
                currentRowStart = topPostion;
                currentTallest = $el.height();
                rowDivs.push($el);
            } else {
                rowDivs.push($el);
                currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
            }

            for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
        });
    }
    // Miss click
    function missClick(div) {
        if (!div.is(e.target) && // если клик был не по нашему блоку
            div.has(e.target).length === 0) { // и не по его дочерним элементам
            div.hide(); // скрываем его
        }
    }
    // END Miss click

    // Обертка для вызова функции
    // jQuery(function ($) {
    //     $(document).mouseup(function (e) { // событие клика по веб-документу
    //         // Вызываем функцию с необходимым параметром при клике
    //     });
    // });
    // Responsive iframe video

    function responsiveIframe(contentContainer) {
        var videoWrapper = '<div class"embed-responsive embed-responsive-16by9"></div>';
        contentContainer.find('iframe').wrap(videoWrapper);
    }
    // END Responsive iframe video

    //====================================
    //--------- Custom Scripts -----------
    //====================================

    function initializeMap() {

        var isMobile = {
            Android: function () {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function () {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function () {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function () {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function () {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function () {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        };
        var styles = [
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "lightness": 100
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#C6E2FF"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#C5E3BF"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#D1D1B8"
                    }
                ]
            }
        ];
        var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

        var myLatLng = new google.maps.LatLng(50.071036,14.402522);
        var drag = !isMobile.any();
        var mapOptions = {
            zoom: 16,
            center: myLatLng,
            scrollwheel: false,
            draggable: drag,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');


    	var image = '/images/main/marker.png'; // icon map image
    	var beachMarker = new google.maps.Marker({
    		position: myLatLng,
    		map: map,
    		icon: image
    	});
    //    var marker = new google.maps.Marker({
    //        position: myLatLng,
    //        map: map
    //    });
    }
    google.maps.event.addDomListener(window, "load", initializeMap);
	 $(function () {
	 	$(window).scroll(function () {
	 		if ($(this).scrollTop() > 0 && !$('.top').hasClass('scrolling')) {
	 			$('.btn-up').addClass('active-top');
	 		}
	 		else {
	 			$('.btn-up').removeClass('active-top');
	 		}
	 	});
	 	$('.btn-up').click(function () {
	 		$('body,html').animate({
	 			scrollTop: 0
	 		}, 900, function () {
	 			$('.btn-up').removeClass('active-top');
	 		});
	 	});
	 });
    // Modal popup

    var cookie = document.cookie;
    var date = new Date();

    // Modal show timer
    if (cookie.indexOf('popclose=submited') === -1) {
        setTimeout(function () {
            $('#Modal').modal('show');
        }, 2000); // Time popUp
    }

    $('#Modal .close').click(function () {
        date.setDate(date.getDate() + 14);
        document.cookie = 'popclose=submited; expires=' + date.toGMTString();
    });

    $('#Modal').click(function (data, handler) {
        if (data.target === this) {
            date.setDate(date.getDate() + 14);
            document.cookie = 'popclose=submited; expires=' + date.toGMTString();
        }
    });

    // For form id
    $('#lottery-popup-form').on('beforeSubmit', function () {
        date.setDate(date.getDate() + 365);
        document.cookie = 'popclose=submited; expires=' + date.toGMTString();
    });
    // End Modal popup script

    //====================================
    //--------- Setting libs -------------
    //====================================
	//	  Hamburger

		$(".hamburger").click(function () {
			if($('.hamburger').hasClass("is-active") == true) {
				$('body').removeClass('modal-open');
				$('div.nav-backdrop').remove();
				$('.hamburger').removeClass('is-active');
				$('nav').removeClass('menu-active');


			}

			else {
				$('body').addClass('modal-open').append('<div class="modal-backdrop nav-backdrop fade in"></div>');
				$(this).toggleClass("is-active");
				$('nav').addClass('menu-active');

				$('.nav-backdrop').click(function () {
					$('.hamburger').removeClass('is-active');
					$('body').removeClass('modal-open');
					$('nav').removeClass('menu-active');
					$(this).remove();
				});

			}

			});

	//	  Привоение активного класса меню

		  	$(".menu-list > a").click(function(e){
				$("a.active-link").removeClass("active-link");
				$(e.target).addClass("active-link");
			});

		  function windowSize(){
			   if (window.innerWidth >= 768) {
					$('div.nav-backdrop').remove();
				   	$('body').removeClass('modal-open');
				   	$('.left-block').removeClass('height-left-block');
			   } else {
				   $('.left-block').addClass('height-left-block');
			   }
		   }
	 		$(window).resize(windowSize);


	//Scroll menu
	///////////////////////////////////////////////////
		$('.menu a[href^="#"]').click(function(){
			var el = $(this).attr('href');
			$('html, body').animate({
				scrollTop: $(el).offset().top}, 800);
			return false;
		});

		$(window).scroll(function () {
			var inview = '#' + $("section:in-viewport:first").attr('id'),
			$link = $('#mobile a[href$="' + inview + '"]');

			if ($link.length && !$link.is('.active-link')) {

				$('#mobile a').removeClass('active-link');
				$link.addClass('active-link');
				$('#mobile a').blur();
				window.location.hash = inview.substring(0,1) + 'tab=' + inview.substring(1);
			}
		});

		var menu_selector = "#mobile";
		function onScroll(){
			var scroll_top = $(document).scrollTop();
			$(menu_selector + " a").each(function(){
				var hash = $(this).attr("href");
				var target = $(hash);
				if (target.position().top <= scroll_top && target.position().top + target.outerHeight() > scroll_top) {
					$(menu_selector + " a.active-link").removeClass("active-link");
					$(this).addClass("active-link");
				} else {
					$(this).removeClass("active-link");
				}

			});
		}
	//	Слик карусель партнеров
	$('.partner-slick').slick({
		dots: false,
		infinite: true,
		speed: 300
		, slidesToShow: 4
		, slidesToScroll: 4
		, responsive: [
			{
				breakpoint: 991
				, settings: {
					slidesToShow: 2
					, slidesToScroll: 2
					, infinite: true
					, dots: true
				}
			}
			, {
				breakpoint: 600
				, settings: {
					slidesToShow: 1
					, slidesToScroll: 1
				, }
			}
			, // You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		  ]
	});
	//	Magnific popUp
			$(document).ready(function() {
				$('.gallery').magnificPopup({
					delegate: 'a',
					type: 'image',
					tLoading: 'Loading image #%curr%...',
					mainClass: 'mfp-img-mobile',
					gallery: {
						enabled: true,
						navigateByImgClick: true,
						preload: [0,1] // Will preload 0 - before current, and 1 after the current image
					},
					image: {
						tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
						titleSrc: function(item) {
							return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
						}
					}
				});
			});


    //====================================
    //-------- Only this site ------------
    //====================================
	//	  Валидация

		$('.form-control').on("focus", function(e) {
			console.log(e.target);
			$(e.target).siblings('.validation-error').addClass('validation-active');
		});

		 $('.form-control').on("blur", function() {
			$(".validation-error").removeClass('validation-active');
		});
	(function ($) {
	    $.belowthefold = function (element, settings) {
	        var fold = $(window).height() + $(window).scrollTop();
	        return fold <= $(element).offset().top - settings.threshold;
	    };
	    $.abovethetop = function (element, settings) {
	        var top = $(window).scrollTop();
	        return top >= $(element).offset().top + $(element).height() - settings.threshold;
	    };
	    $.rightofscreen = function (element, settings) {
	        var fold = $(window).width() + $(window).scrollLeft();
	        return fold <= $(element).offset().left - settings.threshold;
	    };
	    $.leftofscreen = function (element, settings) {
	        var left = $(window).scrollLeft();
	        return left >= $(element).offset().left + $(element).width() - settings.threshold;
	    };
	    $.inviewport = function (element, settings) {
	        return !$.rightofscreen(element, settings) && !$.leftofscreen(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
	    };
	    $.extend($.expr[':'], {
	        "right-of-screen": function (a, i, m) {
	            return $.belowthefold(a, {
	                threshold: 0
	            });
	        },
	        "above-the-top": function (a, i, m) {
	            return $.abovethetop(a, {
	                threshold: 0
	            });
	        },
	        "": function (a, i, m) {
	            return $.leftofscreen(a, {
	                threshold: 0
	            });
	        },
	        "right-of-screen": function (a, i, m) {
	            return $.rightofscreen(a, {
	                threshold: 0
	            });
	        },
	        "in-viewport": function (a, i, m) {
	            return $.inviewport(a, {
	                threshold: 0
	            });
	        }
	    });
	})(jQuery);




});
