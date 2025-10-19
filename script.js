// Burger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const burgerBtn = document.querySelector('.action-burger');
    const exitBtn = document.querySelector('.burger .action-exit');
    const burgerMenu = document.querySelector('.burger');
    const burgerOverlay = document.querySelector('.burger-overlay');
    
    // Функция для открытия меню
    function openBurgerMenu() {
        burgerMenu.classList.add('active');
        burgerOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Функция для закрытия меню
    function closeBurgerMenu() {
        burgerMenu.classList.remove('active');
        burgerOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Обработчики событий
    if (burgerBtn) {
        burgerBtn.addEventListener('click', openBurgerMenu);
    }
    
    if (exitBtn) {
        exitBtn.addEventListener('click', closeBurgerMenu);
    }
    
    // Закрытие меню при клике на оверлей
    if (burgerOverlay) {
        burgerOverlay.addEventListener('click', closeBurgerMenu);
    }
    
    // Закрытие меню при клике на ссылки
    const burgerLinks = burgerMenu.querySelectorAll('a');
    burgerLinks.forEach(link => {
        link.addEventListener('click', closeBurgerMenu);
    });
    
    // Закрытие меню при нажатии Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && burgerMenu.classList.contains('active')) {
            closeBurgerMenu();
        }
    });
});