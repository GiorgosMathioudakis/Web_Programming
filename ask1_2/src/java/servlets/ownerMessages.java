/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package servlets;

import com.google.gson.Gson;
import database.tables.EditMessagesTable;
import java.io.IOException;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import mainClasses.Message;

/**
 *
 * @author giorgosmathioudakis
 */
public class ownerMessages extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String booking_id = request.getParameter("booking_id");

        try {
            ArrayList<Message> messages = (new EditMessagesTable()).databaseToMessages(Integer.parseInt(booking_id));
            Gson gson = new Gson();
            response.setStatus(200);
            System.out.println(gson.toJson(messages));
            response.getWriter().write(gson.toJson(messages));

        } catch (SQLException | ClassNotFoundException ex) {
            Logger.getLogger(ownerMessages.class.getName()).log(Level.SEVERE, null, ex);
            response.setStatus(400);
        } catch (ParseException ex) {
            Logger.getLogger(ownerMessages.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String booking_id = request.getParameter("booking_id");
        String message = request.getParameter("message");
        log(message);

        try {
            (new EditMessagesTable()).addMessage(booking_id, message, "owner");
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(ownerMessages.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
