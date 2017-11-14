$('.carousel').slick({
	dots: true,
	arrows: true,
	prevArrow: '<button type="button" class="slick-prev carousel__ctrl carousel__ctrl_prev">&lt;</button>',
	nextArrow: '<button type="button" class="slick-next carousel__ctrl carousel__ctrl_next">&gt;</button>',
	slidesToShow: 3,
	slidesToScroll: 3,
	responsive: [
		{
			breakpoint: 640,
			settings: {
				slidesToShow: 1,
        		slidesToScroll: 1
			}
		}
	]
});