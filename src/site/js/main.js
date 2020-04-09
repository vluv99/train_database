

$.getJSON('/trains', function(data) {
    data.forEach(element => {

        var node = document.createElement("LI");
        var textnode = document.createTextNode(element.name);
        node.appendChild(textnode);
        document.getElementById("test").appendChild(node);
    });
}); 