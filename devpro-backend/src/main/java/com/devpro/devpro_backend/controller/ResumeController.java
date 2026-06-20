package com.devpro.devpro_backend.controller;
import com.devpro.devpro_backend.entity.Resume;
import com.devpro.devpro_backend.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resumes")
@CrossOrigin("*")
public class ResumeController {
    @Autowired
    private ResumeService service;

    @PostMapping
    public Resume saveResume(
            @RequestBody Resume resume) {

        return service.save(resume);
    }

    @GetMapping
    public List<Resume> getAllResumes() {
        return service.getAll();
    }




}
