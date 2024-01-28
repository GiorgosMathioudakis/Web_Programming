
$(".info-group button").on("click", function () {
  $("#pop-up").get(0).innerHTML = "";
  var popup = $("#pop-up");
  var id = $(this).attr("id");
  var previous = $("#" + id).get(0).innerHTML;
  var placeholder = previous.substr(previous.indexOf("b> ") + 3);

  popup.addClass("centered");
  popup.append("<h5 style='font-size: 16px'>Change " + id + "<h5>");
  popup.append(
    '<form method="GET" id="edit-field" action="petkeeper"><div  id="custom-input" class="input-box"><input name="value" id="value" placeholder="' +
      placeholder +
      '"></input><input name="field" type="hidden" value="' +
      id +
      '"> </div></form>'
  );
  popup.append(
    '<button id="confirm" class="pop-up-btn container-button" form="edit-field">Confirm</button>'
  );
  popup.append(
    '<button id="cancel" class="pop-up-btn container-button">Cancel</button>'
  );

  $("#value").get(0).focus();

  $("#cancel").on("click", function () {
    $("#pop-up").get(0).innerHTML = "";
    $("#pop-up").removeClass("centered");
    $("#pop-up").removeClass("bigger");
    $("#pop-up").removeClass("taller");
  });
});

$(".doc-edit").on("click", function () {
  var popup = $("#pop-up");
  var id = $(this).attr("id");

  popup.get(0).innerHTML = "";
  popup.addClass("centered");
  popup.addClass("bigger");

  popup.append("<h5 style='font-size: 16px'>Edit Status<h5>");

  popup.append(
    "<group id='edit-booking'>" +
      "<select class='seperate' name='states' id='states'>" +
      "<option value='requested'>Requested</option>" +
      "<option value='accepted'>Accepted</option>" +
      "<option value='rejected'>Rejected</option>" +
      "<option value='finished'>Finished</option>" +
      "</select>" +
      "</group>"
  );

  popup.append(
    '<button id="confirm-booking" class="pop-up-btn container-button">Confirm</button>'
  );
  popup.append(
    '<button id="cancel" class="pop-up-btn container-button">Cancel</button>'
  );
  

  $("#confirm-booking").on("click", function () {

    
    var state = $("#states").val();

    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
      window.location.reload();
    };

      xhr.open(
      "PUT",
      "petkeeper?id=" +
        id +
        "&state=" +
        state
    );
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
  });

  $("#del-randevou").on("click", function () {
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
      window.location.reload();
    };

    xhr.open("DELETE", "/Personalized_Health/doctor?id=" + id);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
  });

  $("#cancel").on("click", function () {
    $("#pop-up").get(0).innerHTML = "";
    $("#pop-up").removeClass("centered");
    $("#pop-up").removeClass("bigger");
    $("#pop-up").removeClass("taller");
  });
});



$(".chat").on("click", function () {
  var popup = $("#pop-up");
  var booking_id = $(this).attr("booking_id");

  popup.get(0).innerHTML = "";
  popup.addClass("centered");
  popup.addClass("bigger");
  popup.addClass("taller");

  popup.append(
    '<button id="close-messages" class="pop-up-btn container-button"><i class="fas fa-times"></i></button><div id="message-box"><div>'
  );

  popup.append(
    "<group id='messages'>" +
      "<textarea class='seperate' id='text-message' name='text-treatment' rows='2' cols='20' required> </textarea>" +
      "<button class='container-button'><i class='fad fa-paper-plane'></i></button>" +
      "</group>"
  );

  $("#close-messages").on("click", function () {
    $("#pop-up").get(0).innerHTML = "";
    $("#pop-up").removeClass("centered");
    $("#pop-up").removeClass("bigger");
    $("#pop-up").removeClass("taller");
  });

  $('#messages button').on('click', function () {
    var msg = $('#messages textarea').val();
    popup.append("<p>owner: " + msg + "</p>");

    var xhr = new XMLHttpRequest();

  xhr.onload = function () {
    if ((xhr.readyState === 4 || xhr.readyState === 200 ) && xhr.status !== 400) {
//        var messages = JSON.parse(xhr.responseText);
//        console.log("prin");
//        console.log(messages);
//        console.log("meta");
    }
  };

  xhr.open(
    "POST",
    "ownerMessages?booking_id=" +
      booking_id +
      "&booking_id=" +
      booking_id + 
      "&message=" + 
      msg
  );
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(null);

  });

  var xhr = new XMLHttpRequest();

  xhr.onload = function () {
    if (xhr.readyState === 4 && xhr.status !== 400) {
      var messages = JSON.parse(xhr.responseText);
      console.log(messages);
      loadMessages(messages);
    }
  };

  xhr.open(
    "GET",
    "ownerMessages?booking_id=" +
      booking_id 
  );
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(null);
});

function loadMessages(messages) {
  var popup = $("#message-box");
  
  for(let i=0; i < messages.length; i++) {
    popup.append('<p>' + messages[i].sender + ': ' + messages[i].message  + '</p>');
  }
}


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
    availablekeepers(globalownerid);
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
            $("#add_Pet").html("SUCCESSFULL INSERTION OF PET");
            
              
              
            
        } else if (xhr.status !== 200) {
             $("#add_Pet").html("Error");
        }
        
    };
    var params = new URLSearchParams(new FormData(document.getElementById('pet_form'))).toString();
    params += "&owner_id=" + encodeURIComponent(globalownerid);
    params += "&pet_id=" + encodeURIComponent(randomBinaryString);

    xhr.open('POST', "AddPet");
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(params);
});
let type;
var price;
function availablekeepers(globalid) {
    // Your script goes here
    console.log("The HTML is fully loaded AvailablePetKeepersTypeAndStatus");
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        
        if (xhr.readyState === 4 && xhr.status === 200) {
            type = JSON.parse(xhr.responseText);
            console.log("Inside the response"+ type);
            
            var xhr1 = new XMLHttpRequest();
            xhr1.onload = function () {
                if (xhr1.readyState === 4 && xhr1.status === 200) {
                    var data = JSON.parse(xhr1.responseText);
                    console.log(data);
                    
                    var html = "<table>";
            html += "<tr><th>Keeper ID</th><th>Username</th><th>Email</th><th>Firstname</th><th>Lastname</th><th>Birthdate</th><th>Gender</th><th>Country</th><th>City</th><th>Address</th><th>PersonalPage</th><th>Job</th><th>Telephone</th><th>Property</th><th>Property Description</th><th>Price</th>><th>Action</th>"; // Add other headers as needed
            data.forEach(function(petKeeper) {
                html += "<tr>";
                html += "<td>" + petKeeper.keeper_id + "</td>"; // Assuming petKeeper has a keeper_id property
                html += "<td>" + petKeeper.username + "</td>"; // Similarly for other properties
                html += "<td>" + petKeeper.email + "</td>";
                html += "<td>" + petKeeper.firstname + "</td>";
                html += "<td>" + petKeeper.lastname + "</td>";
                html += "<td>" + petKeeper.birthdate + "</td>";
                html += "<td>" + petKeeper.gender + "</td>";
                html += "<td>" + petKeeper.country + "</td>";
                html += "<td>" + petKeeper.city + "</td>";
                html += "<td>" + petKeeper.address + "</td>";
                html += "<td>" + petKeeper.personalpage + "</td>";
                html += "<td>" + petKeeper.job + "</td>";
                html += "<td>" + petKeeper.telephone + "</td>";
                html += "<td>" + petKeeper.property + "</td>";
                html += "<td>" + petKeeper.propertydescription + "</td>";
                if(petKeeper.dogkeeper==="true" && type==="dog"){
                    html += "<td>" + petKeeper.dogprice + "</td>";
                    price = petKeeper.dogprice;
                }else if(petKeeper.catkeeper===("true")&& type==="cat"){
                    html += "<td>" + petKeeper.catprice + "</td>";
                    price = petKeeper.catprice;
                }
                html += "<td><button class='bookbutton' onclick='bookingkeeper(" + petKeeper.keeper_id + ", " + price + ")'>Book Keeper</button></td>"; // Add the action button
                
            
            
            html += "</tr>";
            });
            html += "</table>";

            // Set the table HTML to the div with id 'availablekeepers'
            document.getElementById("availablekeepers").innerHTML = html;
                } else if (xhr1.status !== 200) {
                    $("#infost").html("There are no available PetKeepers");
                }
            };

            xhr1.open('GET', "AvailablePetKeepers?type=" + encodeURIComponent(type));
            xhr1.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr1.send();
            
            
            
        } else if (xhr.status !== 200) {
             $("#infost").html("There are no available PetKeepers");
        }
        
    };
    
    console.log("The globalid is " + globalownerid);
    xhr.open('GET',"GetPet?id=" + encodeURIComponent(globalownerid));
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
    
    
}
var globalkeeperid;
var petglobalid;
var globalprice;
document.getElementById('book').addEventListener('submit', function(e){
    e.preventDefault(); // Prevent default form submission
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            petglobalid = JSON.parse(xhr.responseText);
            console.log("Inside the response: " + petglobalid);

            // Now send the POST request
            var xhr1 = new XMLHttpRequest();
            xhr1.onreadystatechange = function () {
                if (xhr1.readyState === 4) {
                    if (xhr1.status === 200) {
                        console.log("Successful booking");
                        $("#bookingkeeper").html("SUCCESSFUL BOOKING");
                    } else {
                        console.log("Error in booking");
                        $("#bookingkeeper").html("There was an error in booking");
                    }
                }
            };

            var params = new URLSearchParams(new FormData(document.getElementById('book'))).toString();
            params += "&owner_id=" + encodeURIComponent(globalownerid);
            params += "&pet_id=" + encodeURIComponent(petglobalid);
            params += "&keeper_id=" + encodeURIComponent(globalkeeperid);
            params += "&price=" + encodeURIComponent(globalprice);

            xhr1.open('POST', "AddBooking");
            xhr1.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr1.send(params);
        }
    };

    xhr.open('GET', "GetIDPet?ownerid=" + encodeURIComponent(globalownerid));
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
    
});
function bookingkeeper(keeperid,price){
    globalkeeperid = keeperid;
    globalprice = price;
    var booking = document.getElementById("booking");
    console.log(booking);
    booking.style.display = "block";
//    var xhr = new XMLHttpRequest();
//    xhr.onload = function () {
//        
//        if (xhr.readyState === 4 && xhr.status === 200) {
//            console.log("PET ADDED SUCCESSFULLY" );
//            var temp = document.getElementById("pet_form");
//            temp.style.display = "none";
//            $("#add_Pet").html("SUCCESSFULL INSERTION OF PET");
//            
//              
//              
//            
//        } else if (xhr.status !== 200) {
//             $("#add_Pet").html("Error");
//        }
//        
//    };
//    var params = new URLSearchParams(new FormData(document.getElementById('pet_form'))).toString();
//    params += "&owner_id=" + encodeURIComponent(globalownerid);
//    params += "&pet_id=" + encodeURIComponent(randomBinaryString);
//
//    xhr.open('POST', "AddPet");
//    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//    xhr.send(params);
    
}
