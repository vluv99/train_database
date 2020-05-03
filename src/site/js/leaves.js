var template = document.getElementById('leave-list__row');
var form = document.getElementById("leave-add");

document.getElementById('leave-list--thead').style.display = 'none';
var tbody = document.getElementById('leave-list');

function createRow(data) {
    var clone = template.content.cloneNode(true);

    var td = clone.querySelectorAll("td");
    //td[0].textContent = data.workerId;
    td[0].textContent = data.beginning;
    td[1].textContent = data.end;
    td[2].textContent = data.reason;
    td[3].textContent = data.approved;

    tbody.appendChild(clone);
}

function loadAllLeaves() {


    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/leaves/all");
    xhr.onload = function (event) {

        var data = JSON.parse(event.target.response);

        if (data.length != 0) {
            //makes the table head visible (if data isn't empty)
            document.getElementById('leave-list--thead').style = '';

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

loadAllLeaves();
