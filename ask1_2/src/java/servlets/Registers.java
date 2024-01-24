/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package servlets;

import database.tables.EditPetKeepersTable;
import database.tables.EditPetOwnersTable;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import mainClasses.JSON_Converter;
import java.util.logging.Level;
import java.util.logging.Logger;
import mainClasses.PetOwner;
import mainClasses.PetKeeper;

/**
 *
 * @author giorgosmathioudakis
 */
public class Registers extends HttpServlet {

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
            out.println("<title>Servlet Register</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet Register at " + request.getContextPath() + "</h1>");
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

        try {
            String username = request.getParameter("username");
            String email = request.getParameter("email");
            if (username != null) {
                System.out.println("username check was called");

                System.out.println("username is " + username);
                EditPetOwnersTable editowner = new EditPetOwnersTable();
                EditPetKeepersTable editkeeper = new EditPetKeepersTable();

                //get usernames/emails from both keepers and owners to see if they already exist
                String keeperusername = editkeeper.databaseToPetKeepersUsername(username);
                String ownerusername = editowner.databaseToPetOwnersUsername(username);
                System.out.println("keeperusername " + keeperusername + " ownerusername " + ownerusername);
                if (keeperusername != null || ownerusername != null) {
                    System.out.println("username is already in use");
                    response.setStatus(403);
                    response.setContentType("text/plain");
                    response.getWriter().write("Username is already in use");
                } else {
                    System.out.println("username not in use");
                    response.setStatus(200);
                    response.setContentType("text/plain");
                    response.getWriter().write(" ");
                }
            } else {
                System.out.println("email check was called");
                System.out.println("email is " + email);
                EditPetOwnersTable editowner = new EditPetOwnersTable();
                EditPetKeepersTable editkeeper = new EditPetKeepersTable();

                //get usernames/emails from both keepers and owners to see if they already exist
                String keeperemail = editkeeper.databaseToPetKeepersEmail(email);
                String owneremail = editowner.databaseToPetOwnersEmail(email);
                System.out.println(owneremail + "keeperemail " + keeperemail + " owneremail ");
                if (keeperemail != null || owneremail != null) {
                    System.out.println("Email is already in use");
                    response.setStatus(403);
                    response.setContentType("text/plain");
                    response.getWriter().write("Email is already in use");
                } else {
                    System.out.println("Email not in use");
                    response.setStatus(200);
                    response.setContentType("text/plain");
                    response.getWriter().write(" ");
                }
            }

        } catch (ClassNotFoundException | SQLException ex) {
            Logger.getLogger(Registers.class.getName()).log(Level.SEVERE, null, ex);
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
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            BufferedReader inputJSONFromClient = request.getReader();
            JSON_Converter jc = new JSON_Converter();
            String json = jc.getJSONFromAjax(inputJSONFromClient);
            String[] jsonParts = json.split("\"pet\"\\s*:\\s*\"");
            String petValue;
            petValue = jsonParts[1].split("\"")[0];
            EditPetOwnersTable editowner = new EditPetOwnersTable();
            PetOwner owner = editowner.jsonToPetOwner(json);
            EditPetKeepersTable editkeeper = new EditPetKeepersTable();
            PetKeeper keeper = editkeeper.jsonToPetKeeper(json);

            //get usernames/emails from both keepers and owners to see if they already exist
            String keeperusername = editkeeper.databaseToPetKeepersUsername(keeper.getUsername());
            String ownerusername = editowner.databaseToPetOwnersUsername(owner.getUsername());
            String keeperemail = editkeeper.databaseToPetKeepersEmail(keeper.getEmail());
            String owneremail = editowner.databaseToPetOwnersEmail(owner.getEmail());
            System.out.println(owneremail + "" + keeperusername + "" + ownerusername + "" + keeperemail);
            if (keeperusername == null && ownerusername == null && keeperemail == null && owneremail == null) {
                response.setStatus(200);

                if ("pet_owner".equals(petValue)) {
                    editowner.addPetOwnerFromJSON(json);
                } else if ("pet_keeper".equals(petValue)) {
                    editkeeper.addPetKeeperFromJSON(json);
                }
            } else {
                response.setStatus(403);
            }

//            if ("pet_owner".equals(petValue)) {
//                editowner.addPetOwnerFromJSON(json);
//            } else if ("pet_keeper".equals(petValue)) {
//                editkeeper.addPetKeeperFromJSON(json);
//            }
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);

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
