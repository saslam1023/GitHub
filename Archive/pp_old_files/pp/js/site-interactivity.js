document.addEventListener("click", function (event) {
    const clickedElement = event.target;

    if (clickedElement.matches("h1, h2, .clickable")) {
        const targetId = clickedElement.getAttribute("data-target");
        const boxId = clickedElement.getAttribute("data-link");
        const isOpen = document.querySelector(targetId).classList.contains("is-hidden");
        const active = document.querySelector("li").classList.contains("active");
        const parentLi = clickedElement.parentElement; // ?
        const computedStyle = window.getComputedStyle(parentLi);
        const color = computedStyle.getPropertyValue("background-color");
        const fullwidthContainer = clickedElement.closest(".fullwidth"); // ?

        console.log(parentLi); // array
        console.log(targetId); // id #quickview-
        console.log(isOpen); // true
        console.log(active); // false / true
        console.log(clickedElement); // <h2 data-target="#quickview-6">I'm a crafter</h2>
        console.log(fullwidthContainer); // array
        console.log(boxId); // id #box-

        // Closes open containers
        if (active === true) {
            document.querySelector(".expand.active").classList.remove("expand", "active");
            document.querySelector(".expand.active").classList.add("box", "inactive"); // keep this ADDS INITIAL
            document.querySelector(".fullwidth.active").classList.add("is-hidden");
            document.querySelector(".fullwidth.active").classList.remove("active");
        }

        // Opens new container
        if (isOpen) {
            const targetElement = document.querySelector(targetId);
            targetElement.style.backgroundColor = color;
            targetElement.style.height = window.innerHeight + "px";
            targetElement.classList.remove("is-hidden");
            targetElement.classList.add("active"); // activates the fullwidth box
            document.querySelector(boxId).classList.add("expand", "active", "P4");
            document.querySelector(boxId).classList.remove("box", "inactive"); // keep this ADDS INITIAL
        }

        // Scrolls into position / view
        function scrollToTopLeft(selector) {
            const selectedElement = document.querySelector(selector);
            if (selectedElement) {
                const offsetTop = selectedElement.offsetTop;
                const offsetLeft = selectedElement.offsetLeft;
                window.scrollTo({
                    top: offsetTop,
                    left: offsetLeft,
                    behavior: 'smooth'
                });
            }
        }

        scrollToTopLeft(parentLi);
    }
});


