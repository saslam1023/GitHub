$(document).ready(function () {
    // *** Data matching
    const hasClassInStylesheet = className => {
        const styleSheets = Array.from(document.styleSheets);
        return styleSheets.some(sheet => {
            let rules;
            try {
                rules = sheet.cssRules || sheet.rules;
            } catch (e) {
                // Cross-origin security may cause a SecurityError when trying to access cssRules
                console.error(e.message);
                return false;
            }
            return Array.from(rules).some(rule => rule.selectorText === `.${className}`);
        });
    };

    const updateElement = userInput => {
        const outputElement = document.getElementById("outputElement");

        outputElement.className = hasClassInStylesheet(userInput) ? `defaultStyle ${userInput}` : "defaultStyle";
        outputElement.innerText = hasClassInStylesheet(userInput) ? "" : userInput;
    };

    const updateElement1 = (outputId, value) => {
        document.getElementById(outputId).innerText = value;
    };

    const updateElement2 = (outputId, value) => {
        document.getElementById(outputId).innerText = value;
    };

    const updateElement3 = (outputId, value) => {
        document.getElementById(outputId).innerText = value;
    };

    const updateElement4 = (outputId, value) => {
        document.getElementById(outputId).innerText = value;
    };

    const updateElement5 = (outputId, value) => {
        document.getElementById(outputId).innerText = value;
    };



    // *** Load Data
    {
        var items = [];
        $.getJSON('json/data.json', function (data) {
            $.each(data.items, function (i, f) {
                var tblRow = "";
                var tbrdark = "";
                var tbr = "";
                var status = "" + f.item.status + "";

                if (status == 'live') {
                    //  tbr = "<tr class='tr'>";

                    tblRow = "<tr class='tr'><td class='td'>" + f.id + "</td><td class='td'>" + f.h1 + "</td><td class='td'> " + f.h2 + "</td ><td class='td'>" + f.h3 + "</td><td class='td'>" + f.icon + "</td><td class='td'>" + f.item.heading + "</td><td class='td'>" + f.item.subheading + "</td><td class='td'>" + f.item.date + "</td><td class='td'><img src='" + f.item.image + "' width='50'></td><td class='td'>" + f.item.content + "</td><td class='td'>" + f.item.block + "</td><td class='td'>" + f.item.link + "</td><td class='td'>" + f.item.colour + "</td><td class='td'> " + f.item.status + "</td><td class='td'>" + f.contact.name + "</td><td class='td'>" + f.contact.email + "</td><td class='td'>" + f.contact.phone + "</td></tr>";

                    //  tbrdark = "<tr class='tr dark'>";

                }

                //  $(this).removeClass("dark") 


                else if (status == 'pending') {
                    tblRow = ""
                }

                $(tblRow).delay((i++) * 300).fadeTo(2000, 1).appendTo("#table");
            });

            // keep last 3
        })


    }

});