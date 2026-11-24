var $ = jQuery.noConflict();

var initBlockSliderHero = function ($block) {
  $(".slider-hero").each(function () {
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
      a11y: {
        prevSlideMessage: siteObject.strings.prev_slide,
        nextSlideMessage: siteObject.strings.next_slide,
      },
      navigation: {
        nextEl: ".slider-hero .btn-nav-next",
        prevEl: ".slider-hero .btn-nav-prev",
      },
    });
  });
};

$(document).ready(function () {
  initBlockSliderHero();
});

if (window.acf) {
  window.acf.addAction("render_block_preview", initBlockSliderHero);
}
