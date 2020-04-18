
var template = document.getElementById('train-list__row');
var form = document.getElementById("train-search");
document.getElementById("subbmit_button").onclick = () => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/trips");
    xhr.onload = function (event) {
        alert("Success, server responded with: " + event.target.response); // raw response
    };
    // or onerror, onabort
    var formData = new FormData(form);
    xhr.send(formData);
}
/*
$.getJSON('/trips', function (data) {
    data.forEach(element => {
        var clone = template.content.cloneNode(true);

        var td = clone.querySelectorAll("td");
        td[0].textContent = element.From;
        td[1].textContent = element.To;
        td[2].textContent = element.INDULASI_IDO;
        td[3].textContent = "null";
        td[4].textContent = "null";
        td[5].textContent = "null";

        var tbody = document.getElementById('train-list');
        tbody.appendChild(clone);
    });
}); 
*/ 