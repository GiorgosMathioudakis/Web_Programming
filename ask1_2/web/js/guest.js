function displayDataKeeper(data) {
    var html = "<table>";

    // Add table header
    html += "<tr><th>Name</th><th>Surname</th><th>country</th><th>City</th><th>Address</th><th>PesonalPage</th><th>Job</th><th>Telephone</th><th>Property</th><th>Property Desciption</th><th>CatKeeper</th><th>CatPrice</th><th>DogKeeper</th><th>DogPrice</th></tr>";

    // Iterate over each item in the JSON array
    data.forEach(function(item) {
        html += "<tr data-id='" + item.keeper_id + "'>"; 
        html += "<td>" + item.firstname + "</td>";    
        html += "<td>" + item.lastname + "</td>";
        html += "<td>" + item.country + "</td>";
        html += "<td>" + item.city + "</td>";
        html += "<td>" + item.address + "</td>";
        html += "<td>" + item.personalpage + "</td>";
        html += "<td>" + item.job + "</td>";
        html += "<td>" + item.telephone + "</td>";
        html += "<td>" + item.property + "</td>";
        html += "<td>" + item.propertydecription + "</td>";
        html += "<td>" + item.catkeeper + "</td>";
        html += "<td>" + item.catprice + "</td>";
        html += "<td>" + item.dogkeeper + "</td>";
        html += "<td>" + item.dogprice + "</td>";        
        html += "</tr>";
    });

    html += "</table>";

    // Set the table HTML to the div with id 'info'
    document.getElementById("info").innerHTML = html;
}

document.addEventListener('DOMContentLoaded', function() {
    // Your script goes here
    console.log("The HTML is fully loaded");
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {

        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            $("#info").html(displayDataKeeper(data));


        } else if (xhr.status !== 200) {
             $("#info").html("There are no available PetKeepers");
        }

    };


    xhr.open('GET',"AdminPageKeepers");
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
});

