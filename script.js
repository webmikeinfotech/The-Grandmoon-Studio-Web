/* =========================================================
   THE GRANDMOON STUDIO
   HERO AUTO SLIDER
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".hero-dot");

    if (!slides.length) {
        return;
    }

    let currentSlide = 0;

    /*
        Time between slides.

        5000 = 5 seconds
        4000 = 4 seconds
        6000 = 6 seconds
    */

    const slideDuration = 5000;


    /* =====================================================
       SHOW SLIDE
       ===================================================== */

    function showSlide(index) {

        slides.forEach(function (slide, i) {

            slide.classList.toggle(
                "active",
                i === index
            );

        });


        dots.forEach(function (dot, i) {

            dot.classList.toggle(
                "active",
                i === index
            );

        });


        /* Update slide number */

        const dotsContainer =
            document.querySelector(".hero-slider-dots");

        if (dotsContainer) {

            const slideNumber =
                String(index + 1).padStart(2, "0");

            dotsContainer.style.setProperty(
                "--slide-number",
                '"' + slideNumber + '"'
            );

        }

    }


    /* =====================================================
       NEXT SLIDE
       ===================================================== */

    function nextSlide() {

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        showSlide(currentSlide);

    }


    /* =====================================================
       AUTOMATIC SLIDER
       ===================================================== */

    let sliderTimer = setInterval(
        nextSlide,
        slideDuration
    );


    /* =====================================================
       DOT CLICK
       ===================================================== */

    dots.forEach(function (dot) {

        dot.addEventListener("click", function () {

            const selectedSlide =
                parseInt(
                    dot.getAttribute("data-slide"),
                    10
                );

            if (isNaN(selectedSlide)) {
                return;
            }


            currentSlide = selectedSlide;

            showSlide(currentSlide);


            /*
                Reset automatic timer after
                manually selecting a slide.
            */

            clearInterval(sliderTimer);

            sliderTimer = setInterval(
                nextSlide,
                slideDuration
            );

        });

    });


    /* =====================================================
       PAUSE WHEN MOUSE IS OVER HERO
       ===================================================== */

    const hero =
        document.querySelector(".hero");


    if (hero) {

        hero.addEventListener("mouseenter", function () {

            clearInterval(sliderTimer);

        });


        hero.addEventListener("mouseleave", function () {

            clearInterval(sliderTimer);

            sliderTimer = setInterval(
                nextSlide,
                slideDuration
            );

        });

    }


    /* =====================================================
       TOUCH / SWIPE SUPPORT
       ===================================================== */

    let touchStartX = 0;
    let touchEndX = 0;


    if (hero) {

        hero.addEventListener(
            "touchstart",
            function (event) {

                touchStartX =
                    event.changedTouches[0].screenX;

            },
            { passive: true }
        );


        hero.addEventListener(
            "touchend",
            function (event) {

                touchEndX =
                    event.changedTouches[0].screenX;

                handleSwipe();

            },
            { passive: true }
        );

    }


    function handleSwipe() {

        const swipeDistance =
            touchEndX - touchStartX;


        /* Swipe left = next */

        if (swipeDistance < -50) {

            currentSlide++;

            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }

            showSlide(currentSlide);

        }


        /* Swipe right = previous */

        if (swipeDistance > 50) {

            currentSlide--;

            if (currentSlide < 0) {
                currentSlide = slides.length - 1;
            }

            showSlide(currentSlide);

        }


        /* Restart timer */

        clearInterval(sliderTimer);

        sliderTimer = setInterval(
            nextSlide,
            slideDuration
        );

    }


    /* =====================================================
       INITIAL SLIDE
       ===================================================== */

    showSlide(0);

}); 