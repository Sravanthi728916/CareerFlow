package com.devpro.devpro_backend.controller;

import com.devpro.devpro_backend.dto.LoginRequest;
import com.devpro.devpro_backend.dto.RegisterRequest;
import com.devpro.devpro_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    // =========================
    // REGISTER USER
    // =========================
    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return userService.register(request);
    }

    // =========================
    // LOGIN USER
    // =========================
    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }

    // =========================
    // TEST API
    // =========================
    @GetMapping("/test")
    public String test() {
        return "Backend Working";
    }
}