var $ = jQuery.noConflict();

var initBlockSliderWithThumbnails = function ($block) {
    var galleryThumbs = new Swiper(".gallery-thumbs", {
        spaceBetween: 10,
        slidesPerView: 4,
		watchSlidesProgress: true,
        loop: true,
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
    });

    var galleryTop = new Swiper(".gallery-top", {
        loop: true,
        thumbs: {
            swiper: galleryThumbs,
        },
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
    });
};

$(document).ready(function () {
    initBlockSliderWithThumbnails();
});

if (window.acf) {
    window.acf.addAction("render_block_preview", initBlockSliderWithThumbnails);
}
