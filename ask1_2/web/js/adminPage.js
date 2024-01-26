/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */


function drawCharts(dataFromServer){
    var data = google.visualization.arrayToDataTable([
        ['Pet', 'Count'],
        ['Cats', dataFromServer.cats],
        ['Dogs', dataFromServer.dogs]
    ]);

    var options = {
        title: 'Pets Count',
        pieHole: 0.4, // Creates a donut chart
        animation: {
        startup: true,
        duration: 1000,
        easing: 'out',
    },
   
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
    
}
function drawCharts1(dataFromServer){
    var data = google.visualization.arrayToDataTable([
        ['Keepers Owners', 'Count'],
        ['Owners', dataFromServer.owners],
        ['Keepers', dataFromServer.keepers]
    ]);

    var options = {
        title: 'PetKeepers PetOwners Count',
        pieHole: 0.4, // Creates a donut chart
        animation: {
        startup: true,
        duration: 1000,
        easing: 'out',
    },
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart1'));
    chart.draw(data, options);
    
}

function drawChartsbar(dataFromServer){
    var data = google.visualization.arrayToDataTable([
        ['Profits', 'Count'],
        ['Profits of The Keeper', dataFromServer.profitsOfTheKeeper],
        ['Profits of The App', dataFromServer.appProfits]
    ]);

    var options = {
                title: 'Profits Breakdown',
                chartArea: {width: '50%'},
                hAxis: {
                    title: 'Total Profits',
                    minValue: 0
                },
                vAxis: {
                    title: 'Category'
                }
            };

    var chart = new google.visualization.BarChart(document.getElementById('bar_chart'));
    chart.draw(data, options);
    
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawCharts);
google.charts.setOnLoadCallback(drawCharts1);
google.charts.setOnLoadCallback(drawChartsbar);




function displayDataKeeper(data) {
    var html = "<table>";

    // Add table header
    html += "<tr><th>Username</th><th>Email</th><th>Password</th><th>Firstname</th><th>Lastname</th><th>birthdate</th><th>gender</th><th>country</th><th>City</th><th>Address</th><th>PesonalPage</th><th>Job</th><th>Telephone</th><th>Property</th><th>Property Desciption</th><th>CatKeeper</th><th>CatPrice</th><th>DogKeeper</th><th>DogPrice</th></tr>";

    // Iterate over each item in the JSON array
    data.forEach(function(item) {
        html += "<tr data-id='" + item.keeper_id + "'>"; 
        html += "<td>" + item.username + "</td>"; 
        html += "<td>" + item.email + "</td>";    
        html += "<td>" + item.password + "</td>";    
        html += "<td>" + item.firstname + "</td>";    
        html += "<td>" + item.lastname + "</td>";
        html += "<td>" + item.birthdate + "</td>";
        html += "<td>" + item.gender + "</td>";
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
        html += "<td><button onclick='deletePetKeeper(\"" + item.keeper_id + "\")'>Delete</button></td>";
        
        html += "</tr>";
    });

    html += "</table>";

    // Set the table HTML to the div with id 'info'
    document.getElementById("info").innerHTML = html;
}

function displayDataOwners(data) {
    var html = "<table>";

    // Add table header
    html += "<tr><th>Username</th><th>Email</th><th>Password</th><th>Firstname</th><th>Lastname</th><th>birthdate</th><th>gender</th><th>country</th><th>City</th><th>Address</th><th>PesonalPage</th><th>Job</th><th>Telephone</th></tr>";
    console.log("IM INSIDE DATAOWNERS");
    // Iterate over each item in the JSON array
    data.forEach(function(item) {
        html += "<tr data-id='" + item.owner_id + "'>"; 
        html += "<td>" + item.username + "</td>"; 
        html += "<td>" + item.email + "</td>";    
        html += "<td>" + item.password + "</td>";    
        html += "<td>" + item.firstname + "</td>";    
        html += "<td>" + item.lastname + "</td>";
        html += "<td>" + item.birthdate + "</td>";
        html += "<td>" + item.gender + "</td>";
        html += "<td>" + item.country + "</td>";
        html += "<td>" + item.city + "</td>";
        html += "<td>" + item.address + "</td>";
        html += "<td>" + item.personalpage + "</td>";
        html += "<td>" + item.job + "</td>";
        html += "<td>" + item.telephone + "</td>";
        html += "<td><button onclick='deletePetOwner(\"" + item.owner_id + "\")'>Delete</button></td>";
        
        html += "</tr>";
    });

    html += "</table>";

    // Set the table HTML to the div with id 'info'
    document.getElementById("infok").innerHTML = html;
}
function deletePetKeeper(id) {
    console.log("Deleting pet keeper with ID:", id);
    console.log(id);
    var isConfirmed = confirm("Are you sure you want to delete this pet keeper?");
    

    // Proceed only if the user confirmed the action
    if (isConfirmed) {
        
        console.log("Deleting pet keeper with ID:", id);
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
        
        if (xhr.readyState === 4 && xhr.status === 200) {
            var row = document.querySelector("#info tr[data-id='" + id + "']");
                if (row) {
                    row.remove();
                }
        } else if (xhr.status !== 200) {
            $("#info").html("There are no available PetKeepers or PetOwners");
        }
        
    };
    
    
    xhr.open('GET', "DeletePetKeeper?id=" + id);
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
       
    }
    
}

function deletePetOwner(id) {
    console.log("Deleting pet owner with ID:", id);
    console.log(id);
    var isConfirmed = confirm("Are you sure you want to delete this pet owner?");
    

    // Proceed only if the user confirmed the action
    if (isConfirmed) {
        
        console.log("Deleting pet owner with ID:", id);
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
        
        if (xhr.readyState === 4 && xhr.status === 200) {
            var row = document.querySelector("#infok tr[data-id='" + id + "']");
            console.log("inside the deletepetowner"+id);
                if (row) {
                    row.remove();
                }
        } else if (xhr.status !== 200) {
            $("#infok").html("There are no available PetKeepers or PetOwners");
        }
        
    };
    
    
    xhr.open('GET', "DeletePetOwner?id=" + id);
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
       
    }
    
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
    
    console.log("The HTML is fully loadedowners");
    var xhr1 = new XMLHttpRequest();
    xhr1.onload = function () {
        
        if (xhr1.readyState === 4 && xhr1.status === 200) {
            var data1 = JSON.parse(xhr1.responseText);
            console.log(data1);
            $("#infok").html(displayDataOwners(data1));
            
            
        } else if (xhr1.status !== 200) {
            console.log("INSIDE THE EXCEPTION");
             $("#infok").html("There are no available PetOwners");
        }
        
    };
    
    
    xhr1.open('GET',"AdminPageOwners");
    xhr1.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr1.send();
});




document.addEventListener('DOMContentLoaded', function() {
    // Your script goes here
    console.log("The HTML is fully loaded Pet Count");
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        
        if (xhr.readyState === 4 && xhr.status === 200) {
              var data = JSON.parse(xhr.responseText);
              drawCharts1(data);
            
            
        } else if (xhr.status !== 200) {
             $("#infost").html("There are no available PetKeepers");
        }
        
    };
    
    
    xhr.open('GET',"CountKeepersOwners");
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
});

document.addEventListener('DOMContentLoaded', function() {
    // Your script goes here
    console.log("The HTML is fully loaded Pet Count");
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        
        if (xhr.readyState === 4 && xhr.status === 200) {
              var data = JSON.parse(xhr.responseText);
              drawCharts(data);
            
            
        } else if (xhr.status !== 200) {
             $("#infost").html("There are no available PetKeepers");
        }
        
    };
    
    
    xhr.open('GET',"CountDogsCats");
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
});

document.addEventListener('DOMContentLoaded', function() {
    // Your script goes here
    console.log("The HTML is fully loaded PetOwnerrKeepers Count");
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        
        if (xhr.readyState === 4 && xhr.status === 200) {
              var data = JSON.parse(xhr.responseText);
              
              drawChartsbar(data);
            
            
        } else if (xhr.status !== 200) {
             $("#infost").html("There are no available PetKeepers");
        }
        
    };
    
    
    xhr.open('GET',"GetAllPrice");
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
});












