var module = (function () {
    'use strict';

    var app = {
        initialize : function () {
            this.setUpListeners();
        },

        setUpListeners : function () {
            $(window).on('scroll', this.scrolling);
            $('#toTop').on('click', this.toTop);
        },

        scrolling : function() {
            if ($(this).scrollTop() != 0) {
                $('#toTop').fadeIn();
            } else {
                $('#toTop').fadeOut();
            }
        },

        toTop : function() {
            $('body,html').animate({scrollTop: '0px'}, 800);
        }
	};

app.initialize();

}());
