// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------------------------------------
       PRELOADER EXIT ANIMATION
       ------------------------------------------------------- */
    const tlLoader = gsap.timeline();

    // Simulate loading for 2 seconds minimum
    setTimeout(() => {
        tlLoader
            .to('.loader-progress', {
                width: "100%",
                duration: 0.5,
                ease: "power2.inOut"
            })
            .to('.loader-content', {
                opacity: 0,
                y: -20,
                duration: 0.5,
                ease: "power2.in"
            })
            .to('#preloader', {
                opacity: 0,
                duration: 0.6,
                ease: "power2.inOut",
                onComplete: () => {
                    // Hide preloader and restore scroll
                    const preloader = document.getElementById('preloader');
                    preloader.style.display = 'none';
                    document.body.style.overflow = '';

                    // Wait one frame for the browser to reflow the layout,
                    // then initialize all scroll-based animations safely.
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            initHeroAnimation();
                            initScrollAnimations();
                        });
                    });
                }
            });
    }, 2000);


    /* -------------------------------------------------------
       HERO SECTION ANIMATION (runs right after preloader)
       ------------------------------------------------------- */
    function initHeroAnimation() {
        // Use fromTo so GSAP owns both the start & end states explicitly.
        // This avoids relying on the CSS-set initial state which may have
        // already been read/cached incorrectly.
        gsap.fromTo(
            ".fade-up",
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.18,
                ease: "power3.out",
                clearProps: "all" // Clean up inline styles when done
            }
        );
    }


    /* -------------------------------------------------------
       SCROLL-TRIGGERED ANIMATIONS
       ------------------------------------------------------- */
    function initScrollAnimations() {

        // --- Impact / Counter Section ---
        ScrollTrigger.create({
            trigger: ".impact",
            start: "top 80%",
            once: true,
            onEnter: () => {
                if (window.animateCounters) window.animateCounters();
            }
        });

        // --- Bento Grid Cards ---
        gsap.fromTo(
            ".bento-item",
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: "back.out(1.5)",
                clearProps: "all",
                scrollTrigger: {
                    trigger: ".bento-grid",
                    start: "top 80%",
                    invalidateOnRefresh: true // Recalculate position on resize/refresh
                }
            }
        );

        // --- Story Section: Image ---
        gsap.fromTo(
            ".story-image",
            { opacity: 0, x: -60 },
            {
                opacity: 1,
                x: 0,
                duration: 0.9,
                ease: "power3.out",
                clearProps: "all",
                scrollTrigger: {
                    trigger: ".story",
                    start: "top 78%",
                    invalidateOnRefresh: true
                }
            }
        );

        // --- Story Section: Process List Items ---
        gsap.fromTo(
            ".process-list li",
            { opacity: 0, x: 50 },
            {
                opacity: 1,
                x: 0,
                duration: 0.7,
                stagger: 0.2,
                ease: "power3.out",
                clearProps: "all",
                scrollTrigger: {
                    trigger: ".process-list",
                    start: "top 85%",
                    invalidateOnRefresh: true
                }
            }
        );

        // --- Product Cards ---
        gsap.fromTo(
            ".product-card",
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.18,
                ease: "power2.out",
                clearProps: "all",
                scrollTrigger: {
                    trigger: ".product-grid",
                    start: "top 82%",
                    invalidateOnRefresh: true
                }
            }
        );

        // --- Contact Box ---
        gsap.fromTo(
            ".contact-box",
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                clearProps: "all",
                scrollTrigger: {
                    trigger: ".contact",
                    start: "top 80%",
                    invalidateOnRefresh: true
                }
            }
        );

        // Refresh all triggers after setting them up
        ScrollTrigger.refresh();
    }
});
