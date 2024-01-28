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
  var user_id = $(this).attr("user_id");
  var doctor_id = $(this).attr("doctor_id");

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
    popup.append("<p>doctor: " + msg + "</p>");

    var xhr = new XMLHttpRequest();

  xhr.onload = function () {
    if (xhr.readyState === 4 && xhr.status !== 400) {
      
    }
  };

  xhr.open(
    "POST",
    "/Personalized_Health/doctorMessages?user_id=" +
      user_id +
      "&doctor_id=" +
      doctor_id + 
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
      loadTreatments(messages);
    }
  };

  xhr.open(
    "GET",
    "userMessages?user_id=" +
      user_id +
      "&doctor_id=" +
      doctor_id
  );
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(null);
});

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