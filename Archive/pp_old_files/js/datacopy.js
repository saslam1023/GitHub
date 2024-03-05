$(document).ready(function () {
    // *** Get Date
    function formatDate(d) {
        var dd = String(d.getDate()).padStart(2, '0');
        var mm = String(d.getMonth() + 1).padStart(2, '0');
        var yyyy = String(d.getFullYear() + 0 % 100).padStart(2, '0');
        var tthh = String(d.getHours()).padStart(2, '0');
        var ttss = String(d.getMinutes()).padStart(2, '0');

        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        var mmm = monthNames[d.getMonth()];
        return dd + ' ' + mmm + ' ' + yyyy;
    }

    function getDate() {
        var d = new Date();
        $('#date').val(formatDate(d));
    }
    //. end date

    // Call getDate function
    getDate();

    // *** Load Grid
    $(document).ready(function () {
        // Select the grid container
        const gridContainer = $('#grid');
        const targetItemCount = 8;

        // *** Load dynamic data from a JSON file using jQuery
        $.getJSON('json/data.json', function (data) {
            $.each(data.items, function (i, f) {
                let tblRow = "";

                const status = f.item.status;
                const h1 = f.h1;
                const h2 = f.h2;
                const boxcontent = f.boxcontent;

                if (status === 'live') {
                    if (h1 !== "") {
                        tblRow = `
                            <li class='box illuminate boxshadow ${f.item.colour}' >
                                <h1 class='clickable' data-target='#quickview-${f.id}'>${f.h1}</h1>${f.icon}${f.boxcontent}
                            </li>
                            <li class='fullwidth is-hidden' id='quickview-${f.id}'>
                                <div class='contentLayout'>
                                    <h2 class='md-48 pad50'>${f.item.heading}</h2>
                                    <div>${f.item.content}</div>
                                    <p class='md-32 pad50'>Test <a href='#'>inline ${f.item.link} link</a>.</p>
                                </div>
                            </li>`;
                    } else if (h2 !== "" || boxcontent !== "empty") {
                        tblRow = `
                            <li class='box illuminate boxshadow ${f.item.colour}'>
                                <h2 class='clickable' data-target='#quickview-${f.id}'>${f.h2}</h2>${f.icon}${f.boxcontent}
                            </li>
                            <li class='fullwidth is-hidden' id='quickview-${f.id}'>
                                <div class='contentLayout'>
                                    <h2 class='md-48 pad50'>${f.item.heading}</h2>
                                    <div>${f.item.content}</div>
                                    <p class='md-32 pad50'>Test <a href='#'>inline ${f.item.link} link</a>.</p>
                                </div>
                            </li>`;
                    } else if (boxcontent === "empty") {
                        tblRow = `<li class='box illuminate boxshadow ${f.item.colour}' ></li>`;
                    }
                } else if (status === 'pending') {
                    tblRow = "";
                }

                // Append the generated HTML to the grid container
                gridContainer.append(tblRow);
            });

            // Placeholders for full grid style view
            const currentItemCount = gridContainer.children('.box').length;
            const remainingItems = targetItemCount - (currentItemCount % targetItemCount);

            // Add placeholder li elements only for the last row
            if (remainingItems > 0) {
                addPlaceholders(remainingItems);
            }
        });

        // Placeholder additions
        function addPlaceholders(remainingItems) {
            const colors = ['pink', 'blue', 'green', 'gold', 'white', 'black', 'pink', 'white'];
            let usedColorsInRow = [];

            for (let i = 0; i < remainingItems; i++) {
                const availableColors = colors.filter(color => !usedColorsInRow.includes(color));
                const randomColor = availableColors.length === 0
                    ? colors[Math.floor(Math.random() * colors.length)]
                    : availableColors[Math.floor(Math.random() * availableColors.length)];

                const placeholderLi = $('<li>', {
                    class: `box illuminate boxshadow ${randomColor} round-border`
                });

                gridContainer.append(placeholderLi);
                usedColorsInRow.push(randomColor);
            }

            if (!placeholdersLoaded) {
                initializeSearch();
                placeholdersLoaded = true;
            }
        }

        // Click function
        $(document).on("click", ".clickable", function () {
            const targetId = $(this).data("target");
            const isOpen = $(targetId).hasClass("is-hidden");
            const parentLi = $(this).parent("li");
            const color = parentLi.css('background-color');

            $(".fullwidth").addClass("is-hidden");
            $(".clicked").removeClass("clicked");
            $("li").removeClass("expand");
            parentLi.toggleClass("expand");

            $('p.open, span, .tooltip').addClass("is-hidden");
            parentLi.removeClass("box illuminate");
            $(this).addClass("clicked");

            function scrollToTopLeft(selector) {
                const selectedElement = $(selector);
                if (selectedElement.length > 0) {
                    const offset = selectedElement.offset();
                    $('html, body').animate({
                        scrollTop: offset.top,
                        scrollLeft: offset.left
                    }, 'slow');
                }
            }

            scrollToTopLeft(parentLi);

            if (isOpen) {
                $(targetId).css({
                    backgroundColor: color,
                    height: $(window).height() + "px"
                }).removeClass("is-hidden").toggle().fadeIn(1000);
            }
        });

        // Click event for closing the fullwidth container (including close button)
        $(document).on("click", ".fullwidth, .expand, clickable, button[data-close]", function (e) {
            e.stopPropagation();

            const fullwidthContainer = $(this).closest(".fullwidth");
            const liContainer = $(this);
            const parentLi = liContainer.parent("li");

            $('.open, span, .tooltip').removeClass("is-hidden");
            $('.clickable').removeClass("clicked"); // removes clickable from h2
            $('.boxshadow').addClass("box illuminate"); // displays box style

            fullwidthContainer.addClass("is-hidden");
            $("li").removeClass("expand");

            placeholdersLoaded = false; // Assuming you want to reset placeholdersLoaded
        });
    });
});
