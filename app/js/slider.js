(function () {
    'use strict';

    var slider = {
        initialize : function () {
            this.setUpListeners();
        },

        setUpListeners : function () {
            $('.slider__controls-arrow').on('click', this.slide);
        },

        slide : function (e) {
            e.preventDefault();

            var
                $this           = $(this),
                container       = $this.closest('.slider'),
                list            = container.find('.slider__list'),
                items           = container.find('.slider__item'),
                activeSld       = items.filter('.active'),
                nextSld         = activeSld.next(),
                prevSld         = activeSld.prev(),
                firstSld        = items.first(),
                lastSld         = items.last(),
                sliderOffset    = container.offset().left,
                counter         = 0;

            if ($this.hasClass('slider__controls-arrow_right')) {

                if (nextSld.length) {
                    counter = nextSld.offset().left - sliderOffset;
                    slider.removeActiveSlide(nextSld);
                } else {
                    counter = firstSld.offset().left - sliderOffset;
                    slider.removeActiveSlide(firstSld);
                }

            } else {

                if (prevSld.length) {
                    counter = prevSld.offset().left - sliderOffset;
                    slider.removeActiveSlide(prevSld);
                } else {
                    counter = lastSld.offset().left - sliderOffset;
                    slider.removeActiveSlide(lastSld);
                }
            }

            list.css({
                'left' : '-=' + counter + 'px'
                });
        },

        removeActiveSlide : function(slide) {
            slide.addClass('active').siblings().removeClass('active');
        }
    };

slider.initialize();
}());
