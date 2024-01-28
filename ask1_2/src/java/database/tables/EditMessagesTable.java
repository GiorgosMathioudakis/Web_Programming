/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package database.tables;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import database.DB_Connection;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import mainClasses.Message;

/**
 *
 * @author mountant
 */
public class EditMessagesTable {

    public void addMessageFromJSON(String json) throws ClassNotFoundException {
        Message msg = jsonToMessage(json);
        createNewMessage(msg);
    }

    public void addMessage(String booking_id, String message, String sender) throws ClassNotFoundException {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();

        Message msg = new Message();
        msg.setDatetime(dtf.format(now));
        msg.setBooking_id(Integer.parseInt(booking_id));
        msg.setMessage(message);
        msg.setSender(sender);

        createNewMessage(msg);

    }

    public Message jsonToMessage(String json) {
        Gson gson = new Gson();
        Message msg = gson.fromJson(json, Message.class);
        return msg;
    }

    public String reviewToJSON(Message msg) {
        Gson gson = new Gson();

        String json = gson.toJson(msg, Message.class);
        return json;
    }

    public ArrayList<Message> databaseToMessage(int booking_id) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ArrayList<Message> messages=new ArrayList<Message>();
        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM messages WHERE booking_id= '" + booking_id + "'");
            while (rs.next()) {
                String json = DB_Connection.getResultsToJSON(rs);
                Gson gson = new Gson();
                Message msg = gson.fromJson(json, Message.class);
                messages.add(msg);
            }
            return messages;
            
           
        } catch (Exception e) {
            System.err.println("Got an exception! ");

        }
        return null;
    }

    public ArrayList<Message> databaseToMessages(int booking_id) throws SQLException, ClassNotFoundException, ParseException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        ArrayList<Message> messages = new ArrayList<>();
        try {
            rs = stmt.executeQuery("SELECT * FROM messages WHERE booking_id= '" + booking_id + "'");
            while (rs.next()) {
                String json = DB_Connection.getResultsToJSON(rs);
                Gson gson = new Gson();
                Message message = gson.fromJson(json, Message.class);
                messages.add(message);
            }

            messages.sort(
                    new Comparator<Message>() {
                @Override
                public int compare(Message r1, Message r2) {
                    try {
                        Date firstdate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(r1.getDatetime().replace("T", " ") + ":00");
                        Date seconddate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(r2.getDatetime().replace("T", " ") + ":00");

                        return firstdate.compareTo(seconddate);
                    } catch (ParseException ex) {
                        Logger.getLogger(EditBookingsTable.class.getName()).log(Level.SEVERE, null, ex);
                    }
                    return 0;
                }
            });

            con.close();
            return messages;
        } catch (JsonSyntaxException e) {
            System.err.println("Exception databaseToMessages where booking_id: " + booking_id + "! ");
            System.err.println(e.getMessage());
            con.close();
        }
        return null;
    }

    public void createMessageTable() throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        String sql = "CREATE TABLE messages "
                + "(message_id INTEGER not NULL AUTO_INCREMENT, "
                + "booking_id INTEGER not NULL, "
                + "message VARCHAR(500) not NULL, "
                + "sender VARCHAR(500) not NULL, "
                + "datetime DATETIME  not null,"
                + "FOREIGN KEY (booking_id) REFERENCES bookings(booking_id), "
                + "PRIMARY KEY ( message_id ))";
        
        stmt.execute(sql);
        stmt.close();
        con.close();

    }

    /**
     * Establish a database connection and add in the database.
     *
     * @throws ClassNotFoundException
     */
    public void createNewMessage(Message msg) throws ClassNotFoundException {
        try {
            Connection con = DB_Connection.getConnection();

            Statement stmt = con.createStatement();

            String insertQuery = "INSERT INTO "
                    + " messages (booking_id,message,sender,datetime) "
                    + " VALUES ("
                    + "'" + msg.getBooking_id() + "',"
                    + "'" + msg.getMessage() + "',"
                    + "'" + msg.getSender() + "',"
                    + "'" + msg.getDatetime() + "'"
                    + ")";
            //stmt.execute(table);
            System.out.println(insertQuery);
            stmt.executeUpdate(insertQuery);
            System.out.println("# The message was successfully added in the database.");

            /* Get the member id from the database and set it to the member */
            stmt.close();

        } catch (SQLException ex) {
            Logger.getLogger(EditMessagesTable.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

}
