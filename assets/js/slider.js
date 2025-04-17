document.addEventListener('DOMContentLoaded', () => {
    // Config - just like Owl Carousel!
    const config = {
        autoplay: false,
        autoplayDelay: 5000, // in milliseconds
    };

    // Selectors
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dotsContainer = document.querySelector('.dots-container');

    // State
    let currentIndex = 0;
    let autoSlideInterval;
    const transitionEffects = [ 'zoom', ];
    // const transitionEffects = ['fade', 'slideRight', 'slideLeft', 'zoom', 'slideUp'];

    // Initialize slider
    function initSlider() {
        slides[0].classList.add('active', `transition-${transitionEffects[0]}`);
        createDots();
        attachEventListeners();
        if (config.autoplay) startAutoSlide();
    }

    // Create dot indicators
    function createDots() {
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => showSlide(index));
            dotsContainer.appendChild(dot);
        });
    }

    function getDots() {
        return document.querySelectorAll('.dot');
    }

    // Show slide by index
    function showSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        if (index === currentIndex) return;

        resetSlides();

        const effect = randomEffect();
        slides[index].classList.add(`transition-${effect}`, 'active');
        getDots()[index].classList.add('active');
        currentIndex = index;

        resetAutoSlide();
    }

    function resetSlides() {
        slides.forEach(slide => {
            slide.classList.remove('active', ...transitionEffects.map(e => `transition-${e}`));
        });
        getDots().forEach(dot => dot.classList.remove('active'));
    }

    function randomEffect() {
        return transitionEffects[Math.floor(Math.random() * transitionEffects.length)];
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    // Autoplay controls
    function startAutoSlide() {
        if (config.autoplay) {
            autoSlideInterval = setInterval(nextSlide, config.autoplayDelay);
        }
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }

    // Optional: external toggle control
    function toggleAutoplay(state) {
        config.autoplay = state;
        resetAutoSlide();
    }

    // Event Listeners
    function attachEventListeners() {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);

        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);

        document.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });

        // Swipe for touch
        let touchStartX = 0;
        let touchEndX = 0;

        slider.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoSlide();
        });

        slider.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoSlide();
        });

        function handleSwipe() {
            const threshold = 50;
            if (touchEndX < touchStartX - threshold) nextSlide();
            if (touchEndX > touchStartX + threshold) prevSlide();
        }
    }

    // Initialize everything
    initSlider();

    // You can use this externally later if needed:
    // toggleAutoplay(true);  // Start autoplay
    // toggleAutoplay(false); // Stop autoplay
});
