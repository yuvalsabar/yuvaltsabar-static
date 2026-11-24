var $ = jQuery.noConflict();

let initBlockTextAndMedia = function ($block) {
    // Initialize animations
    $(".c-lottie").each(function (index) {
        lottie.loadAnimation({
            container: $(this)[0],
            path: $(this).data("path"),
            renderer: "svg",
            loop: true,
            autoplay: false,
            name: $(this).parents(".b-text-and-media").data("id"),
            rendererSettings: {
				progressiveLoad: true,
                filterSize: {
                    width: "200%",
                    height: "200%",
                    x: "-50%",
                    y: "-50%",
                },
            },
        });
    });

    // Set an observer for each lottie element
    let observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.intersectionRatio > 0) {
                    let blockId = $(entry.target)
                        .parents(".b-text-and-media")
                        .data("id");

                    lottie.stop(blockId);
                    lottie.play(blockId);

                    observer.unobserve(entry.target);
                }
            });
        },
        {
            rootMargin: "-40% 0% -40% 0%",
        }
    );

    // Initialize observer for each lottie element
    document.querySelectorAll(".c-lottie").forEach((element) => {
        observer.observe(element);
    });
};

initBlockTextAndMedia();

if (window.acf) {
    window.acf.addAction("render_block_preview", initBlockTextAndMedia);
}
