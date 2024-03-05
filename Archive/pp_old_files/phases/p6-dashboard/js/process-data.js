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

    // Load Data
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