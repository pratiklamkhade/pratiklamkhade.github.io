$(function () {
    // $('.cover-right').hide();
    // $('.cover-left').hide();
    //   $(".main-cover-right")
    //     .show("fast")
    //     .animate({
    //       width: "100%",
    //       left: "0vw"
    //     });

    //   $(".main-cover-left")
    //     .show("fast")
    //     .animate({
    //       width: "100%",
    //       left: "0vw"
    //     });

    // $('.main').css('height',$(window).innerHeight())
    // $('body').css('height',$(window).innerHeight())
    // $(window).on('resize',function () {
        // $('.main').css('height',$(window).innerHeight())
        // $('body').css('height',$(window).innerHeight())
    // })

    $(".main-cover").on("click", function () {
        if ($(".main-cover-right").is(':visible')) {
            $(".main-cover-right").addClass('main-cover-right-ani')
            $('#main-cover-right').delay(700).animate({
                width: "0%",
                left: "100vw"
            }).hide("fast");

            $(".main-cover-left").addClass('main-cover-left-ani')
            $('#main-cover-left').delay(700).animate({
                width: "0%",
                left: "-100vw"
            }).hide("fast");
        }
    });

    $("#icon").on("click", function () {
        if (!($('.menu-container').is(':visible'))) {
            $("#icon").toggleClass("active");
        }
        if ($(".active").is(":visible")) {
            console.log("Visible");
            $(".cover-right")
                .show("fast")
                .animate({
                    width: "100%",
                    left: "0vw"
                })
            $('.cover-right-content').show('slow').queue(function (next) {
                $('.home').animate({
                    marginLeft: '43%',
                    opacity: '1'
                }, 400)

                $('.about').animate({
                    marginLeft: '50%',
                    opacity: '1'
                }, 300)

                $('.work').animate({
                    marginLeft: '57%',
                    opacity: '1'
                }, 200)

                $('.reach').show().animate({
                    marginLeft: '64%',
                    opacity: '1'
                }, 100)
                next();
            });

            $(".cover-left")
                .animate({
                    opacity: '1'
                }, 1000).dequeue();

            // $('.home').animate({
            //     marginLeft:
            // })

        } else {
            console.log("hidden");

            $('.reach').animate({
                marginLeft: '85%',
                opacity: '0.0'
            }, 100)

            $('.work').animate({
                marginLeft: '85%',
                opacity: '0.0'
            }, 200)

            $('.about').animate({
                marginLeft: '85%',
                opacity: '0.0'
            }, 300)
            // .hide('fast')

            $('.home').animate({
                marginLeft: '85%',
                opacity: '0.0'
            }, 400)
            $('.cover-right-content').hide('slow')
                .queue(function (next) {
                    $(".cover-right").animate({
                        width: "0%",
                        left: "100vw"
                    }).hide("fast");

                    $(".cover-left")
                        .animate({
                            opacity: '0'
                        })
                }).dequeue();
        }
    });
    $('#home').on('click', function () {
        $('#icon').click();
    })
    $('#about').on('click', function () {
        $('.menu-container').animate({
            'opacity': '1.0',
            'height': '90vh',
            'display':'flex'
        }, 300).show()
        $('.about-text').show();
        $('#menu-close').addClass('active');
    })

    $('#work').on('click', function () {
        $('.menu-container').animate({
            'opacity': '1.0',
            'height': '90vh',
        }, 300).show()
        $('.work-text').show();
        $('#menu-close').addClass('active');
    })
    $("#project-tabs div").on('click',function () {
        console.log($(this).attr('class'))
        let $text = "."+$(this).attr('class')+"-text"
        console.log($text)
        $(this).css({
            // 'border-width': '2px 2px 2px 2px',
            'border-style': 'solid',
            'box-shadow':'inset 0px 0px 0.5px 0px black',
            'background-color':'rgb(232,232,232)'
        })
  
        $($text).show();
        // $($("#projects li").not(this).attr('class')+"-text").hide();
        $("#project-tabs div").not(this).css({
            'border-width': '0px 2px 2px 0px',
            'border-style': 'solid',
            'border-color': 'black',
            'box-shadow':'none',
            'background-color':'transparent'
        })
        $("#project-tabs div").not(this).each(function(){
            // console.log($(this).attr('class')+"-text")
            let $text_not = "."+$(this).attr('class')+"-text"
            console.log($text_not)
            $($text_not).hide();
        })
    })

    $('#reach').on('click', function () {
        $('.menu-container').animate({
            'opacity': '1.0',
            'height': '90vh'
        }, 300).show()
        $('.reach-text').show();
        $('#menu-close').addClass('active');
    })

    $('#menu-close').on('click', function () {
        $('.menu-container').animate({
            'opacity': '0.0',
            'height': '0vh'
        }, 300, function () {
            $('.menu-container').hide()
            $('#menu-close').removeClass('active');
            $('.about-text').hide();
            $('.work-text').hide();
            $('.reach-text').hide();
        })
    })

    $('#img-btn').click(function (e) {
        e.preventDefault();
        $('.modal-bg').fadeIn();
        $('.modal-content').addClass('fadeIn')
        $('#modal-close').addClass('active');
    });
    $('.modal-bg').click(function (e) {
        e.preventDefault();
        if (e.target !== this)
            return;
        else {
            $('#modal-close').removeClass('active');
            $('.modal-bg').fadeOut();
        }
    });
    $('#modal-close').click(function (e) {
        e.preventDefault();
        $('#modal-close').removeClass('active');
        $('.modal-bg').fadeOut()

    });
    $('#right-arrow').click(function (e) {
        e.preventDefault();
        if ($("#resume-1").is(":visible")) {
            $('#resume-1').addClass('fadeOutLeft').one('animationend', function () {
                $('#resume-1').addClass('resume').removeClass('fadeOutLeft');
                $('#resume-2').removeClass('resume').addClass('fadeInRight').one('animationend', function () {
                    $('#resume-2').removeClass('fadeInRight')
                });
            })
        }
    })
    $('#left-arrow').click(function (e) {
        e.preventDefault();
        if ($("#resume-2").is(":visible")) {
            $('#resume-2').addClass('fadeOutRight').one('animationend', function () {
                $('#resume-2').addClass('resume').removeClass('fadeOutRight');
                $('#resume-1').removeClass('resume').addClass('fadeInLeft').one('animationend', function () {
                    $('#resume-1').removeClass('fadeInLeft')
                });;
            })
        }
    })
});