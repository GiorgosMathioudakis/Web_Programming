/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package servlets;

import com.google.gson.Gson;
import database.tables.EditPetKeepersTable;
import database.tables.EditPetOwnersTable;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import mainClasses.PetKeeper;
import mainClasses.PetOwner;

/**
 *
 * @author lympe
 */
public class CountKeepersOwners extends HttpServlet {

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
            out.println("<title>Servlet CountKeepersOwners</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet CountKeepersOwners at " + request.getContextPath() + "</h1>");
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
        EditPetKeepersTable temp = new EditPetKeepersTable();
        EditPetOwnersTable temp1 = new EditPetOwnersTable();
        try {
            ArrayList<PetKeeper> keepers = temp.getAllPetKeepers();
            int keeperscount = keepers.size();
            ArrayList<PetOwner> owners = temp1.getAllPetOwners();
            int ownerscount = owners.size();
            System.out.println("Cats :" + ownerscount);
            System.out.println("Dogs :" + keeperscount);

            Map<String, Integer> counts = new HashMap<>();
            counts.put("keepers", keeperscount);
            counts.put("owners", ownerscount);

            // Convert the map to JSON
            String json = new Gson().toJson(counts);

            // Set response type and encoding
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");

            // Send the JSON as response
            response.getWriter().write(json);

        } catch (Exception e) {

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
