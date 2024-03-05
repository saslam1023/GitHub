$(document).ready(function () {

    // *** Get Date
    function getDate() {
        function formatDate(d) {
            var dd = d.getDate()
            if (dd < 10) dd = '0' + dd

            var mm = d.getMonth() + 1
            if (mm < 10) mm = '0' + mm

            var yyyy = d.getFullYear() + 0 % 100
            if (yyyy < 10) yyyy = '0' + yyyy

            var tthh = d.getHours()
            if (tthh < 10) tthh = '0' + tthh

            var ttss = d.getMinutes()
            if (ttss < 10) ttss = '0' + ttss

            var monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];

            var mmm = monthNames[d.getMonth()]
            return dd + ' ' + mmm + ' ' + yyyy
        }

        var d = new Date()
        document.getElementById('date').value = formatDate(d);
    }
    //. end date


    // *** Load Grid
    $(document).ready(function () {
        // Select the grid container
        const gridContainer = $('#grid');
        const targetItemCount = 8;


        // *** Load dynamic data from JSON file using jQuery
        $.getJSON('json/data.json', function (data) {
            $.each(data.items, function (i, f) {
                let tblRow = "";
                const status = `${f.item.status}`;
                const h1 = `${f.h1}`;
                const h2 = `${f.h2}`;
                const boxcontent = `${f.boxcontent}`;

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


            // *** Placeholders for full grid style view

            // Check the current number of li elements after dynamic data is loaded
            const currentItemCount = gridContainer.children('.box').length;

            // Calculate the remaining items needed to complete the last row
            const remainingItems = targetItemCount - (currentItemCount % targetItemCount);

            // Add placeholder li elements only for the last row
            if (remainingItems > 0) {
                addPlaceholders(remainingItems);

            }
        });
        // Placeholder additions
        let placeholdersLoaded = false;

        // Placeholder additions
        function addPlaceholders(remainingItems) {
            // Array of possible colors (yes, pink and white are set twice!)
            const colors = ['pink', 'blue', 'green', 'gold', 'white', 'black', 'pink', 'white'];

            // Array to store the colors used in the current row
            let usedColorsInRow = [];

            for (let i = 0; i < remainingItems; i++) {
                // Filter out colors that have been used in the current row to prevent duplicates
                const availableColors = colors.filter(color => !usedColorsInRow.includes(color));

                // If all unique colors have been used, allow controlled repetition
                if (availableColors.length === 0) {
                    // Choose a random color from the entire color array
                    const randomColor = colors[Math.floor(Math.random() * colors.length)];
                    // Add the chosen color to the usedColorsInRow array
                    usedColorsInRow.push(randomColor);
                } else {
                    // Choose a random color from the available colors
                    const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];
                    // Add the chosen color to the usedColorsInRow array
                    usedColorsInRow.push(randomColor);
                }

                // Create placeholder li element with the random color
                const placeholderLi = document.createElement('li');

                // Add additional classes
                placeholderLi.classList.add('box', 'illuminate', 'boxshadow', usedColorsInRow[i], 'round-border');

                // Add text content if desired
                placeholderLi.textContent = '';

                // Update grid
                gridContainer.append(placeholderLi);
            }
            placeholdersLoaded = true;        // Run the search function only if placeholders have been loaded
            if (placeholdersLoaded) {
                initializeSearch();
            }
        }

        /* removed
        // Click event for dynamically created h1 elements
        $(document).on("click", "h1.clickable", function () {
            var targetId = $(this).data("target");
            var isOpen = $(targetId).hasClass("is-hidden");
            var color = getColorFromClass($(this).closest("li").attr('class'));
        
            // Close all open fullwidth containers
            $(".fullwidth").addClass("is-hidden");
        
            // Makes li container full width
            $("li").removeClass("expand");
            $(this).parent("li").toggleClass("expand");
        
            // Scroll to a selected item and position it to the top-left corner
            function scrollToTopLeft(selector) {
                var selectedElement = $(selector);
        
                // Check if the element exists
                if (selectedElement.length > 0) {
                    // Calculate the offset of the element
                    var offset = selectedElement.offset();
        
                    // Scroll to the element's top-left corner
                    $('html, body').animate({
                        scrollTop: offset.top,
                        scrollLeft: offset.left
                    }, 'slow');
                }
            }
        
            // Scroll to the top-left corner of the selected element with ID 'exampleElement'
            scrollToTopLeft(this);
        
            // If the clicked container was not open, open it and set background color
            if (isOpen) {
                // Fade in and set background color
                $(targetId).css({
                    backgroundColor: color,
                    height: $(window).height() + "px"
                }).removeClass("is-hidden").toggle().fadeIn(1000); // Adjust the duration as needed
            }
        
        
            // KEEP Helper function to get the color from class
            function getColorFromClass(classString) {
                // Extract the color class, assuming it is the second class in the list
                var colorClass = classString.split(' ')[1];
                return window.getComputedStyle(document.querySelector('.' + colorClass), null).getPropertyValue('background-color');
            }
        });
        
        /*/
        //h2

        // Click function

        // Click event handler for clickable elements and fullwidth containers
        $(document).on("click", ".clickable, .fullwidth, .expand, button[data-close]", function (e) {
            e.stopPropagation();

            // Check if the clicked element is a clickable element
            if ($(this).hasClass("clickable")) {
                handleClickableClick.call(this);
            } else {
                handleCloseClick.call(this);
            }
        });

        // Function to handle clicks on clickable elements
        function handleClickableClick() {
            var targetId = $(this).data("target");
            var isOpen = $(targetId).hasClass("is-hidden");
            var isActive = $(targetId).hasClass("active");
            var color = $(this).closest("li").css('background-color');
            var liContainer = $(this); // this is the h2/content within the box
            var liBox = $(this).parent("li"); // the box
            var fullwidthContainer = $(this).closest(".fullwidth");
            var fullWidth = liBox.next("li"); // this is the fullscreen li


            // Close all open fullwidth containers
            // add in 'if class is 'active' then close' 
            /*    if (isActive) {
                    $(this).removeClass('active expand');
    
                    $(".fullwidth").addClass("is-hidden");
                }*/

            // Remove any previous open containers
            // Remove 'active' class from all elements with class 'active'
            $('.active').removeClass('active p1');
            // Remove 'expand' class from all elements with class 'expand'
            $('.expand').removeClass('expand p2');
            $('.fullwidth').removeClass('fullwidth p3');
            //   $(liContainer).removeClass("expand active");
            //  $(".fullwidth").addClass("is-hidden");
            //   $(fullWidth).removeClass("active fullwidth");




            // Make the clicked li container full width
            $(liContainer).addClass("expand clicked active"); // this is the h2 in libox
            // Remove box effects
            liBox.removeClass("box illuminate fullwidth box");
            // Hide non-text content
            $('.open').addClass("is-hidden OOOOOO is-hidden  dafudge");
            $('span').addClass("is-hidden OOOOOO is-hidden  dafudge");
            $('.tooltip').addClass("is-hidden OOOOOO is-hidden  dafudge");

            console.log(liContainer)




            // Add fullwidth and expand to box for full view
            liBox.addClass("fullwidth expand clicked active") // fullwidth box li
            // Add clicked class for styling
            //  liContainer.addClass("clicked");

            $(fullWidth).addClass("fullwidth active FULLWIDTHcontainer"); // this is the fullscreen li correct


            // Scroll to the top-left corner of the selected li element
            scrollToTopLeft($(this).closest("li"));

            // If the clicked container was not open, open it and set background color
            if (isOpen) {
                $(targetId).css({
                    backgroundColor: color,
                    height: $(window).height() + "px"
                }).removeClass("is-hidden").toggle().fadeIn(1000);


                // Display icons and restore box styles
                $('.open, span, .tooltip').removeClass("is-hidden");

                /*    // Displays original box styling
                    //  liContainer.addClass("box illuminate 11"); // h2
                    liContainer.addClass("expand  fullwidth active clicked 33"); // h2
                    liContainer.parent("li").addClass("expand  fullwidth active clicked 33");
                    liContainer.parent("li").removeClass("box illuminate 22"); //li box
                    //hide  liContainer.removeClass("clicked");
    /*/
                console.log(liContainer) // h2
                console.log(liContainer.parent("li")) // li

                // Fade out the fullwidth container and hide it
                fullwidthContainer.fadeOut(1000, function () {
                    fullwidthContainer.addClass("is-hidden");
                });

                // Remove the expand class from li containers
                $("li").removeClass("expand active");
                // Hide the fullwidth container
                fullwidthContainer.addClass("is-hidden ");
                // Reset styling for h2 elements with clickable class
                $('h2.clickable').removeClass("clicked");

                // added this
                $('.open, span, .tooltip').removeClass("is-hidden");
                $('.clickable').removeClass("clicked"); // removes clickable from h2
                $('.boxshadow').addClass("box illuminate"); // displays box style

            }

            // Function to scroll to the top-left corner of a given element
            function scrollToTopLeft(selector) {
                var selectedElement = $(selector);

                if (selectedElement.length > 0) {
                    var offset = selectedElement.offset();

                    // Animate scrolling to the top-left corner
                    $('html, body').animate({
                        scrollTop: offset.top,
                        scrollLeft: offset.left
                    }, 'slow');
                }

            }
        }/*/
                    /* temporary pause
                            // Function to handle clicks on elements for closing the fullwidth container
                            function handleCloseClick() {
                                var fullwidthContainer = $(this).closest(".fullwidth");
                                var liContainer = $(this);
                                console.log(liContainer);
                                console.log(fullwidthContainer);
                                console.log(this);
                    
                                // Display icons and restore box styles
                                $('.open, span, .tooltip').removeClass("is-hidden");
                                liContainer.addClass("box illuminate ");
                                liContainer.parent("li").removeClass("box illuminate");
                                liContainer.removeClass("clicked");
                    
                                // Fade out the fullwidth container and hide it
                                fullwidthContainer.fadeOut(1000, function () {
                                    fullwidthContainer.addClass("is-hidden");
                                });
                    
                                // Remove the expand class from li containers
                                $("li").removeClass("expand");
                                $("li").addClass("in-active");
                                // Hide the fullwidth container
                                fullwidthContainer.addClass("is-hidden ");
                                // Reset styling for h2 elements with clickable class
                                $('h2.clickable').removeClass("clicked");
                            }
                    
                            // Function to scroll to the top-left corner of a given element
                            function scrollToTopLeft(selector) {
                                var selectedElement = $(selector);
                    
                                if (selectedElement.length > 0) {
                                    var offset = selectedElement.offset();
                    
                                    // Animate scrolling to the top-left corner
                                    $('html, body').animate({
                                        scrollTop: offset.top,
                                        scrollLeft: offset.left
                                    }, 'slow');
    } 
    }*/


    });


});




