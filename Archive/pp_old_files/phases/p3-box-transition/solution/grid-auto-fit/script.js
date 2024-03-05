const quickViewButtons = document.querySelectorAll('[data-quick-view]');
const closeButtons = document.querySelectorAll('[data-close]');
const fullwidthCards = document.querySelectorAll('.fullwidth');
let toggle; // Quick view <button>.
let toggleParent; // <li>.
let fullwidth; // Fullwidth card to be "injected".

const openQuickView = (toggle, toggleParent, fullwidth) => {
    toggle.setAttribute('aria-expanded', 'true');
    toggleParent.classList.toggle('is-selected');
    fullwidth.classList.toggle('is-hidden');
    // Make fullwidth card keyboard focusable.
    fullwidth.setAttribute('tabIndex', '0');
};

const closeQuickView = (toggle, toggleParent, fullwidth) => {
    toggle.setAttribute('aria-expanded', 'false');
    toggleParent.classList.toggle('is-selected');
    fullwidth.classList.toggle('is-hidden');
    fullwidth.removeAttribute('tabIndex');
};

quickViewButtons.forEach(quickView => {
    // Add appropriate ARIA attributes for "toggle" behaviour.
    fullwidth = quickView.parentElement.nextElementSibling;
    quickView.setAttribute('aria-expanded', 'false');
    quickView.setAttribute('aria-controls', fullwidth.id);

    quickView.addEventListener('click', (e) => {
        toggle = e.target;
        toggleParent = toggle.parentElement;
        fullwidth = toggleParent.nextElementSibling;

        // Open (or close) fullwidth card.
        if (toggle.getAttribute('aria-expanded') === 'false') {
            // Do we have another fullwidth card already open? If so, close it.
            fullwidthCards.forEach(fullwidthOpen => {
                if (!fullwidthOpen.classList.contains('is-hidden')) {
                    toggleParentOpen =
                        fullwidthOpen.previousElementSibling;
                    toggleOpen = toggleParentOpen.querySelector(
                        '[data-quick-view]'
                    );

                    closeQuickView(toggleOpen, toggleParentOpen, fullwidthOpen);
                }
            });

            openQuickView(toggle, toggleParent, fullwidth);
        } else {
            closeQuickView(toggle, toggleParent, fullwidth);
        }
    });
});

closeButtons.forEach(close => {
    close.addEventListener('click', (e) => {
        fullwidth = e.target.parentElement;
        toggleParent = e.target.parentElement.previousElementSibling;
        toggle = toggleParent.querySelector('[data-quick-view]');

        closeQuickView(toggle, toggleParent, fullwidth);
        toggle.focus(); // Return keyboard focus to "toggle" button.
    });
});