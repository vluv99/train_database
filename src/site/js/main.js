
var template = document.getElementById('train-list__row');
var form = document.getElementById("train-search");
form.onsubmit = () => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/trips");
    xhr.onload = function (event) {
        alert("Success, server responded with: " + event.target.response); // raw response
    };
    // or onerror, onabort
    var formData = new FormData(form);
    xhr.send(formData);
}

$.getJSON('/trips', function (data) {
    data.forEach(element => {
        /*
                var node = document.createElement("LI");
                var textnode = document.createTextNode(element.FELHASZNALO);
                node.appendChild(textnode);
                document.getElementById("form_button").appendChild(node);*/

        var clone = template.content.cloneNode(true);

        var td = clone.querySelectorAll("td");
        td[0].textContent = element.FELHASZNALO;
        td[1].textContent = "to";

        var tbody = document.getElementById('train-list');
        tbody.appendChild(clone);
    });
}); 