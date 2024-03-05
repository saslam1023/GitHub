const fullwidthCards = document.querySelectorAll('.fullwidth');
let openFullwidth = null; // Variable to track the currently open full-width item

const openQuickView = (toggleParent, fullwidth) => {
    toggleParent.classList.add('is-selected');
    fullwidth.classList.remove('is-hidden');
    fullwidth.setAttribute('tabIndex', '0');
    openFullwidth = fullwidth;
};

const closeQuickView = (toggleParent, fullwidth) => {
    toggleParent.classList.remove('is-selected');
    fullwidth.classList.add('is-hidden');
    fullwidth.removeAttribute('tabIndex');
    openFullwidth = null;
};

const toggleClickHandler = (e) => {
    const toggleParent = e.currentTarget.parentElement;
    const fullwidth = toggleParent.querySelector('.fullwidth');

    if (openFullwidth && openFullwidth !== fullwidth) {
        closeQuickView(openFullwidth.parentElement, openFullwidth);
    }

    if (openFullwidth === fullwidth) {
        closeQuickView(toggleParent, fullwidth);
    } else {
        openQuickView(toggleParent, fullwidth);
    }
};

fullwidthCards.forEach((fullwidth) => {
    const toggleParent = fullwidth.previousElementSibling;
    const toggle = toggleParent.querySelector('[data-view]');

    toggle.addEventListener('click', toggleClickHandler);
});
