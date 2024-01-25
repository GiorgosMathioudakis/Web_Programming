document.addEventListener('DOMContentLoaded', function() {
    // Your script goes here
    console.log("The HTML is fully loaded");
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {

        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            $("#info").html(displayData(data));


        } else if (xhr.status !== 200) {
             $("#info").html("There are no available PetKeepers or PetOwners");
        }

    };


    xhr.open('GET',"GetKeepers");
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
});