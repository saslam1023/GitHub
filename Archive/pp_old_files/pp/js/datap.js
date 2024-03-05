async function loadData() {
    try {
        const response = await fetch('json/data.json');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        await loadBoxesWithDelay(data); // Load boxes with delay
        setTimeout(placeTheHolders, 0); // Placeholders loaded after a delay

    } catch (error) {
        console.error('Fetch error:', error);
    }
}

async function loadBoxesWithDelay(data) {
    const gridContainer = document.getElementById('grid');
    const items = data.items;
    const delay = 100; // 1 second delay

    for (const item of items) {
        await sleep(delay); // Sleep for the delay before inserting the box
        const box = createBoxHTML(item); // Create HTML for the box
        gridContainer.insertAdjacentHTML('beforeend', box); // Insert the box after the delay
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createBoxHTML(item) {
    let boxHTML = '';
    if (item.item.status === 'live') {
        const status = `${item.item.status}`;
        const h1 = `${item.h1}`;
        const h2 = `${item.h2}`;
        let boxcontent = `${item.boxcontent}`;
        const boxtype = `${item.boxtype}`;

        if (boxcontent === "nocontent" || boxcontent === "empty") {
            boxcontent = "";
            boxHTML = `<li class="box ${item.item.colour}"'></li>`;// if it's nocontent, we want to display an empty string

            // if  (boxcontent === "empty") {
            //   boxHTML = `<li class="box ${item.item.colour}"'></li>`;
        }

        // Constructing the HTML for the box based on different conditions
        if (status === "live" && h1 !== "") {
            boxHTML = `<li class='box illuminate ${item.item.colour} inactive' id='box-${item.id}' tabindex='${item.id}'>
                            <h1 class='clickable' data-link='#box-${item.id}' data-target='#quickview-${item.id}'>${item.h1}</h1>
                            ${item.boxcontent}
                        </li>
                        <li class='fullwidth is-hidden' id='quickview-${item.id}'>
                            <div class='contentLayout'>
                                <div class='flex-container'>
                                    <div class='flex-item square'>
                                        <h2 class='md-48'>${item.item.heading}</h2>
                                        <h4 class='md-16'>${item.item.date}</h4>
                                    </div>
                                    <div class='flex-item w-60'>
                                        ${item.item.content}
                                    </div>
                                    <div class='flex-item w-30'>
                                        <h3 class='md-16 flex-item'>${item.item.subheading}</h3>
                                    </div>
                                    <div class='flex-item w-30'>
                                        <figure class='hidden'>
                                            <img src="images/${item.item.image}" class='flex-item'>
                                            <figcaption class='caption'>${item.item.caption}</figcaption>
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        </li>`;
        } else if (status === "live" && (h2 !== "" || boxcontent !== "")) {
            boxHTML = `<li class='box illuminate ${item.item.colour} inactive' id='box-${item.id}' tabindex='${item.id}'>
                            <div class='icon-clr'>
                                <a href='${item.boxlink}' target='_blank'>${item.icon}</a>
                            </div>
                            <h2 class='clickable' data-link='#box-${item.id}' data-target='#quickview-${item.id}'>${item.h2}</h2>
                            ${item.boxcontent}
                        </li>
                        <li class='fullwidth is-hidden' id='quickview-${item.id}'>
                            <div class='contentLayout'>
                                <div class='flex-container'>
                                    <div class='flex-item square'>
                                        <h2 class='md-48'>${item.item.heading}</h2>
                                        <h4 class='md-16'>${item.item.date}</h4>
                                    </div>
                                    <div class='flex-item w-60'>
                                        ${item.item.content}
                                    </div>
                                    <div class='flex-item w-30'>
                                        <h3 class='md-32 flex-item square'>${item.item.subheading}</h3>
                                        <figure class=' ${item.item.figure}'>
                                            <img src='images/${item.item.image}'>
                                            <figcaption class='caption'>${item.item.caption}</figcaption>
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        </li>`;
        } else if (boxcontent === "empty") {
            boxHTML = `<li class="box ${item.item.colour}"'></li>`;
        }
    }

    return boxHTML;
}


function placeTheHolders() {
    const gridContainer = document.getElementById('grid');
    const targetItemCount = 8;
    const currentItemCount = gridContainer.querySelectorAll('.box').length;

    const remainingItems = targetItemCount - (currentItemCount % targetItemCount);

    if (remainingItems > 0) {
        addPlaceholders(remainingItems);
    }
}

function addPlaceholders(remainingItems) {
    const gridContainer = document.getElementById('grid');
    const colors = ['pink', 'blue', 'green', 'gold', 'white', 'black', 'pink', 'white'];

    for (let i = 0; i < remainingItems; i++) {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const placeholderLi = document.createElement('li');
        placeholderLi.classList.add('box', 'illuminate', 'boxshadow', randomColor);
        placeholderLi.textContent = '';
        gridContainer.append(placeholderLi);
    }
}

loadData();
