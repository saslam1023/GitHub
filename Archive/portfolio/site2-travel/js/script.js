document.addEventListener('scroll', function () {
    // Example: Parallax effect for header background
    let scrollPosition = window.scrollY;
    document.querySelector('header').style.backgroundPositionY = -scrollPosition * 0.5 + 'px';
    // Add similar code for other parallax sections
});
