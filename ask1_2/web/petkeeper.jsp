<%-- 
    Document   : petkeeper
    Created on : Jan 27, 2024, 12:05:35 PM
    Author     : giorgosmathioudakis
--%>

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
    <script src="js/petkeeper.js" defer></script>
    <title>keeper Page</title>
</head>
<%
    String username = (String)session.getAttribute("username");
    String password = (String)session.getAttribute("password");
    PetKeeper keeper = (new EditPetKeepersTable()).databaseToPetKeepers(username, password);
    if(keeper == null) {
        response.sendRedirect("logout");
        return;
    }
//    Make the bookings List
    ArrayList<Booking> bookings = (ArrayList<Booking>) (new EditBookingsTable()).databaseToBookingArraylist(keeper.getKeeper_id());
//  Make the petowners set
    Set<PetOwner> petowners = (Set<PetOwner>) (new EditBookingsTable()).databaseToPetOwners(keeper.getKeeper_id());
    
%>

<body>
    <div id="pop-up" class="container glass"></div>
    <div class="container-group">
        <div id="information" class="container glass">
            <div id="container-title">Information</div>
            <%
                if(keeper== null) return;
               out.print("<div class='info-group'><div id='username' ><b>Username:</b> "+ keeper.getUsername() +"</div><button id='username' class='container-button' disabled><i class='fad fa-pencil'></i></button></div>");
               out.print("<div class='info-group'><div id='email'><b>Email:</b> "+ keeper.getEmail() +"</div><button id='email' class='container-button' disabled><i class='fad fa-pencil'></i></button></div>");
               out.print("<div class='info-group'><div id='password'><b>Password:</b> "+ keeper.getPassword() +"</div><button id='password' class='container-button'><i class='fad fa-pencil'></i></button></div>");
               out.print("<div class='info-group'><div id='firstname'><b>Firstname:</b> "+ keeper.getFirstname() +"</div><button id='firstname' class='container-button'><i class='fad fa-pencil'></i></button></div>");
               out.print("<div class='info-group'><div id='lastname'><b>Lastname:</b> "+ keeper.getLastname()  +"</div><button id='lastname' class='container-button'><i class='fad fa-pencil'></i></button></div>");
               out.print("<div class='info-group'><div id='birthdate'><b>Birthdate:</b> "+ keeper.getBirthdate() +"</div><button id='birthdate' class='container-button'><i class='fad fa-pencil'></i></button></div>");
               out.print("<div class='info-group'><div id='gender'><b>Gender:</b> "+ keeper.getGender() +"</div><button id='gender' class='container-button'><i class='fad fa-pencil'></i></button></div>");
               out.print("<div class='info-group'><div id='Job'><b>Job:</b> "+ keeper.getJob() +"</div><button id='job' class='container-button' disabled><i class='fad fa-pencil'></i></button></div>");
               out.print("<div class='info-group'><div id='country'><b>Country:</b> "+ keeper.getCountry() +"</div><button id='country' class='container-button'><i class='fad fa-pencil'></i></button></div>");
               out.print("<div class='info-group'><div id='city'><b>City:</b> "+ keeper.getCity() +"</div><button id='city' class='container-button'><i class='fad fa-pencil'></i></button></div>");
               out.print("<div class='info-group'><div id='address'><b>Address:</b> "+ keeper.getAddress() +"</div><button id='address' class='container-button'><i class='fad fa-pencil'></i></button></div>");
               out.print("<div class='info-group'><div id='lat'><b>Lat:</b> "+ keeper.getLat() +"</div><button id='lat' class='container-button'><i class='fad fa-pencil'></i></button></div>");
               out.print("<div class='info-group'><div id='lon'><b>Lon:</b> "+ keeper.getLon() +"</div><button id='lon' class='container-button'><i class='fad fa-pencil'></i></button></div>");
               out.print("<div class='info-group'><div id='telephone'><b>Telephone:</b> "+ keeper.getTelephone() +"</div><button id='telephone' class='container-button'><i class='fad fa-pencil'></i></button></div>");
               out.print("<div class='info-group'><div id='personalpage'><b>Personal page:</b> "+ keeper.getPersonalpage()+"</div><button id='personalpage' class='container-button'><i class='fad fa-pencil'></i></button></div>");
               out.print("<div class='info-group'><div id='property'><b>Property:</b> "+ keeper.getProperty()+"</div><button id='property' class='container-button'><i class='fad fa-pencil'></i></button></div>");
               out.print("<div class='info-group'><div id='propertydescription'><b>Description:</b> "+ keeper.getPropertydescription()+"</div><button id='propertydescription' class='container-button'><i class='fad fa-pencil'></i></button></div>");
               out.print("<div class='info-group'><div id='catkeeper'><b>Cat keeper:</b> "+ keeper.getCatkeeper()+"</div><button id='catkeeper' class='container-button'><i class='fad fa-pencil'></i></button></div>");
               out.print("<div class='info-group'><div id='catprice'><b>Cat price:</b> "+ keeper.getCatprice() +"</div><button id='catprice' class='container-button'><i class='fad fa-pencil'></i></button></div>");
               out.print("<div class='info-group'><div id='dogkeeper'><b>Dog keeper:</b> "+ keeper.getDogkeeper() +"</div><button id='dogkeeper' class='container-button'><i class='fad fa-pencil'></i></button></div>");
               out.print("<div class='info-group'><div id='dogprice'><b>Dog price:</b> "+ keeper.getDogprice() +"</div><button id='dogprice' class='container-button'><i class='fad fa-pencil'></i></button></div>");

           %>
        </div>
        <div id="bookings" class="container glass">
            <form action="logout"><button id="go-back" class="container-button"><i class="fas fa-sign-out"></i></button>
            </form>
            <button id="pdf-btn" class="container-button"><i class="far fa-file-pdf"></i></button>
            <div id="container-title">Bookings</div>
            <%
                String error = (String)session.getAttribute("error");
                if(error  != null) {
                    session.removeAttribute("error");
                    out.print("<div id='error' style='color: red'>" + error + "</div>");
                }
            %>
            <table>
                <tr>
                    <th>Pet</th>
                    <th>fromDate</th>
                    <th>toDate</th>
                    <th>Price</th>
                    <th>Status</th>
                </tr>
                
                
                <% 
                    String user_rows = "";


                    EditPetOwnersTable ut = new EditPetOwnersTable();
                    if( bookings == null ) return;
                for(int i = 0; i < bookings.size(); ++i) {
                    Booking tmp = bookings.get(i);
//                    if(tmp.getStatus().contentEquals("cancelled") || tmp.getStatus().contentEquals("done")) continue;
                    user_rows += "<tr>";
//                    user_rows += "<td>"+ (tmp.getOwner_id() == 0 ? "-" : ut.databaseToPetOwners(tmp.getOwner_id()).getUsername()) + "</td>";
                    user_rows += "<td>"+ tmp.getPet_id() +"</td>";
                    user_rows += "<td>"+ tmp.getFromDate()+"</td>";
                    user_rows += "<td>"+ tmp.getToDate() +"</td>";
                    user_rows += "<td>"+ tmp.getPrice()+"</td>";
                    user_rows += "<td>"+ tmp.getStatus() +"</td>";
                    user_rows += "<td><button id='" + tmp.getBooking_id()+ "' class='container-button doc-edit'><i class='fad fa-pencil'></i></button></td>";
                    user_rows += "</tr>";
                }
                out.print(user_rows);
            %>
            </table>
            <div id="bookings">
                <div id="bookings_info"></div>
            </div>
        </div>
        <div id="petowners" class="container glass">
            <div id="container-title">Pet Owners</div>
            <%
                user_rows = "<div class='card-grid'>";
                if( petowners == null ) return;
                if(keeper == null) return;
                for(PetOwner petowner : petowners ) {
                    user_rows += "<div class='container-card'>";
                    user_rows += "<button user_id='"+petowner.getOwner_id()+"' keeper_id='"+keeper.getKeeper_id()+"' class='container-button chat'><i class='fas fa-comment-dots'></i></button>";
                    user_rows += "<div class='card-top'></div>";
                    user_rows += "<div class='avatar-holder'><img src='img/"+petowner.getGender()+".svg'></div>";
                    user_rows += "<div class='name'><text>"+petowner.getFirstname() + " " + petowner.getLastname() +"</text></div>";
                    user_rows += "<div class='button-card-group'>";
                    user_rows += "</div>";
                    user_rows += "</div>";
                }
                user_rows += "</div>";
                out.print(user_rows);
            %>
            
        </div>
    
            
           
</body>

</html>