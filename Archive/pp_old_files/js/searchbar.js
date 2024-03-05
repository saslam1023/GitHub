function initializeSearch() {
    const searchBar = document.getElementById('search-bar');
    const searchOptions = document.getElementById('search-options');
    const searchResults = document.getElementById('search-results');
    const clearBtn = document.getElementById('clear-btn');
    let searchTimeout;

    searchBar.addEventListener('input', function () {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(search, 500); // Adjust the delay as needed (in milliseconds)
    });

    searchOptions.addEventListener('click', function (event) {
        if (event.target.tagName === 'LI') {
            searchBar.value = event.target.textContent;
            scrollToElement(event.target.dataset.index);
        }
    });

    searchBar.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default form submission
            search();
        }
    });

    clearBtn.addEventListener('click', function () {
        searchBar.value = '';
        searchResults.innerHTML = '';
        hideOptions();
        clearHighlight();
    });
    // here
    function search() {
        const searchText = searchBar.value.toLowerCase();
        searchResults.innerHTML = '';

        if (searchText.length <= 1) {
            hideOptions();
            clearHighlight();
            return;
        }

        const headings = document.querySelectorAll('h1, h2, h3');
        const matches = [];

        headings.forEach((heading, index) => {
            const headingText = heading.innerText.toLowerCase();
            const headingIndex = headingText.indexOf(searchText);

            // Check if the heading is within an li with class 'box' - add ! if want to invert search to hidden content in fullwidth containers.
            if (isInsideBoxList(heading)) {
                if (headingIndex !== -1) {
                    matches.push({
                        index: index,
                        start: headingIndex,
                        end: headingIndex + searchText.length
                    });
                }
            }
        });

        displayResults(matches);
    }
    //
    // Helper function to check if an element is inside an li with class 'box'
    function isInsideBoxList(element) {
        const closestLi = element.closest('li.box');
        return closestLi !== null && closestLi.classList.contains('box');
    }

    // there
    function displayResults(matches) {
        if (matches.length > 0) {
            showOptions(matches);
            scrollToElement(matches[0].index);
        } else {
            hideOptions();
        }
    }

    function showOptions(matches) {
        searchOptions.innerHTML = '';
        matches.forEach(match => {
            const li = document.createElement('li');
            li.textContent = document.querySelectorAll('h1, h2, h3, .clickable')[match.index].textContent;
            li.dataset.index = match.index;
            searchOptions.appendChild(li);
        });
        searchOptions.style.display = 'block';
        highlightMatches(matches);
    }

    function hideOptions() {
        searchOptions.innerHTML = '';
        searchOptions.style.display = 'none';
        clearHighlight();
    }

    function clearHighlight() {
        const headings = document.querySelectorAll('h1, h2, h3, .clickable');
        headings.forEach(heading => {
            heading.innerHTML = heading.innerText;
        });
    }

    function scrollToElement(index) {
        const targetElement = document.querySelectorAll('h1, h2, h3, .clickable')[index];
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        clearHighlight();
        // Highlight the matched text
        targetElement.innerHTML = targetElement.innerText.replace(new RegExp(searchBar.value, 'gi'), (match) => `<span class="highlight">${match}</span>`);
    }

    function highlightMatches(matches) {
        const headings = document.querySelectorAll('h1, h2, h3, .clickable');
        headings.forEach((heading, index) => {
            const headingText = heading.innerText;
            let highlightedText = '';

            matches.forEach(match => {
                if (match.index === index) {
                    const start = match.start;
                    const end = match.end;
                    highlightedText += `${headingText.substring(0, start)}<span class="highlight">${headingText.substring(start, end)}</span>${headingText.substring(end)}`;
                } else {
                    highlightedText = headingText;
                }
            });

            heading.innerHTML = highlightedText;
        });
    }



    function showOptions(matches) {
        searchOptions.innerHTML = '';

        const addedIndexes = []; // Track added indexes

        matches.forEach(match => {
            const index = match.index;

            // Check if the item with the same index has already been added
            if (!addedIndexes.includes(index)) {
                const li = document.createElement('li');
                li.textContent = document.querySelectorAll('h1, h2, h3, .clickable')[index].textContent;
                li.dataset.index = index;
                searchOptions.appendChild(li);

                addedIndexes.push(index); // Add the index to the addedIndexes array
            }
        });

        searchOptions.style.display = 'block';
        highlightMatches(matches);
    }
}
