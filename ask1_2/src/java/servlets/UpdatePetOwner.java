/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package servlets;

import database.tables.EditPetOwnersTable;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import mainClasses.PetOwner;

/**
 *
 * @author lympe
 */
public class UpdatePetOwner extends HttpServlet {


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
            out.println("<title>Servlet UpdatePetOwner</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet UpdatePetOwner at " + request.getContextPath() + "</h1>");
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
        EditPetOwnersTable petowner = new EditPetOwnersTable();
        PetOwner owner = new PetOwner();
        String ownerId = request.getParameter("ownerId");
//        String username = request.getParameter("field0");
//        String email = request.getParameter("field1");
        String password = request.getParameter("field2");
        String firstname = request.getParameter("field3");
        String lastname = request.getParameter("field4");
        String dateofbirth = request.getParameter("field5");
        String gender = request.getParameter("field6");
        String country = request.getParameter("field7");
        String city = request.getParameter("field8");
        String address = request.getParameter("field9");
        String personalpage = request.getParameter("field10");
        String job = request.getParameter("field11");
        String phone = request.getParameter("field12");
//        owner.setUsername(username);
        int id = Integer.parseInt(ownerId);
        owner.setOwner_id(id);
//        owner.setEmail(email);
        owner.setPassword(password);
        owner.setFirstname(firstname);
        owner.setLastname(lastname);
        owner.setBirthdate(dateofbirth);
        owner.setGender(gender);
        owner.setCountry(country);
        owner.setCity(city);
        owner.setAddress(address);
        owner.setPersonalpage(personalpage);
        owner.setJob(job);
        owner.setTelephone(phone);

        try {
            petowner.updatePetOwnerAll(owner);
            System.out.println("Pet Owner updated successfully!");

        } catch (ClassNotFoundException | SQLException ex) {
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
