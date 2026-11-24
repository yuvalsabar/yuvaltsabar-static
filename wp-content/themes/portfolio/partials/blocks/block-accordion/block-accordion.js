var $ = jQuery.noConflict();

function initBlockAccordion() {
  var accordion = {
    closeItems: function ($items) {
      $items
        .removeClass("active")
        .attr("aria-expanded", false)
        .find(".accordion-content")
        .slideUp(100);
    },

    openItem: function ($item) {
      $item
        .addClass("active")
        .attr("aria-expanded", true)
        .find(".accordion-content")
        .slideDown(100);
    },

    init: (function () {
      $(".accordion-btn").click(function () {
        var $this = $(this).parents(".accordion-item");
        var $siblings = $(this).parents(".accordion-item").siblings();

        accordion.closeItems($siblings);

        if (!$this.hasClass("active")) {
          accordion.openItem($this);
        } else {
          accordion.closeItems($this);
        }
      });
    })(),
  };
}

$(document).ready(function () {
  initBlockAccordion();
});

if (window.acf) {
  window.acf.addAction("render_block_preview", initBlockAccordion);
}
