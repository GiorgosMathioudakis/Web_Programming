/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package servlets;

import database.tables.EditBookingsTable;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import mainClasses.Booking;

/**
 *
 * @author lympe
 */
public class AddBooking extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet AddBooking</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet AddBooking at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        EditBookingsTable book = new EditBookingsTable();
        Booking temp = new Booking();
        String owner_id = request.getParameter("owner_id");
        String keeper_id = request.getParameter("keeper_id");
        String pet_id = request.getParameter("pet_id");
        String price = request.getParameter("price");
        String todate = request.getParameter("todate");
        String fromdate = request.getParameter("fromdate");
        try {
            System.out.println(fromdate + todate + pet_id);
            int kid = Integer.parseInt(keeper_id);
            int oid = Integer.parseInt(owner_id);
            int pid = Integer.parseInt(pet_id);
            int priceint = Integer.parseInt(price);
            temp.setFromDate(fromdate);
            temp.setKeeper_id(kid);
            temp.setOwner_id(oid);
            temp.setPet_id(pid);
            temp.setPrice(priceint);
            temp.setToDate(todate);
            temp.setStatus("requested");
            response.setStatus(200);

            book.createNewBooking(temp);

        } catch (ClassNotFoundException ex) {
            Logger.getLogger(Registers.class.getName()).log(Level.SEVERE, null, ex);
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
