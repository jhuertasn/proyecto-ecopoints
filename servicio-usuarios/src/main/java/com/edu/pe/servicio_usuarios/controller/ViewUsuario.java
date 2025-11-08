package com.edu.pe.servicio_usuarios.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;





@Controller
public class ViewUsuario {
    
    
    @GetMapping("/")
    public String getMethodName() {
        return "index";
    }
    
}
