var $ = jQuery.noConflict();

var initBlockSliderImages = function ($block) {
	$(".slider-images").each(function () {
        var swiper = new Swiper($(this)[0], {
            slidesPerView: 1,
            loop: true,
            a11y: {
                prevSlideMessage: siteObject.strings.next_slide,
                nextSlideMessage: siteObject.strings.next_slide,
            },
            pagination: {
                el: ".slider-images .swiper-pagination",
                type: "bullets",
                clickable: true,
            },
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
			navigation: {
                nextEl: ".slider-images .btn-nav-next",
                prevEl: ".slider-images .btn-nav-prev",
            },
            breakpoints: {
                640: {
                    spaceBetween: 30,
                    centeredSlides: false,
                    slidesPerGroup: 3,
                    slidesPerView: 3,
                },
            },
        });
    });
};

$(document).ready(function () {
    initBlockSliderImages();
});

if (window.acf) {
    window.acf.addAction("render_block_preview", initBlockSliderImages);
}
