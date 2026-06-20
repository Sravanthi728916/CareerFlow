package com.devpro.devpro_backend.controller;

import com.devpro.devpro_backend.dto.GithubProfileResponse;
import com.devpro.devpro_backend.service.GithubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/github")
@CrossOrigin("*")
public class GithubController {
    @Autowired
    private GithubService githubService;

    @GetMapping("/{username}")
    public GithubProfileResponse getProfile(
            @PathVariable String username) {

        return githubService.getProfile(username);
    }
}
