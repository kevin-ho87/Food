$('.carousel').slick({
	dots: true,
	dotsClass: 'carousel-dots',
	arrows: true,
	prevArrow: '<button type="button" class="slick-prev carousel__ctrl carousel__ctrl_prev"><span class="triangle triangle_left"></span></button>',
	nextArrow: '<button type="button" class="slick-next carousel__ctrl carousel__ctrl_next"><span class="triangle triangle_right"></span></button>',
	slidesToShow: 3,
	slidesToScroll: 1,
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