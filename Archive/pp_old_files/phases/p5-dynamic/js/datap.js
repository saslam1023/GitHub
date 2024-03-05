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


    $(document).ready(function () {
        // Select the grid container
        const gridContainer = $('#grid');
        const targetItemCount = 8;

        // Function to add placeholder li elements
        function addPlaceholders(remainingItems) {
            for (let i = 0; i < remainingItems; i++) {
                const placeholderLi = document.createElement('li');
                placeholderLi.classList.add('box', 'gradientC', 'round-border');
                placeholderLi.textContent = '';
                gridContainer.append(placeholderLi);
            }
        }

        // Load dynamic data from a JSON file using jQuery
        $.getJSON('json/data.json', function (data) {
            $.each(data.items, function (i, f) {
                var tblRow = "";
                var status = "" + f.item.status + "";

                if (status == 'live') {
                    tblRow = "<li class='box " + f.item.colour + "' ><h1 class='clickable' data-target='#quickview-" + f.id + "'>" + f.h1 + "</h1></li><li class='fullwidth is-hidden' id='quickview-" + f.id + "'><div class='contentLayout'><h2 class='md-48 pad50'>" + f.item.heading + "</h2><p>" + f.item.content + "</p><p class='md-32 pad50'>Test <a href='#'>inline " + f.item.link + " link</a>.</p></div></li>";
                } else if (status == 'pending') {
                    tblRow = "";
                }

                // Append the generated HTML to the grid container
                gridContainer.append(tblRow);
            });

            // Check the current number of li elements after dynamic data is loaded
            const currentItemCount = gridContainer.children('.box').length;

            // Calculate the remaining items needed to complete the last row
            const remainingItems = targetItemCount - (currentItemCount % targetItemCount);

            // Add placeholder li elements only for the last row
            if (remainingItems > 0) {
                addPlaceholders(remainingItems);
            }
        });





        // PREV Click event for dynamically created h1 elements
        $(document).on("click", "h1.clickable", function () {
            var targetId = $(this).data("target");
            var isOpen = $(targetId).hasClass("is-hidden");
            var color = getColorFromClass($(this).parent().attr('class'));

            // Close all open fullwidth containers
            $(".fullwidth").addClass("is-hidden");


            // Toggle the fade-out class on the clicked li element
            //  $(this).addClass("fade-out");

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

            // Example usage: Scroll to the top-left corner of the selected element with ID 'exampleElement'
            scrollToTopLeft(this);




            // REPLACED If the clicked container was not open, open it and set background color
            if (isOpen) {

                // Fade in and set background color
                $(targetId).css({
                    backgroundColor: color,
                    height: $(window).height() + "px"
                }).removeClass("is-hidden").toggle().fadeIn(1000); // Adjust the duration as needed
            }


        });



        // KEEP Helper function to get the color from class
        function getColorFromClass(classString) {
            // Extract the color class, assuming it is the second class in the list
            var colorClass = classString.split(' ')[1];
            return window.getComputedStyle(document.querySelector('.' + colorClass), null).getPropertyValue('background-color');
        }

        // Click event for closing the fullwidth container (including close button)
        $(document).on("click", ".fullwidth, .expand, button[data-close]", function (e) {
            // Prevent the event from propagating to parent elements
            e.stopPropagation();

            // Find the closest fullwidth container
            var fullwidthContainer = $(this).closest(".fullwidth");

            // Hide the fullwidth container
            //orig  fullwidthContainer.addClass("is-hidden");
            // fullwidthContainer.addClass("is-hidden"); // Adjust the duration as needed

            // Fade out the fullwidth container and add the is-hidden class
            fullwidthContainer.fadeOut(1000, function () {
                // Hide the fullwidth container after fading out                

                fullwidthContainer.addClass("is-hidden");
                //  $("li").removeClass("expand");

            });

            $("li").removeClass("expand");
            fullwidthContainer.addClass("is-hidden");

            // Remove the selected state class from all li elements$("li").removeClass("expand");
            //      $("li").removeClass("is-selected");


            // Example usage
            console.log('Data:', data);
            console.log('Remaining Items:', remainingItems);



        });

    });
})


