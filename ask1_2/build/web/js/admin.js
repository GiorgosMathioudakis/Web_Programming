/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */


var password = document.getElementById("password");
var username = document.getElementById("username");
var errormessage = document.getElementById("errormessage");


var submit = document.getElementById("submit");

username.addEventListener("blur",function(){
       errormessage.style.display="none";
    
});
password.addEventListener("blur",function(){
       errormessage.style.display="none";
    
});

function adminLogin() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var errormessage = document.getElementById("errormessage");

    if (username !== "admin" || password !== "admin12*") {
        errormessage.style.display = "block";
        
    } else {
        window.location.href = "http://localhost:8080/ServletWithDatabaseConnection2023_2024/adminPage.html";
    }
}

