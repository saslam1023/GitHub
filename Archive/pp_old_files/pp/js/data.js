async function loadData() {
    try {
        // Fetch JSON data using the fetch API
        const response = await fetch('json/data.json');

        // Check if the request was successful (status code 200)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the JSON data from the response
        const data = await response.json();


        // Handle the loaded data

        processData(data); // Call processData directly
        placeTheHolders(); // Call placeTheHolders after data is processed



    } catch (error) {
        // Handle errors
        console.error('Fetch error:', error);
    }
}



function processData(data) {
    // Select the grid container
    const gridContainer = document.getElementById('grid');
    const targetItemCount = 8;

    // Access the 'items' array from the JSON data
    const items = data.items;

    // Iterate through each item and display it
    items.forEach(item => {

        const status = `${item.item.status}`;
        const h1 = `${item.h1}`;
        const h2 = `${item.h2}`;
        let box = ``;
        const boxcontent = `${item.boxcontent}`;
        const boxtype = `${item.boxtype}`;
        const figure = `${item.item.figure}`;

        // if status is live/true
        if (status === "live") {
            // then if h1 is not empty
            if (h1 !== "") {
                // h1 text boxes - display
                box = `<li class='box illuminate ${item.item.colour} inactive' id='box-${item.id}' tabindex='${item.id}'>
                <h1 class='clickable' data-link='#box-${item.id}' data-target='#quickview-${item.id}'>${item.h1}</h1>
                ${item.boxcontent}
                </li >
                    <li class='fullwidth is-hidden' id='quickview-${item.id}'>
                    <div class='contentLayout'>
                    <div class='flex-container'>
                    <div class='flex-item square'>
                                <h2 class='md-48'>${item.item.heading}</h2>
                                <h4 class='md-16'>${item.item.date}</h4>
                                </div>
                                <div class='flex-item w-60'>
                                    ${item.item.content}</div>
                            <div class='flex-item w-30'>
                             <h3 class='md-16 flex-item'>${item.item.subheading}</h3></div><div class='flex-item w-30'>
                            <figure class='hidden'><img src="images/${item.item.image}" class='flex-item'><figcaption class='caption'>${item.item.caption}</figcaption></figure></div>
                            
                                    </div>
                        </div>
                    </li>`;
            }
            // Boxes with no additional content - if h2 is not empty and boxcontent is 'nocontent' display box but no fullwidth container
            else if (h2 !== "" && boxtype === "display") {
                box = `<li class='box illuminate ${item.item.colour} inactive'  tabindex='${item.id}'>
                <div class='icon-clr'>
                <a href='${item.boxlink}' target='_blank'>${item.icon}</a>
                </div>
                <h2>${item.h2}</h2>${item.boxcontent}</li > `;
            }

            // h2 boxes and has content and h2 is not empty OR boxcontent is not equal to 'empty' then display boxes
            else if (h2 !== "" || boxcontent !== "empty") {

                box = `<li class='box illuminate ${item.item.colour} inactive' id='box-${item.id}' tabindex='${item.id}>
                <div class='icon-clr'>
                <a href='${item.boxlink}' target='_blank'>${item.icon}</a>
                </div>
                <h2 class='clickable' data-link='#box-${item.id}' data-target='#quickview-${item.id}'>${item.h2}</h2>
                ${item.boxcontent}</li >
                    <li class='fullwidth is-hidden' id='quickview-${item.id}'>
                    <div class='contentLayout'>
                    <div class='flex-container'>
                    <div class='flex-item square'>
                                <h2 class='md-48'>${item.item.heading}</h2>
                                <h4 class='md-16'>${item.item.date}</h4>
                                </div>
                                <div class='flex-item w-60'>
                                    ${item.item.content}</div>
                            <div class='flex-item w-30'>
                             <h3 class='md-32 flex-item square'>${item.item.subheading}</h3>
                        <figure class=' ${item.item.figure}'>
                        <img src='images/${item.item.image}'>
                         <figcaption class='caption'>${item.item.caption}</figcaption></figure></div>
                         
                        </div>
                        </div>
                    </li>`;

            }
            // Blank boxes - if boxcontent is 'empty' display blank boxes
            else if (boxcontent === "empty") {
                box = `<li class="box ${item.item.colour}"'></li> `;
            }
            // If box status is equal to 'pending' don't display anything
            else if (status === 'pending') {
                box = ``;
            }

            // Append the item element to the container
            /*  const interval = setInterval(function () {
                  // Insert the box HTML into the gridContainer
                  gridContainer.insertAdjacentHTML('beforeend', box);
              }, 2000); // Adjust the delay as needed (in milliseconds)
  */
            gridContainer.insertAdjacentHTML('beforeend', box);
        }
    });


}

function placeTheHolders() {
    /// Placeholders for full grid style view

    const gridContainer = document.getElementById('grid');
    const targetItemCount = 8; // Example value, adjust as needed

    // Correct usage of querySelectorAll() to select elements with class 'box'
    const currentItemCount = gridContainer.querySelectorAll('.box').length;

    console.log(gridContainer) //ul class grid
    console.log(targetItemCount) // 8
    console.log(currentItemCount) // 34

    // Calculate the remaining items needed to complete the last row
    const remainingItems = targetItemCount - (currentItemCount % targetItemCount + 1); // important needs +1 for accurate row of 8

    console.log(remainingItems) // 6

    // Add placeholder li elements only for the last row
    if (remainingItems > 0) {
        addPlaceholders(remainingItems);
    }

    // Placeholder additions
    function addPlaceholders(remainingItems) {
        const colors = ['pink', 'blue', 'green', 'gold', 'white', 'black', 'pink', 'white'];
        let usedColorsInRow = [];

        for (let i = 0; i < remainingItems; i++) {
            const availableColors = colors.filter(color => !usedColorsInRow.includes(color));

            let randomColor;

            if (availableColors.length === 0) {
                randomColor = colors[Math.floor(Math.random() * colors.length)];
            } else {
                randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];
            }

            usedColorsInRow.push(randomColor);

            const placeholderLi = document.createElement('li');
            placeholderLi.classList.add('box', 'illuminate', 'boxshadow', randomColor);
            placeholderLi.textContent = '';

            gridContainer.append(placeholderLi);
        }

        // Run the search function only if placeholders have been loaded
        placeholdersLoaded = true;        // Run the search function only if placeholders have been loaded
        if (placeholdersLoaded) {
            initializeSearch();
        }
    }


    // Search

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



}

loadData();
