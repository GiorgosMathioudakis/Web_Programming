const password = document.getElementById("password");
const verifypassword = document.getElementById("verifypassword");
const passwordMatchMessage = document.getElementById("passwordMatchMessage");
const passwordStrenghtMessage = document.getElementById("passwordStrengthMessage");
const passwordForm = document.getElementById("page_form");
const passwordField = document.getElementById("password_field");


passwordForm.addEventListener("submit", function(event) {
  const password1 = password.value;
  const password2 = verifypassword.value;

  if (password1 !== password2) {
    passwordMatchMessage.textContent = "Passwords do not match. Please try again.";
    event.preventDefault(); // Prevent the form from being submitted
    console.log("preventdefault logo missmatch password");
    // Scroll to the password input field
    passwordField.scrollIntoView({ behavior: "smooth", block: "start" });
    console.log("edw ginetai scrollIntoView epeidh ta passwords den tairiazoun");
  }
});



const passwordInput = document.getElementById("password");
const togglePasswordButton = document.getElementById("togglePasswordButton");

// Track the state of the password visibility
let isPasswordVisible = false;

togglePasswordButton.addEventListener("click", function() {
  isPasswordVisible = !isPasswordVisible; // Toggle the state

  if (isPasswordVisible) {
    passwordInput.type = "text"; // Show the password
    togglePasswordButton.textContent = "Hide Password";
  } else {
    passwordInput.type = "password"; // Hide the password
    togglePasswordButton.textContent = "Show Password";
  }
});

const submitButton = document.getElementById("submit");

submitButton.addEventListener("click", function(event) {
  const passwordvalue = password.value;
  const forbiddenWords = ["cat", "dog", "gata", "skulos"];

  for (const word of forbiddenWords) {
      const regex = new RegExp(word, "i");

    if (regex.test(passwordvalue)) {
      passwordMatchMessage.textContent = `The password contains the forbidden word: ${word}`;
      passwordMatchMessage.classList.add("error-message");
      event.preventDefault();
      console.log("preventDefault logo apagoreumenis le3is");
      return; // Stop checking further words
    }
  }
  // If none of the forbidden words , reset the error message
  passwordMatchMessage.textContent = "";
  passwordMatchMessage.classList.remove("error-message");
  console.log("patithike submit");
});


password.addEventListener("input", function(event) {
  const passwordvalue = password.value;
  const forbiddenWords = ["cat", "dog", "gata", "skulos"];
  const numCount = (passwordvalue.match(/\d/g) || []).length; // Count numbers
  const symbolCount = (passwordvalue.match(/[!@#$%^&*()_+{}[\]:;<>,.?~]/g) || []).length; // Count symbols
  const capitalLetterCount = (passwordvalue.match(/[A-Z]/g) || []).length; // Count capital letters
  const lowercaseLetterCount = (passwordvalue.match(/[a-z]/g) || []).length; // Count lowercase letters



  // Check if the password is weak (contains 50% or more numbers)
  if (numCount / passwordvalue.length >= 0.5) {
    passwordStrenghtMessage.textContent = "Weak password (contains 50% or more numbers). Please choose a stronger password.";
    passwordStrenghtMessage.classList.add("error-message");
    event.preventDefault();
    console.log("preventDefault logo weak password");
    return;
  }

  // Check if the password is strong (contains at least 1 symbol, 1 capital letter, 1 number, and 1 lowercase letter)
  if (symbolCount >= 1 && capitalLetterCount >= 1 && numCount >= 1 && lowercaseLetterCount >= 1) {
    passwordStrenghtMessage.textContent = "Strong password";
    passwordStrenghtMessage.classList.remove("error-message");
    passwordStrenghtMessage.classList.add("strong-password-message");
    return; // No need to check for a medium password
  }

  // If none of the above conditions are met, the password is medium
  passwordStrenghtMessage.textContent = "Medium password";
  passwordStrenghtMessage.classList.remove("strong-password-message");
  passwordStrenghtMessage.classList.remove("error-message");
  return;
});


function validateForm() {
  // Add validation logic here, e.g., to ensure that the required fields are filled out correctly.
  return true; // Return true if the form is valid; otherwise, return false.
}

var petKeeperFields = document.getElementById("petKeeperFields");
var petKeeperRadio = document.getElementById("pet_keeper");

// Initial setup to hide fields
petKeeperFields.style.display = "none";

// Toggle the display of additional fields when "Pet Keeper" is selected.
petKeeperRadio.addEventListener("change", function (event) {
  petKeeperFields.style.display = this.checked ? "block" : "none";
});

// Toggle the display of additional fields when "Pet Owner" is selected.
document.getElementById("pet_owner").addEventListener("change", function (event) {
  petKeeperFields.style.display = this.checked ? "none" : "block";
});

document.getElementById("host_dog").addEventListener("change", function (event) {
  var dogPriceSection = document.getElementById("dogPriceSection");
  dogPriceSection.style.display = this.checked ? "block" : "none";
  if (this.checked) {
    document.getElementById("dogprice").required = true;
  } else {
    document.getElementById("dogprice").required = false;
  }
});

document.getElementById("host_cat").addEventListener("change", function (event) {
  var catPriceSection = document.getElementById("catPriceSection");
  catPriceSection.style.display = this.checked ? "block" : "none";
  if (this.checked) {
    document.getElementById("catprice").required = true;
  } else {
    document.getElementById("catprice").required = false;
  }
});

const checkbox = document.getElementById("host_dog");

// Add an event listener to the checkbox
checkbox.addEventListener("change", function() {
    // Update the value based on whether the checkbox is checked or unchecked
    checkbox.value = checkbox.checked ? "true" : "false";
});

const catCheckbox = document.getElementById("host_cat");

// Add an event listener to the checkbox
catCheckbox.addEventListener("change", function() {
    // Update the value based on whether the checkbox is checked or unchecked
    catCheckbox.value = catCheckbox.checked ? "true" : "false";
});

function validateForm() {
  var dogCheckbox = document.getElementById("host_dog");
  var catCheckbox = document.getElementById("host_cat");

  if (!dogCheckbox.checked && !catCheckbox.checked) {
    var petStay = document.getElementById("pet_stay");
    petStay.scrollIntoView({ behavior: "smooth", block: "start" });
    console.log("edw ginetai scroll into view epeidh den exoun ginei checked oute dog oute cat");
    return false;
  }
  
  // Add additional validation logic for other form fields here.
  
  return true;
}


// Get references to the elements
var petStayDropdown = document.getElementById("pet_stay");
var hostCatCheckbox = document.getElementById("host_cat");
var hostCatLabel = document.querySelector('label[for="host_cat"]');

// Add an event listener to the Pet Stay dropdown
petStayDropdown.addEventListener("change", function (event) {
  // Check the selected option
  var selectedOption = petStayDropdown.value;

  // Hide the "Cat" checkbox and label if "Outside" is selected, else show them
  if (selectedOption === "outside") {
    hostCatCheckbox.style.display = "none";
    hostCatLabel.style.display = "none";
  } else {
    hostCatCheckbox.style.display = "inline-block";
    hostCatLabel.style.display = "inline-block";
  }
});


// Get a reference to the number input field
var dogPriceInput = document.getElementById("dogprice");

// Add an input event listener to restrict the value of dogprice to stay in range of 0-20
dogPriceInput.addEventListener("input", function (event) {
  var min = parseFloat(this.getAttribute("min"));
  var max = parseFloat(this.getAttribute("max"));
  var value = parseFloat(this.value);

  // Check if the entered value is within the specified range
  if (isNaN(value) || value < min) {
    this.value = min;
  } else if (value > max) {
    this.value = max;
  }
});

//get reference
var catPriceInput = document.getElementById("catprice");

// Add an input event listener to restrict the value of catprice to stay in range of 0-20
catPriceInput.addEventListener("input", function () {
  var min = parseFloat(this.getAttribute("min"));
  var max = parseFloat(this.getAttribute("max"));
  var value = parseFloat(this.value);

  // Check if the entered value is within the specified range
  if (isNaN(value) || value < min) {
    this.value = min;
  } else if (value > max) {
    this.value = max;
  }
});



//APO EDW KAI KATW ASKISI 2

var lat;
var lon;
var verifiedAddress = false;

function checkAddress(){

  var country = document.getElementById("country").value;  //get country value
  var city = document.getElementById("city").value; //get city value
  var addressName = document.getElementById("address").value; //get address value
  
  const data = null;

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  // xhr.addEventListener('readystatechange', function () {
  //   if (this.readyState === this.DONE) {
  //     console.log(this.responseText);
  //   }
  // });

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      const obj = JSON.parse(xhr.responseText);
      var firstDisplayName;
      // Check if obj[0] and obj[0].display_name are defined and not null
      if (obj[0]) {
        var displayNames = obj[0].display_name;  
  
        // Check if "Heraklion" is in the array
        if (displayNames.includes("Heraklion")) {
          // The array contains "Heraklion"
          document.getElementById("demo").innerHTML = "Location verified!";
          document.getElementById("showmapdiv").style.display = 'block';
          verifiedAddress = true;
          lat = obj[0].lat;
          lon = obj[0].lon;

          markers.clearMarkers();
          //address marker
          var position=setPosition(lat,lon);
          var mar=new OpenLayers.Marker(position);
          markers.addMarker(mar);
          mar.events.register('mousedown', mar, function(evt) {
          handler(position,'Your address');}
          );

          //Orismos zoom
          const zoom = 11;
          map.setCenter(position, zoom);
        } else {
          // "Heraklion" is not in the array
          document.getElementById("demo").innerHTML = "This service is only available in Heraklion right now.";
          verifiedAddress = false;
          document.getElementById('divmap').style.display = 'none';
          document.getElementById("showmapdiv").style.display = 'none';
        }
      } else {
        // obj[0] or obj[0].display_name is undefined or not an array
        document.getElementById("demo").innerHTML = "Location was not verifed.";
        verifiedAddress = false;
        document.getElementById('divmap').style.display = 'none';
        document.getElementById("showmapdiv").style.display = 'none';
      }
    }
  });

  
  var address = addressName + " " + city + " " + country ;  

  xhr.open("GET", "https://forward-reverse-geocoding.p.rapidapi.com/v1/search?q="+address+"&acceptlanguage=en&polygon_threshold=0.0");
  xhr.setRequestHeader("x-rapidapi-host", "forward-reverse-geocoding.p.rapidapi.com");
  xhr.setRequestHeader("x-rapidapi-key", "ee5a4e7cc3mshb31e1cd2c57f976p105170jsn98bb806a83f0");
  xhr.send(data);
}

function showMap(){
  // Check the value of the flag variable
  if (verifiedAddress) {
    // Show the map if the flag is true
    document.getElementById('divmap').style.display = 'block';
    //address marker
    var position=setPosition(lat,lon);
    var mar=new OpenLayers.Marker(position);
    markers.addMarker(mar);
    mar.events.register('mousedown', mar, function(evt) {
    handler(position,'Your address');}
    );

    //Orismos zoom
    const zoom = 11;
    map.setCenter(position, zoom);
  } else {
    // Hide the map if the flag is false
    document.getElementById('divmap').style.display = 'none';
  }
}

map = new OpenLayers.Map("Map");
var mapnik = new OpenLayers.Layer.OSM();
map.addLayer(mapnik);

function setPosition(lat, lon){
  var fromProjection = new OpenLayers.Projection("EPSG:4326"); // Transform from WGS 1984
  var toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
  var position = new OpenLayers.LonLat(lon, lat).transform( fromProjection,
  toProjection);
  return position;
}

function handler(position, message){
  var popup = new OpenLayers.Popup.FramedCloud("Popup",
  position, null,
  message, null,
  true // <-- true if we want a close (X) button, false otherwise
  );
  map.addPopup(popup);
}

//Markers
var markers = new OpenLayers.Layer.Markers( "Markers" );
map.addLayer(markers);

//address marker
var position=setPosition(lat,lon);
var mar=new OpenLayers.Marker(position);
markers.addMarker(mar);
mar.events.register('mousedown', mar, function(evt) {
handler(position,'Your address');}
);

document.getElementById("page_form").addEventListener("submit", function(event) {
    // Get the radio button and checkboxes
    const petKeeperRadio = document.getElementById("pet_keeper");
    const dogCheckbox = document.getElementById("host_dog");
    const catCheckbox = document.getElementById("host_cat");

    // Check if the radio button is checked and neither checkbox is checked
    if (petKeeperRadio.checked && !dogCheckbox.checked && !catCheckbox.checked) {
        // Prevent the default form submission
        event.preventDefault();
        console.log("Please check at least one checkbox when 'pet_keeper' is selected.");
    }
});

var city = document.getElementById("city");
city.addEventListener("change" , function() {
  document.getElementById("showmapdiv").style.display = 'none';
  document.getElementById("divmap").style.display = 'none' ;
});

function RegisterPost(){
    let myForm = document.getElementById('page_form');
    let formData = new FormData(myForm);
    formData.append('lat', lat);
    formData.append('lon', lon);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));

    var jsonData=JSON.stringify(data);
    console.log(jsonData);
    
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('postmessage').innerText = "Succesful Registration\n";
            
//            $("#ajaxContent").html("Successful Login");
        } else if (xhr.status !== 200) {
            document.getElementById('postmessage').innerText = "Unsuccesful Registration\nError" + xhr.status;
            //alert('Request failed. Returned status of ' + xhr.status);
        }
    };
    
    xhr.open('POST', 'Registers');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));
}

function checkDoubleUsername(event){
    let username = document.getElementById("username").value;
    
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('usernameerr').innerHTML = xhr.responseText;
        } else if (xhr.status !== 200) {
            document.getElementById('usernameerr').innerHTML = xhr.responseText;
            event.preventDefault();
        }
    };
    
    console.log("username check stelnw request stin doGET");
    xhr.open('GET', 'Registers?username=' + encodeURIComponent(username));
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();
}

function checkDoubleEmail(event){
    let email = document.getElementById("email").value;

    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('emailerr').innerHTML = xhr.responseText;
        } else if (xhr.status !== 200) {
            document.getElementById('emailerr').innerHTML = xhr.responseText;
            event.preventDefault();
        }
    };
    
    console.log("email check stelnw request stin doGET");
    xhr.open('GET', 'Registers?email=' + encodeURIComponent(email));
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();
}