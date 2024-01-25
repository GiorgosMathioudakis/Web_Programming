/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import database.tables.*;
import mainClasses.*;

/**
 *
 * @author giorgosmathioudakis
 */
@WebServlet(name = "login", urlPatterns = {"/login"})
public class login extends HttpServlet {

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
            out.println("<title>Servlet login</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet login at " + request.getContextPath() + "</h1>");
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
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        try {
            PetOwner petowner = (new EditPetOwnersTable()).databaseToPetOwners(username, password);  //pet owner
            PetKeeper petkeeper = (new EditPetKeepersTable()).databaseToPetKeepers(username, password);  //pet keeper
            if (petowner == null && petkeeper == null) { // If credentials are incorrect.
                HttpSession session = request.getSession();
                session.setAttribute("error", "Wrong username or password.");
                response.sendRedirect("signIn.html");
            } else {
                // Create session attribute
                HttpSession session = request.getSession();
                session.setAttribute("username", username);
                session.setAttribute("password", password);
                // Redirect to personal page.
                if (petowner != null) { // If he is a user.
                    session.setAttribute("user", petowner);
                    if (petowner.getOwner_id() == 2) { // If he is a simple admin.
                        response.sendRedirect("view/admin.jsp");
                    } else { // If he is an user.
                        response.sendRedirect("view/user.jsp");
                    }
                } else { // If he is a doctor.
                    if (doctor.getCertified() == 1) {
                        session.setAttribute("doctor", doctor);
                        response.sendRedirect("view/doctor.jsp");
                    } else {
                        session.setAttribute("error", "You must be certified from the admin in order to login.");
                        response.sendRedirect("view/signIn.jsp");
                    }
                }

            }
        } catch (Exception e) {
            System.out.println(e);
            response.setStatus(400);
        }
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
        processRequest(request, response);
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
