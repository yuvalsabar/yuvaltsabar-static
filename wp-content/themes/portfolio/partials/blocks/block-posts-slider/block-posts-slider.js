var $ = jQuery.noConflict();

var initBlockSliderPosts = function ($block) {
    $(".slider-posts").each(function () {
        var swiper = new Swiper($(this)[0], {
            spaceBetween: 0,
            slidesPerView: 1,
            loop: true,
            a11y: {
                prevSlideMessage: siteObject.strings.next_slide,
                nextSlideMessage: siteObject.strings.next_slide,
            },
            navigation: {
                nextEl: ".slider-posts .btn-nav-next",
                prevEl: ".slider-posts .btn-nav-prev",
            },
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
			breakpoints: {
                640: {
					spaceBetween: 10,
					slidesPerView: 4,
            	},
            },
        });
    });
};

$(document).ready(function () {
    initBlockSliderPosts();
});

if (window.acf) {
    window.acf.addAction("render_block_preview", initBlockSliderPosts);
}
