var template = document.getElementById('worker-list__row');

var body = document.getElementById('worker-list');

function createRow(data) {
    var clone = template.content.cloneNode(true);

    var td = clone.querySelectorAll("td");
    td[0].textContent = data.name;
    td[1].textContent = data.birthDate;
    td[2].textContent = data.address;
    td[3].textContent = data.tax;
    td[4].textContent = data.field;
    td[5].textContent = data.hourlyWage;
    td[6].textContent = data.username;

    var button = clone.getElementById('subbmit_button');

    button.onclick = function () {
        window.location = "/api/workers/edit_wage?id=" + data.id + "&wage=" + 10;
    }

    body.appendChild(clone);
}


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