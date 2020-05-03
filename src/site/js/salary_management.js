var template = document.getElementById('salary-list__row');
var form = document.getElementById("salary-add");

document.getElementById('salary-list--thead').style.display = 'none';
var tbody = document.getElementById('salary-list');

function createRow(data) {
    var clone = template.content.cloneNode(true);

    var td = clone.querySelectorAll("td");
    td[0].textContent = data.date;
    td[1].textContent = data.hours;

    var button = clone.getElementById('delete_button');

    button.onclick = function () {
        //window.location = "/api/workers/edit_wage?id=" + data.id + "&wage=" + 10;
        deleteWorkerHour(data.id);
    }

    tbody.appendChild(clone);
}

function loadAllWorkedHours() {


    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/worker_salary/all?id="+id);
    xhr.onload = function (event) {

        var data = JSON.parse(event.target.response);

        if (data.length != 0) {
            //makes the table head visible (if data isn't empty)
            document.getElementById('salary-list--thead').style = '';

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

loadAllWorkedHours();

function deleteWorkerHour(id) {

    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/api/worker_salary/delete_hours?id=" + id);
    xhr.onload = function (event) {

        loadAllWorkedHours();
    };

    // or onerror, onabort
    var formData = new FormData(form);
    xhr.send(formData);
}