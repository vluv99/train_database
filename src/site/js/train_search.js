
var template = document.getElementById('train-list__row');
var form = document.getElementById("train-search");

var dateInput = document.getElementById("text-field-WHEN-input");

document.getElementById('train-list--thead').style.display = 'none';

document.getElementById("subbmit_button").onclick = () => {

    const queryString = new URLSearchParams(new FormData(form)).toString()

    var price = randomizeInteger(1500, 5000);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/train?" + queryString);
    xhr.onload = function (event) {

        var data = JSON.parse(event.target.response);

        if (data.length != 0) {
            //makes the table head visible (if data isn't empty)
            document.getElementById('train-list--thead').style = '';
            document.getElementById('welcome-line').style.display = 'none';

            //it's empty-ing the previous lists
            var tbody = document.getElementById('train-list');
            tbody.innerHTML = '';

            //puts data into table rows
            data.forEach((element) => {
                var clone = template.content.cloneNode(true);

                var td = clone.querySelectorAll('td');
                td[0].textContent = element.from;
                td[1].textContent = element.to;
                td[2].textContent = element.depart;
                td[3].textContent = element.arrive;
                td[4].textContent = element.travell_time;
                td[5].textContent = price + " Ft";
                
                
                
                var button = clone.getElementById('buy_button');
                if(element.can_buy){
                    button.onclick = function(){
                        window.location="/ticket_buy?id=" + element.id + "&from=" + element.from + "&to=" + element.to+"&day="+dateInput.value + "&price=" + price;
                    }
                }
                button.disabled = !element.can_buy

                tbody.appendChild(clone);
            });
        }

    };

    // or onerror, onabort
    var formData = new FormData(form);
    xhr.send(formData);


}

function randomizeInteger(min, max) {
    if (max == null) {
        max = (min == null ? Number.MAX_SAFE_INTEGER : min);
        min = 0;
    }

    min = Math.ceil(min);  // inclusive min
    max = Math.floor(max); // exclusive max

    if (min > max - 1) {
        throw new Error("Incorrect arguments.");
    }

    return min + Math.floor((max - min) * Math.random());
}
/*

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/trips");
    xhr.onload = function (event) {
        alert("Success, server responded with: " + event.target.response); // raw response
    };
    // or onerror, onabort
    var formData = new FormData(form);
    xhr.send(formData);


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