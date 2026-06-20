package com.devpro.devpro_backend.service;

import com.devpro.devpro_backend.dto.LoginRequest;
import com.devpro.devpro_backend.dto.RegisterRequest;
import com.devpro.devpro_backend.entity.User;
import com.devpro.devpro_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // =========================
    // REGISTER USER
    // =========================
    public String register(RegisterRequest request) {

        User existingUser = userRepository.findByEmail(request.getEmail());

        if (existingUser != null) {
            return "Email already exists";
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole("USER");

        userRepository.save(user);

        return "Registration successful";
    }

    // =========================
    // LOGIN USER
    // =========================
    public String login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail());

        if (user == null) {
            return "User not found";
        }

        if (!user.getPassword().equals(request.getPassword())) {
            return "Invalid password";
        }

        return "Login Successful";
    }
}