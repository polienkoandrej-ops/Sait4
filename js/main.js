/**
 * Андрей Полиенко — Работа с первопричиной накопления жировых клеток
 * JavaScript для интерактивных анимаций и скролла
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Анимация появления блоков при загрузке и скролле
    const revealElements = document.querySelectorAll('.reveal, .stagger-card');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Небольшая задержка для каскадного эффекта
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, index * 80);
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    } else {
        // Fallback для старых браузеров
        revealElements.forEach(el => el.classList.add('active'));
    }

    // 2. Плавный скролл для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});
