document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.gallery');
    if (!gallery) return;

    let hideTimer = null;

    // Логика активной карточки
    function activateCard(card) {
        clearTimeout(hideTimer);

        gallery.classList.add('has-active-card');

        gallery.querySelectorAll('.gallery-item').forEach(item => {
            item.classList.toggle('is-active', item === card);
        });
    }

    function deactivateGallery() {
        hideTimer = setTimeout(() => {
            gallery.classList.remove('has-active-card');

            gallery.querySelectorAll('.gallery-item').forEach(item => {
                item.classList.remove('is-active');
            });
        }, 150);
    }

    gallery.querySelectorAll('.gallery-item').forEach(card => {
        card.addEventListener('mouseenter', () => activateCard(card));
    });

    gallery.addEventListener('mouseleave', deactivateGallery);

    gallery.addEventListener('mouseenter', () => {
        clearTimeout(hideTimer);
    });


    // Логика тултипа NDA
    const ndaIcons = document.querySelectorAll('.nda-tooltip');

    ndaIcons.forEach(icon => {
        let tooltip = null;

        function showTooltip() {
            if (tooltip) return;

            tooltip = document.createElement('div');
            tooltip.className = 'nda-floating-tooltip';
            tooltip.textContent = icon.dataset.tooltip;

            document.body.appendChild(tooltip);

            const iconRect = icon.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();

            let top = iconRect.top - tooltipRect.height - 10;

            // Если сверху недостаточно места — показываем снизу
            if (top < 5) {
                top = iconRect.bottom + 10;
            }

            let left = iconRect.right - tooltipRect.width;

            // Не даём тултипу выходить за границы экрана
            left = Math.max(
                5,
                Math.min(left, window.innerWidth - tooltipRect.width - 5)
            );

            tooltip.style.top = `${top}px`;
            tooltip.style.left = `${left}px`;

            requestAnimationFrame(() => {
                if (tooltip) {
                    tooltip.classList.add('is-visible');
                }
            });
        }

        function hideTooltip() {
            if (!tooltip) return;

            tooltip.remove();
            tooltip = null;
        }

        icon.addEventListener('mouseenter', showTooltip);
        icon.addEventListener('mouseleave', hideTooltip);

        // Поддержка клавиатуры
        icon.addEventListener('focus', showTooltip);
        icon.addEventListener('blur', hideTooltip);
    });
});