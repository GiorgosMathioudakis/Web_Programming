/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package servlets;

import database.tables.EditPetsTable;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import mainClasses.Pet;

/**
 *
 * @author lympe
 */
public class AddPet extends HttpServlet {

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
            out.println("<title>Servlet AddPet</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet AddPet at " + request.getContextPath() + "</h1>");
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
        EditPetsTable pet = new EditPetsTable();
        Pet temp = new Pet();
        String name = request.getParameter("petName");
        String type = request.getParameter("type");
        String breed = request.getParameter("breed");
        String gender = request.getParameter("gender");
        String weight = request.getParameter("weight");
        String birth = request.getParameter("birth");
        String desc = request.getParameter("description");
        String photo = request.getParameter("photo");
        String sid = request.getParameter("owner_id");
        String pid = request.getParameter("pet_id");
        System.out.println(sid + pid);
        int id = Integer.parseInt(sid);

        try {
            double weightdouble = Double.parseDouble(weight);
            int birthint = Integer.parseInt(birth);
            response.setStatus(200);
            temp.setPet_id(pid);
            temp.setOwner_id(id);
            temp.setName(name);
            temp.setType(type);
            temp.setBreed(breed);
            temp.setGender(gender);
            temp.setWeight(weightdouble);
            temp.setBirthyear(birthint);
            temp.setDescription(desc);
            temp.setPhoto(photo);

            pet.createNewPet(temp);

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
