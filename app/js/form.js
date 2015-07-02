$.fn.tooltip = function (options) {
	option = {
		position	: options.position || 'right',
		content		: options.content || 'Im a tooltip'
	};
	var markup = '<div class="tooltip tooltip-' + options.position + '">\
			<div class="tooltip__inner">\
				' + options.content + '\
			</div>\
		</div>';

	var $this = this,
		body = $('body');

	$this
		.addClass('tooltipped')
		.attr('data-tooltip-position', options.position);

	body.append(markup);

	_positioning($this, body.find('.tooltip').last(), options.position);


	$('.call-form__inner-input').on('keydown', function(){
		$('.tooltip').remove();
	});

	$(window).on('resize', function(){

		var
			tooltips = $('.tooltip');

		var
			tooltipsArray = [];

		tooltips.each(function(){
			tooltipsArray.push($(this));
		});

		$('.tooltipped').each(function(index){
			var
				position = $(this).data('tooltip-position');

			_positioning($(this), tooltipsArray[index], position);
		});

	});

	function _positioning(elem, tooltip, position) {
		var
			elemWidth	= elem.outerWidth(true),
			elemHeight	= elem.outerHeight(true),
			topEdge		= elem.offset().top,
			bottomEdge	= topEdge + elemHeight,
			leftEdge	= elem.offset().left,
			rightEdge	= leftEdge + elemWidth;

		var
			tooltipWidth	= tooltip.outerWidth(true),
			tooltipHeight	= tooltip.outerHeight(true),
			leftCentered	= (elemWidth / 2) - (tooltipWidth / 2),
			topCentered		= (elemHeight / 2) - (tooltipHeight / 2);


		var positions = {};

		switch (position) {
			case 'right' :
				positions = {
					left : rightEdge,
					top : topEdge + topCentered
				};
				break;
			case 'top' :
				positions = {
					left: leftEdge + leftCentered,
					top : topEdge - tooltipHeight
				};
				break;
			case 'bottom' :
				positions = {
					left : leftEdge + leftCentered,
					top : bottomEdge
				};
				break;
			case 'left' :
				positions = {
					left : leftEdge - tooltipWidth,
					top : topEdge + topCentered
				};
				break;
		}

		tooltip
			.offset(positions)
			.css('opacity', '1');
		}
};

var myForm = (function () {
    'use strict';

    var app = {
        initialize : function () {
            this.setUpListeners();
            $('.call-form__inner-input').placeholder();
            $('#reset').addClass('disabled').attr('disabled');
        },

        setUpListeners : function () {
            $('form').on('submit', this.submitForm);
            $('form').on('keydown', '.call-form__inner-input', this.removeError);
            $('form').on('reset', this.resetBtn);
        },

        submitForm : function (e) {
            e.preventDefault();

            var form = $(this);

            if (app.validate(form) === false) {
                return false;
            }

            app.ajaxReq(form);

        },

        validate : function (form) {
            var textType = form.find("[data-validation='text']"),
                phoneType = form.find("[data-validation='phone']"),
                valid = true;

                textType.each(function(){
					var $this		= $(this),
						notEmptyVal = !!$this.val(),
						error		= 'Заполните поле';
					if(notEmptyVal){
						return valid;
					}else {
						$this.addClass('error').removeClass('good').tooltip({
                            content : error,
                            position : 'right'
                        });
						valid = false;
					}
				});

                phoneType.each(function(){
					var $this		= $(this),
						regExp      = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
                        goodPhone	= regExp.test($this.val()),
                        error       = 'Не правильный телефон';

					if(goodPhone){
						return valid;
					}else{
						$this.addClass('error').removeClass('good').tooltip({
                            content : error,
                            position : 'right'
                        });
						valid = false;
					}
				});

			return valid;
		},
		removeError : function() {
			$(this).removeClass('error').addClass('good');
            $('#reset').removeClass('disabled').removeAttr('disabled');


		},
		resetBtn : function () {
            if(!$('#reset').hasClass('disabled')) {
                $('.error').removeClass('error');
                $('.good').removeClass('good');
				$('.tooltip').remove();
            }
		},
		ajaxReq : function(form) {

			var data = form.serialize();

			$.ajax({
				type: 'POST',
				url: '../mail.php',
				data: data,
				dataType: 'json'
			})
			.done(function(){

			})
			.fail(function(){
				console.log('Проблема на стороне сервера');
			})
			.always(function(){

			});
		}
	};

app.initialize();

}());
