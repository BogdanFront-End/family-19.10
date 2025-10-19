// ===== BURGER MENU FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    const burgerBtn = document.querySelector('.action-burger');
    const exitBtn = document.querySelector('.burger .action-exit');
    const burgerMenu = document.querySelector('.burger');
    const burgerOverlay = document.querySelector('.burger-overlay');
    
    function openBurgerMenu() {
        burgerMenu.classList.add('active');
        burgerOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeBurgerMenu() {
        burgerMenu.classList.remove('active');
        burgerOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    if (burgerBtn) {
        burgerBtn.addEventListener('click', openBurgerMenu);
    }
    
    if (exitBtn) {
        exitBtn.addEventListener('click', closeBurgerMenu);
    }
    
    if (burgerOverlay) {
        burgerOverlay.addEventListener('click', closeBurgerMenu);
    }
    
    const burgerLinks = burgerMenu.querySelectorAll('a');
    burgerLinks.forEach(link => {
        link.addEventListener('click', closeBurgerMenu);
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && burgerMenu.classList.contains('active')) {
            closeBurgerMenu();
        }
    });
});

// ===== DIVIDER TEXT ANIMATION =====
document.addEventListener('DOMContentLoaded', function() {
    const dividerSection = document.querySelector('.divider');
    const spans = dividerSection?.querySelectorAll('span');
    
    if (!dividerSection || !spans) return;
    
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    spans.forEach(span => {
                        span.classList.add('highlighted');
                    });
                } else {
                    spans.forEach(span => {
                        span.classList.remove('highlighted');
                    });
                }
            });
        },
        {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        }
    );
    
    observer.observe(dividerSection);
});

// ===== UNIVERSAL SLIDER FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    initSlider('.projects-slider', 400);
    initSlider('.products-slider', 400);
    initSlider('.instagram-slider', 400);
    
    function initSlider(sliderSelector, scrollAmount) {
        const slider = document.querySelector(sliderSelector);
        if (!slider) return;
        
        let isScrolling = false;
        let startX;
        let scrollLeft;
        
        // Wheel scrolling
        slider.addEventListener('wheel', function(e) {
            if (slider.scrollWidth > slider.clientWidth) {
                e.preventDefault();
                
                if (isScrolling) return;
                isScrolling = true;
                
                const scrollValue = e.deltaY > 0 ? scrollAmount : -scrollAmount;
                slider.scrollBy({ left: scrollValue, behavior: 'smooth' });
                
                setTimeout(() => { isScrolling = false; }, 300);
            }
        });
        
        // Mouse drag
        slider.addEventListener('mousedown', (e) => {
            isScrolling = true;
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            slider.style.cursor = 'grabbing';
            slider.style.userSelect = 'none';
        });
        
        slider.addEventListener('mouseleave', () => {
            isScrolling = false;
            slider.style.cursor = 'grab';
        });
        
        slider.addEventListener('mouseup', () => {
            isScrolling = false;
            slider.style.cursor = 'grab';
            slider.style.removeProperty('user-select');
        });
        
        slider.addEventListener('mousemove', (e) => {
            if (!isScrolling) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events
        slider.addEventListener('touchstart', (e) => {
            isScrolling = true;
            startX = e.touches[0].pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        
        slider.addEventListener('touchend', () => {
            isScrolling = false;
        });
        
        slider.addEventListener('touchmove', (e) => {
            if (!isScrolling) return;
            const x = e.touches[0].pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
        
        slider.style.cursor = 'grab';
    }
});

// ===== SCROLL ANIMATIONS =====
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = [
        '.hero h1',
        '.hero p',
        '.products p', 
        '.info-item h3',
        '.info-item p',
        '.advantages-link',
        '.description-item h2',
        '.description-item p'
    ];

    const allElements = [];
    elementsToAnimate.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            allElements.push(element);
        });
    });

    allElements.forEach(element => {
        element.classList.add('instant-rise');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('rise-active');
            } else {
                entry.target.classList.remove('rise-active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    allElements.forEach(element => {
        observer.observe(element);
    });
});

// ===== FORM VALIDATION =====
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.order-form');
    const inputs = form?.querySelectorAll('input');
    
    if (!form || !inputs) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderBottomColor = 'red';
            } else {
                input.style.borderBottomColor = '';
            }
        });
        
        if (isValid) {
            alert('Форма успешно отправлена!');
            form.reset();
        } else {
            alert('Пожалуйста, заполните все поля');
        }
    });
});