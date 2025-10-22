// ===== GLOBAL VARIABLES =====
let isDragging = false;
let startX;
let scrollLeft;
let velocity = 0;
let rafId;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing application...');
    
    initBurgerMenu();
    initSearchMenu();
    initRiseUpAnimation();
    initBoldUpAnimation();
    initHorizontalSliders();
    initTextSliders();
    enhanceSliderItems();
    initPhoneValidation();
    
    console.log('Application initialized successfully');
});

// ===== BURGER MENU FUNCTIONALITY =====
function initBurgerMenu() {
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
    
    const burgerLinks = burgerMenu?.querySelectorAll('a');
    burgerLinks?.forEach(link => {
        link.addEventListener('click', closeBurgerMenu);
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && burgerMenu?.classList.contains('active')) {
            closeBurgerMenu();
        }
    });
}

// ===== SEARCH MENU FUNCTIONALITY =====
function initSearchMenu() {
    const searchBtn = document.querySelector('.action-search');
    const searchExitBtn = document.querySelector('.search-exit');
    const searchMenu = document.querySelector('.search');
    const searchOverlay = document.querySelector('.search-overlay');
    const searchInput = document.querySelector('.search-input');
    
    function openSearchMenu() {
        searchMenu.classList.add('active');
        searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            searchInput?.focus();
        }, 300);
    }
    
    function closeSearchMenu() {
        searchMenu.classList.remove('active');
        searchOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        searchInput.value = '';
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', openSearchMenu);
    }
    
    if (searchExitBtn) {
        searchExitBtn.addEventListener('click', closeSearchMenu);
    }
    
    if (searchOverlay) {
        searchOverlay.addEventListener('click', closeSearchMenu);
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchMenu?.classList.contains('active')) {
            closeSearchMenu();
        }
    });
    
    const searchTags = document.querySelectorAll('.search-tag');
    searchTags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            const searchText = this.textContent;
            if (searchInput) searchInput.value = searchText;
            performSearch(searchText);
        });
    });
    
    if (searchInput) {
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && this.value.trim() !== '') {
                e.preventDefault();
                const searchText = this.value.trim();
                performSearch(searchText);
            }
        });
    }
}

// ===== SEARCH FUNCTIONALITY =====
function performSearch(query) {
    console.log('Performing search for:', query);
    // Здесь будет логика выполнения поиска
    // window.location.href = `/search?q=${encodeURIComponent(query)}`;
}

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

// ===== BOLD UP ANIMATION FOR DIVIDER SPANS =====
function initBoldUpAnimation() {
    const dividerParagraph = document.querySelector('.divider p');
    if (!dividerParagraph) return;
    
    const spans = dividerParagraph.querySelectorAll('span');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                spans.forEach((span, index) => {
                    setTimeout(() => {
                        span.classList.add('animated');
                    }, index * 300);
                });
            } else {
                spans.forEach(span => {
                    span.classList.remove('animated');
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });
    
    observer.observe(dividerParagraph);
}

// ===== HORIZONTAL SLIDER FUNCTIONALITY =====
function initHorizontalSliders() {
    const sliders = document.querySelectorAll('.slider');
    
    sliders.forEach(slider => {
        let isDown = false;
        let startX;
        let scrollLeft;
        let velocity = 0;
        let rafId;
        
        // Wheel event for horizontal scrolling
        slider.addEventListener('wheel', (e) => {
            e.preventDefault();
            
            const delta = e.deltaY || e.deltaX;
            const scrollSpeed = Math.abs(delta) > 100 ? 3 : 2;
            
            slider.scrollLeft += delta * scrollSpeed;
        }, { passive: false });
        
        // Mouse events for dragging
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            
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
            velocity = slider.scrollLeft - prevScrollLeft;
        });
        
        // Touch events for mobile
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
        
        // Momentum function
        function applyMomentum() {
            velocity *= 0.95;
            
            if (Math.abs(velocity) > 0.5) {
                slider.scrollLeft += velocity;
                rafId = requestAnimationFrame(applyMomentum);
            }
        }
        
        addScrollIndicators(slider);
    });
}

// ===== SCROLL INDICATORS =====
function addScrollIndicators(slider) {
    const checkScroll = () => {
        const canScroll = slider.scrollWidth > slider.clientWidth;
        
        if (canScroll && !slider.hasAttribute('data-scrollable')) {
            slider.setAttribute('data-scrollable', 'true');
        }
    };
    
    checkScroll();
    window.addEventListener('resize', checkScroll);
    slider.addEventListener('scroll', checkScroll);
}

// ===== SLIDER ITEMS ENHANCEMENT =====
function enhanceSliderItems() {
    const sliderItems = document.querySelectorAll('.projects-item, .products-item, .instagram-item');
    
    sliderItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.style.transition = 'all 0.3s ease';
        
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
        
        item.addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG' || e.target.tagName === 'A') {
                return;
            }
            console.log('Slider item clicked - add your navigation logic here');
        });
    });
    
    const sliderArrows = document.querySelectorAll('.projects-item img[src*="arrow"], .item-name img');
    sliderArrows.forEach(arrow => {
        arrow.addEventListener('click', function(e) {
            e.stopPropagation();
            const item = this.closest('.projects-item, .products-item');
            console.log('Arrow clicked - add navigation logic here');
        });
    });
}

// ===== TEXT SLIDER FUNCTIONALITY =====
function initTextSliders() {
    const textSliders = document.querySelectorAll('.sliderText');
    
    textSliders.forEach(slider => {
        const content = slider.querySelector('p');
        if (!content) return;
        
        const container = document.createElement('div');
        container.className = 'sliderText-container';
        
        const parent = slider.parentNode;
        slider.innerHTML = '';
        container.appendChild(content);
        slider.appendChild(container);
        
        const scrollbar = document.createElement('div');
        scrollbar.className = 'sliderText-scrollbar';
        
        const thumb = document.createElement('div');
        thumb.className = 'sliderText-thumb';
        scrollbar.appendChild(thumb);
        
        slider.appendChild(scrollbar);
        
        const checkScrollability = () => {
            const canScroll = content.scrollHeight > slider.clientHeight;
            slider.classList.toggle('scrollable', canScroll);
            scrollbar.style.display = canScroll ? 'block' : 'none';
        };
        
        const updateThumb = () => {
            if (content.scrollHeight <= slider.clientHeight) return;
            
            const scrollableHeight = content.scrollHeight - slider.clientHeight;
            const scrollPercentage = slider.scrollTop / scrollableHeight;
            const thumbHeight = Math.max((slider.clientHeight / content.scrollHeight) * slider.clientHeight, 20);
            const trackHeight = slider.clientHeight - thumbHeight;
            
            thumb.style.height = thumbHeight + 'px';
            thumb.style.top = (scrollPercentage * trackHeight) + 'px';
        };
        
        slider.addEventListener('wheel', (e) => {
            if (content.scrollHeight <= slider.clientHeight) return;
            
            e.preventDefault();
            slider.classList.add('scrolling');
            
            const delta = e.deltaY || e.deltaX;
            slider.scrollTop += delta * 0.5;
            
            updateThumb();
            
            clearTimeout(slider.scrollTimeout);
            slider.scrollTimeout = setTimeout(() => {
                slider.classList.remove('scrolling');
            }, 1000);
        }, { passive: false });
        
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
        
        thumb.addEventListener('touchstart', (e) => {
            startDrag(e.touches[0].clientY);
        }, { passive: true });
        
        document.addEventListener('touchmove', (e) => {
            doDrag(e.touches[0].clientY);
        }, { passive: true });
        
        document.addEventListener('touchend', endDrag);
        
        slider.addEventListener('scroll', updateThumb);
        
        const initSlider = () => {
            checkScrollability();
            updateThumb();
        };
        
        initSlider();
        
        const resizeObserver = new ResizeObserver(initSlider);
        resizeObserver.observe(slider);
        resizeObserver.observe(content);
        
        const mutationObserver = new MutationObserver(initSlider);
        mutationObserver.observe(content, {
            childList: true,
            subtree: true,
            characterData: true
        });
    });
}

// ===== PHONE VALIDATION FUNCTIONALITY (Российский формат) =====
function initPhoneValidation() {
    const phoneInput = document.querySelector('.input-number');
    const errorMessage = document.querySelector('.error-message');
    const orderForm = document.querySelector('.order-form');

    if (!phoneInput || !errorMessage || !orderForm) {
        console.warn('Phone validation elements not found');
        return;
    }

    let isDeleting = false;
    let lastValue = '';

    // Обновляем placeholder для российского формата
    phoneInput.setAttribute('placeholder', '+7 (XXX) XXX-XX-XX');

    // Улучшенная маска для российского телефона
    phoneInput.addEventListener('input', function(e) {
        const input = e.target;
        const originalValue = input.value;
        
        // Если пользователь удаляет символы, не применяем маску
        if (originalValue.length < lastValue.length) {
            isDeleting = true;
            lastValue = originalValue;
            return;
        }
        
        isDeleting = false;

        // Оставляем только цифры
        let numbers = originalValue.replace(/\D/g, '');
        
        // Если номер начинается с 7, 8, или 9 - обрабатываем как российский
        if (numbers.startsWith('7') || numbers.startsWith('8') || numbers.startsWith('9')) {
            // Для номеров, начинающихся с 8, заменяем на +7
            if (numbers.startsWith('8')) {
                numbers = '7' + numbers.substring(1);
            }
            // Для номеров, начинающихся с 9 (без кода страны), добавляем +7
            else if (numbers.startsWith('9') && numbers.length <= 10) {
                numbers = '7' + numbers;
            }
        }
        
        // Ограничиваем длину (10 цифр после +7)
        if (numbers.length > 11) {
            numbers = numbers.substring(0, 11);
        }

        // Форматируем номер
        let formattedValue = '';
        if (numbers.length > 0) {
            if (numbers.startsWith('7')) {
                formattedValue = '+7';
                if (numbers.length > 1) {
                    formattedValue += ' (' + numbers.substring(1, 4);
                }
                if (numbers.length > 4) {
                    formattedValue += ') ' + numbers.substring(4, 7);
                }
                if (numbers.length > 7) {
                    formattedValue += '-' + numbers.substring(7, 9);
                }
                if (numbers.length > 9) {
                    formattedValue += '-' + numbers.substring(9, 11);
                }
            } else {
                // Если номер не начинается с 7, оставляем как есть
                formattedValue = originalValue;
            }
        }

        // Устанавливаем отформатированное значение
        if (formattedValue !== originalValue) {
            input.value = formattedValue;
        }
        
        lastValue = formattedValue;
        
        // Скрываем ошибку при вводе
        if (errorMessage.classList.contains('show')) {
            hideError();
        }
    });

    // Обработка клавиш Backspace и Delete
    phoneInput.addEventListener('keydown', function(e) {
        if (e.key === 'Backspace' || e.key === 'Delete') {
            isDeleting = true;
        }
    });

    // Валидация российского телефона
    function validatePhone(phone) {
        // Убираем все нецифровые символы
        const cleanPhone = phone.replace(/\D/g, '');
        
        // Проверяем российский формат:
        // - +7XXXXXXXXXX (11 цифр с кодом страны)
        // - 8XXXXXXXXXX (11 цифр с восьмеркой)
        // - 9XXXXXXXXX (10 цифр без кода страны)
        const russianRegex = /^(\+?7|8)?9\d{9}$/;
        
        // Нормализуем номер для проверки
        let normalizedPhone = cleanPhone;
        
        // Если номер начинается с 8, заменяем на 7
        if (normalizedPhone.startsWith('8')) {
            normalizedPhone = '7' + normalizedPhone.substring(1);
        }
        // Если номер начинается с 9 и имеет 10 цифр, добавляем 7
        else if (normalizedPhone.startsWith('9') && normalizedPhone.length === 10) {
            normalizedPhone = '7' + normalizedPhone;
        }
        // Если номер начинается с +7, убираем +
        else if (normalizedPhone.startsWith('7')) {
            // уже в правильном формате
        }
        
        return normalizedPhone.length === 11 && normalizedPhone.startsWith('7') && russianRegex.test(cleanPhone);
    }

    function showError() {
        phoneInput.classList.add('error');
        errorMessage.classList.add('show');
        
        // Автоматически скрываем ошибку через 3 секунды
        setTimeout(() => {
            hideError();
        }, 3000);
    }

    function hideError() {
        phoneInput.classList.remove('error');
        errorMessage.classList.remove('show');
    }

    // Обработка отправки формы
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.querySelector('.input-name');
        const phoneValue = phoneInput.value.trim();
        
        // Проверка имени
        if (!nameInput.value.trim()) {
            nameInput.focus();
            return false;
        }
        
        if (!validatePhone(phoneValue)) {
            showError();
            phoneInput.focus();
            return false;
        }
        
        // Если валидация прошла успешно
        hideError();
        
        // Нормализуем номер для отправки
        const cleanPhone = phoneValue.replace(/\D/g, '');
        let normalizedPhone = cleanPhone;
        
        if (normalizedPhone.startsWith('8')) {
            normalizedPhone = '7' + normalizedPhone.substring(1);
        } else if (normalizedPhone.startsWith('9') && normalizedPhone.length === 10) {
            normalizedPhone = '7' + normalizedPhone;
        }
        
        console.log('Форма отправлена:', {
            name: nameInput.value,
            phone: normalizedPhone,
            formatted_phone: '+7 ' + normalizedPhone.substring(1, 4) + ' ' + normalizedPhone.substring(4, 7) + '-' + normalizedPhone.substring(7, 9) + '-' + normalizedPhone.substring(9, 11)
        });
        
        // Здесь можно добавить отправку формы на сервер
        // this.submit();
        
        // Показ успешной отправки
        showSuccessMessage();
    });

    // Успешная отправка
    function showSuccessMessage() {
        const submitBtn = orderForm.querySelector('.button');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Отправлено!';
        submitBtn.style.backgroundColor = '#4CAF50';
        submitBtn.style.color = 'white';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.backgroundColor = '';
            submitBtn.style.color = '';
            submitBtn.disabled = false;
            orderForm.reset();
        }, 2000);
    }

    // Валидация при потере фокуса
    phoneInput.addEventListener('blur', function() {
        const value = this.value.trim();
        if (value && !validatePhone(value)) {
            showError();
        }
    });

    // Скрытие ошибки при фокусе
    phoneInput.addEventListener('focus', function() {
        hideError();
    });

    // Валидация в реальном времени
    phoneInput.addEventListener('input', function() {
        const value = this.value;
        const isValid = validatePhone(value);
        
        if (value.length > 3 && !isValid) {
            this.style.borderBottomColor = '#ff6b6b';
        } else if (isValid) {
            this.style.borderBottomColor = '#4CAF50';
        } else {
            this.style.borderBottomColor = '';
        }
    });

    // Подсказка при фокусе
    phoneInput.addEventListener('focus', function() {
        if (!this.getAttribute('title')) {
            this.setAttribute('title', 'Формат: +7 (XXX) XXX-XX-XX или 8 (XXX) XXX-XX-XX');
        }
    });

    // Начальное значение для отслеживания изменений
    lastValue = phoneInput.value;
}

// ===== WINDOW LOAD EVENT =====
window.addEventListener('load', function() {
    console.log('Window loaded, finalizing initialization...');
    initHorizontalSliders();
    initTextSliders();
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// ===== RESIZE HANDLER =====
window.addEventListener('resize', function() {
    // Переинициализация при необходимости
});

// ===== EXPORT FOR MODULES (если нужно) =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initBurgerMenu,
        initSearchMenu,
        initHorizontalSliders,
        initTextSliders,
        initRiseUpAnimation,
        initPhoneValidation
    };
}