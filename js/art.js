$("body").niceScroll();
function href(web) {
    window.location.href = web;
}

$(this).scroll(function() {
    $(".nav-item").each(function(index) {
        if($($(this).attr('scroll')).offset().top - $(window).scrollTop() - 70 <= 0) {
            $(this).siblings().removeClass('active');
            $(this).addClass('active')
        }
    });
});

$(".nav-item").click(function (event) {
    event.preventDefault();
    var dest = 0;
    if ($($(this).attr('scroll')).offset().top > $(document).height() - $(window).height()) {
        dest = $(document).height() - $(window).height();
    } else {
        dest = $($(this).attr('scroll')).offset().top;
    }
    dest = dest - 70;
    $('html,body').animate({scrollTop: dest}, 1000, 'swing');
});

$('.hidden').hide();

particlesJS('particles-js',
    {
        "particles": {
            "number": {
                "value": 200
            },
            "color": {
                "value": "#fefefe"
            },
            "shape": {
                "type": ["circle", "triangle", "polygon"]
            },
            "opacity": {
                "value": 1
            },
            "size": {
                "value": 5,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 30,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 130,
                "color": "#ffffff",
                "opacity": 0.3,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "bottom",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": false
                },
                "onclick": {
                    "enable": false
                },
                "resize": true
            },
            "modes": {
                "bubble": {
                    "distance": 50,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                }
            }
        }
    }
);