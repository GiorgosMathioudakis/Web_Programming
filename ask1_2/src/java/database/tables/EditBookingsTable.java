/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package database.tables;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import mainClasses.Booking;
import database.DB_Connection;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import mainClasses.PetOwner;

/**
 *
 * @author Mike
 */
public class EditBookingsTable {

    public void addBookingFromJSON(String json) throws ClassNotFoundException {
        Booking r = jsonToBooking(json);
        createNewBooking(r);
    }

    public Booking databaseToBooking(int id) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM bookings WHERE booking_id= '" + id + "'");
            rs.next();
            String json = DB_Connection.getResultsToJSON(rs);
            Gson gson = new Gson();
            Booking bt = gson.fromJson(json, Booking.class);
            return bt;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    public ArrayList<Booking> databaseToBookingArraylist(int id) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ArrayList<Booking> bookings = new ArrayList<>();
        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM bookings WHERE keeper_id= '" + id + "'");
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd"); // Adjust the format as needed

            while (rs.next()) {
                // Assuming you have a column named 'date' in your 'bookings' table
                java.sql.Date sqlDate = rs.getDate("fromdate");
                String fromdateString = (sqlDate != null) ? sdf.format(sqlDate) : null;
                sqlDate = rs.getDate("todate");
                String todateString = (sqlDate != null) ? sdf.format(sqlDate) : null;

                String json = DB_Connection.getResultsToJSON(rs);
                Gson gson = new Gson();
                Booking doc = gson.fromJson(json, Booking.class);
                // Set the string date in your Booking object
                if (doc != null) {
                    doc.setFromDate(fromdateString);
                    doc.setToDate(todateString);
                }

                bookings.add(doc);

            }
            con.close();
            bookings.sort(
                    new Comparator<Booking>() {
                @Override
                public int compare(Booking r1, Booking r2) {
                    try {
                        Date firstdate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(r1.getFromDate().replace("T", " ") + ":00");
                        Date seconddate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(r2.getFromDate().replace("T", " ") + ":00");

                        return firstdate.compareTo(seconddate);
                    } catch (ParseException ex) {
                        Logger.getLogger(EditBookingsTable.class.getName()).log(Level.SEVERE, null, ex);
                    }
                    return 0;
                }

            });
            return bookings;
        } catch (Exception e) {
            System.err.println("Exception in databaseToRandevouzArraylist doctor_id: " + id + "! ");
            System.err.println(e.getMessage());
        }
        con.close();
        return null;
    }


    public ArrayList<Booking> databaseToBookingArraylist1(int id) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ArrayList<Booking> bookings = new ArrayList<>();
        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM bookings WHERE keeper_id= '" + id + "' AND status != 'rejected'");
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd"); // Adjust the format as needed

            while (rs.next()) {
                // Assuming you have a column named 'date' in your 'bookings' table
                java.sql.Date sqlDate = rs.getDate("fromdate");
                String fromdateString = (sqlDate != null) ? sdf.format(sqlDate) : null;
                sqlDate = rs.getDate("todate");
                String todateString = (sqlDate != null) ? sdf.format(sqlDate) : null;

                String json = DB_Connection.getResultsToJSON(rs);
                Gson gson = new Gson();
                Booking doc = gson.fromJson(json, Booking.class);
                // Set the string date in your Booking object
                if (doc != null) {
                    doc.setFromDate(fromdateString);
                    doc.setToDate(todateString);
                }

                bookings.add(doc);

            }
            con.close();
            bookings.sort(
                    new Comparator<Booking>() {
                @Override
                public int compare(Booking r1, Booking r2) {
                    try {
                        Date firstdate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(r1.getFromDate().replace("T", " ") + ":00");
                        Date seconddate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(r2.getFromDate().replace("T", " ") + ":00");

                        return firstdate.compareTo(seconddate);
                    } catch (ParseException ex) {
                        Logger.getLogger(EditBookingsTable.class.getName()).log(Level.SEVERE, null, ex);
                    }
                    return 0;
                }

            });
            return bookings;
        } catch (Exception e) {
            System.err.println("Exception in databaseToRandevouzArraylist doctor_id: " + id + "! ");
            System.err.println(e.getMessage());
        }
        con.close();
        return null;
    }

    public ArrayList<Booking> databaseToBookingArraylist2(int id) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ArrayList<Booking> bookings = new ArrayList<>();
        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM bookings WHERE owner_id= '" + id + "' AND status != 'rejected'");
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd"); // Adjust the format as needed

            while (rs.next()) {
                // Assuming you have a column named 'date' in your 'bookings' table
                java.sql.Date sqlDate = rs.getDate("fromdate");
                String fromdateString = (sqlDate != null) ? sdf.format(sqlDate) : null;
                sqlDate = rs.getDate("todate");
                String todateString = (sqlDate != null) ? sdf.format(sqlDate) : null;

                String json = DB_Connection.getResultsToJSON(rs);
                Gson gson = new Gson();
                Booking doc = gson.fromJson(json, Booking.class);
                // Set the string date in your Booking object
                if (doc != null) {
                    doc.setFromDate(fromdateString);
                    doc.setToDate(todateString);
                }

                bookings.add(doc);

            }
            con.close();
            bookings.sort(
                    new Comparator<Booking>() {
                @Override
                public int compare(Booking r1, Booking r2) {
                    try {
                        Date firstdate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(r1.getFromDate().replace("T", " ") + ":00");
                        Date seconddate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(r2.getFromDate().replace("T", " ") + ":00");

                        return firstdate.compareTo(seconddate);
                    } catch (ParseException ex) {
                        Logger.getLogger(EditBookingsTable.class.getName()).log(Level.SEVERE, null, ex);
                    }
                    return 0;
                }

            });
            return bookings;
        } catch (Exception e) {
            System.err.println("Exception in databaseToRandevouzArraylist doctor_id: " + id + "! ");
            System.err.println(e.getMessage());
        }
        con.close();
        return null;
    }

    public Set<PetOwner> databaseToPetOwners(int keeper_id) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ArrayList<Booking> bookings = new ArrayList<>();
        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM bookings WHERE keeper_id=" + keeper_id + ";");
            while (rs.next()) {
                String json = DB_Connection.getResultsToJSON(rs);
                Gson gson = new Gson();
                Booking doc = gson.fromJson(json, Booking.class);
                bookings.add(doc);
            }
            con.close();
            Set<PetOwner> owners = new HashSet<PetOwner>();

            for (Booking booking : bookings) {
                if (booking.getOwner_id() == 0) {
                    continue;
                }
                owners.add((new EditPetOwnersTable()).databaseToPetOwners(booking.getOwner_id()));
            }

            Set<PetOwner> finishedSet = new HashSet<PetOwner>();
            boolean sameUserFlag = false;
            for (PetOwner owner : owners) {
                for (PetOwner tmp : finishedSet) {
                    if (owner.getUsername().contentEquals(tmp.getUsername())) {
                        sameUserFlag = true;
                        break;
                    }
                }
                if (sameUserFlag == true) {
                    sameUserFlag = false;
                    continue;
                }
                finishedSet.add(owner);
            }

            return finishedSet;

        } catch (Exception e) {
            System.err.println("Exception in databaseToPatients where doctor_id: " + keeper_id + "! ");
            System.err.println(e.getMessage());
        }
        con.close();
        return null;
    }

    public List<Booking> databaseGetPetOwners(int owner_id) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ResultSet rs;
        List<Booking> bookings = new ArrayList<>();
        try {
            rs = stmt.executeQuery("SELECT * FROM bookings WHERE owner_id=" + owner_id + " AND status='finished';");
            while (rs.next()) {
                Booking booking = new Booking(); // Assuming Booking is a class that represents a booking
                // Set properties of Booking object from ResultSet
                booking.setBooking_id(rs.getInt("booking_id"));
                booking.setOwner_id(rs.getInt("owner_id"));
                booking.setPet_id(rs.getInt("pet_id"));
                booking.setKeeper_id(rs.getInt("keeper_id"));
                booking.setFromDate(rs.getString("fromdate"));
                booking.setToDate(rs.getString("todate"));
                booking.setStatus(rs.getString("status"));
                booking.setPrice(rs.getInt("price"));
                // Add to list
                bookings.add(booking);
            }
        } catch (Exception e) {
            System.err.println("Exception in databaseGetPetOwners where owner_id: " + owner_id + "! ");
            System.err.println(e.getMessage());
        } finally {
            if (stmt != null) {
                stmt.close();
            }
            if (con != null) {
                con.close();
            }
        }
        return bookings;
    }

    public String getPetType(int pet_id) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT type FROM pets WHERE pet_id= '" + pet_id + "'");
            System.out.println(rs);
            rs.next();
            String json = DB_Connection.getResultsToJSON(rs);
            Gson gson = new Gson();
            JsonObject jsonObject = gson.fromJson(json, JsonObject.class);
            String type = jsonObject.get("type").getAsString();
            return type;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    public String getPetBreed(int pet_id) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT breed FROM pets WHERE pet_id= '" + pet_id + "'");
            System.out.println(rs);
            rs.next();
            String json = DB_Connection.getResultsToJSON(rs);
            Gson gson = new Gson();
            JsonObject jsonObject = gson.fromJson(json, JsonObject.class);
            String type = jsonObject.get("breed").getAsString();
            return type;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    public Booking jsonToBooking(String json) {
        Gson gson = new Gson();
        Booking r = gson.fromJson(json, Booking.class);
        return r;
    }

    public String bookingToJSON(Booking r) {
        Gson gson = new Gson();

        String json = gson.toJson(r, Booking.class);
        return json;
    }

    public void updateBooking(int bookingID, String status) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        String updateQuery = "UPDATE bookings SET status='"+status+"' WHERE booking_id= '"+bookingID+"'";
        stmt.executeUpdate(updateQuery);
        stmt.close();
        con.close();
    }

    public void createBookingTable() throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        String sql = "CREATE TABLE bookings "
                + "(booking_id INTEGER not NULL AUTO_INCREMENT, "
                + " owner_id INTEGER not NULL, "
                + "  pet_id VARCHAR(10) not NULL, "
                + " keeper_id INTEGER not NULL, "
                + " fromdate DATE not NULL, "
                + " todate DATE not NULL, "
                + " status VARCHAR(15) not NULL, "
                + " price INTEGER not NULL, "
                + "FOREIGN KEY (owner_id) REFERENCES petowners(owner_id), "
                + "FOREIGN KEY (pet_id) REFERENCES pets(pet_id), "
                + "FOREIGN KEY (keeper_id) REFERENCES petkeepers(keeper_id), "
                + " PRIMARY KEY (booking_id))";
        stmt.execute(sql);
        stmt.close();
        con.close();

    }

    /**
     * Establish a database connection and add in the database.
     *
     * @throws ClassNotFoundException
     */
    public void createNewBooking(Booking bor) throws ClassNotFoundException {
        try {
            Connection con = DB_Connection.getConnection();

            Statement stmt = con.createStatement();

            String insertQuery = "INSERT INTO "
                    + " bookings (owner_id,pet_id,keeper_id,fromDate,toDate,status,price)"
                    + " VALUES ("
                    + "'" + bor.getOwner_id() + "',"
                    + "'" + bor.getPet_id() + "',"
                     + "'" + bor.getKeeper_id()+ "',"
                    + "'" + bor.getFromDate() + "',"
                    + "'" + bor.getToDate() + "',"
                    + "'" + bor.getStatus() + "',"
                     + "'" + bor.getPrice() + "'"
                    + ")";
            //stmt.execute(table);

            stmt.executeUpdate(insertQuery);
            System.out.println("# The booking was successfully added in the database.");

            /* Get the member id from the database and set it to the member */
            stmt.close();

        } catch (SQLException ex) {
            Logger.getLogger(EditBookingsTable.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public double BookingGetPrice() throws ClassNotFoundException {
        double totalPrice = 0;
        Connection con = null;
        Statement stmt = null;
        ResultSet rs = null;

        try {
            con = DB_Connection.getConnection();
            stmt = con.createStatement();

            String sumQuery = "SELECT SUM(price) AS total FROM bookings";
            rs = stmt.executeQuery(sumQuery);

            if (rs.next()) {
                totalPrice = rs.getDouble("total");
            }

            System.out.println("# The total price of all bookings is: " + totalPrice);
        } catch (SQLException ex) {
            Logger.getLogger(EditBookingsTable.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (stmt != null) {
                    stmt.close();
                }
                if (con != null) {
                    con.close();
                }
            } catch (SQLException ex) {
                Logger.getLogger(EditBookingsTable.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

        return totalPrice;
    }
}
