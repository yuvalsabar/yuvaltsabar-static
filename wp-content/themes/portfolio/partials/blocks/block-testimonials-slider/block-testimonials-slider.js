var $ = jQuery.noConflict();

var initBlockSliderTestimonials = function ($block) {
    $(".slider-testimonials").each(function () {
        var swiper = new Swiper($(this)[0], {
            effect: "fade",
            fadeEffect: {
                crossFade: true,
            },
            loop: true,
            autoplay: {
                delay: 5000,
            },
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
        });
    });
};

$(document).ready(function () {
    initBlockSliderTestimonials();
});

if (window.acf) {
    window.acf.addAction("render_block_preview", initBlockSliderTestimonials);
}
