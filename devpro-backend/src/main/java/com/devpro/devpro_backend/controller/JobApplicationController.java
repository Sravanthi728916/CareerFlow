package com.devpro.devpro_backend.controller;
import com.devpro.devpro_backend.entity.JobApplication;
import com.devpro.devpro_backend.service.JobApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin("*")
public class JobApplicationController {
    @Autowired
    private JobApplicationService service;

    @PostMapping
    public JobApplication addApplication(
            @RequestBody JobApplication application) {

        return service.add(application);
    }

    @GetMapping
    public List<JobApplication> getAllApplications() {
        return service.getAll();
    }

    @DeleteMapping("/{id}")
    public String deleteApplication(
            @PathVariable Long id) {

        service.delete(id);
        return "Application deleted";
    }


}
