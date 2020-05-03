var template = document.getElementById('worker-list__row');
var form = document.getElementById("worker-add");

document.getElementById('worker-list--thead').style.display = 'none';
var tbody = document.getElementById('worker-list');

function createRow(data) {
    var clone = template.content.cloneNode(true);

    var td = clone.querySelectorAll("td");
    td[0].textContent = data.name;
    td[1].textContent = data.addrress;
    td[2].textContent = data.tax;
    td[3].textContent = data.field;
    td[4].textContent = data.HourlyWage;
    td[5].textContent = data.username;

    var button = clone.getElementById('subbmit_button');
    var goTo_button = clone.getElementById('goTo_button');
    var newWage = clone.getElementById('hourlyWage');

    button.onclick = function () {
        //window.location = "/api/workers/edit_wage?id=" + data.id + "&wage=" + 10;
        editWorkerWage(data.id, newWage.value);
    }

    goTo_button.onclick = function () {
        window.location = "/salary_management?id=" + data.id;
    }

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

function editWorkerWage(id, wage) {

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/workers/edit_wage?id=" + id + "&wage=" + wage);
    xhr.onload = function (event) {

        loadAllWorkers();
    };

    // or onerror, onabort
    var formData = new FormData(form);
    xhr.send(formData);
}

