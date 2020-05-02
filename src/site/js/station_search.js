
var template = document.getElementById('stations-list__row');
var form = document.getElementById("station-search");

document.getElementById('stations-list--thead').style.display = 'none';
var tbody = document.getElementById('stations-list');

function createRow(data) {
    var clone = template.content.cloneNode(true);

    var td = clone.querySelectorAll("td");
    td[0].textContent = data.name;
    td[1].textContent = data.peronCount;

    if (data.ticketOffice == 1) {
        td[2].textContent = "yes";//check - google icon
    } else {
        td[2].textContent = "no";//close
    }
    if (data.disabledServices == 1) {
        td[3].textContent = "yes";
    } else {
        td[3].textContent = "no";
    }
    if (data.info_pont == 1) {
        td[4].textContent = "yes";
    } else {
        td[4].textContent = "no";
    }
    if (data.cafe == 1) {
        td[5].textContent = "yes";
    } else {
        td[5].textContent = "no";
    }
    if (data.wifi == 1) {
        td[6].textContent = "yes";
    } else {
        td[6].textContent = "no";
    }


    tbody.appendChild(clone);
}

function loadAllStations() {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/stations/all");
    xhr.onload = function (event) {

        var data = JSON.parse(event.target.response);

        if (data.length != 0) {
            //makes the table head visible (if data isn't empty)
            document.getElementById('stations-list--thead').style = '';
            //document.getElementById('welcome-line').style.display = 'none';
            tbody.innerHTML = '';

            data.forEach(element => {

                createRow(element);
            });

        }

    };

    // or onerror, onabort
    var formData = new FormData(form);
    xhr.send(formData);


}

loadAllStations();

document.getElementById("subbmit_button").onclick = () => {

    const queryString = new URLSearchParams(new FormData(form)).toString()

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/stations?" + queryString);
    xhr.onload = function (event) {




        //alert("Success, server responded with: " + event.target.response); // raw response
        var data = JSON.parse(event.target.response);

        if (data.length != 0) {
            //makes the table head visible (if data isn't empty)
            document.getElementById('stations-list--thead').style = '';
            //document.getElementById('welcome-line').style.display = 'none';

            //it's empty-ing the previous lists
            var tbody = document.getElementById('stations-list');
            tbody.innerHTML = '';

            //puts data into table rows
            var clone = template.content.cloneNode(true);

            var td = clone.querySelectorAll("td");
            td[0].textContent = data.name;
            td[1].textContent = data.peronCount;
            if (data.ticketOffice == 1) {
                td[2].textContent = "yes";
            } else {
                td[2].textContent = "no";
            }
            if (data.disabledServices == 1) {
                td[3].textContent = "yes";
            } else {
                td[2].textContent = "no";
            }
            if (data.info_pont == 1) {
                td[4].textContent = "yes";
            } else {
                td[2].textContent = "no";
            }
            if (data.cafe == 1) {
                td[5].textContent = "yes";
            } else {
                td[2].textContent = "no";
            }
            if (data.wifi == 1) {
                td[6].textContent = "yes";
            } else {
                td[2].textContent = "no";
            }


            tbody.appendChild(clone);

        }

    };

    // or onerror, onabort
    var formData = new FormData(form);
    xhr.send(formData);


}
