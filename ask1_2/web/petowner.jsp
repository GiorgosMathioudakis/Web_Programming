<%-- 
    Document   : petowner
    Created on : Jan 28, 2024, 7:12:57 PM
    Author     : giorgosmathioudakis
--%>

<%@ page import="java.util.Date" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.time.LocalDate" %>
<%@ page import="java.time.format.DateTimeFormatter" %>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="mainClasses.*"%>
<%@page import="java.util.Set"%>
<%@page import="database.tables.*"%>
<%@page import="java.util.ArrayList"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js" defer></script>
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link rel="stylesheet" href="css/petowner.css">
    <script src="js/petowner.js" defer></script>
    <title>Pet Owner Page</title>

</head>
<%
    String username = (String)session.getAttribute("username");
    String password = (String)session.getAttribute("password");

    PetOwner petowner = (new EditPetOwnersTable()).databaseToPetOwners(username,password);
    if(petowner == null) {
        response.sendRedirect("logout");
        return;
    }
%>
    <body>
        <div id="pop-up" class="container glass"></div>
        <div class="window glass">
            <div id="information">
                <form action="logout">
                    <button id="logout" class="container-button" style="position:absolute; top:50px; right:200px"><i class="fas fa-sign-out"></i></button>
                </form>
                <div id="container-title">Information</div>
                <div id="info"></div>
                
        
           </div>
           <div id="add_Pet" >
            <div id="container-title">Add Pet</div>
            <button id="addPetBtn" class="container-button">Add Pet</button>
                <div id="pet_div" style="display: none;">
                    <form id="pet_form">
                        <label>Pet Name:</label><br>
                        <input type="text" id="petName" name="petName" placeholder="Pet Name" required /><br>
                        <label>Type(dog or cat):</label><br>
                        <input type="text" id="type" name="type" placeholder="Type(cat or dog)" required /><br>
                        <label>Breed(:</label><br>
                        <input type="text" id="breed" name="breed" placeholder="Breed" required /><br>
                        <label>Gender:</label><br>
                        <input type="text" id="gender" name="gender" placeholder="Gender" required /><br>
                        <label>Weight:</label><br>
                        <input type="text" id="weight" name="weight" placeholder="Weight" required /><br>
                        <label>BirthYear:</label><br>
                        <input type="text" id="birth" name="birth" placeholder="BirthYear" required /><br>
                        <label>Description:</label><br>
                        <textarea id="description" name="description" rows="4" cols="35" placeholder="E.x.Type of food,Special needs"></textarea><br>
                        <label>Photo:</label><br>
                        <input type="text" id="photo" name="photo" placeholder="Photo" required /><br>
                        <button type="submit" class="container-button">Submit</button><br>
                    </form>
                </div>
            </div>
           <div id="available">
                <div id="container-title">Available PetKeepers</div>
                <div id="availablekeepers"></div>
           </div>
           <div id="booking" style="display: none">
                <div id="container-title">Book PetKeeper</div>
                <div id="bookingkeeper">
                    <form id="book">
                        <label id="Fromdate">From Date:</label><br>
                        <input type="date" id="fromdate" name="fromdate"><br>`
                        <label id="Todate">To Date:</label><br>
                        <input type="date" id="todate" name="todate"><br>
                        <input type="submit" class="container-button" id="submitbutton" value="Book NOW!">
                    </form>
                    
                </div>
             </div>
            <div id="Reviews" > 
                <div id="container-title">Review of a PetKeeper</div>
                <div id="Reviewdiv"></div>
                <div id="rev"  style="display: none;">
                    <form id="reviewform">
                        <label id="review">Review :</label><br>
                        <textarea id="reviewdesc" name="reviewdesc" rows="4" cols="35" placeholder="E.x.Condition of staying,communication e.t.c"></textarea><br>
                        <label for="score">Select a score (0-10):</label><br>
                        <select id="score" name="score">
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select><br>
                        <input type="submit" class="container-button" id="reviewbutton" style="margin-top: 5%" value="submit">
                    </form>
                </div>
            </div>    
            
            <div class="container-group">
       
        <div id="petowners" class="containerno glass">
            <div id="container-title">Pet Keeper</div>
            <%
                PetKeeper keeper = null;
                String user_rows = "";
                String status = "";
                int keeper_id = 0;
                int booking_id = 0;
                ArrayList<Booking> bookings = (ArrayList<Booking>) (new EditBookingsTable()).databaseToBookingArraylist2(petowner.getOwner_id());
                for(Booking booking:bookings ){
                    keeper_id = booking.getKeeper_id();
                    booking_id = booking.getBooking_id();
                    keeper = (new EditPetKeepersTable()).databaseToPetKeepersId(keeper_id);
                    status = booking.getStatus();
                }
                user_rows = "<div class='card-grid'>";
                if( keeper == null ) return ;
                if( !status.equals("accepted") ) return ;
                user_rows += "<div class='container-card'>";
                user_rows += "<button owner_id='"+petowner.getOwner_id()+ "' booking_id='"+ booking_id +"' keeper_id='"+keeper.getKeeper_id()+"' class='container-button chat'><i class='fas fa-comment-dots'></i></button>";
                user_rows += "<div class='card-top'></div>";
                user_rows += "<div class='avatar-holder'><img src='img/"+keeper.getGender()+".svg'></div>";
                user_rows += "<div class='name'><text>"+keeper.getFirstname() + " " + keeper.getLastname() +"</text></div>";
                user_rows += "<div class='button-card-group'>";
                user_rows += "</div>";
                user_rows += "</div>";
                
                user_rows += "</div>";
                out.print(user_rows);
                
                
            %>
            
        </div>    
        
        </div>

   
</body>

</html>