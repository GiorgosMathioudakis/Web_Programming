var globalownerid;
function displayDataOwners(data) {
    var html = "<table id='ownersTable'>";

    // Create a row for each field
    html += "<tr><th>Username</th><td>" + data.username + "</td></tr>";
    html += "<tr><th>Email</th><td>" + data.email + "</td></tr>";
    html += "<tr><th>Password</th><td>" + data.password + "</td></tr>";
    html += "<tr><th>Firstname</th><td>" + data.firstname + "</td></tr>";
    html += "<tr><th>Lastname</th><td>" + data.lastname + "</td></tr>";
    html += "<tr><th>Birthdate</th><td>" + data.birthdate + "</td></tr>";
    html += "<tr><th>Gender</th><td>" + data.gender + "</td></tr>";
    html += "<tr><th>Country</th><td>" + data.country + "</td></tr>";
    html += "<tr><th>City</th><td>" + data.city + "</td></tr>";
    html += "<tr><th>Address</th><td>" + data.address + "</td></tr>";
    html += "<tr><th>Personal Page</th><td>" + data.personalpage + "</td></tr>";
    html += "<tr><th>Job</th><td>" + data.job + "</td></tr>";
    html += "<tr><th>Telephone</th><td>" + data.telephone + "</td></tr>";

    // Edit button row
    html += "<tr><td colspan='2'><button onclick='editPetOwner(\"" + data.owner_id + "\")'>Edit</button></td></tr>";
    globalownerid = data.owner_id;
    html += "</table>";

    document.getElementById("info").innerHTML = html;
}

function editPetOwner(ownerId) {
    var rows = document.querySelectorAll("#ownersTable tr");

    rows.forEach(function(row, index) {
        // Skip the first row (header) and the last row (button)
        if (index > 1 && index < rows.length - 1) {
            var cell = row.cells[1]; // Get the second cell
            var value = cell.innerHTML;
            cell.innerHTML = "<input type='text' value='" + value + "' />";
        }
    });

    // Change the button in the last row
    var lastRow = rows[rows.length - 1];
    var buttonCell = lastRow.cells[0];
    buttonCell.innerHTML = "<button onclick='savePetOwner(\"" + ownerId + "\")'>Save</button>";
}

function savePetOwner(ownerId) {
    
    var rows = document.querySelectorAll("#ownersTable tr");
    var updatedData = {};

    rows.forEach(function(row, index) {
        if (index > 1 && index < rows.length - 1) {
            var input = row.querySelector("input");
            updatedData["field" + (index)] = input.value; // Adjust index for field names
            input.parentElement.innerHTML = input.value; // Replace input with text
        }
    });

    // Prepare formData for the server
    var formData = new URLSearchParams();
    formData.append("ownerId", ownerId);
    for (var key in updatedData) {
        formData.append(key, updatedData[key]);
    }

    // Change the button back to "Edit"
    var lastRow = rows[rows.length - 1];
    var buttonCell = lastRow.cells[0];
    buttonCell.innerHTML = "<button onclick='editPetOwner(\"" + ownerId + "\")'>Edit</button>";
            
    // Send updatedData to the server
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Handle success
            Swal.fire({
                title: 'Success!',
                text: 'Pet Owner updated successfully!',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                location.reload();
            });
            
            
            console.log("Update successful");
        } else {
            // Handle error
            console.log("Error in update");
        }
    };

    xhr.open('POST', "UpdatePetOwner"); // Your server-side script to handle updates
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(formData);
}

document.addEventListener('DOMContentLoaded', function() {
    // Your script goes here
    console.log("The HTML is fully loaded Pet Owner Login");
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        
        if (xhr.readyState === 4 && xhr.status === 200) {
              var data = JSON.parse(xhr.responseText);
              console.log(data.username);
              displayDataOwners(data);
              
            
            
        } else if (xhr.status !== 200) {
             $("#infost").html("There are no available PetKeepers");
        }
        
    };
    
    
    xhr.open('GET',"PetOwnerSession");
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
});

document.getElementById('addPetBtn').addEventListener('click', function() {
    document.getElementById('pet_div').style.display = 'block';
    document.getElementById('addPetBtn').style.display='none';
});

function generateRandomBinaryString() {
    let result = '';
    for (let i = 0; i < 10; i++) {
        result += Math.floor(Math.random() * 2); // Randomly adds 0 or 1
    }
    return result;
}

// Example usage
let randomBinaryString = generateRandomBinaryString();

document.getElementById('pet_form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevents the default form submission action
    var formData = new FormData(document.getElementById('pet_form'));
    console.log(globalownerid);
    console.log(randomBinaryString);
    
    formData.append("owner_id", globalownerid); // Append the globalownerid to formData
    formData.append("pid", randomBinaryString); // Append the pid to formData

   

    console.log("The HTML is fully loaded Pet Owner Login");
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("PET ADDED SUCCESSFULLY" );
            var temp = document.getElementById("pet_form");
            temp.style.display = "none";
            $("#add_Pet").html("SUCCESSFULL INSERTION");
              
              
            
        } else if (xhr.status !== 200) {
             $("#infost").html("There are no available PetKeepers");
        }
        
    };
    var params = new URLSearchParams(new FormData(document.getElementById('pet_form'))).toString();
    params += "&owner_id=" + encodeURIComponent(globalownerid);
    params += "&pet_id=" + encodeURIComponent(randomBinaryString);

    xhr.open('POST', "AddPet");
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    //var url = "AddPet?owner_id=" + encodeURIComponent(globalownerid) + "&pet_id=" + encodeURIComponent(randomBinaryString);
//    xhr.open('POST',"AddPet?owner_id=" + encodeURIComponent(globalownerid) + "&pet_id=" + encodeURIComponent(randomBinaryString));
//    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//    xhr.send(formData);
});

//function submitPetForm(event) {
//    event.preventDefault(); // Prevent default form submission
//
//    var xhr = new XMLHttpRequest();
//    var formData = new FormData(document.getElementById('pet_form'));
//    console.log(formData);
//
//    xhr.onreadystatechange = function() {
//        if (xhr.readyState === 4 && xhr.status === 200) {
//            console.log(formData);
//            console.log(xhr.responseText); // Handle response here
//        }else{
//            
//        }
//    };
//    
//    xhr.open('POST',"AddPet");
//    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
//    xhr.send(formData);
//}
