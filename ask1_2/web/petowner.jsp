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
    <link rel="stylesheet" href="css/basicStyle.css">
    <link rel="stylesheet" href="css/keeperStyle.css">
    <script src="js/petowner.js" defer></script>
    <title>Owner Page</title>
</head>
<%
    String username = (String)session.getAttribute("username");
    String password = (String)session.getAttribute("password");
    username = "mountanton";
    password = "ab$12345";
    PetOwner petowner = (new EditPetOwnersTable()).databaseToPetOwners(username,password);
    if(petowner == null) {
        response.sendRedirect("logout");
        return;
    }

%>

<body>
    <div id="pop-up" class="container glass"></div>
    <div class="container-group">
        
       
        <div id="petkeeper" class="container glass">
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
</body>

</html>