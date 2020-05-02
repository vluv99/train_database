var template = document.getElementById('worker-list__row');
var form = document.getElementById("worker-add");

document.getElementById('worker-list--thead').style.display = 'none';
var tbody = document.getElementById('worker-list');

function createRow(data) {
    var clone = template.content.cloneNode(true);

    var td = clone.querySelectorAll("td");
    td[0].textContent = data.name;
    td[1].textContent = data.birthDate;
    td[2].textContent = data.addrress;
    td[3].textContent = data.tax;
    td[4].textContent = data.field;
    td[5].textContent = data.HourlyWage;
    td[6].textContent = data.username;

    tbody.appendChild(clone);
}

function loadAllWorkers() {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/workers/all");
    xhr.onload = function (event) {

        var data = JSON.parse(event.target.response);

        if (data.length != 0) {
            //makes the table head visible (if data isn't empty)
            document.getElementById('worker-list--thead').style = '';

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

loadAllWorkers();

function editWorkerWage() {

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/workers/edit_wage?id=0&wage=10");
    xhr.onload = function (event) {

        var data = JSON.parse(event.target.response);

        if (data.length != 0) {
            //makes the table head visible (if data isn't empty)
            document.getElementById('worker-list--thead').style = '';

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
