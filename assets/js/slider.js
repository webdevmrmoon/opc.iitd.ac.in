document.addEventListener('DOMContentLoaded', () => {
    // Selectors
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dotsContainer = document.querySelector('.dots-container');

    // State
    let currentIndex = 0;
    let autoSlideInterval;
    const autoSlideDelay = 5000;
    const transitionEffects = ['fade', 'slideRight', 'slideLeft', 'zoom', 'slideUp'];

    // Init
    function initSlider() {
        slides[0].classList.add('active', `transition-${transitionEffects[0]}`);
        createDots();
        attachEventListeners();
        startAutoSlide();
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

    // Show specific slide
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

    // Autoplay management
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, autoSlideDelay);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }

    // Event listeners
    function attachEventListeners() {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);

        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);

        // Keyboard
        document.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });

        // Swipe
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

    // Start everything
    initSlider();
});
