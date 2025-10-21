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

// ===== RISE UP ANIMATION ON SCROLL =====
function initRiseUpAnimation() {
    const riseUpElements = document.querySelectorAll('.riseUp');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            } else {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(50px)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    riseUpElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ===== ENHANCED HORIZONTAL SCROLL SLIDER =====
function initHorizontalSliders() {
    const sliders = document.querySelectorAll('.slider');
    
    sliders.forEach(slider => {
        let isDown = false;
        let startX;
        let scrollLeft;
        let velocity = 0;
        let rafId;
        
        // Улучшенный обработчик колеса мыши
        slider.addEventListener('wheel', (e) => {
            e.preventDefault();
            
            // Определяем направление и скорость прокрутки
            const delta = e.deltaY || e.deltaX;
            const scrollSpeed = Math.abs(delta) > 100 ? 3 : 2; // Адаптивная скорость
            
            slider.scrollLeft += delta * scrollSpeed;
        }, { passive: false });
        
        // Drag functionality
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            
            // Останавливаем инерцию при начале drag
            cancelAnimationFrame(rafId);
            velocity = 0;
        });
        
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
            
            // Добавляем инерцию после отпускания
            if (Math.abs(velocity) > 1) {
                applyMomentum();
            }
        });
        
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            const prevScrollLeft = slider.scrollLeft;
            
            slider.scrollLeft = scrollLeft - walk;
            
            // Вычисляем скорость для инерции
            velocity = slider.scrollLeft - prevScrollLeft;
        });
        
        // Touch events
        slider.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            velocity = 0;
        }, { passive: true });
        
        slider.addEventListener('touchend', () => {
            isDown = false;
            if (Math.abs(velocity) > 1) {
                applyMomentum();
            }
        });
        
        slider.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            const prevScrollLeft = slider.scrollLeft;
            
            slider.scrollLeft = scrollLeft - walk;
            velocity = slider.scrollLeft - prevScrollLeft;
        }, { passive: true });
        
        // Функция инерции
        function applyMomentum() {
            velocity *= 0.95; // Замедление
            
            if (Math.abs(velocity) > 0.5) {
                slider.scrollLeft += velocity;
                rafId = requestAnimationFrame(applyMomentum);
            }
        }
        
        // Добавляем визуальные индикаторы для скролла
        addScrollIndicators(slider);
    });
}

// ===== SCROLL INDICATORS =====
function addScrollIndicators(slider) {
    // Проверяем, нужны ли индикаторы (если контент выходит за пределы)
    const checkScroll = () => {
        const canScroll = slider.scrollWidth > slider.clientWidth;
        
        if (canScroll && !slider.hasAttribute('data-scrollable')) {
            slider.setAttribute('data-scrollable', 'true');
        }
    };
    
    // Проверяем при загрузке и изменении размера
    checkScroll();
    window.addEventListener('resize', checkScroll);
    slider.addEventListener('scroll', checkScroll);
}

// ===== ENHANCE SLIDER ITEMS INTERACTIVITY =====
function enhanceSliderItems() {
    // Добавляем дополнительные hover-эффекты для элементов слайдера
    const sliderItems = document.querySelectorAll('.projects-item, .products-item, .instagram-item');
    
    sliderItems.forEach(item => {
        // Кликабельность
        item.style.cursor = 'pointer';
        
        // Плавные переходы
        item.style.transition = 'all 0.3s ease';
        
        // Эффект при наведении
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
        
        // Клик для навигации (можно добавить свою логику)
        item.addEventListener('click', (e) => {
            // Предотвращаем клик если это стрелка или ссылка
            if (e.target.tagName === 'IMG' || e.target.tagName === 'A') {
                return;
            }
            console.log('Slider item clicked - add your navigation logic here');
        });
    });
}

// ===== ADD SCROLL HINT =====
function addScrollHint(slider) {
    // Проверяем можно ли скроллить
    const canScroll = slider.scrollWidth > slider.clientWidth;
    
    if (canScroll) {
        slider.style.cursor = 'grab';
        
        // Добавляем легкий градиент по краям чтобы показать возможность скролла
        slider.style.background = `
            linear-gradient(90deg, 
                rgba(0,0,0,0.05) 0%, 
                transparent 10%, 
                transparent 90%, 
                rgba(0,0,0,0.05) 100%)
        `;
    }
}

// ===== TEXT SLIDER FUNCTIONALITY =====
function initTextSliders() {
    const textSliders = document.querySelectorAll('.sliderText');
    
    textSliders.forEach(slider => {
        const content = slider.querySelector('p');
        if (!content) return;
        
        // Создаем контейнер для скроллбара
        const container = document.createElement('div');
        container.className = 'sliderText-container';
        
        // Оборачиваем контент в контейнер
        const parent = slider.parentNode;
        slider.innerHTML = '';
        container.appendChild(content);
        slider.appendChild(container);
        
        // Создаем скроллбар
        const scrollbar = document.createElement('div');
        scrollbar.className = 'sliderText-scrollbar';
        
        const thumb = document.createElement('div');
        thumb.className = 'sliderText-thumb';
        scrollbar.appendChild(thumb);
        
        slider.appendChild(scrollbar);
        
        // Проверяем нужен ли скролл
        const checkScrollability = () => {
            const canScroll = content.scrollHeight > slider.clientHeight;
            slider.classList.toggle('scrollable', canScroll);
            scrollbar.style.display = canScroll ? 'block' : 'none';
        };
        
        // Обновляем ползунок
        const updateThumb = () => {
            if (content.scrollHeight <= slider.clientHeight) return;
            
            const scrollableHeight = content.scrollHeight - slider.clientHeight;
            const scrollPercentage = slider.scrollTop / scrollableHeight;
            const thumbHeight = Math.max((slider.clientHeight / content.scrollHeight) * slider.clientHeight, 20);
            const trackHeight = slider.clientHeight - thumbHeight;
            
            thumb.style.height = thumbHeight + 'px';
            thumb.style.top = (scrollPercentage * trackHeight) + 'px';
        };
        
        // Обработчик колеса мыши
        slider.addEventListener('wheel', (e) => {
            if (content.scrollHeight <= slider.clientHeight) return;
            
            e.preventDefault();
            slider.classList.add('scrolling');
            
            const delta = e.deltaY || e.deltaX;
            slider.scrollTop += delta * 0.5;
            
            updateThumb();
            
            // Сбрасываем класс через некоторое время
            clearTimeout(slider.scrollTimeout);
            slider.scrollTimeout = setTimeout(() => {
                slider.classList.remove('scrolling');
            }, 1000);
        }, { passive: false });
        
        // Drag для ползунка
        let isDragging = false;
        let startY;
        let startScrollTop;
        
        const startDrag = (clientY) => {
            isDragging = true;
            thumb.classList.add('active');
            startY = clientY;
            startScrollTop = slider.scrollTop;
            slider.classList.add('scrolling');
        };
        
        const doDrag = (clientY) => {
            if (!isDragging) return;
            
            const deltaY = clientY - startY;
            const trackHeight = slider.clientHeight - thumb.clientHeight;
            const scrollableHeight = content.scrollHeight - slider.clientHeight;
            
            const scrollDelta = (deltaY / trackHeight) * scrollableHeight;
            slider.scrollTop = startScrollTop + scrollDelta;
            
            updateThumb();
        };
        
        const endDrag = () => {
            isDragging = false;
            thumb.classList.remove('active');
            
            clearTimeout(slider.scrollTimeout);
            slider.scrollTimeout = setTimeout(() => {
                slider.classList.remove('scrolling');
            }, 1000);
        };
        
        thumb.addEventListener('mousedown', (e) => {
            startDrag(e.clientY);
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', (e) => {
            doDrag(e.clientY);
        });
        
        document.addEventListener('mouseup', endDrag);
        
        // Touch события для мобильных устройств
        thumb.addEventListener('touchstart', (e) => {
            startDrag(e.touches[0].clientY);
        }, { passive: true });
        
        document.addEventListener('touchmove', (e) => {
            doDrag(e.touches[0].clientY);
        }, { passive: true });
        
        document.addEventListener('touchend', endDrag);
        
        // Обновляем ползунок при скролле контейнера
        slider.addEventListener('scroll', updateThumb);
        
        // Инициализация
        const initSlider = () => {
            checkScrollability();
            updateThumb();
        };
        
        initSlider();
        
        // Перепроверяем при изменении размера
        const resizeObserver = new ResizeObserver(initSlider);
        resizeObserver.observe(slider);
        resizeObserver.observe(content);
        
        // Также обновляем при изменении контента
        const mutationObserver = new MutationObserver(initSlider);
        mutationObserver.observe(content, {
            childList: true,
            subtree: true,
            characterData: true
        });
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing sliders...');
    initRiseUpAnimation();
    initHorizontalSliders();
    enhanceSliderItems();
    initTextSliders(); // Добавляем инициализацию текстовых слайдеров
    
    // Добавляем обработчики для кнопок внутри слайдеров
    const sliderArrows = document.querySelectorAll('.projects-item img[src*="arrow"], .item-name img');
    sliderArrows.forEach(arrow => {
        arrow.addEventListener('click', function(e) {
            e.stopPropagation();
            // Здесь можно добавить логику для перехода к конкретному элементу
            const item = this.closest('.projects-item, .products-item');
            console.log('Arrow clicked - add navigation logic here');
        });
    });
});

// Также инициализируем при полной загрузке страницы
window.addEventListener('load', function() {
    console.log('Window loaded, re-initializing sliders...');
    initHorizontalSliders();
    initTextSliders(); // И при полной загрузке
});