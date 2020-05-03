var template = document.getElementById('purchase-list__row');
var form = document.getElementById("purchase-search");

document.getElementById('purchase-list--thead').style.display = 'none';
var tbody = document.getElementById('purchase-list');

function createRow(data) {
    var clone = template.content.cloneNode(true);
    console.log(data);

    var td = clone.querySelectorAll("td");
    td[0].textContent = data.passenger_name;
    td[1].textContent = data.date;
    td[2].textContent = data.from;
    td[3].textContent = data.to;
    td[4].textContent = data.depart;
    td[5].textContent = data.price;

    var goTo_button = clone.getElementById('show_button');

    goTo_button.onclick = function () {
        window.location = "/ticket?id=" + data.id;
    }

    tbody.appendChild(clone);
}

function loadAllTickets() {


    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/tickets/all");
    xhr.onload = function (event) {

        var data = JSON.parse(event.target.response);

        if (data.length != 0) {
            //makes the table head visible (if data isn't empty)
            document.getElementById('purchase-list--thead').style = '';

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

loadAllTickets();

document.getElementById('subbmit_button').onclick = () => {
    const queryString = new URLSearchParams(new FormData(form)).toString()

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/tickets?" + queryString);
    xhr.onload = function (event) {

        var data = JSON.parse(event.target.response);

        if (data.length != 0) {
            //makes the table head visible (if data isn't empty)
            document.getElementById('purchase-list--thead').style = '';

            //it's empty-ing the previous lists
            var tbody = document.getElementById('purchase-list');
            tbody.innerHTML = '';



            data.forEach(element => {
                //puts data into table rows
                createRow(element);
            });

        }

    };

    // or onerror, onabort
    var formData = new FormData(form);
    xhr.send(formData);
}