var $ = jQuery.noConflict();

$(document).ready(function () {
    mobileNav(); // Mobile navigation
    mobileFooterNav(); // Turn mobile footer navigation into accordion
	initFancybox(); // Fancybox init
    a11yMenu(); // Accessibility for main menu
    fastContactForm(); // Fast contact form init
    SearchBoxInit(); // Toggle search box
    btnScrollTo(); // Scroll-to button
    shareButtons(); // Share buttons
    initTabs(); // Init tabs
    initAccordion(); // Init accordion
    ajaxForm(); // Ajax forms handler
    ajaxLoadMore(); // Ajax load more
});

$(window).load(function () {
    fadeInInit(); // Fade-in init
});

function isHome() {
    if ($("body").hasClass("home")) {
        return true;
    } else {
        return false;
    }
}

function isRtl() {
    if ($("body").hasClass("rtl")) {
        return true;
    } else {
        return false;
    }
}

function isMobile(width) {
    if (!width) {
        width = 992;
    }

    if ($(window).width() < width) {
        return true;
    } else {
        return false;
    }
}

function fadeInInit() {
    $(".fade-in").css("opacity", 1);
}

function mobileNav() {
    mobileNav = {
        triggerClick: function () {
            $(".mn-trigger").click(function () {
                $("body").toggleClass("mn-active");
            });
        },

        menuItemClick: function () {
            $(
                ".mn-menu ul > li.menu-item-has-children > a, .toggle-sub-menu"
            ).click(function (e) {
                e.preventDefault();
                $(this)
                    .parent()
                    .toggleClass("menu-item-open")
                    .find("> ul.sub-menu")
                    .slideToggle();
            });

            $(".mn-menu li:not(.menu-item-has-children) a").click(function () {
                $("body").removeClass("mn-active");
            });
        },

        swipe: function () {
            $(".mn-menu").on("swiperight", function () {
                $("body").removeClass("mn-active");
            });
        },

        init: function () {
            mobileNav.triggerClick();
            mobileNav.menuItemClick();
            mobileNav.swipe();
        },
    };

    mobileNav.init();
}

function mobileFooterNav() {
    $(".footer-col-menu .c-title").click(function (e) {
        e.preventDefault();
        $(".footer-col-menu.active")
            .not($(this).closest(".footer-col-menu"))
            .removeClass("active")
            .find(".footer-nav")
            .slideUp(100);
        $(this)
            .closest(".footer-col-menu")
            .toggleClass("active")
            .find(".footer-nav")
            .slideToggle(100);
    });
}

function a11yMenu() {
    $("#main-navigation ul li.menu-item-has-children a").on(
        "focusin",
        function (e) {
            e.preventDefault();
            var this_el = $(this);
            this_el.parent().addClass("hover");
        }
    );

    $("body").on(
        "focusout",
        "#main-navigation ul li.menu-item-has-children.hover ul li:last-child a",
        function (e) {
            e.preventDefault();
            var this_el = $(this);
            this_el.parent().parent().parent().removeClass("hover");
        }
    );
}

function fastContactForm() {
    $(".btn-hidden-form-toggle, .btn-close-hidden-form").click(function (e) {
        e.preventDefault();
        $(this).toggleClass("active");
        $(".bottom-strip-hidden-form, .header-hidden-form").toggleClass(
            "active"
        );
    });
}

function SearchBoxInit() {
    $(".btn-search-toggle").click(function () {
        $(".search-box").toggleClass("open");
        $("form.search").slideToggle("fast");
    });

    $(".search").submit(function (e) {
        if (!$(this).find(".search-input").val()) {
            e.preventDefault();
        }
    });
}

function btnScrollTo() {
    $("body").on("click", ".btn-scroll-to", function (e) {
        e.preventDefault();

        target = $($(this).data("scrollto"));
        $("html, body").animate({ scrollTop: target.offset().top }, 700);
        return false;
    });

    $(window).scroll(function () {
        if ($(window).scrollTop() > 0) {
            $(".btn-scroll-to-top").fadeIn(300);
        } else {
            $(".btn-scroll-to-top").fadeOut(300);
        }
    });
}

function ajaxLoadMore() {
    $(".btn-load-more").click(function (e) {
        btn = $(this);
        append = $(this).data("append");
        query = $(this).data("query");
        load = $(this).data("load");
        offset = $(this).data("offset");
        template = $(this).data("template");

        e.preventDefault();
        if (!$(".loader-wrap .loader").length) {
            $(".loader-wrap").append('<div class="loader"></div>');
        }

        $.ajax({
            type: "POST",
            dataType: "json",
            url: siteObject.ajaxurl,
            data: {
                action: "load_more",
                args: query,
                offset: offset,
                load: load,
                template: template,
            },

            success: function (results) {
                $(append).append(results.html);
                $(".loader-wrap .loader").remove();
                if (!results.more) {
                    $(".btn-load-more").remove();
                }
            },
        });

        offset = $(this).data("offset") + load;
        btn.attr("data-offset", offset).data("offset", offset);
    });
}

function shareButtons() {
    $("a.btn-share").click(function (e) {
        e.preventDefault();
        var popup_window;

        var width = 555;
        var height = 500;
        var center_left = screen.width / 2 - width / 2;
        var center_top = screen.height / 2 - height / 2;
        var url = $(this).attr("href");

        popup_window = window.open(
            url,
            "Title",
            "scrollbars=1, width=" +
                width +
                ", height=" +
                height +
                ", left=" +
                center_left +
                ", top=" +
                center_top
        );
        popup_window.focus();
    });
}

function ajaxForm() {
    $(".form-ajax").on("submit", function (e) {
        e.preventDefault();

        var $form = $(this);
        var $status = $form.find(".form-status");
        var action = $form.attr("action");

        $status.html('<div class="loader"></div>');

        $.post({
            dataType: "json",
            url: siteObject.ajaxurl,
            data: {
                action: action,
                data: $(this).serialize(),
                nonce: siteObject.nonce,
            },

            success: function (response) {
                $status.html(
                    '<div class="form-message form-message-' +
                        response.status +
                        '">' +
                        response.message +
                        "</div>"
                );

                if (
                    (action == "login" || action == "register") &&
                    response.status === "success"
                ) {
                    document.location.href = siteObject.homeurl;
                }
            },
        });
    });
}

function initTabs() {
    $(".tabs-nav a").click(function (e) {
        e.preventDefault();
        var tab = $(this).data("tab");

        $(".tabs-nav .tab-item").removeClass("tab-item-active");
        $(this).parent().addClass("tab-item-active");

        $("[data-tabcontent]").removeClass("tab-content-active");
        $('[data-tabcontent="' + tab + '"]').addClass("tab-content-active");
        history.pushState({}, null, "#" + tab);
    });
}

function initAccordion() {
    var accordion = {
        closeItems: function ($items) {
            $items
                .removeClass("accordion-item--active")
                .attr("aria-expanded", false)
                .find(".accordion-content")
                .slideUp(100);
        },

        openItem: function ($item) {
            $item
                .addClass("accordion-item--active")
                .attr("aria-expanded", true)
                .find(".accordion-content")
                .slideDown(100);
        },

        init: (function () {
            $(".accordion-btn").click(function () {
                var $this = $(this).parents(".accordion-item");
                var $siblings = $(this).parents(".accordion-item").siblings();

                accordion.closeItems($siblings);

                if (!$this.hasClass("accordion-item--active")) {
                    accordion.openItem($this);
                } else {
                    accordion.closeItems($this);
                }
            });
        })(),
    };
}

function initTabs() {
    $(".btn-tab").click(function (e) {
        e.preventDefault();
        let $block = $(this).closest(".block");
        let tab = $(this).data("tab");

        $block.find(".tabs-nav .tab-item").removeClass("tab-item-active");
        $(this).parent().addClass("tab-item-active");
        $block.find("[data-tabcontent]").removeClass("tab-content-active");
        $block
            .find('[data-tabcontent="' + tab + '"]')
            .addClass("tab-content-active");
    });
}

function initFancybox() {
    const options = Fancybox.bind("[data-fancybox]", {
        Thumbs: {
            type: "classic",
        },
    });
}
