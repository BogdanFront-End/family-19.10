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