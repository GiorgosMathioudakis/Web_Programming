/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package servlets;

import database.tables.EditMessagesTable;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author giorgosmathioudakis
 */
public class keeperMessages extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String booking_id = request.getParameter("booking_id");
        String message = request.getParameter("message");
        try {
            (new EditMessagesTable()).addMessage(booking_id, message, "keeper");
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(ownerMessages.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
