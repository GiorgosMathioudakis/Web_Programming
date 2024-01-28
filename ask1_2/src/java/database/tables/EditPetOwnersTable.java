/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package database.tables;

import com.google.gson.Gson;
import mainClasses.PetOwner;
import database.DB_Connection;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Mike
 */
public class EditPetOwnersTable {

 
    public void addPetOwnerFromJSON(String json) throws ClassNotFoundException{
         PetOwner user=jsonToPetOwner(json);
         addNewPetOwner(user);
    }
    
     public PetOwner jsonToPetOwner(String json){
         Gson gson = new Gson();

        PetOwner user = gson.fromJson(json, PetOwner.class);
        return user;
    }
    
    public String petOwnerToJSON(PetOwner user){
         Gson gson = new Gson();

        String json = gson.toJson(user, PetOwner.class);
        return json;
    }
    
   
    
    public void updatePetOwner(String username,String personalpage) throws SQLException, ClassNotFoundException{
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        String update="UPDATE petowners SET personalpage='"+personalpage+"' WHERE username = '"+username+"'";
        stmt.executeUpdate(update);
    }

    public void updatePetOwnerAll(PetOwner owner) throws SQLException, ClassNotFoundException {
        Connection con = null;
        PreparedStatement pstmt = null;

        try {
            con = DB_Connection.getConnection();

            String update = "UPDATE petowners SET "
                    //                    + "username = ?, "
                    //                    + "email = ?, "
                    + "password = ?, "
                    + "firstname = ?, "
                    + "lastname = ?, "
                    + "birthdate = ?, "
                    + "gender = ?, "
                    + "country = ?, "
                    + "city = ?, "
                    + "address = ?, "
                    + "personalpage = ?, "
                    + "job = ?, "
                    + "telephone = ? "
                    + "WHERE owner_id = ?";
            System.out.println("INSIDE THE SQL3");
            pstmt = con.prepareStatement(update);

//            pstmt.setString(1, owner.getUsername());
//            pstmt.setString(2, owner.getEmail());
            pstmt.setString(1, owner.getPassword());
            pstmt.setString(2, owner.getFirstname());
            pstmt.setString(3, owner.getLastname());
            pstmt.setString(4, owner.getBirthdate()); // assuming birthdate is a LocalDate
            pstmt.setString(5, owner.getGender());
            pstmt.setString(6, owner.getCountry());
            pstmt.setString(7, owner.getCity());
            pstmt.setString(8, owner.getAddress());
            pstmt.setString(9, owner.getPersonalpage());
            pstmt.setString(10, owner.getJob());
            pstmt.setString(11, owner.getTelephone());
            pstmt.setInt(12, owner.getOwner_id()); // assuming owner_id is an int

            pstmt.executeUpdate();
        } catch (ClassNotFoundException | SQLException ex) {
            System.out.println(ex.getMessage());
            System.out.println("PROBLEM IN SQL3");
            if (pstmt != null) {
                pstmt.close();
            }
            if (con != null) {
                con.close();
            }
        }
    }
   
    
    public PetOwner databaseToPetOwners(String username, String password) throws SQLException, ClassNotFoundException{
         Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM petowners WHERE username = '" + username + "' AND password='"+password+"'");
            rs.next();
            String json=DB_Connection.getResultsToJSON(rs);
            Gson gson = new Gson();
            PetOwner user = gson.fromJson(json, PetOwner.class);
            return user;
        } catch (Exception e) {
            System.err.println("Exception in databoseToPet where username: " + username + " and password: " + password + "! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    public PetOwner databaseToPetOwners(int id) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM petowners WHERE owner_id= '" + id + "'");
            rs.next();
            String json = DB_Connection.getResultsToJSON(rs);
            Gson gson = new Gson();
            PetOwner user = gson.fromJson(json, PetOwner.class);
            return user;
        } catch (Exception e) {
            System.err.println("Exception in databoseToPet where owner_id: " + id);
            System.err.println(e.getMessage());
        }
        return null;
    }

    public String databaseToPetOwnersUsername(String username) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT username FROM petowners WHERE username = '" + username + "'");
            rs.next();
            String json = DB_Connection.getResultsToJSON(rs);
            return json;
        } catch (Exception e) {
            System.err.println("Got an exceptionUsername! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    public String databaseToPetOwnersEmail(String email) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT email FROM petowners WHERE email = '" + email + "'");
            rs.next();
            String json = DB_Connection.getResultsToJSON(rs);
            return json;
        } catch (Exception e) {
            System.err.println("Got an exceptionEmail! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    
    public String databasePetOwnerToJSON(String username, String password) throws SQLException, ClassNotFoundException{
         Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM petowners WHERE username = '" + username + "' AND password='"+password+"'");
            rs.next();
            String json=DB_Connection.getResultsToJSON(rs);
            return json;
        } catch (Exception e) {
            System.err.println("Got an exceptionOwnerJSON! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    public void deletePetOwner(String ownerId) throws SQLException {
        Connection con = null;
        PreparedStatement pstmt = null;

        try {
            con = DB_Connection.getConnection();

            // Step 1: Delete bookings associated with the owner's pets
            String sqlDeleteBookings = "DELETE FROM bookings WHERE pet_id IN (SELECT pet_id FROM pets WHERE owner_id = ?)";
            pstmt = con.prepareStatement(sqlDeleteBookings);
            pstmt.setString(1, ownerId);
            pstmt.executeUpdate();

            // Step 2: Now, delete the pets
            String sqlDeletePets = "DELETE FROM pets WHERE owner_id = ?";
            pstmt = con.prepareStatement(sqlDeletePets);
            pstmt.setString(1, ownerId);
            pstmt.executeUpdate();

            // Step 3: Finally, delete the pet owner
            String sqlDeleteOwner = "DELETE FROM petowners WHERE owner_id = ?";
            pstmt = con.prepareStatement(sqlDeleteOwner);
            pstmt.setString(1, ownerId);
            pstmt.executeUpdate();

            System.out.println("Pet owner and all related data deleted successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("PROBLEM WITH DELETE OWNER");
            // Handle SQL exceptions
        } finally {
            if (pstmt != null) {
                pstmt.close();
            }
            if (con != null) {
                con.close();
            }
        }
    }


    public ArrayList<PetOwner> getAllPetOwners() throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ArrayList<PetOwner> owners = new ArrayList<>();

        try {
            ResultSet rs = stmt.executeQuery("SELECT * FROM petowners");
            Gson gson = new Gson();
            System.out.println("IM INSIDE THE ALL");

            while (rs.next()) {
                String json = DB_Connection.getResultsToJSON(rs);
                PetOwner owner = gson.fromJson(json, PetOwner.class);
                owners.add(owner);
            }

            return owners;
        } catch (SQLException e) {
            System.err.println("Got an exceptionAllPetOwners! ");
            System.err.println(e.getMessage());
            return null;
        } finally {
            if (stmt != null) {
                stmt.close();
            }
            if (con != null) {
                con.close();
            }
        }
    }


     public void createPetOwnersTable() throws SQLException, ClassNotFoundException {

        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        String query = "CREATE TABLE petowners "
                + "(owner_id INTEGER not NULL AUTO_INCREMENT, "
                + "    username VARCHAR(30) not null unique,"
                + "    email VARCHAR(50) not null unique,	"
                + "    password VARCHAR(32) not null,"
                + "    firstname VARCHAR(30) not null,"
                + "    lastname VARCHAR(30) not null,"
                + "    birthdate DATE not null,"
                + "    gender  VARCHAR (7) not null,"
                + "    country VARCHAR(30) not null,"
                + "    city VARCHAR(50) not null,"
                + "    address VARCHAR(50) not null,"
                + "    personalpage VARCHAR(200) not null,"
                + "    job VARCHAR(200) not null,"
                + "    telephone VARCHAR(14),"
                  + "    lat DOUBLE,"
                + "    lon DOUBLE,"
                + " PRIMARY KEY (owner_id))";
        stmt.execute(query);
        stmt.close();
    }
    
    
    /**
     * Establish a database connection and add in the database.
     *
     * @throws ClassNotFoundException
     */
    public void addNewPetOwner(PetOwner user) throws ClassNotFoundException {
        try {
            Connection con = DB_Connection.getConnection();

            Statement stmt = con.createStatement();

            String insertQuery = "INSERT INTO "
                    + " petowners (username,email,password,firstname,lastname,birthdate,gender,country,city,address,personalpage,"
                    + "job,telephone,lat,lon)"
                    + " VALUES ("
                    + "'" + user.getUsername() + "',"
                    + "'" + user.getEmail() + "',"
                    + "'" + user.getPassword() + "',"
                    + "'" + user.getFirstname() + "',"
                    + "'" + user.getLastname() + "',"
                    + "'" + user.getBirthdate() + "',"
                    + "'" + user.getGender() + "',"
                    + "'" + user.getCountry() + "',"
                    + "'" + user.getCity() + "',"
                    + "'" + user.getAddress() + "',"
                    + "'" + user.getPersonalpage() + "',"
                    + "'" + user.getJob() + "',"
                    + "'" + user.getTelephone() + "',"
                    + "'" + user.getLat() + "',"
                    + "'" + user.getLon() + "'"
                    + ")";
            //stmt.execute(table);
            System.out.println(insertQuery);
            stmt.executeUpdate(insertQuery);
            System.out.println("# The pet owner was successfully added in the database.");

            /* Get the member id from the database and set it to the member */
            stmt.close();

        } catch (SQLException ex) {
            Logger.getLogger(EditPetOwnersTable.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

   

}
