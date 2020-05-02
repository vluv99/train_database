var template = document.getElementById('salary-list__row');

var body = document.getElementById('salary-list');

function createRow(data) {
    var clone = template.content.cloneNode(true);

    var td = clone.querySelectorAll("td");
    td[0].textContent = data.name;
    td[1].textContent = data.birthDate;
    td[2].textContent = data.date;
    td[3].textContent = data.workedHours;
    td[4].textContent = data.HourlyWage;
    td[5].textContent = data.wage;
    td[6].textContent = "";
    td[7].textContent = "";

    body.appendChild(clone);
}

function loadAllWorkerSalaries() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/salaries/all");
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

loadAllWorkerSalaries();

//on button click, the data is going to be added to the rows and database..?
document.getElementById("subbmit_button").onclick = () => {

    const queryString = new URLSearchParams(new FormData(form)).toString()

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/salary");
    xhr.onload = function (event) {

        var data = JSON.parse(event.target.response);

        if (data.length != 0) {
            //makes the table head visible (if data isn't empty)
            document.getElementById('salary-list--thead').style = '';

            //it's empty-ing the previous lists
            var tbody = document.getElementById('salary-list');
            tbody.innerHTML = '';

            //puts data into table rows
            var clone = template.content.cloneNode(true);

            var td = clone.querySelectorAll("td");
            td[0].textContent = data.name;
            td[1].textContent = data.birthDate;
            td[2].textContent = data.date;
            td[3].textContent = data.workedHours;
            td[4].textContent = data.HourlyWage;
            td[5].textContent = data.wage;
            td[6].textContent = "";
            td[7].textContent = "";

            tbody.appendChild(clone);

        }

    };

    // or onerror, onabort
    var formData = new FormData(form);
    xhr.send(formData);


}