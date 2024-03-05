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
});