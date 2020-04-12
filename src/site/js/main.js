

$.getJSON('/trips', function(data) {
    data.forEach(element => {

        var node = document.createElement("LI");
        var textnode = document.createTextNode(element.FELHASZNALO);
        node.appendChild(textnode);
        document.getElementById("test").appendChild(node);
    });
}); 